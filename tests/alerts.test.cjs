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
    children: [], handlers: {}, attributes: {}, classList: { remove() {}, add() {}, toggle() {} },
    focus() {},
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); },
    addEventListener(type, handler) { this.handlers[type] = handler; },
    setAttribute(key, value) { this.attributes[key] = value; },
    removeAttribute(key) { delete this.attributes[key]; },
  };
}

function app(saved = {}) {
  let time = new Date('2026-09-09T08:59:59').getTime(); // Wednesday, local time
  const sounds = [], spoken = [], resumes = [], intervals = [], listeners = {}, nodes = {};
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
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    window: {
      AudioContext, addEventListener(type, handler) { listeners[type] = handler; },
      speechSynthesis: {
        getVoices: () => [{ lang: 'ko-KR' }], cancel() {},
        speak(utterance) { spoken.push(utterance.text); sounds.push('speech'); utterance.onstart(); },
      },
    },
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
    run, nodes, sounds, spoken, resumes, intervals, listeners, storage, context, settle,
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

function voiceControls(a) {
  for (const prefix of ['voiceBreak3', 'voiceBreak1', 'voicePlayFirst', 'voicePlayLast', 'voiceLunch5', 'voiceLunch1']) {
    for (const suffix of ['Toggle', 'Minutes', 'MinutesPreview']) a.nodes[prefix + suffix] = element();
  }
  a.nodes.voiceAlertOptions = element();
  a.run("globalThis.toasts = []; showToast = message => toasts.push(message); renderVoiceAlertOptions(); updateVoiceAlertOptionsState()");
}

test('legacy voice preferences keep all four default times and disabled alerts', () => {
  const a = app({ classroomSettings: JSON.stringify({ voiceAlertEnabled: true, voiceAlertBreak3: false, voiceAlertLunch1: false }) });
  voiceControls(a);
  assert.equal(a.nodes.voiceBreak3Toggle.checked, false);
  assert.equal(a.nodes.voiceLunch1Toggle.checked, false);
  assert.equal(a.nodes.voiceBreak3Minutes.disabled, true);
  assert.equal(a.nodes.voiceBreak1Minutes.disabled, false);
  assert.deepEqual(['voiceBreak3', 'voiceBreak1', 'voiceLunch5', 'voiceLunch1'].map(id => a.nodes[id + 'Minutes'].value), ['3', '1', '5', '1']);
});

test('custom times, toggles and preview labels survive saving and a fresh app load', () => {
  const a = app();
  voiceControls(a);
  a.nodes.voiceBreak3Minutes.value = '2';
  a.nodes.voiceLunch5Minutes.value = '10';
  a.nodes.voiceLunch1Toggle.checked = false;
  assert.equal(a.run('saveVoiceAlertOptions()'), true);
  const b = app(Object.fromEntries(a.storage));
  voiceControls(b);
  assert.equal(b.nodes.voiceBreak3Minutes.value, '2');
  assert.equal(b.nodes.voiceLunch5Minutes.value, '10');
  assert.equal(b.nodes.voiceLunch1Toggle.checked, false);
  assert.match(b.nodes.voiceLunch5MinutesPreview.textContent, /10분 전/);
});

test('invalid user input is rejected without overwriting saved settings', () => {
  const a = app();
  voiceControls(a);
  a.run('saveVoiceAlertOptions()');
  const saved = a.storage.get('classroomSettings');
  for (const [prefix, max, fallback] of [['voiceBreak3', 10, '3'], ['voiceBreak1', 10, '1'], ['voicePlayFirst', 20, '5'], ['voicePlayLast', 20, '1'], ['voiceLunch5', 50, '5'], ['voiceLunch1', 50, '1']]) {
    for (const value of ['', '0', '-1', String(max + 1), '60', '1.5', 'abc', 'Infinity']) {
      a.nodes[prefix + 'Minutes'].value = value;
      assert.equal(a.run('saveVoiceAlertOptions()'), false, prefix + ': ' + value);
      assert.equal(a.nodes[prefix + 'Minutes'].value, fallback);
      assert.equal(a.storage.get('classroomSettings'), saved);
      assert.ok(a.run('toasts.at(-1)').includes('1~' + max));
    }
  }
});

test('break 1–10 and lunch 1–50 endpoints can be saved and restored for all prompts', () => {
  const a = app();
  voiceControls(a);
  for (const [breakMinutes, lunchMinutes] of [['1', '1'], ['10', '50']]) {
    a.nodes.voiceBreak3Minutes.value = a.nodes.voiceBreak1Minutes.value = breakMinutes;
    a.nodes.voiceLunch5Minutes.value = a.nodes.voiceLunch1Minutes.value = lunchMinutes;
    assert.equal(a.run('saveVoiceAlertOptions()'), true);
    const b = app(Object.fromEntries(a.storage));
    voiceControls(b);
    assert.deepEqual(['voiceBreak3', 'voiceBreak1', 'voiceLunch5', 'voiceLunch1'].map(id => b.nodes[id + 'Minutes'].value), [breakMinutes, breakMinutes, lunchMinutes, lunchMinutes]);
  }
});

test('previously saved times above each new limit restore the corresponding defaults', () => {
  const a = app({ classroomSettings: JSON.stringify({
    voiceAlertBreakFirstMinutes: 11, voiceAlertBreakLastMinutes: 60,
    voiceAlertLunchFirstMinutes: 51, voiceAlertLunchLastMinutes: 60,
  }) });
  voiceControls(a);
  assert.deepEqual(['voiceBreak3', 'voiceBreak1', 'voiceLunch5', 'voiceLunch1'].map(id => a.nodes[id + 'Minutes'].value), ['3', '1', '5', '1']);
});

test('invalid imported times fall back to defaults while numeric strings are accepted', () => {
  const a = app({ classroomSettings: JSON.stringify({
    voiceAlertBreakFirstMinutes: -2, voiceAlertBreakLastMinutes: true,
    voiceAlertLunchFirstMinutes: '10', voiceAlertLunchLastMinutes: 1.5,
  }) });
  assert.equal(a.run('settings.voiceAlertBreakFirstMinutes'), 3);
  assert.equal(a.run('settings.voiceAlertBreakLastMinutes'), 1);
  assert.equal(a.run('settings.voiceAlertLunchFirstMinutes'), 10);
  assert.equal(a.run('settings.voiceAlertLunchLastMinutes'), 1);
});

test('custom break and lunch prompts read the configured times exactly once', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; settings.voiceAlertLunchFirstMinutes = 10');
  for (const time of ['09:47:00', '09:48:00', '09:48:01', '12:49:59', '12:50:00', '12:50:10']) {
    a.setTime('2026-09-09T' + time);
    a.run('checkVoiceAlert(new Date())');
    await a.settle();
  }
  assert.deepEqual(a.sounds, ['speech', 'speech']);
  assert.match(a.spoken[0], /쉬는시간이 2분 남았습니다/);
  assert.match(a.spoken[1], /점심시간이 10분 남았습니다/);
});

