// The catalogue (public/search/catalogue.js): local records, or the Blacklight API in live mode. Tested in node with a
// stand-in adapter, so live mode, the local fallback and late replies are checked without a server or a browser.
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const vm = require('vm');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(PUBLIC, 'collection-data.js'), 'utf8'), sandbox, { filename: 'collection-data.js' });
const CCS = sandbox.window.CCS;
const SS = require(path.join(PUBLIC, 'search', 'smart-search.js'));
const SQ = require(path.join(PUBLIC, 'search', 'search-query.js'));
const BA = require(path.join(PUBLIC, 'blacklight-adapter.js'));
const CAT = require(path.join(PUBLIC, 'search', 'catalogue.js'));
const items = CCS.items;
const query = SQ.create({ items, smart: SS.create(items), canonType: CCS.canonType });

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const q = over => Object.assign(SQ.empty(), over);

// A stand-in for BlacklightAdapter: live or not, the real canServe rules, and replies the test releases by hand
function fakeAdapter(isLive) {
  const calls = [];
  return { calls, isLive: () => isLive, canServe: f => BA.canServe(f),
    query: (f, page, perPage) => new Promise(resolve => calls.push({ f, page, perPage, resolve })) };
}
const tick = () => new Promise(r => setImmediate(r));

(async () => {
  // no adapter, or live mode off: always the local records, and fetch changes nothing
  {
    const c = CAT.create({ items, query });
    const f = q({ q: 'microscope' });
    const r = c.results(f, null);
    eq([c.live(), r.paged, r.total, r.list.map(it => it.id)], [false, false, query.search(f).list.length, query.search(f).list.map(it => it.id)], 'without an adapter the results are the local search');
    eq(r.smart instanceof Map, true, 'local results say why each record matched');
    eq(await c.fetch(f, 1, 40), undefined, 'without an adapter fetch changes nothing');
    const off = fakeAdapter(false), c2 = CAT.create({ items, query, adapter: off });
    eq([await c2.fetch(f, 1, 40), off.calls.length], [undefined, 0], 'with live mode off the API is never asked');
    eq(c2.results(f, { items: [items[0]], total: 1 }).paged, false, 'a live result is ignored when live mode is off');
  }

  // live mode: the API page is shown, with the full local record where there is one
  {
    const a = fakeAdapter(true), c = CAT.create({ items, query, adapter: a });
    let sent = 0;
    const p = c.fetch(q({ q: 'jar' }), 2, 12, () => sent++);
    eq([sent, a.calls.length, a.calls[0].page, a.calls[0].perPage], [1, 1, 2, 12], 'a query the API can serve is sent, with its page and page size');
    const lean = { id: String(items[0].id), title: 'lean' }, unknown = { id: 'zz-1', title: 'Only on the server' };
    a.calls[0].resolve({ source: 'live', items: [lean, unknown], total: 57 });
    const res = await p;
    eq([res.sent, res.error, res.live.total, res.live.items[0] === items[0], res.live.items[1]], [true, null, 57, true, unknown], 'API documents become the full local records; unknown ones are kept as sent');
    const shown = c.results(q({ q: 'jar' }), res.live);
    eq([shown.paged, shown.total, shown.list.length, shown.smart], [true, 57, 2, null], 'results show the API page and its total');
    eq(c.results(q(), { items: [items[1], items[2]] }).total, 2, 'without a total the page length is the total');
  }

  // live mode, but a query the API cannot answer: the local records answer and nothing is sent
  {
    const a = fakeAdapter(true), c = CAT.create({ items, query, adapter: a });
    for (const f of [q({ clauses: [{ field: 'title', op: 'must', query: 'jar' }] }), q({ named: ['Roseby Collection'] }), q({ digital: true }), q({ collection: ['Medical History Museum'], fAll: { collection: true } })]) {
      let sent = 0;
      const res = await c.fetch(f, 1, 40, () => sent++);
      eq([res, sent, a.calls.length], [{ live: null, error: null, sent: false }, 0, 0], 'answered locally: ' + JSON.stringify(Object.keys(f).filter(k => JSON.stringify(f[k]) !== JSON.stringify(SQ.empty()[k]))));
    }
  }

  // a failed request falls back to the local records and says why
  {
    const a = fakeAdapter(true), c = CAT.create({ items, query, adapter: a });
    const p = c.fetch(q({ q: 'jar' }), 1, 40);
    a.calls[0].resolve({ source: 'mock_fallback', success: false, error: 'HTTP 500 from Blacklight API' });
    eq(await p, { live: null, error: 'HTTP 500 from Blacklight API', sent: true }, 'a failure gives no live result and the error');
  }

  // a reply that arrives after a newer search is dropped, whichever finishes first
  {
    const a = fakeAdapter(true), c = CAT.create({ items, query, adapter: a });
    const first = c.fetch(q({ q: 'jar' }), 1, 40), second = c.fetch(q({ q: 'vase' }), 1, 40);
    a.calls[1].resolve({ source: 'live', items: [], total: 0 });
    a.calls[0].resolve({ source: 'live', items: [{ id: '1' }], total: 1 });
    eq([await first, (await second).live.total], [undefined, 0], 'the older reply is dropped and the newer one kept');
    const third = c.fetch(q({ q: 'bottle' }), 1, 40);
    await c.fetch(q({ named: ['Roseby Collection'] }), 1, 40);   // answered locally, but still newer
    a.calls[2].resolve({ source: 'live', items: [], total: 0 });
    await tick();
    eq(await third, undefined, 'a newer search answered locally also replaces a pending reply');
  }

  finish('catalogue');
})().catch(e => { fail(e.stack || e); finish('catalogue'); });
