// Saved records (bookmarks) in real Chromium: the Save/Saved toggle on results cards (mosaic and list) and the record page,
// persistence across pages and tabs, the bar count, the Saved records page, removing, clearing and the empty state.
// Skipped gracefully when playwright-core or Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2' };

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium) { console.log('SKIP bookmarks browser checks: playwright-core is not installed'); return finish('bookmarks'); }
  if (!exe) { console.log('SKIP bookmarks browser checks: no Chromium found'); return finish('bookmarks'); }

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
  const headerText = page => page.$$eval('[data-bookmarks-text]', a => a.map(x => x.textContent));
  const stored = page => page.evaluate(() => JSON.parse(localStorage.getItem('ccs-bookmarks-v1') || '[]').map(x => String(x.id)));
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(e.message));

    // Empty state: header bar says 0 saved records and links to the Saved records page
    await page.goto(base + '/search/bookmarks.html');
    await page.waitForSelector('.bookmarks-body__empty:not([hidden])');
    eq(await page.$eval('h1', h => h.textContent), 'Saved records', 'the page heading is Saved records');
    eq(await headerText(page), ['0 saved records'], 'the saved records bar shows 0 saved records (one bar)');
    eq(await page.$eval('[data-bookmarks-link]', a => a.getAttribute('href')), '/search/bookmarks.html', 'the saved records bar links to the Saved records page');
    eq(await page.$eval('[data-bookmarks-link]', a => a.getAttribute('aria-current')), 'page', 'the saved records bar is marked as the current page on that page');
    eq(await page.$eval('.bookmarks-body__empty-link', a => a.getAttribute('href')), '/search/search-results.html', 'the empty state links to search');
    eq(await page.$eval('.bookmarks-body__bar', e => e.hidden), true, 'Clear saved records is hidden while the list is empty');

    // The API: add once, newest first, a saved time, remove
    await page.evaluate(() => { localStorage.clear(); window.CCSBookmarks.add(1, 'One'); window.CCSBookmarks.add(1, 'One'); window.CCSBookmarks.add(2, 'Two'); });
    eq(await stored(page), ['2', '1'], 'a record is saved once, newest first');
    eq(await page.evaluate(() => typeof JSON.parse(localStorage.getItem('ccs-bookmarks-v1'))[0].t), 'number', 'each saved record has a saved time');
    eq(await headerText(page), ['2 saved records'], 'the bar count follows the list');
    await page.evaluate(() => { window.CCSBookmarks.remove(2); window.CCSBookmarks.remove(1); });
    eq(await headerText(page), ['0 saved records'], 'the bar count returns to 0');

    // Results page, mosaic: Save toggles, with a name, a pressed state and the singular count
    await page.evaluate(() => localStorage.removeItem('ccs-bookmarks-v1'));
    await page.goto(base + '/search/search-results.html?q=microscope');
    await page.waitForSelector('.search-results-main-content__article .ccs-save');
    const first = page.locator('.search-results-main-content__article .ccs-save').first();
    const title = await first.getAttribute('data-bookmark-title');
    eq(await first.getAttribute('aria-pressed'), 'false', 'a result card starts unsaved (aria-pressed=false)');
    eq((await first.textContent()).replace(/\s+/g, ' ').trim(), 'Save record: ' + title, 'its accessible name is "Save record: <title>"');
    eq(await first.locator('.ccs-save__label').textContent(), 'Save', 'its visible label is Save');
    eq(await first.evaluate(b => b.getBoundingClientRect().height >= 44), true, 'the Save button is at least 44px tall');
    await first.click();
    eq(await first.getAttribute('aria-pressed'), 'true', 'clicking Save presses the toggle');
    eq(await first.locator('.ccs-save__label').textContent(), 'Saved', 'its visible label becomes Saved');
    eq((await first.textContent()).replace(/\s+/g, ' ').trim(), 'Saved record: ' + title, 'its accessible name starts with Saved');
    eq(await headerText(page), ['1 saved record'], 'the bar says 1 saved record');
    eq(await page.$eval('[data-bookmarks-link]', a => a.classList.contains('has-saved')), true, 'the saved records bar shows the saved (check) state');
    const id1 = (await stored(page))[0];
    eq(await page.$eval('#ccs-bookmarks-status', e => e.getAttribute('aria-live')), 'polite', 'a polite live region exists');
    await page.waitForFunction(t => document.getElementById('ccs-bookmarks-status').textContent.startsWith('Saved: ' + t), title);
    ok('the change is announced in the live region');

    // The list view has the same control, and shows the saved state straight away
    await page.goto(base + '/search/search-results.html?q=microscope&view=list');
    await page.waitForSelector('.search-results-main-content__article--v2 .ccs-save');
    eq(await page.locator('.search-results-main-content__article--v2 .ccs-save[aria-pressed="true"]').count(), 1, 'the list view shows the saved record as Saved');
    eq(await page.locator('.search-results-main-content__article--v2 .ccs-save[aria-pressed="false"]').count() > 0, true, 'and the others as Save');

    // Persistence across pages and tabs: the record page and a new tab see it
    await page.goto(base + '/collections/record.html?id=' + id1);
    await page.waitForSelector('.record-page__save');
    eq(await page.$eval('.record-page__save', b => b.getAttribute('aria-pressed')), 'true', 'the record page shows the record as saved');
    eq(await headerText(page), ['1 saved record'], 'the bar count is the same on another page');
    const tab2 = await ctx.newPage();
    tab2.on('pageerror', e => errors.push(e.message));
    await tab2.goto(base + '/collections/record.html?id=' + id1);
    await tab2.waitForSelector('.record-page__save');
    eq(await tab2.$eval('.record-page__save', b => b.getAttribute('aria-pressed')), 'true', 'a new tab sees the saved record');

    // Another record, saved from the record page in tab 2; tab 1 follows without a reload (storage event)
    const other = await tab2.evaluate(first => window.CCS.ids.find(i => String(i) !== String(first)), id1);
    await tab2.goto(base + '/collections/record.html?id=' + other);
    await tab2.waitForSelector('.record-page__save');
    await tab2.click('.record-page__save');
    eq(await tab2.$eval('.record-page__save', b => b.getAttribute('aria-pressed')), 'true', 'Save works on the record page');
    await page.waitForFunction(() => document.querySelector('[data-bookmarks-text]').textContent === '2 saved records');
    ok('another tab\'s header count updates without a reload');
    await tab2.close();

    // The Saved records page lists both, newest first, linked to the record, with a Saved toggle
    await page.goto(base + '/search/bookmarks.html');
    await page.waitForSelector('.bookmarks-list__item');
    eq(await page.$$eval('.bookmarks-list__item', a => a.map(x => x.getAttribute('data-bookmark-item'))), [String(other), String(id1)], 'the list shows both records, newest first');
    eq(await page.$eval('.bookmarks-list__link', a => a.getAttribute('href')), '/collections/record.html?id=' + other, 'a record links to its page');
    eq(await page.$eval('[data-bookmarks-summary]', e => e.textContent), '2 saved records', 'the list says how many records are saved');
    eq(await page.$$eval('.bookmarks-list__item .ccs-save', a => a.map(x => x.getAttribute('aria-pressed'))), ['true', 'true'], 'every listed record has a Saved toggle');
    eq(await page.$$eval('.bookmarks-list__image', a => a.length > 0), true, 'thumbnails are shown where a record has an image');

    // Removing one: it leaves the list and the count, and the focus moves on to the next item
    await page.locator('.bookmarks-list__item .ccs-save').first().click();
    eq(await page.$$eval('.bookmarks-list__item', a => a.map(x => x.getAttribute('data-bookmark-item'))), [String(id1)], 'removing a record takes it off the list');
    eq(await stored(page), [String(id1)], 'and out of the browser\'s store');
    eq(await headerText(page), ['1 saved record'], 'the bar count drops');
    eq(await page.evaluate(() => document.activeElement.classList.contains('ccs-save')), true, 'the focus moves to the next Save button');

    // Clear saved records asks first; dismissing keeps the list, accepting empties it and shows the empty state
    await page.evaluate(() => window.CCSBookmarks.add(99999, 'A record not in the data'));
    await page.waitForFunction(() => document.querySelectorAll('.bookmarks-list__item').length === 2);
    eq(await page.$$eval('.bookmarks-list__link', a => a[0].textContent), 'A record not in the data', 'a record missing from the data is shown by its saved title');
    page.once('dialog', d => d.dismiss());
    await page.click('.bookmarks-body__clear');
    eq((await stored(page)).length, 2, 'dismissing the confirmation keeps the records');
    page.once('dialog', d => d.accept());
    await page.click('.bookmarks-body__clear');
    eq(await stored(page), [], 'confirming Clear saved records empties the list');
    eq(await page.$eval('.bookmarks-body__empty', e => e.hidden), false, 'the empty state is shown after clearing');
    eq(await headerText(page), ['0 saved records'], 'the bar count is back to 0');

    // Bad stored data does not break the pages
    await page.evaluate(() => localStorage.setItem('ccs-bookmarks-v1', '{not json'));
    await page.goto(base + '/search/bookmarks.html');
    await page.waitForSelector('.bookmarks-body__empty:not([hidden])');
    ok('unreadable stored data is treated as an empty list');

    // The bar lives in the breadcrumb strip: same height as the strip, flush to its right edge, at every width
    const geometry = p => p.evaluate(() => {
      const s = document.querySelector('.page-breadcrumbs'), a = document.querySelector('[data-bookmarks-link]'), r = e => e.getBoundingClientRect();
      return { inStrip: a.parentElement === s, inHeader: !!document.querySelector('.ccs-nav--header [data-bookmarks-link]'), count: document.querySelectorAll('[data-bookmarks-link]').length,
        sameHeight: r(a).height === r(s).height, tall: r(a).height >= 44, top: r(a).top === r(s).top, right: r(a).right === r(s).right, flush: r(s).right === window.innerWidth };
    });
    for (const [w, h] of [[1440, 900], [1000, 800], [390, 844]]) {
      const c = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500 });
      await c.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); localStorage.setItem('ccs-bookmarks-v1', JSON.stringify([{ id: 2, t: Date.now(), title: 'x' }])); } catch (e) { /* none */ } });
      const m = await c.newPage();
      m.on('pageerror', e => errors.push(e.message));
      for (const url of ['/search/search-results.html?q=microscope', '/collections/record.html?id=2', '/search/bookmarks.html', '/help/index.html', '/contact.html']) {
        await m.goto(base + url);
        await m.waitForSelector('.page-breadcrumbs [data-bookmarks-link]');
        eq(await geometry(m), { inStrip: true, inHeader: false, count: 1, sameHeight: true, tall: true, top: true, right: true, flush: true }, w + 'px ' + url.split('?')[0] + ': the bar is the breadcrumb strip\'s height (min 44px), flush right, and not in the header');
      }
      eq(await m.$eval('[data-bookmarks-text]', a => a.textContent), '1 saved record', w + 'px: the bar shows the count');
      await c.close();
    }
    // Home has no breadcrumb: the bar stays in the header top strip (desktop), and there is none in the drawer
    {
      const h = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await h.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
      await h.goto(base + '/index.html');
      await h.waitForSelector('.ccs-nav__top [data-bookmarks-link]');
      eq(await h.$$eval('[data-bookmarks-link]', a => a.length), 1, 'home: one bar, in the header top strip');
      eq(await h.$eval('.ccs-nav__drawer-saved, .ccs-nav__primary [data-bookmarks-link]', () => 1).catch(() => 0), 0, 'home: no bar in the drawer');
      await h.close();
    }
    // Mobile: the list does not scroll sideways
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    await phone.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); localStorage.setItem('ccs-bookmarks-v1', JSON.stringify([{ id: 2, t: Date.now(), title: 'x' }])); } catch (e) { /* none */ } });
    const m = await phone.newPage();
    m.on('pageerror', e => errors.push(e.message));
    await m.goto(base + '/search/bookmarks.html');
    await m.waitForSelector('.bookmarks-list__item');
    eq(await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'the list does not scroll sideways on a phone');
  } finally { await browser.close(); srv.close(); }
  eq(errors, [], 'no page errors');
  finish('bookmarks');
})().catch(e => { console.error(e); process.exit(1); });