test('matching custom times choose the final prompt once; a disabled final prompt allows the first', async () => {
  for (const finalEnabled of [true, false]) {
    const a = app();
    a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; settings.voiceAlertBreakLastMinutes = 2; settings.voiceAlertBreak1 = ' + finalEnabled);
    a.setTime('2026-09-09T09:48:00');
    a.run('checkVoiceAlert(new Date())');
    await a.settle();
    a.run('checkVoiceAlert(new Date())');
    await a.settle();
    assert.equal(a.spoken.length, 1);
    assert.match(a.spoken[0], finalEnabled ? /자리로 돌아와/ : /하던 일을 정리/);
  }
});

test('times outside the break and elapsed custom prompts are not replayed', async () => {
  const a = app();
  a.run("settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 10; settings.voiceAlertBreakLastMinutes = 2; timetable.find(entry => entry.label === '1교시').end = '09:45'");
  for (const time of ['09:35:00', '09:40:00', '09:45:00', '09:49:00', '09:50:00']) {
    a.setTime('2026-09-09T' + time);
    a.run('checkVoiceAlert(new Date())');
    await a.settle();
  }
  assert.deepEqual(a.sounds, []);
});

test('maximum break and lunch times announce once when each period starts', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 10; settings.voiceAlertLunchFirstMinutes = 50');
  for (const time of ['09:39:59', '09:40:00', '09:40:01', '12:09:59', '12:10:00', '12:10:01']) {
    a.setTime('2026-09-09T' + time);
    a.run('checkVoiceAlert(new Date())');
    await a.settle();
  }
  assert.deepEqual(a.sounds, ['speech', 'speech']);
  assert.match(a.spoken[0], /쉬는시간이 10분 남았습니다/);
  assert.match(a.spoken[1], /점심시간이 50분 남았습니다/);
});

