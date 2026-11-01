// Lesson tools keep their own state; existing rosters and scheduled alerts stay independent.
(() => {
  'use strict';
  const $ = (root, selector) => root.querySelector(selector);
  const seatKey = 'classroomSeating';
  let state, selected = null, mode = 'swap';
  const seating = document.createElement('dialog');
  seating.id = 'seatingTool';
  seating.className = 'lesson-dialog seating-dialog';
  seating.setAttribute('aria-labelledby', 'seatingTitle');
  seating.innerHTML = `
    <header><h2 id="seatingTitle">자리 정하기</h2><button type="button" data-action="close" aria-label="자리 정하기 닫기">✕</button></header>
    <p class="lesson-intro">학생 이름을 등록하고 자리를 섞어보세요. 배치는 자동으로 저장돼요.</p>
    <div class="seating-workspace">
      <aside class="seating-settings">
        <label for="seatingNames">학생 명단 · 한 줄에 한 명</label>
        <textarea id="seatingNames" rows="7" placeholder="1 김하늘&#10;2 이바다"></textarea>
        <div class="lesson-actions"><button type="button" data-action="import">랜덤 명단 불러오기</button><button type="button" data-action="roster">명단 적용</button></div>
        <div class="seating-dimensions"><label>가로 <input id="seatingCols" type="number" min="1" max="10" value="6"> 열</label><label>세로 <input id="seatingRows" type="number" min="1" max="10" value="5"> 줄</label></div>
        <button type="button" data-action="layout">배치 크기 적용</button>
        <p class="lesson-help">명단이나 크기를 적용하면 기존 배치와 고정·빈자리 설정이 초기화돼요. 같은 이름은 번호를 붙이면 구별하기 쉬워요.</p>
        <p class="lesson-help">이 기기의 브라우저에 저장되며 설정 내보내기에도 포함됩니다.</p>
      </aside>
      <section class="seating-stage" aria-label="좌석 배치">
        <div class="lesson-actions seating-toolbar"><button type="button" data-action="shuffle" class="lesson-primary">자리 섞기</button><button type="button" data-action="expand" aria-pressed="false">크게 보기</button></div>
        <div class="seating-modes" role="group" aria-label="자리 편집 방식"><button type="button" data-mode="swap" aria-pressed="true">자리 바꾸기</button><button type="button" data-mode="lock" aria-pressed="false">자리 고정</button><button type="button" data-mode="empty" aria-pressed="false">빈자리 지정</button></div>
        <p class="lesson-help" id="seatingModeHint">바꿀 자리 두 곳을 차례로 누르세요. 고정한 자리는 먼저 고정을 풀어주세요.</p>
        <div class="seating-board">칠판 · 교탁</div>
        <div class="seating-grid-scroll"><div class="seating-grid" id="seatingGrid"></div></div>
        <p class="lesson-status" role="status" id="seatingStatus"></p>
      </section>
    </div>`;
  const bell = document.createElement('dialog');
  bell.id = 'lessonBell';
  bell.className = 'lesson-dialog bell-dialog';
  bell.setAttribute('aria-labelledby', 'lessonBellTitle');
  bell.innerHTML = `
    <header><h2 id="lessonBellTitle">수업 벨</h2><button type="button" data-action="close" aria-label="수업 벨 닫기">✕</button></header>
    <p class="lesson-intro">활동을 시작하거나 주의를 모을 때 눌러주세요.</p>
    <div class="lesson-bell-sounds"><button type="button" data-sound="single">🔔<strong>맑은 종</strong><small>짧게 한 번</small></button><button type="button" data-sound="double">🎵<strong>딩동</strong><small>부드러운 두 음</small></button><button type="button" data-sound="gather">✨<strong>집중 신호</strong><small>또르르 세 음</small></button></div>
    <label class="bell-volume" for="lessonBellVolume">음량 <input id="lessonBellVolume" type="range" min="0" max="100" value="40"><output id="lessonBellVolumeValue" for="lessonBellVolume">40%</output></label>
    <div class="lesson-actions"><button type="button" data-action="stop">소리 멈추기</button></div>
    <p class="lesson-status" id="lessonBellStatus" role="status">작은 음량으로 먼저 확인해보세요.</p>`;
  document.body.append(seating, bell);
  const status = text => { $(seating, '#seatingStatus').textContent = text; };
  // Use native dialogs for keyboard focus containment and return focus on close.
  for (const dialog of [seating, bell]) {
    dialog.addEventListener('keydown', e => { if (e.key === 'Escape') e.stopPropagation(); });
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      const outside = e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom);
      if (outside || e.target.closest('[data-action="close"]')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog === bell) stopBell();
      document.getElementById('classroomToolsBtn').focus();
    });
  }
  function defaultState() { return { rows: 5, cols: 6, names: [], slots: Array(30).fill(null), locked: [], blocked: [] }; }
  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(seatKey));
      if (!s || !Number.isInteger(s.rows) || !Number.isInteger(s.cols) || s.rows < 1 || s.rows > 10 || s.cols < 1 || s.cols > 10) return defaultState();
      const n = s.rows * s.cols;
      if (!Array.isArray(s.names) || s.names.length > n || s.names.some(name => typeof name !== 'string' || !name.trim()) || !Array.isArray(s.slots) || s.slots.length !== n) return defaultState();
      const ids = s.slots.filter(id => id !== null);
      if (ids.length !== s.names.length || new Set(ids).size !== ids.length || ids.some(id => !Number.isInteger(id) || id < 0 || id >= s.names.length)) return defaultState();
      s.blocked = Array.from({ length: n }, (_, i) => !!(s.blocked && s.blocked[i]) && s.slots[i] === null);
      s.locked = Array.from({ length: n }, (_, i) => !!(s.locked && s.locked[i]) && s.slots[i] !== null);
      return s;
    } catch { return defaultState(); }
  }
  function save() {
    try { localStorage.setItem(seatKey, JSON.stringify(state)); return true; }
    catch { status('저장 공간이 부족해요. 현재 배치는 브라우저를 닫으면 사라질 수 있어요.'); return false; }
  }
  function render() {
    const grid = $(seating, '#seatingGrid');
    grid.style.gridTemplateColumns = `repeat(${state.cols}, minmax(72px, 1fr))`;
    grid.replaceChildren();
    state.slots.forEach((id, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'seating-seat';
      button.dataset.index = i;
      button.classList.toggle('is-locked', !!state.locked[i]);
      button.classList.toggle('is-blocked', !!state.blocked[i]);
      button.classList.toggle('is-selected', selected === i);
      const name = document.createElement('strong');
      name.textContent = state.blocked[i] ? '빈자리' : id === null ? '미배정' : state.names[id];
      const detail = document.createElement('small');
      detail.textContent = `${Math.floor(i / state.cols) + 1}줄 ${i % state.cols + 1}열${state.locked[i] ? ' · 고정' : ''}`;
      button.append(name, detail);
      button.setAttribute('aria-label', `${detail.textContent}, ${name.textContent}`);
      button.setAttribute('aria-pressed', String(selected === i));
      grid.append(button);
    });
  }
  function commit(message) { render(); if (save()) status(message); }
  window.openSeatingTool = () => {
    closeClassroomTools(); state = loadState(); selected = null;
    $(seating, '#seatingNames').value = state.names.join('\n');
    $(seating, '#seatingRows').value = state.rows;
    $(seating, '#seatingCols').value = state.cols;
    render(); status(`${state.names.length}명 · ${state.rows * state.cols}자리`);
    seating.showModal();
  };
  function applyLayout(useNames) {
    const rows = Number($(seating, '#seatingRows').value), cols = Number($(seating, '#seatingCols').value);
    if (![rows, cols].every(n => Number.isInteger(n) && n >= 1 && n <= 10)) return status('가로·세로는 각각 1~10 사이의 정수로 입력해주세요.');
    const names = useNames ? $(seating, '#seatingNames').value.split('\n').map(n => n.trim()).filter(Boolean) : state.names;
    if (names.length > rows * cols) return status(`학생 ${names.length}명을 배치하려면 자리를 더 늘려주세요.`);
    if (state.names.length && !confirm('기존 배치와 고정·빈자리 설정을 초기화하고 적용할까요?')) return;
    state = { rows, cols, names, slots: Array.from({ length: rows * cols }, (_, i) => i < names.length ? i : null), locked: [], blocked: [] };
    selected = null; commit(`${names.length}명을 등록했어요. 자리 섞기를 눌러보세요.`);
  }
  seating.addEventListener('click', e => {
    const target = e.target.closest('button'); if (!target) return;
    if (target.dataset.mode) {
      mode = target.dataset.mode; selected = null;
      seating.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
      $(seating, '#seatingModeHint').textContent = { swap: '바꿀 자리 두 곳을 차례로 누르세요. 고정한 자리는 먼저 고정을 풀어주세요.', lock: '학생이 배정된 자리를 누르면 고정하거나 해제해요. 섞어도 고정 자리는 유지돼요.', empty: '미배정 자리를 누르면 배치에서 제외해요. 학생이 있는 자리는 미배정 자리와 먼저 바꿔주세요.' }[mode];
      render(); return;
    }
    const action = target.dataset.action;
    if (action === 'roster' || action === 'layout') return applyLayout(action === 'roster');
    if (action === 'import') {
      let names; try { names = JSON.parse(localStorage.getItem('classroomRandomStudents') || '[]'); } catch {}
      if (!Array.isArray(names) || !names.length || names.some(n => typeof n !== 'string')) return status('랜덤 뽑기에 등록한 학생 명단이 없어요.');
      $(seating, '#seatingNames').value = names.join('\n'); status('명단을 불러왔어요. 명단 적용을 눌러 등록해주세요.'); return;
    }
    if (action === 'expand') {
      const expanded = seating.classList.toggle('is-expanded');
      target.setAttribute('aria-pressed', String(expanded)); target.textContent = expanded ? '설정 함께 보기' : '크게 보기'; return;
    }
    if (action === 'shuffle') {
      if (!state.names.length) return status('학생 명단을 먼저 적용해주세요.');
      const positions = state.slots.map((_, i) => i).filter(i => !state.locked[i] && !state.blocked[i]);
      const values = positions.map(i => state.slots[i]);
      for (let i = values.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [values[i], values[j]] = [values[j], values[i]]; }
      positions.forEach((p, i) => { state.slots[p] = values[i]; });
      selected = null; commit('자리를 섞었어요. 고정한 자리와 지정한 빈자리는 유지돼요.'); return;
    }
    if (target.dataset.index === undefined) return;
    const i = Number(target.dataset.index);
    if (mode === 'lock') {
      if (state.slots[i] === null) return status('학생이 배정된 자리만 고정할 수 있어요.');
      state.locked[i] = !state.locked[i]; commit(state.locked[i] ? '자리를 고정했어요.' : '자리 고정을 풀었어요.');
    } else if (mode === 'empty') {
      if (state.slots[i] !== null) return status('학생을 미배정 자리로 옮긴 뒤 빈자리로 지정해주세요.');
      state.blocked[i] = !state.blocked[i]; commit(state.blocked[i] ? '배치에서 제외할 빈자리로 지정했어요.' : '다시 배치할 수 있는 자리로 바꿨어요.');
    } else {
      if (state.locked[i] || state.blocked[i]) return status('고정이나 빈자리 지정을 먼저 풀어주세요.');
      if (selected === null) { selected = i; render(); status('바꿀 다른 자리를 눌러주세요.'); }
      else { [state.slots[i], state.slots[selected]] = [state.slots[selected], state.slots[i]]; selected = null; commit('자리 선택을 마쳤어요.'); }
    }
    const focus = $(seating, `[data-index="${i}"]`); if (focus) focus.focus();
  });

  let bellNodes = [], bellTimer, bellRequest = 0;
  function stopBell() {
    bellRequest++; clearTimeout(bellTimer);
    bellNodes.forEach(node => { try { node.stop(); } catch {} }); bellNodes = [];
    $(bell, '#lessonBellStatus').textContent = '소리가 멈췄어요.';
  }
  window.openLessonBell = () => {
    closeClassroomTools();
    let volume = 40; try { const saved = localStorage.getItem('classroomLessonBellVolume'); if (saved !== null && Number.isFinite(Number(saved))) volume = Math.max(0, Math.min(100, Number(saved))); } catch {}
    $(bell, 'input').value = volume; $(bell, 'output').value = volume + '%';
    $(bell, '#lessonBellStatus').textContent = '작은 음량으로 먼저 확인해보세요.'; bell.showModal();
  };
  $(bell, 'input').addEventListener('input', e => {
    stopBell(); $(bell, 'output').value = e.target.value + '%';
    try { localStorage.setItem('classroomLessonBellVolume', e.target.value); } catch {}
  });
  bell.addEventListener('click', async e => {
    const button = e.target.closest('button'); if (!button) return;
    if (button.dataset.action === 'stop') return stopBell();
    if (!button.dataset.sound) return;
    stopBell(); const request = bellRequest;
    const volume = Number($(bell, 'input').value) / 100;
    if (!volume) { $(bell, '#lessonBellStatus').textContent = '음량이 0%예요. 음량을 올려주세요.'; return; }
    if (!await ensureAudioRunning(true)) { $(bell, '#lessonBellStatus').textContent = '소리를 재생하지 못했어요. 브라우저의 소리 허용을 확인해주세요.'; return; }
    if (request !== bellRequest || !bell.open) return;
    const notes = { single: [880], double: [659.25, 523.25], gather: [523.25, 659.25, 783.99] }[button.dataset.sound];
    try {
      const start = audioCtx.currentTime;
      notes.forEach((frequency, i) => {
        const time = start + i * 0.32;
        const oscillator = audioCtx.createOscillator(), gain = audioCtx.createGain();
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(volume * 0.35, time + 0.012); gain.gain.exponentialRampToValueAtTime(0.001, time + 1.1);
        oscillator.connect(gain); gain.connect(audioCtx.destination);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
        bellNodes.push(oscillator); oscillator.start(time); oscillator.stop(time + 1.2);
      });
      $(bell, '#lessonBellStatus').textContent = button.querySelector('strong').textContent + ' 재생 중…';
      bellTimer = setTimeout(() => { bellNodes = []; $(bell, '#lessonBellStatus').textContent = '재생을 마쳤어요.'; }, (notes.length - 1) * 320 + 1200);
    } catch { stopBell(); $(bell, '#lessonBellStatus').textContent = '소리를 재생하지 못했어요. 다시 눌러주세요.'; }
  });
})();
