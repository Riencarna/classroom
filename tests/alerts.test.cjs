// Run with: node --test tests/alerts.test.cjs
// Execute the real application declarations with a controlled clock, audio
// device and storage. Only page startup and unrelated browser services are stubbed.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8').split('// INIT')[0];

function element() {
  return {
    children: [], handlers: {}, attributes: {}, classList: { remove() {}, add() {} },
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); },
    addEventListener(type, handler) { this.handlers[type] = handler; },
    setAttribute(key, value) { this.attributes[key] = value; },
    removeAttribute(key) { delete this.attributes[key]; },
  };
}

function app(saved = {}) {
  let time = new Date('2026-09-09T08:59:59').getTime(); // Wednesday, local time
  const sounds = [], resumes = [], intervals = [], listeners = {}, nodes = {};
  const storage = new Map(Object.entries(saved));
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [time])); }
    static now() { return time; }
  }
  class AudioContext {
    constructor() { this.state = 'running'; this.currentTime = 0; }
    async resume() { resumes.push(1); this.state = 'running'; }
    createOscillator() {
      const osc = { frequency: {}, connect() {}, disconnect() {}, stop() {}, start() { sounds.push(osc.frequency.value); } };
      return osc;
    }
    createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, disconnect() {} }; }
    async decodeAudioData(data) { return data; }
    createBufferSource() { return { connect() {}, disconnect() {}, start() { sounds.push('voice'); }, stop() {} }; }
  }
  const context = vm.createContext({
    Date: Clock, console, setTimeout, clearTimeout, Blob,
    setInterval(fn) { intervals.push(fn); return intervals.length; },
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
    Worker: class { constructor() { throw new Error('Worker blocked'); } },
    window: { AudioContext, addEventListener(type, handler) { listeners[type] = handler; } },
    document: {
      visibilityState: 'visible',
      querySelector: () => null,
      getElementById: id => nodes[id] || null,
      createElement: element, createTextNode: text => ({ text }),
      addEventListener(type, handler) { listeners[type] = handler; },
    },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    firebase: { initializeApp() {}, database() { return {}; } },
    fetch: async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) }),
  });
  const run = code => vm.runInContext(code, context);
  run(source);
  run('loadSettings(); timetable = DEFAULT_TIMETABLE.map(cloneEntry); audioCtx = new window.AudioContext();');
  const settle = () => new Promise(resolve => setImmediate(resolve));
  return {
    run, nodes, sounds, resumes, intervals, listeners, storage, context, settle,
    setTime(value) { time = new Date(value).getTime(); },
    async tick(value) {
      if (value) time = new Date(value).getTime();
      run('checkScheduledChimes(new Date())');
      await settle();
    },
  };
}

test('Wednesday exclusions survive saving and loading despite daily period count', () => {
  const a = app();
  a.run('timetable.forEach(entry => entry.days = entry.days.filter(day => day !== 3)); saveTimetable(); loadTimetable();');
  assert.equal(a.run('getTodayEntries(new Date()).length'), 0);
  assert.equal(a.run('getCurrentPeriod(new Date()).type'), 'off-time');
  a.setTime('2026-09-10T09:05:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).label'), '1교시');
});

test('a single excluded period is not restored by the daily count', () => {
  const a = app();
  a.run("timetable.find(entry => entry.label === '3교시').days = [1,2,4,5]");
  assert.equal(a.run("getTodayEntries(new Date()).some(entry => entry.label === '3교시')"), false);
  assert.equal(a.run("getTodayEntries(new Date()).some(entry => entry.label === '5교시')"), true);
});

test('weekday exclusion also removes the actual start and end chimes', async () => {
  const a = app();
  a.run("timetable.find(entry => entry.label === '1교시').days = [1,2,4,5]");
  await a.tick();
  await a.tick('2026-09-09T09:00:01');
  await a.tick('2026-09-09T09:40:01');
  assert.equal(a.sounds.length, 0);
  await a.tick('2026-09-09T09:50:01');
  assert.equal(a.sounds.length, 3);
});

test('custom named classes stay visible when numbered lessons exclude Wednesday', () => {
  const a = app();
  a.run("timetable.forEach(entry => entry.days = []); timetable.push({label: '창체', start: '09:00', end: '09:40', type: 'in-class', days: [3]})");
  a.setTime('2026-09-09T09:05:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).label'), '창체');
});

test('increasing daily periods enables the new sixth period and preserves earlier exclusions', () => {
  const a = app();
  a.run("timetable.find(entry => entry.label === '3교시').days = [1,2,4,5]; setDailyPeriods(3, 6)");
  assert.equal(a.run("getTodayEntries(new Date()).some(entry => entry.label === '6교시')"), true);
  assert.equal(a.run("getTodayEntries(new Date()).some(entry => entry.label === '3교시')"), false);
  a.setTime('2026-09-09T14:00:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).label'), '6교시');
  a.run('setDailyPeriods(3, 5)');
  assert.equal(a.run('getCurrentPeriod(new Date()).label'), '수업 끝');
});

