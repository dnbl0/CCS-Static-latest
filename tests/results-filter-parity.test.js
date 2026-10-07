// The left-hand filter rail and the Filters modal must offer the same filters. The modal is the source of truth: same facets,
// same order, same group headings, same option labels and counts; a rail click filters immediately and updates the chips.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

(async () => {
  let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP filter parity: playwright-core is not installed'); return finish('results-filter-parity'); }
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH]; try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
  }
  const exe = cands.filter(Boolean).find(x => fs.existsSync(x));
  if (!exe) { console.log('SKIP filter parity: no Chromium found'); return finish('results-filter-parity'); }
  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
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
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* storage blocked */ } });
    await page.goto(base + '/search/search-results.html?q=', { waitUntil: 'networkidle' });
    await page.waitForSelector('.facet-rail');
    await page.click('.facet-rail__extra');
    const titles = () => ({
      rail: page.$$eval('.facet-rail__section', els => els.map(e => e.querySelector('.facet-rail__name').childNodes[0].textContent.trim())),
      railGroups: page.$$eval('.facet-rail__section', els => els.filter(e => e.querySelector('.facet-rail__group')).map(e => e.querySelector('.facet-rail__group').textContent.trim())),
    });
    const t = await titles();
    const rail = await t.rail, railGroups = await t.railGroups;
    await page.click('.search-results-search-tools__button-filter-btn');
    await page.waitForSelector('.search-results-filters-title__section');
    const modal = await page.$$eval('.search-results-filters-title__section', els => els.map(e => e.querySelector('.search-results-section__text--v2').childNodes[0].textContent.trim()));
    if (JSON.stringify(rail) === JSON.stringify(modal)) ok(`rail lists the same ${modal.length} facets as the modal, in the same order`); else fail(`facet lists differ.\n rail:  ${rail.join(' | ')}\n modal: ${modal.join(' | ')}`);
    // option labels and counts for one list facet and the collection tree
    const optsIn = (root, title) => page.evaluate(([r, ti]) => {
      const sec = [...document.querySelectorAll(r.sec)].find(e => e.querySelector(r.name).childNodes[0].textContent.trim() === ti);
      if (!sec) return null;
      return [...sec.querySelectorAll(r.row)].map(b => b.textContent.replace(/\s+/g, ' ').replace(/\s*\(/, ' (').trim());
    }, [root, title]);
    const MODAL = { sec: '.search-results-filters-title__section', name: '.search-results-section__text--v2', row: '[role="checkbox"]' };
    const RAIL = { sec: '.facet-rail__section', name: '.facet-rail__name', row: '[role="checkbox"]' };
    await page.keyboard.press('Escape');
    for (const title of ['Collection title', 'Object type']) {
      await page.locator('.facet-rail__section').filter({ hasText: title }).first().locator('.facet-rail__toggle').click();
      const r = await optsIn(RAIL, title);
      await page.click('.search-results-search-tools__button-filter-btn');
      await page.waitForSelector('.search-results-filters-title__section');
      await page.locator('.search-results-filters-title__section').filter({ hasText: title }).first().locator('.search-results-section__button-toggle--v3').evaluate(b => { if (b.getAttribute('aria-expanded') !== 'true') b.click(); });
      await page.waitForTimeout(300);
      const m = await optsIn(MODAL, title);
      await page.keyboard.press('Escape');
      if (JSON.stringify(r) === JSON.stringify(m) && r && r.length) ok(`"${title}" shows the same options and counts in the rail and the modal`); else fail(`"${title}" options differ.\n rail:  ${JSON.stringify(r)}\n modal: ${JSON.stringify(m)}`);
    }
    // a rail click filters at once and shows up as a chip
    const heading = () => page.textContent('.search-results-summary__heading');
    const before = await heading();
    // the rail opens one filter at a time, so Collection title may have been closed by the comparisons above
    const collection = page.locator('.facet-rail__section').filter({ hasText: 'Collection title' }).first();
    if ((await collection.locator('.facet-rail__toggle').getAttribute('aria-expanded')) !== 'true') await collection.locator('.facet-rail__toggle').click();
    await collection.locator('[role="checkbox"]').first().click();
    await page.waitForFunction(b => (document.querySelector('.search-results-summary__heading') || { textContent: b }).textContent !== b, before);
    if ((await page.locator('.search-results-pill__remove').count()) === 1) ok('a rail click filters immediately and adds a filter chip'); else fail('rail click did not add a filter chip');
    if (errors.length) fail('page errors: ' + errors.join('; ')); else ok('no page errors');
  } catch (e) { fail('filter parity check crashed: ' + e.message); }
  await browser.close(); srv.close();
  finish('results-filter-parity');
})();
