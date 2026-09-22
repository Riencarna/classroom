// Requires Playwright and installed Chrome: node --test tests/playtime.browser.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

test('playtime can be configured, saved and changed in all three timetable editors', async () => {
  const root = path.resolve(__dirname, '..');
  const version = (await fs.readFile(path.join(root, 'script.js'), 'utf8')).match(/const APP_VERSION = '([^']+)'/)[1];
  const server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.join(root, pathname === '/' ? '/index.html' : pathname);
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
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.route('https://**', route => route.abort());
    await page.clock.setFixedTime(new Date('2026-09-22T10:33:00'));
    await page.addInitScript(version => {
      localStorage.setItem('classroom_lastSeenVersion', version);
      window.firebase = { initializeApp() {}, database() { return { ref() { return { transaction() { return Promise.resolve(); }, once() {} }; } }; } };
      if (!localStorage.getItem('classroomTimetable')) {
        localStorage.setItem('classroomTimetable', JSON.stringify([
          {label:'1교시',start:'09:00',end:'09:40',type:'in-class',days:[1,2,3,4,5]},
          {label:'2교시',start:'09:40',end:'10:20',type:'in-class',days:[1,2,3,4,5]},
          {label:'3교시',start:'10:40',end:'11:20',type:'in-class',days:[1,2,3,4,5]}
        ]));
        localStorage.setItem('classroomSettings', JSON.stringify({morningSlotMigrated:true}));
      }
    }, version);
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.locator('.settings-btn').click();
    await page.locator('#voiceAlertToggle + .toggle-slider').click();
    await page.locator('#voicePlayFirstMinutes').fill('7');
    await page.locator('#voicePlayFirstMinutes').press('Tab');
    assert.equal(await page.locator('#voiceBreak3Minutes').inputValue(), '3');
    assert.equal(await page.locator('#voiceLunch5Minutes').inputValue(), '5');
    await page.locator('#voicePlayLastToggle').uncheck();
    assert.equal(await page.locator('#voicePlayLastMinutes').isDisabled(), true);
    await page.locator('#voicePlayLastToggle').check();
    await page.locator('button[onclick="addTimetableEntry()"]').click();
    await page.locator('#ttList .tt-row').last().locator('select').selectOption('play-time');
    const playRow = page.locator('#ttList .tt-row').filter({ has: page.locator('select option[value="play-time"]:checked') });
    assert.equal(await playRow.locator('.tt-label-input').inputValue(), '중간놀이');
    await playRow.locator('input[type=time]').first().fill('10:20');
    await playRow.locator('input[type=time]').first().press('Tab');
    await playRow.locator('input[type=time]').last().fill('10:40');
    await playRow.locator('input[type=time]').last().press('Tab');
    await page.reload();
    assert.match(await page.locator('#periodAlert').textContent(), /중간놀이/);
    await page.locator('.settings-btn').click();
    assert.equal(await page.locator('#voicePlayFirstMinutes').inputValue(), '7');
    assert.equal(await playRow.locator('input[type=time]').first().inputValue(), '10:20');
    assert.equal(await playRow.locator('input[type=time]').last().inputValue(), '10:40');
    await page.locator('#voicePlayFirstMinutes').scrollIntoViewIfNeeded();
    if (process.env.PLAYTIME_TEST_SCREENSHOTS) await page.screenshot({path:path.join(process.env.PLAYTIME_TEST_SCREENSHOTS, 'playtime-settings.png')});
    await page.locator('#settingsModal .modal-close').click();
    await page.locator('#timetableToggleBtn').click();
    await page.locator('#todayTimetableBtn').click();
    const quickPlay = page.locator('#quickTtList .tt-row').filter({ has: page.locator('select option[value="play-time"]:checked') });
    assert.equal(await quickPlay.count(), 1);
    await quickPlay.locator('select').selectOption('break-time');
    const quickBreak = page.locator('#quickTtList .tt-row').filter({ has: page.locator('select option[value="break-time"]:checked') });
    // Changing type twice exercises the editor after its draft was cloned on save.
    await quickBreak.locator('select').selectOption('play-time');
    await page.locator('button[onclick="finishQuickTimetableEditor()"]').click();
    await page.reload();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('classroomViewData')));
    assert.equal(saved.academicEvents[0].timetable.filter(entry => entry.type === 'play-time').length, 1);
    await page.locator('.settings-btn').click();
    await page.locator('#eventDateInput').fill('2026-09-23');
    await page.locator('#eventTitleInput').fill('블록 수업');
    await page.locator('button[onclick="saveAcademicEvent()"]').click();
    await page.locator('button[onclick="copyDefaultTimetableToSelectedEvent()"]').click();
    const specialPlay = page.locator('#specialTtList .tt-row').filter({ has: page.locator('select option[value="play-time"]:checked') });
    assert.equal(await specialPlay.count(), 1);
    await specialPlay.locator('.tt-label-input').fill('운동장 놀이');
    await specialPlay.locator('.tt-label-input').press('Tab');
    await page.locator('button[onclick="saveAcademicEventTimetable(true, true)"]').click();
    await page.reload();
    const override = await page.evaluate(() => JSON.parse(localStorage.getItem('classroomViewData')).academicEvents.find(event => event.date === '2026-09-23'));
    assert.equal(override.timetable.find(entry => entry.type === 'play-time').label, '운동장 놀이');
    await page.locator('.dev-notes-btn').click();
    assert.match(await page.locator('.dev-notes-title').first().textContent(), /v1.22.0.*중간놀이/);
    assert.deepEqual(errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
