// Images are stored as Blobs, separately from the small localStorage settings.
(() => {
  'use strict';
  const MAX_BYTES = 20 * 1024 * 1024;
  let dbPromise, items = [], objectURLs = [], busy = false, loaded = false;
  let returnFocus, viewerFocus, ownsFullscreen = false, fullscreenPending = false;
  const library = document.createElement('dialog');
  library.className = 'image-library';
  library.id = 'imageLibrary';
  library.setAttribute('aria-labelledby', 'imageLibraryTitle');
  library.innerHTML = `
    <header><h2 id="imageLibraryTitle">이미지 띄우기</h2><button type="button" data-action="close" aria-label="이미지 보관함 닫기">✕</button></header>
    <p>특별실 이동 규칙이나 활동 안내를 미리 담아두세요.<br>이미지를 누르면 크게 띄울 수 있어요.</p>
    <div class="image-library-actions"><button type="button" class="image-add">+ 이미지 추가</button><span>JPG · PNG · WebP · GIF · BMP / 장당 최대 20MB</span></div>
    <input type="file" id="imageFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" multiple hidden>
    <p class="image-library-status" role="status" aria-live="polite"></p>
    <div class="image-library-grid"></div>
    <p class="image-storage-note">이미지는 현재 기기의 이 브라우저에만 저장됩니다. 브라우저 데이터를 지우면 삭제되며, 설정 내보내기에는 포함되지 않으니 원본을 보관해주세요.</p>`;
  const viewer = document.createElement('dialog');
  viewer.id = 'imageViewer';
  viewer.className = 'image-viewer';
  viewer.setAttribute('aria-label', '이미지 크게 보기');
  viewer.innerHTML = `
    <div class="image-viewer-toolbar">
      <strong class="image-viewer-title"></strong>
      <select aria-label="이미지 표시 방식"><option value="contain">전체 보기 · 잘림 없음</option><option value="cover">화면 채우기 · 일부 잘림</option></select>
      <button type="button" data-action="fullscreen">전체화면</button>
      <button type="button" data-action="hide">메뉴 숨기기</button>
      <button type="button" data-action="close">닫기 (Esc)</button>
    </div>
    <img class="image-viewer-stage" alt="">
    <button type="button" class="image-viewer-reveal" aria-label="이미지 메뉴 표시">메뉴 보기</button>`;
  document.body.append(library, viewer);
  const grid = library.querySelector('.image-library-grid');
  const status = library.querySelector('.image-library-status');
  const fileInput = library.querySelector('input[type=file]');
  const addButton = library.querySelector('.image-add');
  const stage = viewer.querySelector('img');
  const fullscreenButton = viewer.querySelector('[data-action=fullscreen]');

  function database() {
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('classroomImages', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('다른 창을 닫고 다시 열어주세요.'));
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => { db.close(); dbPromise = null; };
        resolve(db);
      };
    }).catch(error => { dbPromise = null; throw error; });
    return dbPromise;
  }

  async function transact(mode, action) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('images', mode);
      const request = action(tx.objectStore('images'));
      tx.oncomplete = () => resolve(request.result);
      tx.onabort = tx.onerror = () => reject(tx.error || request.error || new Error('저장 실패'));
    });
  }

  function message(text, error = false) {
    status.textContent = text;
    status.dataset.error = String(error);
  }
  function setBusy(value) {
    busy = value;
    library.querySelectorAll('.image-add, .image-card button, .image-card input').forEach(el => { el.disabled = value; });
    grid.setAttribute('aria-busy', String(value));
  }
  function releaseURLs() {
    objectURLs.forEach(url => URL.revokeObjectURL(url));
    objectURLs = [];
  }
  function render() {
    releaseURLs();
    grid.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'image-library-empty';
      empty.textContent = '아직 등록한 이미지가 없어요. + 이미지 추가로 첫 안내를 담아보세요.';
      grid.append(empty);
    }
    items.forEach(item => {
      const url = URL.createObjectURL(item.blob);
      objectURLs.push(url);
      const card = document.createElement('article');
      card.className = 'image-card';
      const preview = document.createElement('button');
      preview.className = 'image-preview';
      preview.setAttribute('aria-label', item.name + ' 크게 보기');
      const img = document.createElement('img');
      img.src = url; img.alt = item.name; img.loading = 'lazy';
      preview.append(img);
      preview.addEventListener('click', () => showImage(item, url, preview));
      const label = document.createElement('label');
      label.htmlFor = 'saved-image-' + item.id; label.textContent = '이미지 이름';
      const name = document.createElement('input');
      name.id = label.htmlFor; name.value = item.name; name.maxLength = 80;
      const actions = document.createElement('div');
      actions.className = 'image-card-actions';
      const save = document.createElement('button');
      save.textContent = '이름 저장';
      save.addEventListener('click', () => mutate(async () => {
        const newName = name.value.trim();
        if (!newName) throw new Error('이미지 이름을 입력해주세요.');
        await transact('readwrite', store => store.put({ ...item, name: newName }));
        item.name = newName;
        img.alt = newName;
        preview.setAttribute('aria-label', newName + ' 크게 보기');
        name.value = newName;
      }, '이름을 저장했어요.'));
      name.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); save.click(); } });
      const remove = document.createElement('button');
      remove.className = 'image-delete'; remove.textContent = '삭제';
      remove.addEventListener('click', () => {
        if (busy || !confirm('“' + item.name + '” 이미지를 삭제할까요?')) return;
        mutate(async () => {
          await transact('readwrite', store => store.delete(item.id));
          items = items.filter(saved => saved.id !== item.id);
          render();
        }, '이미지를 삭제했어요.').then(() => addButton.focus());
      });
      actions.append(save, remove);
      card.append(preview, label, name, actions);
      grid.append(card);
    });
  }
  function storageError(error) {
    if (error.name === 'QuotaExceededError') return '저장 공간이 부족해요. 사용하지 않는 이미지를 삭제하거나 파일 크기를 줄여주세요.';
    return error.message || '이미지를 저장하지 못했어요. 브라우저의 저장 공간 설정을 확인해주세요.';
  }
  async function mutate(action, success) {
    if (busy) return;
    setBusy(true);
    try { await action(); message(success); }
    catch (error) { message(storageError(error), true); }
    finally { setBusy(false); }
  }
  async function validateImage(file) {
    if (!/^image\/(jpeg|png|webp|gif|bmp)$/.test(file.type)) throw new Error('JPG, PNG, WebP, GIF, BMP 이미지를 선택해주세요.');
    if (!file.size || file.size > MAX_BYTES) throw new Error('이미지는 0MB보다 크고 20MB 이하여야 해요.');
    const url = URL.createObjectURL(file);
    try {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('읽을 수 없는 이미지예요. 파일을 확인해주세요.'));
        img.src = url;
      });
    } finally { URL.revokeObjectURL(url); }
  }
  fileInput.addEventListener('change', async () => {
    const files = Array.from(fileInput.files);
    fileInput.value = '';
    if (busy || !files.length || !loaded) return;
    setBusy(true);
    let count = 0;
    const failures = [];
    try {
      for (const file of files) {
        message('이미지 저장 중… ' + (count + failures.length + 1) + '/' + files.length);
        try {
          await validateImage(file);
          const item = { name: file.name.replace(/\.[^.]+$/, '').slice(0, 80) || '새 이미지', blob: file };
          item.id = await transact('readwrite', store => store.add(item));
          items.push(item); count++;
        } catch (error) { failures.push(file.name + ': ' + storageError(error)); }
      }
      render();
      message(count + '개 이미지를 저장했어요.' + (failures.length ? ' ' + failures.join(' / ') : ' 이미지를 눌러 크게 띄워보세요.'), !!failures.length);
    } finally { setBusy(false); }
  });

  window.openImageLibrary = async () => {
    if (library.open) return;
    returnFocus = document.activeElement;
    if (typeof closeClassroomTools === 'function') closeClassroomTools();
    library.showModal();
    if (busy) return;
    setBusy(true); message('이미지를 불러오는 중…');
    try {
      items = await transact('readonly', store => store.getAll());
      loaded = true; render(); message('이미지 ' + items.length + '개');
    } catch (error) {
      loaded = false;
      message('보관함을 열지 못했어요. 브라우저의 저장 공간 설정을 확인한 뒤 다시 열어주세요.', true);
    } finally { setBusy(false); addButton.disabled = !loaded; }
  };
  function closeLibrary() {
    if (viewer.open) return;
    library.close();
    releaseURLs();
    // A menu item is hidden after opening the library; return to its menu button.
    const target = returnFocus && returnFocus.closest('.classroom-tools-menu') ? document.getElementById('classroomToolsBtn') : returnFocus;
    if (target) target.focus();
  }
  function showImage(item, url, trigger) {
    viewerFocus = trigger;
    viewer.querySelector('strong').textContent = item.name;
    stage.src = url; stage.alt = item.name;
    viewer.dataset.fit = 'contain';
    viewer.querySelector('select').value = 'contain';
    viewer.classList.remove('controls-hidden');
    fullscreenButton.textContent = document.fullscreenElement ? '전체화면 해제' : '전체화면';
    viewer.showModal();
    viewer.querySelector('[data-action=close]').focus();
  }
  function closeViewer() {
    viewer.close(); stage.removeAttribute('src');
    if (ownsFullscreen && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    ownsFullscreen = false;
    if (viewerFocus) viewerFocus.focus();
  }
  addButton.addEventListener('click', () => fileInput.click());
  library.querySelector('[data-action=close]').addEventListener('click', closeLibrary);
  viewer.querySelector('[data-action=close]').addEventListener('click', closeViewer);
  viewer.querySelector('select').addEventListener('change', event => { viewer.dataset.fit = event.target.value; });
  viewer.querySelector('[data-action=hide]').addEventListener('click', () => {
    viewer.classList.add('controls-hidden'); viewer.querySelector('.image-viewer-reveal').focus();
  });
  viewer.querySelector('.image-viewer-reveal').addEventListener('click', () => {
    viewer.classList.remove('controls-hidden'); viewer.querySelector('[data-action=hide]').focus();
  });
  fullscreenButton.addEventListener('click', async () => {
    if (fullscreenPending) return;
    fullscreenPending = true;
    try {
      if (document.fullscreenElement) { ownsFullscreen = false; await document.exitFullscreen(); }
      else {
        await document.documentElement.requestFullscreen();
        ownsFullscreen = true;
        if (!viewer.open) { ownsFullscreen = false; await document.exitFullscreen(); }
      }
    } catch (error) { fullscreenButton.textContent = '전체화면 재시도'; }
    finally { fullscreenPending = false; }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreenButton.textContent = document.fullscreenElement ? '전체화면 해제' : '전체화면';
    if (!document.fullscreenElement && ownsFullscreen) { ownsFullscreen = false; if (viewer.open) closeViewer(); }
  });
  library.addEventListener('cancel', event => { event.preventDefault(); closeLibrary(); });
  viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
  // Keep the application's Escape handler from also closing the underlying screen.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (viewer.open || library.open)) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (viewer.open) closeViewer(); else closeLibrary();
    }
  }, true);
})();
