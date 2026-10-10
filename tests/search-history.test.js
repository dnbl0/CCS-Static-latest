// Search history (CCS-143, CCS-206) in real Chromium: terms are saved with their time, kept for 30 days, grouped by day
// (Today, Yesterday, "N days ago", Melbourne days) on /search/search-history.html, and shown in the header search overlay.
// Skipped gracefully when playwright-core or Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2' };

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium) { console.log('SKIP search-history browser checks: playwright-core is not installed'); return finish('search-history'); }
  if (!exe) { console.log('SKIP search-history browser checks: no Chromium found'); return finish('search-history'); }

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
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(e.message));

    // Day labels use Melbourne's calendar days
    await page.goto(base + '/search/search-history.html');
    const labels = await page.evaluate(() => {
      const now = Date.UTC(2026, 9, 8, 2, 0);   // 8 Oct 2026, 13:00 in Melbourne
      const day = n => now - n * 864e5;
      return [0, 1, 2, 4].map(n => window.CCSHistory.label(day(n), now)).concat(window.CCSHistory.label(Date.UTC(2026, 9, 7, 14, 30), now));   // 00:30 on the 8th in Melbourne
    });
    eq(labels, ['Today', 'Yesterday', '2 days ago', '4 days ago', 'Today'], 'day labels are Today, Yesterday, N days ago in Melbourne time');

    // Saving: newest first, a repeated term moves to the top without a duplicate, blanks are ignored
    await page.evaluate(() => { localStorage.clear(); ['skull', 'violin', ' ', 'Skull'].forEach(t => window.CCSHistory.save(t)); });
    eq(await page.evaluate(() => window.CCSHistory.all().map(x => x.q)), ['Skull', 'violin'], 'a search is saved with the newest first, once per term');
    eq(await page.evaluate(() => typeof window.CCSHistory.all()[0].t), 'number', 'each search is saved with its time');

    // Expiry and grouping
    await page.evaluate(() => {
      const now = Date.now(), d = n => now - n * 864e5;
      localStorage.setItem('ccs-search-history-v2', JSON.stringify([{ q: 'today one', t: now }, { q: 'last month', t: d(31) }, { q: 'today two', t: now - 1000 }]));
    });
    eq(await page.evaluate(() => window.CCSHistory.all().map(x => x.q)), ['today one', 'today two'], 'searches older than 30 days are dropped');

    // The page lists the groups and each link runs the search again
    await page.goto(base + '/search/search-history.html');
    await page.waitForSelector('.search-history-day');
    eq(await page.$$eval('.search-history-day__heading', a => a.map(x => x.textContent)), ['Today'], 'the history page shows a Today heading');
    eq(await page.$$eval('.search-history-day__link', a => a.map(x => x.textContent)), ['today one', 'today two'], 'the history page lists the searches');
    eq(await page.$eval('.search-history-day__link', a => a.getAttribute('href')), '/search/search-results.html?q=today%20one', 'a search links to the results page');
    eq(await page.$eval('h1', h => h.textContent), 'Search history', 'the page heading is Search history');
    eq(await page.$eval('.ccs-nav__item-link-contact', a => a.hasAttribute('aria-current')).catch(() => false), false, 'no header item is marked as the current page');

    // The header overlay lists the recent searches and links to the history page
    await page.click('[popovertarget="uom-search-popover"]');
    await page.waitForSelector('.uom-search-recent__link');
    eq(await page.$$eval('.uom-search-recent__link', a => a.map(x => x.textContent)), ['today one', 'today two'], 'the header search overlay lists recent searches');
    eq(await page.$eval('.uom-search-recent__all', a => a.getAttribute('href')), '/search/search-history.html', 'the overlay links to all recent searches');

    // A search on the results page is saved, and survives a new tab (the browser, not the tab, keeps it)
    await page.goto(base + '/search/search-results.html?q=zither');
    await page.waitForTimeout(1500);
    const tab2 = await ctx.newPage();
    await tab2.goto(base + '/search/search-history.html');
    await tab2.waitForSelector('.search-history-day__link');
    eq((await tab2.$$eval('.search-history-day__link', a => a.map(x => x.textContent)))[0], 'zither', 'a results-page search appears in the history, also in a new tab');

    // The earlier per-tab history is carried over once
    const ctx2 = await browser.newContext();
    await ctx2.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); if (!sessionStorage.getItem('seeded')) { sessionStorage.setItem('ccs-search-history', JSON.stringify(['old a', 'old b'])); sessionStorage.setItem('seeded', '1'); } } catch (e) { /* none */ } });
    const p3 = await ctx2.newPage();
    await p3.goto(base + '/search/search-history.html');
    await p3.waitForSelector('.search-history-day__link');
    eq(await p3.$$eval('.search-history-day__link', a => a.map(x => x.textContent)), ['old a', 'old b'], 'the earlier per-tab history is carried over');

    // Clear history empties the list and shows the empty message
    p3.on('dialog', d => d.accept());
    await p3.click('.search-history-body__clear');
    eq(await p3.$$eval('.search-history-day', a => a.length), 0, 'Clear history empties the list');
    eq(await p3.$eval('.search-history-body__empty', e => e.hidden), false, 'the empty message is shown after clearing');
  } finally { await browser.close(); srv.close(); }
  eq(errors, [], 'no page errors');
  finish('search-history');
})().catch(e => { console.error(e); process.exit(1); });
