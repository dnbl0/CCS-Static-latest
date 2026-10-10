// The breadcrumb's home icon is exactly 24x24px and the breadcrumb strip stays 44px high with the saved-records bar flush
// to its right edge at the same height, on every page that has the strip (desktop width; phones show the back link instead).
// Skipped gracefully when playwright-core or Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const PAGES = [
  '/about.html', '/contact.html', '/help/index.html', '/help/search-tips.html', '/help/indigenous-data.html', '/collections/index.html',
  '/collections/grainger-museum/index.html', '/search/search-results.html?q=skull', '/search/advanced-search.html', '/search/bookmarks.html',
  '/search/search-history.html', '/collections/record.html?id=10116'
];

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium) { console.log('SKIP breadcrumb home icon: playwright-core is not installed'); return finish('breadcrumb-home-icon'); }
  if (!exe) { console.log('SKIP breadcrumb home icon: no Chromium found'); return finish('breadcrumb-home-icon'); }

  const srv = await new Promise(res => { const s = http.createServer((req, rsp) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(PUBLIC, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(s)); });
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const errors = [];
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
    for (const url of PAGES) {
      const p = await ctx.newPage();
      p.on('pageerror', e => errors.push(e.message));
      await p.goto(base + url);
      await p.waitForSelector('.page-local-history__link-image');
      await p.waitForSelector('.page-breadcrumbs [data-bookmarks-link]');
      const m = await p.evaluate(() => {
        const i = document.querySelector('.page-local-history__link-image').getBoundingClientRect();
        const s = document.querySelector('.page-breadcrumbs').getBoundingClientRect();
        const b = document.querySelector('.page-breadcrumbs [data-bookmarks-link]').getBoundingClientRect();
        return { icon: [i.width, i.height], strip: s.height, bar: b.height, flushRight: Math.abs(s.right - b.right) < 0.5 };
      });
      eq(m.icon, [24, 24], url + ': the home icon is 24x24');
      eq(m.strip, 44, url + ': the breadcrumb strip is 44px high');
      eq(m.bar, 44, url + ': the saved-records bar is as tall as the strip');
      eq(m.flushRight, true, url + ': the saved-records bar is flush to the right edge');
      await p.close();
    }
  } finally { await browser.close(); srv.close(); }
  eq(errors, [], 'no page errors');
  finish('breadcrumb-home-icon');
})().catch(e => { console.error(e); process.exit(1); });