test('custom prompts respect muted weekdays', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; settings.alertDays = [1,2,4,5]');
  a.setTime('2026-09-09T09:48:00');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.deepEqual(a.sounds, []);
});

test('changing an alert time while its recording downloads cancels the stale prompt', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; fetch = () => new Promise(resolve => { globalThis.finishFetch = () => resolve({ok: true, arrayBuffer: async () => new ArrayBuffer(8)}); })');
  a.setTime('2026-09-09T09:47:00');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  a.run('settings.voiceAlertBreakFirstMinutes = 2; finishFetch()');
  await a.settle();
  assert.deepEqual(a.sounds, []);
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
});

test('speech is marked played only when it starts and failures can retry', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; globalThis.starts = 0; window.speechSynthesis.speak = utterance => { starts++; if (starts === 1) utterance.onerror(); else utterance.onstart(); }');
  a.setTime('2026-09-09T09:48:00');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.equal(a.run('playedVoiceAlerts.size'), 1);
  assert.equal(a.run('starts'), 2);
});

test('a queued speech prompt is cancelled if it starts after the valid minute', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; globalThis.cancels = 0; window.speechSynthesis.cancel = () => cancels++; window.speechSynthesis.speak = utterance => { globalThis.queuedSpeech = utterance; }');
  a.setTime('2026-09-09T09:48:00');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  a.setTime('2026-09-09T09:49:01');
  a.run('queuedSpeech.onstart()');
  await a.settle();
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  assert.equal(a.run('voiceAlertPending'), false);
  assert.equal(a.run('voiceSpeech'), null);
  assert.equal(a.run('cancels'), 2);
});

test('turning voice alerts off cancels pending speech and disables keyboard editing', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = true; settings.voiceAlertBreakFirstMinutes = 2; window.speechSynthesis.speak = () => {}');
  voiceControls(a);
  a.nodes.voiceAlertToggle = { checked: false };
  a.setTime('2026-09-09T09:48:00');
  a.run('checkVoiceAlert(new Date())');
  await a.settle();
  a.run('toggleVoiceAlert()');
  await a.settle();
  assert.equal(a.run('voiceAlertPending'), false);
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  assert.equal(a.nodes.voiceBreak3Minutes.disabled, true);
  assert.equal(a.nodes.voiceBreak3Toggle.disabled, true);
});

test('preview uses the selected minutes while automatic voice alerts are off', async () => {
  const a = app();
  a.run('settings.voiceAlertEnabled = false; settings.voiceAlertLunchFirstMinutes = 10');
  await a.run("previewVoiceAlert('lunch-5')");
  assert.match(a.spoken[0], /10분 남았습니다/);
  assert.equal(a.run('playedVoiceAlerts.size'), 0);
  await a.run("previewVoiceAlert('break-3')");
  assert.equal(a.run("voiceBuffers.has('break-3')"), true);
});

function playtime(a) {
  a.run(`
    settings.voiceAlertEnabled = true;
    timetable.find(entry => entry.label === '2교시').start = '09:40';
    timetable.find(entry => entry.label === '2교시').end = '10:20';
    timetable.push({label: '중간놀이', start: '10:20', end: '10:40', type: 'play-time', days: [1,2,3,4,5], subjects: {}});
    saveTimetable();
  `);
}

