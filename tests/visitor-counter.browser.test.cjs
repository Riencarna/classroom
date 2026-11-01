// Requires Playwright and Chrome. All external requests are blocked.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('counter recovers from lost acknowledgement, deduplicates reloads and rolls over in UTC+9', async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.join(root, pathname === '/' ? 'index.html' : pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const data = await fs.readFile(file);
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.ttf': 'font/ttf' };
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const context = await browser.newContext({ timezoneId: 'America/Los_Angeles' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    await page.clock.setFixedTime(new Date('2026-11-01T23:59:00+09:00'));
    let stored = {};
    const legacy = { total: 100, migrationBaseline: 4181, today: { '2026-11-01': 100 } };
    let failAfterCommit = true;
    await page.exposeFunction('readTestCounter', key => structuredClone(key === 'counter/kst' ? stored : legacy[key.split('/')[1]]));
    await page.exposeFunction('commitTestCounter', value => {
      stored = value;
      if (failAfterCommit) { failAfterCommit = false; throw new Error('Acknowledgement lost'); }
    });
    await page.addInitScript(() => {
      window.firebase = {
        initializeApp() {},
        database: () => ({
          goOnline() {}, goOffline() {},
          ref: key => ({
            async once() { const value = await window.readTestCounter(key); return { val: () => value }; },
            async transaction(fn) {
              const next = fn(await window.readTestCounter(key));
              if (next === undefined) return { committed: false };
              await window.commitTestCounter(next);
              return { committed: true, snapshot: { val: () => next } };
            },
          }),
        }),
      };
    });
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.evaluate(async () => {
      if (visitorCounterState.inFlight) await visitorCounterState.inFlight;
      await refreshVisitorCounter();
    });
    await page.waitForFunction(() => document.getElementById('totalCount').textContent === '4282');
    assert.equal(failAfterCommit, false);
    assert.equal(stored.total, 1);
    assert.equal(await page.locator('#totalCount').textContent(), '4282');
    assert.equal(await page.locator('#todayCount').textContent(), '1');
    await page.reload();
    await page.waitForFunction(() => document.getElementById('totalCount').textContent === '4282');
    assert.equal(stored.total, 1);
    await page.clock.setFixedTime(new Date('2026-11-02T00:00:00+09:00'));
    await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    await page.waitForFunction(() => document.getElementById('totalCount').textContent === '4283');
    assert.equal(stored.todayKst['2026-11-02'], 1);
    assert.equal(stored.todayKst['2026-11-01'], 1);
    assert.deepEqual(legacy.today, { '2026-11-01': 100 });
    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    await page.evaluate(() => refreshVisitorCounter());
    assert.equal(stored.total, 2);
    assert.deepEqual(errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
