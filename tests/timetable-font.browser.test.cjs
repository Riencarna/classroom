// Requires Playwright and installed Chrome: node --test tests/timetable-font.browser.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('timetable subject sizes persist and long names fit at different screen sizes', async () => {
  const root = path.resolve(__dirname, '..');
  const version = (await fs.readFile(path.join(root, 'script.js'), 'utf8')).match(/const APP_VERSION = '([^']+)'/)[1];
  const server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.join(root, pathname === '/' ? '/index.html' : pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.ttf': 'font/ttf' };
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    await page.clock.setFixedTime(new Date('2026-11-02T10:00:00'));
    await page.addInitScript(version => {
      localStorage.setItem('classroom_lastSeenVersion', version);
      window.firebase = { initializeApp() {}, database() { return { goOnline() {}, goOffline() {}, ref() { return { transaction() { return Promise.resolve({ committed: true, snapshot: { val: () => ({ total: 1 }) } }); }, once() { return Promise.resolve({ val: () => 0 }); } }; } }; } };
      if (!localStorage.getItem('classroomTimetable')) {
        const subjects = ['국어', '수학', '사회', '창의적 체험활동', '과학', '체육', '아주긴과목이름도빠짐없이표시'];
        localStorage.setItem('classroomTimetable', JSON.stringify(subjects.map((subject, i) => ({
          label: `${i + 1}교시`, start: `${String(9 + i).padStart(2, '0')}:00`, end: `${String(9 + i).padStart(2, '0')}:40`,
          type: 'in-class', days: [1], subjects: { 1: subject },
        }))));
        localStorage.setItem('classroomSettings', JSON.stringify({ morningSlotMigrated: true, timetableMode: true, dailyPeriods: { 1: 7 } }));
      }
    }, version);
    await page.goto('http://127.0.0.1:' + server.address().port);
    // Inspect settled layouts, including after modal and viewport transitions.
    await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    const baseSizes = await page.locator('.subway-subject').evaluateAll(nodes => nodes.map(node => parseFloat(getComputedStyle(node).fontSize)));
    assert.equal(baseSizes.length, 7);
    assert.equal(await page.locator('.subway-past .subway-subject').count(), 1);
    assert.equal(await page.locator('.subway-current .subway-subject').count(), 1);
    const shots = process.env.TIMETABLE_TEST_SCREENSHOTS;
    if (shots) await fs.mkdir(shots, { recursive: true });
    for (const scale of [100, 125, 150, 175, 200]) {
      await page.locator('.settings-btn').click();
      await page.getByLabel('시간표 과목 글자 크기', { exact: true }).selectOption(String(scale));
      const sizes = await page.locator('.subway-subject').evaluateAll(nodes => nodes.map(node => parseFloat(getComputedStyle(node).fontSize)));
      sizes.forEach((size, i) => assert.ok(Math.abs(size - baseSizes[i] * scale / 100) < 0.02));
      if (shots && scale === 200) {
        await page.getByLabel('시간표 과목 글자 크기', { exact: true }).scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(shots, 'settings-200.png') });
      }
      await page.locator('#settingsModal .modal-close').click();
      for (const viewport of [{ width: 1920, height: 1080 }, { width: 1280, height: 900 }, { width: 900, height: 700 }]) {
        await page.setViewportSize(viewport);
        const bounds = await page.locator('.subway-subject').evaluateAll(nodes => nodes.map(node => {
          const box = node.getBoundingClientRect();
          const station = node.closest('.subway-station').getBoundingClientRect();
          return { text: node.textContent, left: box.left, right: box.right, stationLeft: station.left, stationRight: station.right,
            scrollWidth: node.scrollWidth, width: node.clientWidth };
        }));
        bounds.forEach(box => {
          assert.ok(box.left >= box.stationLeft - 1 && box.right <= box.stationRight + 1, `overlap at ${viewport.width}px/${scale}%: ${box.text}`);
          assert.ok(box.scrollWidth <= box.width + 1, `clipped text at ${viewport.width}px/${scale}%: ${box.text}`);
        });
        const clock = await page.locator('.clock-container').boundingBox();
        const panel = await page.locator('#leftPanel').boundingBox();
        assert.ok(clock.x >= panel.x - 1 && clock.x + clock.width <= panel.x + panel.width + 1, 'clock fits the panel');
        if (shots && [100, 150, 200].includes(scale)) await page.screenshot({ path: path.join(shots, `timetable-${viewport.width}-${scale}.png`) });
        await page.locator('.subway-subject').last().scrollIntoViewIfNeeded();
        const last = await page.locator('.subway-subject').last().boundingBox();
        assert.ok(last.y >= 0 && last.y + last.height <= viewport.height + 1, `last subject reachable at ${viewport.width}px/${scale}%: ${JSON.stringify(last)}`);
        await page.locator('#leftPanel').evaluate(node => node.scrollTop = 0);
      }
      await page.reload();
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      await page.locator('.settings-btn').click();
      assert.equal(await page.getByLabel('시간표 과목 글자 크기', { exact: true }).inputValue(), String(scale));
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('classroomSettings')).timetableSubjectScale), scale);
      await page.locator('#settingsModal .modal-close').click();
    }
    await page.locator('.settings-btn').click();
    await page.getByLabel('시간표 과목 글자 크기', { exact: true }).selectOption('100');
    await page.locator('#settingsModal .modal-close').click();
    await page.locator('#timetableToggleBtn').click();
    await page.locator('#timetableToggleBtn').click();
    const restoredSizes = await page.locator('.subway-subject').evaluateAll(nodes => nodes.map(node => parseFloat(getComputedStyle(node).fontSize)));
    assert.deepEqual(restoredSizes, baseSizes);
    if (shots) {
      // A typical six-lesson classroom day for the visual handoff.
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.evaluate(() => { timetable.pop(); renderTimetableDisplay(); });
      await page.locator('.settings-btn').click();
      await page.getByLabel('시간표 과목 글자 크기', { exact: true }).selectOption('200');
      await page.locator('#settingsModal .modal-close').click();
      await page.locator('#leftPanel').evaluate(node => node.scrollTop = 0);
      await page.screenshot({ path: path.join(shots, 'timetable-classroom-200.png') });
    }
    assert.deepEqual(errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
