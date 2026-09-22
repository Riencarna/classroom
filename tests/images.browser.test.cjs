// Requires Playwright and installed Chrome: node --test tests/images.browser.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('image library persists, presents, validates and handles storage failures', async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer(async (req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const data = await fs.readFile(file);
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.ttf': 'font/ttf' };
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Keep the test offline and prevent visitor-counter writes to the real service.
    await page.route('https://**', route => route.abort());
    await page.addInitScript(() => {
      localStorage.setItem('classroom_lastSeenVersion', 'v1.21.0');
      window.firebase = {
        initializeApp() {},
        database() { return { ref() { return { transaction() { return Promise.resolve(); }, once() {} }; } }; }
      };
    });
    await page.goto('http://127.0.0.1:' + server.address().port);
    const open = () => page.locator('.image-tool-shortcut').click();
    const ready = () => page.waitForFunction(() => !document.querySelector('.image-add').disabled);
    await open(); await ready();
    assert.match(await page.locator('.image-library-empty').textContent(), /아직/);
    // Real landscape and portrait PNGs exercise layout and decoding.
    const png = await page.evaluate(() => {
      const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 700;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#dceee6'; ctx.fillRect(0, 0, 1200, 700);
      ctx.fillStyle = '#174c43'; ctx.font = 'bold 56px sans-serif';
      ctx.fillText('특별실 이동 약속', 80, 130); ctx.font = '36px sans-serif';
      ctx.fillText('1. 복도에서는 천천히 걸어요', 80, 280); ctx.fillText('2. 친구를 배려하며 조용히 이동해요', 80, 380);
      const landscape = canvas.toDataURL().split(',')[1];
      canvas.width = 600; canvas.height = 1000; ctx.fillStyle = '#f0dfc2'; ctx.fillRect(0, 0, 600, 1000);
      return [landscape, canvas.toDataURL().split(',')[1]];
    });
    const upload = payload => page.locator('#imageFileInput').setInputFiles(payload);
    await upload(png.map((data, i) => ({ name: i ? '토의 규칙.png' : '이동 약속.png', mimeType: 'image/png', buffer: Buffer.from(data, 'base64') })));
    await page.waitForFunction(() => document.querySelectorAll('.image-card').length === 2);
    await ready();
    await page.locator('.image-card input').first().fill('과학실 이동 규칙');
    await page.getByRole('button', { name: '이름 저장' }).first().click(); await ready();
    await page.reload(); await open(); await ready();
    assert.equal(await page.locator('.image-card').count(), 2);
    assert.equal(await page.locator('.image-card input').first().inputValue(), '과학실 이동 규칙');
    const rect = await page.locator('#imageLibrary').boundingBox();
    assert.ok(Math.abs(rect.x - (1280 - rect.width) / 2) < 2, 'library centered');
    if (process.env.IMAGE_TEST_SCREENSHOTS) await page.screenshot({ path: path.join(process.env.IMAGE_TEST_SCREENSHOTS, 'image-library.png') });
    await page.getByRole('button', { name: '과학실 이동 규칙 크게 보기' }).click();
    assert.equal(await page.locator('.image-viewer-stage').evaluate(el => getComputedStyle(el).objectFit), 'contain');
    await page.getByLabel('이미지 표시 방식').selectOption('cover');
    assert.equal(await page.locator('.image-viewer-stage').evaluate(el => getComputedStyle(el).objectFit), 'cover');
    await page.getByLabel('이미지 표시 방식').selectOption('contain');
    await page.getByRole('button', { name: '메뉴 숨기기', exact: true }).click();
    assert.equal(await page.locator('.image-viewer-toolbar').isVisible(), false);
    if (process.env.IMAGE_TEST_SCREENSHOTS) await page.screenshot({ path: path.join(process.env.IMAGE_TEST_SCREENSHOTS, 'image-viewer.png') });
    await page.getByRole('button', { name: '이미지 메뉴 표시' }).click();
    await page.locator('#imageViewer [data-action=fullscreen]').click();
    await page.waitForFunction(() => !!document.fullscreenElement);
    await page.getByRole('button', { name: '닫기 (Esc)' }).click();
    await page.waitForFunction(() => !document.fullscreenElement);
    assert.equal(await page.locator('#imageLibrary').evaluate(el => el.open), true);
    await page.locator('.image-preview').last().click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#imageViewer').evaluate(el => el.open), false);
    assert.equal(await page.locator('#imageLibrary').evaluate(el => el.open), true);
    await upload([{ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('broken') }, { name: 'text.txt', mimeType: 'text/plain', buffer: Buffer.from('text') }]);
    await ready();
    assert.equal(await page.locator('.image-card').count(), 2);
    assert.equal(await page.locator('.image-library-status').getAttribute('data-error'), 'true');
    await page.evaluate(() => {
      window.originalImageAdd = IDBObjectStore.prototype.add;
      IDBObjectStore.prototype.add = function() { throw new DOMException('full', 'QuotaExceededError'); };
    });
    await upload({ name: 'extra.png', mimeType: 'image/png', buffer: Buffer.from(png[0], 'base64') }); await ready();
    assert.match(await page.locator('.image-library-status').textContent(), /저장 공간이 부족/);
    assert.equal(await page.locator('.image-card').count(), 2);
    await page.evaluate(() => { IDBObjectStore.prototype.add = window.originalImageAdd; });
    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('.image-delete').last().click();
    assert.equal(await page.locator('.image-card').count(), 2);
    page.once('dialog', dialog => dialog.accept());
    await page.locator('.image-delete').last().click();
    await page.waitForFunction(() => document.querySelectorAll('.image-card').length === 1);
    await page.reload(); await open(); await ready();
    assert.equal(await page.locator('.image-card').count(), 1);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#imageLibrary').evaluate(el => el.scrollWidth <= el.clientWidth), true);
    if (process.env.IMAGE_TEST_SCREENSHOTS) await page.screenshot({ path: path.join(process.env.IMAGE_TEST_SCREENSHOTS, 'image-library-mobile.png') });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.image-tool-shortcut').evaluate(el => el === document.activeElement), true);
    await page.locator('#classroomToolsBtn').click();
    await page.getByRole('menuitem').filter({ hasText: '이미지 띄우기' }).click(); await ready();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#classroomToolsBtn').evaluate(el => el === document.activeElement), true);
    assert.deepEqual(errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