test('playtime settings are independent, keep old settings and survive storage', () => {
  const a = app({ classroomSettings: JSON.stringify({ voiceAlertEnabled: true, voiceAlertBreak3: false, voiceAlertBreakFirstMinutes: 2 }) });
  voiceControls(a);
  assert.equal(a.nodes.voicePlayFirstMinutes.value, '5');
  assert.equal(a.nodes.voicePlayLastMinutes.value, '1');
  assert.equal(a.nodes.voicePlayFirstToggle.checked, true);
  for (const minutes of ['1', '20']) {
    a.nodes.voicePlayFirstMinutes.value = minutes;
    a.nodes.voicePlayLastToggle.checked = false;
    a.run('saveVoiceAlertOptions()');
    const b = app(Object.fromEntries(a.storage)); voiceControls(b);
    assert.equal(b.nodes.voicePlayFirstMinutes.value, minutes);
    assert.equal(b.nodes.voicePlayLastToggle.checked, false);
    assert.equal(b.nodes.voicePlayLastMinutes.disabled, true);
    assert.equal(b.nodes.voiceBreak3Minutes.value, '2');
    assert.equal(b.nodes.voiceBreak3Toggle.checked, false);
    assert.equal(b.nodes.voiceLunch5Minutes.value, '5');
  }
});

test('playtime is explicit, keeps weekday selections and round-trips through timetable storage', () => {
  const a = app(); playtime(a);
  a.run("timetable.find(entry => entry.type === 'play-time').days = [3]; saveTimetable(); timetable = []; loadTimetable()");
  a.setTime('2026-09-09T10:25:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).type'), 'play-time');
  assert.equal(a.run('getCurrentPeriod(new Date()).endMins'), 640);
  a.setTime('2026-09-10T10:25:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).type'), 'break-time', 'long gaps are not automatically playtime');
  a.setTime('2026-09-09T10:40:00');
  assert.equal(a.run('getCurrentPeriod(new Date()).type'), 'in-class');
});

test('playtime cleanup and return prompts use speech, never ordinary break audio', async () => {
  const a = app(); playtime(a);
  a.run('settings.voiceAlertPlayFirstMinutes = 7');
  for (const time of ['10:19:00', '10:33:00', '10:33:20', '10:35:00', '10:37:00', '10:39:00', '10:39:30', '10:40:00']) {
    a.setTime('2026-09-09T' + time); a.run('checkVoiceAlert(new Date())'); await a.settle();
  }
  assert.equal(a.spoken.length, 2);
  assert.match(a.spoken[0], /중간놀이 시간이 7분 남았습니다.*보드게임과 놀이 도구/);
  assert.match(a.spoken[1], /중간놀이 시간이 1분 남았습니다.*자기 자리/);
  assert.equal(a.sounds.includes('voice'), false);
});

test('default playtime speech and previews work without an audio recording', async () => {
  const a = app(); playtime(a);
  a.setTime('2026-09-09T10:35:00'); a.run('checkVoiceAlert(new Date())'); await a.settle();
  assert.match(a.spoken[0], /중간놀이 시간이 5분 남았습니다/);
  a.run('settings.voiceAlertEnabled = false');
  await a.run("previewVoiceAlert('play-1')");
  assert.match(a.spoken[1], /중간놀이 시간이 1분 남았습니다/);
  assert.equal(a.run('playedVoiceAlerts.size'), 1);
});

