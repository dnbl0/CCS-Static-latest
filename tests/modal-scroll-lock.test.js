// Modal scroll lock: while any modal surface is open the page behind it must not scroll (wheel, keyboard), must not shift when the
// scrollbar goes, and must come back at exactly the same scroll position when the modal closes (Escape, Close button, backdrop).
// Real Chromium (playwright-core) with real scrollbars, a local static server; skipped when Chromium is not installed.
//   1. The header search overlay, on a page of every kind
//   2. The search results page: Filters modal, Advanced search flyout, Indigenous notification
//   3. The record page request dialog
//   4. Stacked modals keep the lock until the last one closes; a panel taller than the window scrolls inside itself
// The lock itself: html.has-open-modal (public/nav.js, derived from the DOM) + base.css (overflow hidden, scrollbar-gutter stable).
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium || !exe) { console.log('SKIP modal-scroll-lock: playwright-core or Chromium is not installed'); return finish('modal-scroll-lock'); }
  const srv = await new Promise(res => { const s = http.createServer((req, rsp) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(PUBLIC, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(s)); });
  const base = 'http://127.0.0.1:' + srv.address().port;
  // real scrollbars (Playwright hides them by default), so a layout shift when the scrollbar goes would show
  const browser = await chromium.launch({ executablePath: exe, ignoreDefaultArgs: ['--hide-scrollbars'] });
  const errors = [];

  const open = async (url, { ack = true, width = 1280, height = 700 } = {}) => {
    const ctx = await browser.newContext({ viewport: { width, height } });
    ctx.setDefaultTimeout(8000);
    await ctx.addInitScript(a => { try { if (a) localStorage.setItem('ccs-cultural-ack', '1'); else localStorage.removeItem('ccs-cultural-ack'); } catch (e) { /* none */ } }, ack);
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(url + ': ' + e.message));
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    return page;
  };
  const state = page => page.evaluate(() => ({
    locked: document.documentElement.classList.contains('has-open-modal'),
    overflow: getComputedStyle(document.documentElement).overflowY,
    gutter: getComputedStyle(document.documentElement).scrollbarGutter,
    y: Math.round(scrollY), bodyW: Math.round(document.body.getBoundingClientRect().width), tall: document.documentElement.scrollHeight - innerHeight
  }));
  const scrollTo = async (page, y) => { await page.evaluate(v => window.scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(150); return (await state(page)).y; };
  // Wheel over the page behind, and the keys that scroll a page when focus is on the body
  const pushPage = async page => {
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.mouse.move(8, 360);
    await page.mouse.wheel(0, 900); await page.waitForTimeout(200);
    await page.keyboard.press('PageDown'); await page.keyboard.press('Space'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('End');
    await page.waitForTimeout(300);
    return (await state(page)).y;
  };
  // Opens with `trigger`, proves the lock, closes with `closer`, proves the page is back exactly where it was
  const cycle = async (page, label, trigger, closer, y = 420) => {
    const startY = await scrollTo(page, y);
    const before = await state(page);
    if (startY < 100) { fail(label + ': the page behind is too short to scroll (scrollY ' + startY + ')'); return; }
    if (before.locked) fail(label + ': locked before anything is open');
    await trigger();
    await page.waitForTimeout(500);
    const during = await state(page);
    if (!during.locked || during.overflow !== 'hidden') fail(label + ': page is not locked while open (class ' + during.locked + ', overflow ' + during.overflow + ')');
    else ok(label + ': page locked while open (overflow hidden, scrollbar gutter ' + during.gutter + ')');
    eq(await pushPage(page), startY, label + ': wheel, PageDown, Space, arrows and End do not scroll the page behind');
    eq((await state(page)).bodyW, before.bodyW, label + ': the page does not shift when the scrollbar goes');
    await closer();
    await page.waitForTimeout(500);
    const after = await state(page);
    if (after.locked || after.overflow === 'hidden') fail(label + ': still locked after closing (class ' + after.locked + ', overflow ' + after.overflow + ')');
    eq(after.y, startY, label + ': scroll position is restored exactly after closing');
  };
  const clickSel = (page, sel) => () => page.evaluate(s => document.querySelector(s).click(), sel);
  const esc = page => () => page.keyboard.press('Escape');

  try {
    /* ---- 1. search overlay on every kind of page ------------------------------------------------- */
    const OVERLAY = '[popovertarget="uom-search-popover"]';
    for (const url of ['/index.html', '/collections/index.html', '/help/index.html','/about.html','/search/advanced-search.html', '/collections/record.html?id=10116']) {
      const page = await open(url);
      const visible = await page.evaluate(sel => [...document.querySelectorAll(sel)].some(e => e.getBoundingClientRect().width > 0), OVERLAY);
      if (!visible) { fail(url + ': no visible search button in the header'); await page.context().close(); continue; }
      await cycle(page, url + ' search overlay (Escape)', () => page.evaluate(sel => [...document.querySelectorAll(sel)].find(e => e.getBoundingClientRect().width > 0).click(), OVERLAY), esc(page), 300);
      await cycle(page, url + ' search overlay (Close button)', () => page.evaluate(sel => [...document.querySelectorAll(sel)].find(e => e.getBoundingClientRect().width > 0).click(), OVERLAY), clickSel(page, '#uom-search-popover-close'), 300);
      await page.context().close();
    }

    /* ---- 2. results page ------------------------------------------------------------------------- */
    let page = await open('/search/search-results.html?q=kangaroo');
    await cycle(page, 'results Filters modal (Escape)', clickSel(page, '.search-results-search-tools__button-filter-btn'), esc(page));
    await cycle(page, 'results Filters modal (Close button)', clickSel(page, '.search-results-search-tools__button-filter-btn'), clickSel(page, '.search-results-filters-title__button-close-modal'));
    await cycle(page, 'results Filters modal (backdrop)', clickSel(page, '.search-results-search-tools__button-filter-btn'), () => page.mouse.click(4, 4));
    await cycle(page, 'results Advanced search flyout (Escape)', clickSel(page, '.search-results-search-tools__link-advanced-search'), esc(page));
    await cycle(page, 'results Advanced search flyout (Close button)', clickSel(page, '.search-results-search-tools__link-advanced-search'), clickSel(page, '.search-results-flyout .search-results-filters-title__button-close-modal'));
    await cycle(page, 'results Advanced search flyout (backdrop)', clickSel(page, '.search-results-search-tools__link-advanced-search'), () => page.mouse.click(40, 360));

    // stacked: the Filters modal opens while the Advanced search flyout is open; the lock holds until the last one closes
    await scrollTo(page, 400);
    await page.evaluate(() => document.querySelector('.search-results-search-tools__link-advanced-search').click());
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('.search-results-search-tools__button-filter-btn').click());
    await page.waitForTimeout(300);
    eq((await state(page)).locked, true, 'stacked modals: locked with two open');
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    const one = await page.evaluate(() => ({ dialogs: document.querySelectorAll('[role="dialog"][aria-modal="true"]:not(.uom-search-popover)').length, locked: document.documentElement.classList.contains('has-open-modal') }));
    eq(one, { dialogs: 1, locked: true }, 'stacked modals: still locked with one left');
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    const none = await state(page);
    eq([none.locked, none.y], [false, 400], 'stacked modals: unlocked, same scroll position, after the last closes');
    await page.context().close();

    // the Indigenous notification opens by itself on the first visit
    page = await open('/search/search-results.html?q=kangaroo', { ack: false });
    const ackState = await state(page);
    if (!ackState.locked || ackState.overflow !== 'hidden') fail('Indigenous notification: page is not locked while it is open');
    else ok('Indigenous notification: page locked while it is open');
    eq(await pushPage(page), 0, 'Indigenous notification: the page behind does not scroll');
    await page.evaluate(() => document.querySelector('.search-results-ack-title__button-close-ack').click());
    await page.waitForTimeout(400);
    eq((await state(page)).locked, false, 'Indigenous notification: unlocked after Close');
    await page.context().close();

    // a panel taller than the window scrolls inside itself, not the page behind, and its Close button stays reachable
    page = await open('/search/search-results.html?q=kangaroo', { ack: false, width: 390, height: 360 });
    const inner = await page.evaluate(async () => {
      const panel = document.querySelector('.search-results-ack-title');
      const r = { tall: panel.scrollHeight > panel.clientHeight, overscroll: getComputedStyle(panel).overscrollBehaviorY, overflow: getComputedStyle(panel).overflowY };
      const b = panel.querySelector('.search-results-ack-title__button-close-ack').getBoundingClientRect();
      r.closeVisible = b.top >= 0 && b.bottom <= innerHeight;
      return r;
    });
    eq(inner, { tall: true, overscroll: 'contain', overflow: 'auto', closeVisible: true }, 'a tall panel on a short phone window scrolls inside itself and keeps Close reachable');
    await page.mouse.move(195, 200); await page.mouse.wheel(0, 300); await page.waitForTimeout(300);
    const scrolled = await page.evaluate(() => ({ panel: document.querySelector('.search-results-ack-title').scrollTop > 0, page: Math.round(scrollY) }));
    eq(scrolled, { panel: true, page: 0 }, 'wheel over a tall panel scrolls the panel and not the page');
    await page.context().close();

    /* ---- 3. record page request dialog ----------------------------------------------------------- */
    let found = false;
    for (const id of ['10116', '23', '10004', '10001', '10002']) {
      page = await open('/collections/record.html?id=' + id);
      const sel = await page.evaluate(() => ['.im-gate__button', '.im-access__link'].find(s => document.querySelector(s)));
      if (sel) {
        found = true;
        await cycle(page, 'record ' + id + ' request dialog (Escape)', clickSel(page, sel), esc(page), 200);
        await cycle(page, 'record ' + id + ' request dialog (Close button)', clickSel(page, sel), clickSel(page, '.record-req-title__button-close-req--v2'), 200);
        await cycle(page, 'record ' + id + ' request dialog (backdrop)', clickSel(page, sel), () => page.mouse.click(4, 4), 200);
        await page.context().close();
        break;
      }
      await page.context().close();
    }
    if (!found) fail('no record page with a request button was found to test');
  } finally { await browser.close(); srv.close(); }
  errors.forEach(e => fail('page error ' + e));
  finish('modal-scroll-lock');
})().catch(e => { console.error(e); process.exit(1); });