test('date overrides still determine the displayed timetable', () => {
  const a = app();
  a.run("timetable.forEach(entry => entry.days = []); viewData.academicEvents = [{date: '2026-09-09', timetableOverride: true, timetable: [{label: '특별 수업', start: '09:00', end: '09:40', type: 'in-class'}]}]");
  a.setTime('2026-09-09T09:05:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).label'), '특별 수업');
});

test('alert day defaults preserve old settings and an empty selection stays empty', () => {
  const a = app({ classroomSettings: JSON.stringify({ chimeEnabled: false }) });
  assert.equal(a.run('settings.alertDays.length'), 7);
  assert.equal(a.run('settings.chimeEnabled'), false);
  a.run('settings.alertDays = []; saveSettings(); loadSettings()');
  assert.equal(a.run('settings.alertDays.length'), 0);
});

test('the Wednesday alert checkbox persists and leaves the timetable intact', () => {
  const a = app();
  a.nodes.alertDays = element();
  a.run('updateClock = () => {}; renderAlertDays()');
  const wednesday = a.nodes.alertDays.children[2].children[0];
  assert.equal(wednesday.attributes['aria-label'], '수요일 자동 알림');
  wednesday.checked = false;
  wednesday.handlers.change();
  a.run('loadSettings()');
  assert.equal(a.run('isAutoAlertDay(new Date())'), false);
  assert.ok(a.run('getTodayEntries(new Date()).length') > 0);
});

test('start and end chimes fire once by timestamp, including the final class', async () => {
  const a = app();
  await a.tick();
  await a.tick('2026-09-09T09:00:02');
  await a.tick('2026-09-09T09:00:03');
  assert.deepEqual(a.sounds, [523.25, 659.25, 783.99]);
  await a.tick('2026-09-09T09:40:02');
  assert.deepEqual(a.sounds.slice(-3), [783.99, 659.25, 523.25]);
  await a.tick('2026-09-09T13:40:02');
  assert.equal(a.sounds.length, 9);
});

test('adjacent lessons with identical labels still chime without overlapping sounds', async () => {
  const a = app();
  a.run("timetable = [{label: '수업', start: '09:00', end: '09:40', type: 'in-class', days: [3]}, {label: '수업', start: '09:40', end: '10:20', type: 'in-class', days: [3]}]");
  await a.tick('2026-09-09T09:39:59');
  await a.tick('2026-09-09T09:40:01');
  assert.deepEqual(a.sounds, [523.25, 659.25, 783.99]);
});

test('adjacent lesson end still plays when start alerts are disabled', async () => {
  const a = app();
  a.run("settings.chimeEnabled = false; timetable = [{label: '수업', start: '09:00', end: '09:40', type: 'in-class', days: [3]}, {label: '수업', start: '09:40', end: '10:20', type: 'in-class', days: [3]}]");
  await a.tick('2026-09-09T09:39:59');
  await a.tick('2026-09-09T09:40:01');
  assert.deepEqual(a.sounds, [783.99, 659.25, 523.25]);
});

test('a delayed tick catches a recent boundary but a long sleep does not replay stale bells', async () => {
  const a = app();
  await a.tick();
  await a.tick('2026-09-09T09:00:45');
  assert.equal(a.sounds.length, 3);
  await a.tick('2026-09-09T12:00:00');
  assert.equal(a.sounds.length, 3);
});

test('opening the app mid-class or renaming a class does not ring a bell', async () => {
  const a = app();
  await a.tick('2026-09-09T09:00:20');
  a.run("timetable.find(entry => entry.label === '1교시').label = '국어'");
  await a.tick('2026-09-09T09:00:21');
  assert.equal(a.sounds.length, 0);
});

test('a clock correction does not duplicate a previously played boundary', async () => {
  const a = app();
  await a.tick();
  await a.tick('2026-09-09T09:00:01');
  await a.tick('2026-09-09T08:59:59');
  await a.tick('2026-09-09T09:00:01');
  assert.equal(a.sounds.length, 3);
});

test('muting Wednesday suppresses bells, voice and movement even for a date override', async () => {
  const a = app();
  a.run("settings.alertDays = [1,2,4,5]; settings.voiceAlertEnabled = true; viewData.academicEvents = [{date: '2026-09-09', timetableOverride: true, timetable: [{label: '과학', start: '09:00', end: '09:40', type: 'in-class', room: '과학실'}, {label: '2교시', start: '09:50', end: '10:30', type: 'in-class', room: '영어실'}]}]");
  await a.tick();
  await a.tick('2026-09-09T09:00:01');
  await a.tick('2026-09-09T09:40:01');
  a.setTime('2026-09-09T09:49:01');
  a.run('checkVoiceAlert(new Date()); checkMovementAlert(new Date())');
  await a.settle();
  assert.equal(a.sounds.length, 0);
  assert.equal(a.run('getTodayEntries(new Date()).length'), 2);
  a.setTime('2026-09-10T08:59:59');
  await a.tick();
  await a.tick('2026-09-10T09:00:01');
  assert.equal(a.sounds.length, 3);
});