test('playtime honors equal times, individual toggles and muted weekdays', async () => {
  for (const finalEnabled of [true, false]) {
    const a = app(); playtime(a);
    a.run('settings.voiceAlertPlayFirstMinutes = settings.voiceAlertPlayLastMinutes = 5; settings.voiceAlertPlayLast = ' + finalEnabled);
    a.setTime('2026-09-09T10:35:00');
    a.run('checkVoiceAlert(new Date())'); await a.settle();
    a.run('checkVoiceAlert(new Date())'); await a.settle();
    assert.equal(a.spoken.length, 1);
    assert.match(a.spoken[0], finalEnabled ? /자기 자리/ : /놀이 도구/);
  }
  const muted = app(); playtime(muted);
  muted.run('settings.alertDays = [1,2,4,5]');
  muted.setTime('2026-09-09T10:35:00'); muted.run('checkVoiceAlert(new Date())'); await muted.settle();
  assert.equal(muted.spoken.length, 0);
  muted.run('settings.alertDays = [3]; settings.voiceAlertPlayFirst = settings.voiceAlertPlayLast = false');
  for (const time of ['10:35:00', '10:37:00', '10:39:00']) {
    muted.setTime('2026-09-09T' + time); muted.run('checkVoiceAlert(new Date())'); await muted.settle();
  }
  assert.equal(muted.sounds.length, 0, 'disabling playtime does not fall back to break prompts');
});

test('playtime prompts do not fire outside the interval or catch up expired minutes', async () => {
  const a = app(); playtime(a);
  a.run('settings.voiceAlertPlayFirstMinutes = 20');
  a.setTime('2026-09-09T10:19:59'); a.run('checkVoiceAlert(new Date())'); await a.settle();
  assert.equal(a.spoken.length, 0);
  a.setTime('2026-09-09T10:20:00'); a.run('checkVoiceAlert(new Date())'); await a.settle();
  assert.match(a.spoken[0], /20분 남았습니다/);
  a.run('settings.voiceAlertPlayFirstMinutes = 5');
  a.setTime('2026-09-09T10:36:00'); a.run('checkVoiceAlert(new Date())'); await a.settle();
  assert.equal(a.spoken.length, 1);
  a.setTime('2026-09-09T10:40:00'); a.run('checkVoiceAlert(new Date())'); await a.settle();
  assert.equal(a.spoken.length, 1);
});

test('date-specific playtime takes precedence and survives view-data normalization', async () => {
  const a = app();
  a.run(`settings.voiceAlertEnabled = true;
    viewData.academicEvents = [normalizeAcademicEvent({date: '2026-09-09', title: '블록 수업', timetableOverride: true, timetable: [
      {label:'블록 수업', start:'09:00', end:'10:20', type:'in-class'},
      {label:'운동장 놀이', start:'10:20', end:'10:40', type:'play-time'},
      {label:'3교시', start:'10:40', end:'11:20', type:'in-class'}
    ]})]; saveViewData(); saveSettings();`);
  const b = app(Object.fromEntries(a.storage)); b.run('loadViewData()');
  b.setTime('2026-09-09T10:35:00');
  assert.equal(b.run('getCurrentPeriod(new Date()).type'), 'play-time');
  assert.equal(b.run('getCurrentPeriod(new Date()).label'), '운동장 놀이');
  b.run('checkVoiceAlert(new Date())'); await b.settle();
  assert.match(b.spoken[0], /중간놀이 시간이 5분/);
});

test('changing a new numbered row to playtime avoids counting it as an extra lesson', () => {
  const a = app();
  a.run("globalThis.newRow = cloneEntry({label:'9교시', start:'10:20', end:'10:40'}); setTimetableEntryType(newRow, 'play-time'); timetable.push(newRow)");
  assert.equal(a.run('newRow.label'), '중간놀이');
  assert.equal(a.run("getTodayEntries(new Date()).some(entry => entry.type === 'play-time')"), true);
  a.run("newRow.label = '운동장 놀이'; setTimetableEntryType(newRow, 'play-time')");
  assert.equal(a.run('newRow.label'), '운동장 놀이');
});

test('playtime does not add lesson chimes at its start or end', async () => {
  const a = app(); playtime(a);
  a.run('settings.voiceAlertEnabled = false');
  await a.tick('2026-09-09T10:19:59');
  await a.tick('2026-09-09T10:20:00');
  await a.tick('2026-09-09T10:39:59');
  await a.tick('2026-09-09T10:40:00');
  assert.deepEqual(a.sounds, [783.99, 659.25, 523.25, 523.25, 659.25, 783.99]);
});
