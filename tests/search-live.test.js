// Search wired to /catalog.json (api/catalog.js) with a silent fallback to the local catalogue.
// Part 1: BlacklightAdapter unit checks (auto mode, canServe, fallback, endpoint config) in plain node.
// Part 2: browser checks (playwright-core + Chromium; skipped when unavailable): the results page asks the API, shows its
// answer, and still works when the API is missing or broken.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const api = require('../api/catalog.js');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

/* ---- part 1: adapter ------------------------------------------------------------------------------ */
const calls = [];
global.location = { search: '', href: 'http://x/search/search-results' };
global.localStorage = { getItem: () => null, setItem() {} };
global.fetch = async url => {
  calls.push(url);
  if (global.fetchFails) return { ok: false, status: 404, json: async () => ({}) };
  const q = {}; new URL(url, 'http://x').searchParams.forEach((v, k) => { q[k] = k in q ? [].concat(q[k], v) : v; });
  const out = api.handle(q); return { ok: out.status === 200, status: out.status, json: async () => out.body };
};
const ad = require('../public/blacklight-adapter.js');
const empty = () => ({ q: '', exact: false, digital: false, downloadable: false, accession: '', birthFrom: null, birthTo: null, deathFrom: null, deathTo: null, scope: 'all', clauses: [], fAll: {}, collection: [], type: [], theme: [], licence: [] });

(async () => {
  eq(ad.getMode(), 'auto', 'default mode is auto: ask the API, fall back quietly');
  eq(ad.isLive(), true, 'auto mode is live until the API fails');
  eq(ad.getEndpoint(), '/catalog.json', 'default endpoint is the same-origin /catalog.json');
  global.location.search = '?endpoint=https%3A%2F%2Fbl.example%2Fcatalog.json';
  eq(ad.getEndpoint(), 'https://bl.example/catalog.json', '?endpoint= points the site at another Blacklight server');
  global.location.search = '';
  global.CCS_CONFIG = { apiEndpoint: 'https://cfg.example/catalog.json' };
  eq(ad.getEndpoint(), 'https://cfg.example/catalog.json', 'CCS_CONFIG.apiEndpoint configures the base URL');
  delete global.CCS_CONFIG;
  global.location.search = '?api=mock'; eq(ad.isLive(), false, '?api=mock forces local data'); global.location.search = '';

  eq(ad.canServe(empty()), true, 'plain query and facets can be served by the API');
  const bad = [['clauses', f => { f.clauses = [{ field: 'title' }]; }], ['match-all', f => { f.fAll = { collection: true }; }], ['digital', f => { f.digital = true; }], ['accession', f => { f.accession = 'x'; }], ['birth years', f => { f.birthFrom = 1900; }], ['scope', f => { f.scope = 'title'; }], ['named', f => { f.named = ['a']; }]];
  bad.forEach(([n, mut]) => { const f = empty(); mut(f); eq(ad.canServe(f), false, 'advanced filter stays local: ' + n); });

  const p = ad.toBlacklightParams(Object.assign(empty(), { q: 'skul', exact: true, theme: ['Health'], licence: ['Public Domain'] }), 1, 20);
  eq([p.get('exact'), p.get('f[theme_ssim][]'), p.get('f[licence_ssim][]')], ['1', 'Health', 'Public Domain'], 'exact, theme and licence reach the API');

  let r = await ad.query(Object.assign(empty(), { q: 'skul' }), 1, 20);
  eq(r.source, 'live', 'query is answered by /catalog.json');
  eq(r.total > 0 && r.items.length > 0 && r.items.length <= 20, true, 'live result has a total and a page of items (' + r.total + ')');
  eq(calls[calls.length - 1].startsWith('/catalog.json?'), true, 'request goes to the configured endpoint');
  r = await ad.query(Object.assign(empty(), { q: 'skul', digital: true }), 1, 20);
  eq(r.source, 'mock', 'a filter the API cannot do is answered locally without a request');
  global.fetchFails = true;
  const before = calls.length;
  r = await ad.query(Object.assign(empty(), { q: 'skul' }), 1, 20);
  eq([r.source, r.success], ['mock_fallback', false], 'API failure falls back to local data');
  eq(ad.isLive(), false, 'after a failure auto mode stops asking (no repeated timeouts)');
  await ad.query(Object.assign(empty(), { q: 'skull' }), 1, 20);
  eq(calls.length, before + 1, 'no further requests once the API is known to be down');
  delete global.fetchFails; delete global.fetch; delete global.location; delete global.localStorage;

  /* ---- part 2: browser -------------------------------------------------------------------------- */
  let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP search-live browser checks: playwright-core is not installed'); return finish('search-live'); }
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH]; try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
  }
  const exe = cands.filter(Boolean).find(x => fs.existsSync(x));
  if (!exe) { console.log('SKIP search-live browser checks: no Chromium found'); return finish('search-live'); }

  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
  let mode = 'ok'; const hits = [];
  const srv = await new Promise(res => { const s = http.createServer((req, rsp) => {
    const [rawPath, qs = ''] = req.url.split('?'); const p = decodeURIComponent(rawPath);
    if (p === '/catalog.json') {
      hits.push(qs); if (mode === 'missing') { rsp.writeHead(404); return rsp.end('not found'); }
      if (mode === 'broken') { rsp.writeHead(500); return rsp.end('boom'); }
      return api({ url: '/api/catalog?' + qs }, { setHeader() {}, status(c) { rsp.statusCode = c; return this; }, json(b) { rsp.setHeader('Content-Type', 'application/json'); rsp.end(JSON.stringify(b)); } });
    }
    let f = path.join(PUBLIC, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(s)); });
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const errors = [];
  const open = async qs => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); localStorage.removeItem('ccs_api_mode'); } catch (e) { /* none */ } });
    await page.goto(base + '/search/search-results' + qs, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => /Showing \d/.test(document.body.innerText), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(500);
    return page;
  };
  const range = page => page.evaluate(() => (document.body.innerText.match(/Showing [^\n]*records/) || [''])[0]);
  try {
    mode = 'ok'; hits.length = 0;
    let page = await open('?q=skul');
    eq(hits.length > 0 && /q=skul/.test(hits[0]), true, 'results page asks /catalog.json for the query');
    const live = await range(page); eq(/Showing 1–\d+ records/.test(live), true, 'API results are shown (' + live + ')');
    eq(await page.evaluate(() => document.querySelectorAll('img').length > 3), true, 'API results keep their images (full local record shown)');
    await page.close();

    mode = 'missing'; page = await open('?q=skul');
    const fb = await range(page);
    eq(fb, live, 'with no API the local catalogue gives the same results (' + fb + ')');
    await page.close();

    mode = 'broken'; page = await open('?q=skul');
    eq(await range(page), live, 'a 500 from the API also falls back to the same results');
    await page.close();

    mode = 'ok'; hits.length = 0;
    page = await open('?q=tooth&exact=1'); eq(hits.some(h => /exact=1/.test(h)), true, 'exact search is sent to the API');
    await page.close();

    hits.length = 0; page = await open('?api=mock&q=skul');
    eq(hits.length, 0, '?api=mock never calls the API'); eq(await range(page), live, '...and still shows the same results');
    await page.close();
    eq(errors, [], 'no page errors');
  } finally { await browser.close(); srv.close(); }
  finish('search-live');
})().catch(e => { fail(e.stack || e); finish('search-live'); });
