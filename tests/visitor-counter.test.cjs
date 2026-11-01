// node --test tests/visitor-counter.test.cjs
// Real application code, fake storage/network/clock; never contacts production.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');
const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8')
  .split('// VISITOR COUNTER (Firebase Realtime Database)')[1].split('// RANDOM PICKER')[0];
const clone = value => structuredClone(value);
function storage(values = {}, blocked = false) {
  return {
    getItem(key) { if (blocked) throw new Error('Storage blocked'); return values[key] ?? null; },
    setItem(key, value) { if (blocked) throw new Error('Storage blocked'); values[key] = String(value); },
  };
}
function app({ server = { data: {} }, session = storage(), missingSdk = false } = {}) {
  let now = '2026-11-01T12:00:00+09:00', failure = null, gate = null, calls = 0;
  const nodes = {}, intervals = [], timeouts = new Map(), events = {}, connections = [];
  const db = {
    goOnline() { connections.push('online'); },
    goOffline() { connections.push('offline'); },
    ref(key) {
      if (key !== 'counter/kst') {
        assert.ok(['counter/total', 'counter/migrationBaseline'].includes(key));
        return { once: async () => ({ val: () => (server.legacy || {})[key.split('/')[1]] ?? null }) };
      }
      return { async transaction(fn, callback, applyLocally) {
        calls++;
        assert.equal(applyLocally, false);
        fn(null); // Firebase may start with an empty local cache.
        if (gate) await gate;
        if (failure === 'before') { failure = null; throw new Error('Permission/network failure'); }
        const next = fn(clone(server.data));
        if (next === undefined) return { committed: false };
        server.data = clone(next);
        if (failure === 'after') { failure = null; throw new Error('Commit acknowledgement lost'); }
        return { committed: true, snapshot: { val: () => clone(server.data) } };
      } };
    },
  };
  const firebase = { initializeApp() {}, database: () => db };
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [now])); } }
  const listen = (key, fn) => { (events[key] ||= []).push(fn); };
  const context = vm.createContext({
    Date: Clock, Uint8Array, sessionStorage: session, firebase: missingSdk ? undefined : firebase,
    window: { crypto: webcrypto, addEventListener: listen },
    document: {
      visibilityState: 'visible', addEventListener: listen,
      getElementById: id => nodes[id] ||= { textContent: '—', title: '' },
    },
    setTimeout(fn) { const key = {}; timeouts.set(key, fn); return key; },
    clearTimeout(key) { timeouts.delete(key); },
    setInterval(fn) { intervals.push(fn); },
  });
  vm.runInContext(source, context);
  const settle = () => new Promise(setImmediate);
  return {
    context, nodes, server, session, connections, intervals, events, timeouts, settle,
    get calls() { return calls; },
    visit: () => context.refreshVisitorCounter(),
    init: () => context.initVisitorCounter(),
    setTime(value) { now = value; },
    fail(value) { failure = value; },
    pause(value) { gate = value; },
    restoreSdk() { context.firebase = firebase; },
    async fire(event) { for (const fn of events[event] || []) fn(); await settle(); },
  };
}

test('UTC+9 day boundaries are independent of browser timezone', () => {
  const a = app();
  for (const [instant, expected] of [
    ['2026-11-01T14:59:59.999Z', '2026-11-01'],
    ['2026-11-01T15:00:00.000Z', '2026-11-02'],
    ['2026-12-31T15:00:00.000Z', '2027-01-01'],
    ['2028-02-28T15:00:00.000Z', '2028-02-29'],
    ['2026-11-02T08:30:00+09:00', '2026-11-02'],
  ]) assert.equal(a.context.visitorDateKey(new Date(instant)), expected);
});

test('first visit commits both counters and confirmed receipt, preserving legacy data', async () => {
  const server = { data: {}, legacy: { total: 100, migrationBaseline: 4181, today: { '2026-11-01': 23 } } };
  const a = app({ server }); await a.visit();
  assert.equal(server.data.total, 1);
  assert.equal(server.data.todayKst['2026-11-01'], 1);
  assert.deepEqual(server.legacy.today, { '2026-11-01': 23 });
  assert.equal(server.legacy.migrationBaseline, 4181);
  assert.equal(a.nodes.totalCount.textContent, 4282);
  assert.deepEqual(a.connections, ['online', 'offline']);
});

test('same-day reload and lost acknowledgement retry count only once', async () => {
  const server = { data: {} }, session = storage();
  const first = app({ server, session }); first.fail('after'); await first.visit();
  assert.equal(first.nodes.todayCount.textContent, '—');
  assert.equal(server.data.total, 1);
  const reload = app({ server, session }); await reload.visit(); await reload.visit();
  assert.equal(server.data.total, 1);
  assert.equal(server.data.todayKst['2026-11-01'], 1);
  assert.equal(reload.nodes.totalCount.textContent, 1);
});