test('a suspended audio context resumes before notes are scheduled', async () => {
  const a = app();
  a.run("audioCtx.state = 'suspended'");
  assert.equal(await a.run('playChimeNotes([523.25])'), true);
  assert.equal(a.resumes.length, 1);
  assert.deepEqual(a.sounds, [523.25]);
});

test('failed audio resumes do not mark a chime as played and can be retried', async () => {
  const a = app();
  await a.tick();
  a.run("audioCtx.state = 'suspended'; audioCtx.resume = async () => { throw new Error('blocked'); }");
  await a.tick('2026-09-09T09:00:01');
  assert.equal(a.sounds.length, 0);
  assert.equal(a.run('playedChimes.size'), 0);
  a.run("audioCtx.resume = async () => { audioCtx.state = 'running'; }");
  await a.tick('2026-09-09T09:00:02');
  assert.equal(a.sounds.length, 3);
  assert.equal(a.run('playedChimes.size'), 1);
});

test('an alert muted while resume is pending does not play after resume completes', async () => {
  const a = app();
  await a.tick();
  a.run("audioCtx.state = 'suspended'; audioCtx.resume = () => new Promise(resolve => { globalThis.finishResume = () => { audioCtx.state = 'running'; resolve(); }; })");
  await a.tick('2026-09-09T09:00:01');
  a.run('settings.alertDays = []; finishResume()');
  await a.settle();
  assert.equal(a.sounds.length, 0);
});

test('a chime that expires while resuming is discarded', async () => {
  const a = app();
  await a.tick();
  a.run("audioCtx.state = 'suspended'; audioCtx.resume = () => new Promise(resolve => { globalThis.finishResume = () => { audioCtx.state = 'running'; resolve(); }; })");
  await a.tick('2026-09-09T09:00:01');
  a.setTime('2026-09-09T09:02:00');
  a.run('finishResume()');
  await a.settle();
  assert.equal(a.sounds.length, 0);
});

test('a fresh gesture retries resume even during a pending automatic attempt', async () => {
  const a = app();
  a.run("audioCtx.state = 'suspended'; globalThis.resumeCalls = 0; audioCtx.resume = () => { resumeCalls++; if (resumeCalls === 1) return new Promise(resolve => { globalThis.finishResume = resolve; }); audioCtx.state = 'running'; finishResume(); return Promise.resolve(); }; ensureAudioRunning()");
  await a.run('ensureAudioRunning(true)');
  assert.equal(a.run('resumeCalls'), 2);
  assert.equal(a.run('audioCtx.state'), 'running');
});

test('keyboard and later click gestures can unlock audio repeatedly', async () => {
  const a = app();
  a.run("audioCtx = null; initAudio()");
  a.listeners.keydown();
  await a.settle();
  assert.equal(a.run('audioCtx.state'), 'running');
  a.run("audioCtx.state = 'suspended'");
  a.listeners.click();
  await a.settle();
  assert.equal(a.resumes.length, 1);
});

test('late voice checks play only the current one-minute prompt once', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true');
  a.setTime('2026-09-09T09:49:15');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.deepEqual(a.sounds, ['voice']);
  assert.equal(a.run("voiceBuffers.has('break-1')"), true);
  assert.equal(a.run("voiceBuffers.has('break-3')"), false);
});

test('failed voice downloads can retry without losing the alert', async () => {
  const a = app();
  a.run("settings.voiceAlertEnabled = true; fetch = async () => ({ok: false})");
  a.setTime('2026-09-09T09:49:01');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  assert.equal(a.run('voiceBuffers.size'), 0);
  a.run('fetch = async () => ({ok: true, arrayBuffer: async () => new ArrayBuffer(8)}); checkVoiceAlert(new Date())');
  await a.settle();
  assert.deepEqual(a.sounds, ['voice']);
});

test('a blocked Worker falls back to an interval and refreshes after visibility changes', () => {
  const a = app();
  a.run('globalThis.clockTicks = 0; globalThis.timerTicks = 0; updateClock = () => clockTicks++; updateTimer = () => timerTicks++; startClockTimer()');
  assert.equal(a.intervals.length, 1);
  a.intervals[0]();
  a.listeners.visibilitychange();
  assert.equal(a.run('clockTicks'), 2);
  assert.equal(a.run('timerTicks'), 2);
});
