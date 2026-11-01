const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('seating preserves every student, locks, excluded seats, backup and bell controls', async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer(async (req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/$/, '/index.html'));
    if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
    try {
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', dialog => dialog.accept());
    await page.route('https://**', route => route.abort());
    const version = (await fs.readFile(path.join(root, 'script.js'), 'utf8')).match(/const APP_VERSION = '([^']+)'/)[1];
    await page.addInitScript(version => {
      localStorage.setItem('classroom_lastSeenVersion', version);
      window.firebase = { initializeApp() {}, database() { return { ref() { return { transaction() { return Promise.resolve(); }, once() {} }; } }; } };
    }, version);
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.locator('#classroomToolsBtn').click();
    await page.getByRole('menuitem', { name: /자리 정하기/ }).click();
    const seat = page.locator('#seatingTool');
    await seat.locator('#seatingCols').fill('3');
    await seat.locator('#seatingRows').fill('2');
    const names = ['1 하늘', '2 바다', '동명이인', '동명이인', '<img src=x onerror=alert(1)>'];
    await seat.locator('textarea').fill(names.join('\n'));
    await seat.getByRole('button', { name: '명단 적용', exact: true }).click();
    assert.equal(await seat.locator('.seating-seat').count(), 6);
    assert.equal(await seat.locator('.seating-seat img').count(), 0);
    await seat.getByRole('button', { name: '자리 고정', exact: true }).click();
    await seat.locator('[data-index="0"]').click();
    await seat.getByRole('button', { name: '빈자리 지정', exact: true }).click();
    await seat.locator('[data-index="5"]').click();
    for (let i = 0; i < 10; i++) {
      await seat.getByRole('button', { name: '자리 섞기', exact: true }).click();
      const s = await page.evaluate(() => JSON.parse(localStorage.classroomSeating));
      assert.equal(s.slots[0], 0); assert.equal(s.slots[5], null);
      assert.equal(s.blocked[5], true); assert.equal(s.locked[0], true);
      assert.deepEqual(s.slots.filter(x => x !== null).sort(), [0, 1, 2, 3, 4]);
    }
    await seat.getByRole('button', { name: '자리 바꾸기', exact: true }).click();
    const before = await page.evaluate(() => JSON.parse(localStorage.classroomSeating).slots);
    await seat.locator('[data-index="1"]').click(); await seat.locator('[data-index="2"]').click();
    const after = await page.evaluate(() => JSON.parse(localStorage.classroomSeating).slots);
    assert.equal(after[1], before[2]); assert.equal(after[2], before[1]);
    await seat.locator('#seatingCols').fill('1');
    await seat.getByRole('button', { name: '배치 크기 적용' }).click();
    assert.match(await seat.locator('#seatingStatus').textContent(), /늘려/);
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.classroomSeating).slots), after);
    await seat.locator('#seatingCols').fill('3');
    await seat.getByRole('button', { name: '크게 보기', exact: true }).click();
    await fs.mkdir(path.join(root, '.tmp'), { recursive: true });
    await page.screenshot({ path: path.join(root, '.tmp/seating-desktop.png') });
    await page.keyboard.press('Escape');
    assert.equal(await seat.evaluate(el => el.open), false);
    assert.equal(await page.locator('#classroomToolsBtn').evaluate(el => el === document.activeElement), true);
    await page.reload(); await page.evaluate(() => openSeatingTool());
    assert.deepEqual(await seat.locator('.seating-seat strong').allTextContents(), after.map(id => id === null ? '빈자리' : names[id]));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(root, '.tmp/seating-mobile.png') });
    assert.equal(await seat.evaluate(el => el.scrollWidth <= el.clientWidth + 1), true);
    await page.keyboard.press('Escape');
    // Verify the saved arrangement is included in the exported backup.
    const downloadPromise = page.waitForEvent('download');
    await page.evaluate(() => exportData());
    const download = await downloadPromise;
    const backup = JSON.parse(await fs.readFile(await download.path(), 'utf8'));
    assert.deepEqual(JSON.parse(backup.classroomSeating).slots, after);
    // Exercise the real audio graph and record scheduling and stops.
    await page.evaluate(async () => {
      await ensureAudioRunning(true);
      window.bellEvents = [];
      const original = audioCtx.createOscillator.bind(audioCtx);
      audioCtx.createOscillator = () => {
        const oscillator = original();
        const start = oscillator.start.bind(oscillator), stop = oscillator.stop.bind(oscillator);
        oscillator.start = time => { window.bellEvents.push('start'); start(time); };
        oscillator.stop = time => { window.bellEvents.push(time === undefined ? 'stop-now' : 'stop-scheduled'); stop(time); };
        return oscillator;
      };
      openLessonBell();
    });
    const bell = page.locator('#lessonBell');
    for (const [sound, count] of [['single', 1], ['double', 2], ['gather', 3]]) {
      await page.evaluate(() => { window.bellEvents = []; });
      await bell.locator(`[data-sound="${sound}"]`).click();
      await page.waitForFunction(n => window.bellEvents.filter(e => e === 'start').length === n, count);
      await bell.getByRole('button', { name: '소리 멈추기' }).click();
      assert.equal(await page.evaluate(() => window.bellEvents.filter(e => e === 'stop-now').length), count);
    }
    await bell.locator('input').fill('0');
    await bell.locator('[data-sound="single"]').click();
    assert.match(await bell.locator('[role="status"]').textContent(), /0%/);
    await bell.locator('input').fill('25');
    await bell.locator('[data-sound="gather"]').click();
    await page.keyboard.press('Escape');
    assert.equal(await bell.evaluate(el => el.open), false);
    await page.evaluate(() => openLessonBell());
    assert.equal(await bell.locator('input').inputValue(), '25');
    await page.screenshot({ path: path.join(root, '.tmp/bell-mobile.png') });
    const bellBox = await bell.boundingBox();
    assert.ok(Math.abs(bellBox.x + bellBox.width / 2 - 195) < 2);
    await page.keyboard.press('Escape');
    await Promise.all([
      page.waitForEvent('load'),
      page.locator('#importFileInput').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) }),
    ]);
    await page.evaluate(() => openSeatingTool());
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.classroomSeating).slots), after);
    await page.evaluate(() => localStorage.setItem('classroomRandomStudents', JSON.stringify(['가람', '나래', '다온'])));
    await seat.getByRole('button', { name: '랜덤 명단 불러오기' }).click();
    assert.equal(await seat.locator('textarea').inputValue(), '가람\n나래\n다온');
    await seat.getByRole('button', { name: '명단 적용', exact: true }).click();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.classroomSeating).names), ['가람', '나래', '다온']);
    await seat.locator('#seatingCols').fill('10'); await seat.locator('#seatingRows').fill('10');
    await seat.getByRole('button', { name: '배치 크기 적용' }).click();
    assert.equal(await seat.locator('.seating-seat').count(), 100);
    assert.equal(await seat.evaluate(el => el.scrollWidth <= el.clientWidth + 1), true);
    await page.keyboard.press('Escape');
    await page.evaluate(() => { localStorage.setItem('classroomSeating', '{broken'); openSeatingTool(); });
    assert.equal(await seat.locator('.seating-seat').count(), 30);
    assert.deepEqual(errors, []);
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
});