test('failed atomic write changes neither counter and can be retried', async () => {
  const a = app(); a.fail('before'); await a.visit();
  assert.deepEqual(a.server.data, {});
  assert.equal(a.context.visitorCounterState.lastDay, null);
  assert.equal(a.nodes.todayCount.textContent, '—');
  await a.visit();
  assert.equal(a.server.data.total, 1);
  assert.equal(a.server.data.todayKst['2026-11-01'], 1);
});

test('different tabs contribute separate atomic visits', async () => {
  const server = { data: {} };
  await Promise.all(Array.from({ length: 30 }, () => app({ server }).visit()));
  assert.equal(server.data.total, 30);
  assert.equal(server.data.todayKst['2026-11-01'], 30);
  assert.equal(Object.keys(server.data.visitReceipts['2026-11-01']).length, 30);
});

test('multiple triggers while a request is pending share one transaction', async () => {
  const a = app(); let release;
  a.pause(new Promise(resolve => { release = resolve; }));
  const first = a.visit(), second = a.visit();
  assert.equal(first, second);
  await a.settle(); assert.equal(a.calls, 1);
  for (const fn of a.timeouts.values()) fn();
  assert.equal(a.nodes.totalCount.textContent, '—');
  assert.equal(a.connections.includes('offline'), false);
  release(); await first;
  assert.equal(a.server.data.total, 1);
  assert.equal(a.nodes.totalCount.textContent, 1);
  assert.equal(a.timeouts.size, 0);
});

test('same session counts once again on the next Korean day', async () => {
  const a = app(); a.init(); await a.settle();
  a.setTime('2026-11-02T00:00:00+09:00');
  a.intervals[0](); await a.settle();
  assert.equal(a.server.data.total, 2);
  assert.equal(a.server.data.todayKst['2026-11-01'], 1);
  assert.equal(a.server.data.todayKst['2026-11-02'], 1);
});

test('resuming a suspended tab counts the new day immediately', async () => {
  const a = app(); a.init(); await a.settle();
  a.context.document.visibilityState = 'hidden';
  a.setTime('2026-11-02T08:30:00+09:00'); a.intervals[0](); await a.settle();
  assert.equal(a.server.data.total, 1);
  a.context.document.visibilityState = 'visible'; await a.fire('visibilitychange');
  await a.fire('pageshow'); await a.fire('online');
  assert.equal(a.server.data.total, 2);
  assert.equal(a.nodes.todayCount.textContent, 1);
});

test('a write queued across midnight aborts then retries the new day', async () => {
  const a = app(); let release;
  a.pause(new Promise(resolve => { release = resolve; }));
  const pending = a.visit(); await a.settle();
  a.setTime('2026-11-02T08:30:00+09:00'); release(); await pending;
  assert.deepEqual(a.server.data, {});
  await a.visit();
  assert.equal(a.server.data.total, 1);
  assert.equal(a.server.data.todayKst['2026-11-02'], 1);
});

test('receipts expire after seven days without deleting historical daily counts', async () => {
  const a = app({ server: { data: {
    total: 4, todayKst: { '2026-10-01': 4 },
    visitReceipts: { '2026-10-25': { old: true }, '2026-10-26': { kept: true } },
  } } }); await a.visit();
  assert.equal(a.server.data.visitReceipts['2026-10-25'], undefined);
  assert.deepEqual(a.server.data.visitReceipts['2026-10-26'], { kept: true });
  assert.equal(a.server.data.todayKst['2026-10-01'], 4);
});

test('blocked storage retains in-page deduplication without breaking the app', async () => {
  const a = app({ session: storage({}, true) });
  await a.visit(); await a.visit();
  assert.equal(a.server.data.total, 1);
});

test('missing Firebase does not break startup and is retried when available', async () => {
  const a = app({ missingSdk: true }); a.init(); await a.settle();
  assert.equal(a.nodes.totalCount.textContent, '—');
  a.restoreSdk(); await a.fire('online');
  assert.equal(a.server.data.total, 1);
});

test('invalid stored numbers or containers abort without corrupting existing data', async () => {
  for (const data of [
    0, false, 'bad root', [],
    { total: '12' }, { total: -2 }, { total: Number.MAX_SAFE_INTEGER },
    { todayKst: 'bad' },
    { visitReceipts: [] }, { todayKst: { '2026-11-01': '5' } },
    { visitReceipts: { '2026-11-01': 123 } },
  ]) {
    const a = app({ server: { data: clone(data) } }); await a.visit();
    assert.deepEqual(a.server.data, data);
    assert.equal(a.nodes.totalCount.textContent, '—');
  }
});

test('startup listeners are installed once and failures are retried by the timer', async () => {
  const a = app(); a.fail('before'); a.init(); a.init(); await a.settle();
  assert.equal(a.intervals.length, 1);
  assert.equal(a.events.online.length, 1);
  a.intervals[0](); await a.settle();
  assert.equal(a.server.data.total, 1);
});
