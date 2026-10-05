// Advanced Filters page — browser tests (playwright-core + a Chromium build).
// Covers: responsive rendering, dropdown keyboard behaviour, multi-select, row management, reset,
// submission and date-range validation.  If no Chromium can be found the suite is skipped with a
// notice (set PLAYWRIGHT_CHROMIUM_PATH to point at one, or run `npx playwright-core install chromium`).
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

let chromium;
try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP advanced-filters: playwright-core is not installed'); process.exit(0); }

function findChromium() {
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH];
  try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) {
      for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
    }
  }
  return cands.filter(Boolean).find(p => fs.existsSync(p));
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      let f = path.join(PUBLIC, p);
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
      if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
      rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rsp);
    }).listen(0, () => res(srv));
  });
}

const URL_PATH = '/search/advanced-search.html';
const eq = (a, b, msg) => { if (a === b) ok(msg); else fail(`${msg} — expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const truthy = (v, msg) => { if (v) ok(msg); else fail(msg); };

(async () => {
  const exe = findChromium();
  if (!exe) { console.log('SKIP advanced-filters: no Chromium found (set PLAYWRIGHT_CHROMIUM_PATH)'); process.exit(0); }
  const srv = await serve(); const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const pageErrors = [];
  async function open(w, h, qs) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    page.on('pageerror', e => pageErrors.push(e.message));
    await page.goto(base + URL_PATH + (qs || ''));
    await page.waitForSelector('#adv-form[data-ready] .adv-term');
    return page;
  }
  const rows = (p, s) => p.$$eval(s, e => e.length);

  try {
    /* ---- responsive rendering ---------------------------------------------------------------- */
    let p = await open(1440, 900);
    eq(await p.$eval('h1', e => e.textContent.trim()), 'Advanced Search', 'banner owns the single h1');
    eq(await rows(p, 'h1'), 1, 'exactly one h1');
    eq(await p.$eval('.ccs-banner__desc', e => e.textContent.trim()), "Combine fields and filters to find exactly what you're looking for across every collection.", 'banner description copy');
    let b = await p.$eval('.ccs-banner', e => { const c = getComputedStyle(e); return [c.paddingTop, c.paddingLeft]; });
    eq(b.join(' '), '64px 128px', 'desktop banner padding is 64px / 128px');
    truthy(await p.$eval('.ccs-banner__desc', e => e.getBoundingClientRect().width <= 760.5), 'desktop description is constrained to 760px');
    const cols = await p.evaluate(() => { const f = document.querySelector('#adv-form').getBoundingClientRect(), a = document.querySelector('.ccs-instructions').getBoundingClientRect(); return { sideBySide: a.left > f.right - 1 && Math.abs(a.top - f.top) < 40 }; });
    truthy(cols.sideBySide, 'desktop: guidance panel sits beside the form');
    const row3 = await p.$eval('.adv-term .ccs-field-row__controls', e => getComputedStyle(e).gridTemplateColumns.split(' ').length);
    eq(row3, 3, 'desktop search row has three columns');
    await p.close();

    p = await open(390, 800);
    b = await p.$eval('.ccs-banner', e => { const c = getComputedStyle(e); return [c.paddingTop, c.paddingLeft]; });
    eq(b.join(' '), '48px 24px', 'mobile banner padding is 48px / 24px');
    eq(await p.evaluate(() => document.documentElement.scrollWidth <= 390), true, 'no horizontal overflow at 390px');
    const stack = await p.evaluate(() => { const f = document.querySelector('#adv-form').getBoundingClientRect(), a = document.querySelector('.ccs-instructions').getBoundingClientRect(); return a.top >= f.bottom - 1; });
    truthy(stack, 'mobile: guidance moves below the form');
    const widths = await p.$$eval('.adv-term:first-child .ccs-combo__field, .adv-term:first-child .ccs-input', es => es.map(e => Math.round(e.getBoundingClientRect().width)));
    truthy(widths.length === 3 && widths.every(w => w === widths[0]), 'mobile: search controls stack at full width ' + widths.join(','));
    const tt = await p.$$eval('.ccs-btn, .ccs-delete, .ccs-combo__field', es => es.filter(e => e.offsetParent).every(e => e.getBoundingClientRect().height >= 44));
    truthy(tt, 'mobile: buttons and fields meet the 44px touch target');
    await p.close();

    /* ---- dropdown keyboard behaviour (single select) ---------------------------------------- */
    p = await open(1440, 900);
    const fld = '.adv-term:first-child .ccs-combo:first-child .ccs-combo__field';
    await p.focus(fld);
    eq(await p.getAttribute(fld, 'role'), 'combobox', 'field has role=combobox');
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'closed: aria-expanded=false');
    await p.keyboard.press('ArrowDown');
    eq(await p.getAttribute(fld, 'aria-expanded'), 'true', 'ArrowDown opens the menu');
    const listId = await p.getAttribute(fld, 'aria-controls');
    eq(await p.$eval('#' + listId, e => e.getAttribute('role')), 'listbox', 'aria-controls points at a listbox');
    eq(await p.$$eval('#' + listId + ' [role=option]', e => e.length), 5, 'listbox has option elements');
    await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown');
    await p.keyboard.press('Enter');
    eq(await p.$eval(fld + ' .ccs-combo__value', e => e.textContent), 'Creator', 'Arrow keys + Enter select the option');
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'selecting closes the menu');
    eq(await p.$eval('.adv-term:first-child input[name="clause[0][field]"]', e => e.value), 'creator', 'hidden input carries the value');
    await p.keyboard.press('Space');
    eq(await p.$eval('#' + listId + ' [aria-selected=true]', e => e.textContent), 'Creator', 'selected option stays marked when reopened');
    await p.keyboard.press('End'); eq(await p.$eval('#' + listId + ' .is-active', e => e.textContent), 'Description', 'End moves to the last option');
    await p.keyboard.press('Home'); eq(await p.$eval('#' + listId + ' .is-active', e => e.textContent), 'All Fields', 'Home moves to the first option');
    await p.keyboard.press('Escape');
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'Escape closes the menu');
    eq(await p.evaluate(s => document.activeElement === document.querySelector(s), fld), true, 'Escape returns focus to the field');
    await p.click(fld); await p.click(fld);
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'clicking the open field closes it');
    await p.click(fld); await p.mouse.click(5, 450);
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'clicking outside closes the menu');
    await p.click(fld); await p.keyboard.press('Tab');
    eq(await p.getAttribute(fld, 'aria-expanded'), 'false', 'Tab closes the menu');

    const addFilterRow = async (pg, key) => { await pg.click('#adv-add-filter'); await pg.check('#adv-add-filter-menu input[value=' + key + ']'); await pg.keyboard.press('Escape'); };
    /* ---- multi-select: Add filter + filter values -------------------------------------------- */
    const add = '#adv-add-filter';
    eq(await rows(p, '.adv-term'), 1, 'one search row shown by default');
    eq(await rows(p, '.adv-filter'), 1, 'one filter row shown by default');
    truthy((await p.$$eval('.ccs-adv__desc', e => e.map(x => x.textContent.trim()))).filter(Boolean).length === 2, 'Search and Filters each have a short description');
    await p.click(add);
    eq(await p.getAttribute(add, 'aria-expanded'), 'true', 'Add filter opens');
    eq(await p.$$eval('#adv-add-filter-menu input[type=checkbox]', e => e.length), 6, 'Add filter lists six checkboxes');
    await p.check('#adv-add-filter-menu input[value=licence]');
    await p.check('#adv-add-filter-menu input[value=creator]');
    eq(await rows(p, '.adv-filter'), 3, 'ticking options adds filter rows (multi-select)');
    eq(await p.getAttribute(add, 'aria-expanded'), 'true', 'menu stays open while multi-selecting');
    await p.click('#adv-add-filter-menu .ccs-combo__option-text >> text=Access');
    eq(await p.getAttribute(add, 'aria-expanded'), 'true', 'menu stays open after clicking an option label with the mouse');
    await p.keyboard.press('Escape'); await p.click(add);
    eq(await p.isChecked('#adv-add-filter-menu input[value=licence]'), true, 'selected options remain ticked when the menu is reopened');
    await p.uncheck('#adv-add-filter-menu input[value=licence]');
    eq(await rows(p, '.adv-filter[data-key=licence]'), 0, 'unticking removes the filter row');
    await p.keyboard.press('Escape');

    await addFilterRow(p, 'type');
    const typeVals = '.adv-filter[data-key=type] .ccs-combo--values';
    await p.click(typeVals + ' .ccs-combo__field');
    await p.check(typeVals + ' .ccs-check >> nth=0'); await p.check(typeVals + ' .ccs-check >> nth=1');
    eq(await p.getAttribute(typeVals + ' .ccs-combo__field', 'aria-expanded'), 'true', 'filter values menu stays open while ticking values');
    await p.keyboard.press('Escape');
    truthy((await p.$eval(typeVals + ' .ccs-combo__value', e => e.textContent)).includes(','), 'filter value summary lists the selected values');
    await p.click(typeVals + ' .ccs-combo__field');
    eq(await p.$$eval(typeVals + ' .ccs-check:checked', e => e.length), 2, 'filter values stay selected on reopen');
    await p.keyboard.press('Escape');

    /* ---- row management ---------------------------------------------------------------------- */
    await p.fill('#' + await p.$eval('.adv-term:nth-child(1) [data-role=query]', e => e.id), 'alpha');
    await p.click('#adv-add-row'); await p.click('#adv-add-row');
    await p.fill('.adv-term:nth-child(3) [data-role=query]', 'gamma');
    await p.click('.adv-term:nth-child(2) .ccs-combo:nth-child(2) .ccs-combo__field'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter');
    eq(await p.$eval('.adv-term:nth-child(2) input[name$="[op]"]', e => e.value), 'should', 'match mode is per row');
    eq(await p.$eval('.adv-term:nth-child(1) input[name$="[op]"]', e => e.value), 'must', 'other rows keep their own match mode');
    await p.click('.adv-term:nth-child(2) .ccs-delete');
    eq(await rows(p, '.adv-term'), 2, 'delete removes a search row');
    eq(await p.$eval('.adv-term:nth-child(2) [data-role=query]', e => e.value), 'gamma', 'remaining rows keep independent values after a delete');
    eq(await p.$eval('.adv-term:nth-child(2) input[name$="[query]"]', e => e.name), 'clause[1][query]', 'row names are renumbered');
    await p.click('.adv-term:nth-child(2) .ccs-delete');
    eq(await p.$eval('.adv-term .ccs-delete', e => e.disabled), true, 'deleting is disabled when one row remains');
    for (let i = 0; i < 9; i++) { if (!(await p.$eval('#adv-add-row', e => e.disabled))) await p.click('#adv-add-row'); }
    eq(await rows(p, '.adv-term'), 8, 'search rows are capped at eight');
    eq(await p.$eval('#adv-add-row', e => e.disabled), true, 'Add row is disabled at the cap');
    await p.close();

    /* ---- submission + reset ------------------------------------------------------------------ */
    p = await open(1440, 900);
    await p.fill('.adv-term:nth-child(1) [data-role=query]', 'eucalyptus oil');
    await p.click('.adv-term:nth-child(1) .ccs-combo:nth-child(1) .ccs-combo__field'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter');
    await addFilterRow(p, 'type');
    const tv = '.adv-filter[data-key=type] .ccs-combo--values';
    await p.click(tv + ' .ccs-combo__field'); await p.fill(tv + ' .ccs-combo__search', 'photo'); await p.check(tv + ' .ccs-combo__item:not([hidden]) .ccs-check'); await p.keyboard.press('Escape');
    await p.click('.adv-filter[data-key=type] .ccs-combo:nth-child(1) .ccs-combo__field'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter');
    await Promise.all([p.waitForNavigation(), p.click('#adv-form button[type=submit]')]);
    const q = new URL(p.url()).searchParams;
    eq(q.get('clause[0][field]') + '|' + q.get('clause[0][op]') + '|' + q.get('clause[0][query]'), 'subject|must|eucalyptus oil', 'submits field, match type and terms');
    eq(q.get('f[type][]'), 'Photograph', 'submits filter values with "Includes all" as f[]');
    eq(p.url().includes('search-results.html'), true, 'submits to the results page');
    eq(q.has('sort'), false, 'default sort is not sent');
    eq([...q.keys()].some(k => /\[1\]/.test(k)), false, 'empty rows are not sent');
    // pre-fill from the URL ("edit advanced search")
    await p.goto(base + URL_PATH + p.url().slice(p.url().indexOf('?')));
    await p.waitForSelector('#adv-form[data-ready] .adv-term');
    eq(await p.$eval('.adv-term:nth-child(1) [data-role=query]', e => e.value), 'eucalyptus oil', 'form pre-fills from the URL');
    eq(await p.$eval(tv + ' .ccs-combo__value', e => e.textContent), 'Photograph', 'filter values pre-fill from the URL');
    // reset
    const href = await p.$eval('.ccs-adv__actions a', e => e.getAttribute('href'));
    eq(href, 'advanced-search.html', 'Reset links to the blank form');
    await Promise.all([p.waitForNavigation(), p.click('.ccs-adv__actions a')]);
    await p.waitForSelector('#adv-form[data-ready] .adv-term');
    eq(await p.$eval('.adv-term:nth-child(1) [data-role=query]', e => e.value), '', 'Reset clears the form');
    await p.close();

    /* ---- date range ---------------------------------------------------------------------------- */
    p = await open(1440, 900);
    await addFilterRow(p, 'year');
    const from = '.adv-filter--range .ccs-date:nth-child(1)', to = '.adv-filter--range .ccs-date:nth-child(2)';
    const fi = from + ' .ccs-date__input', ti = to + ' .ccs-date__input';
    eq(await rows(p, '.ccs-date__toggle'), 0, 'date fields have no calendar icon button');
    const bnd = await p.evaluate(() => { const v = []; CCS.items.forEach(i => [i.dateStart, i.dateEnd].forEach(x => { if (typeof x === 'number') v.push(x); })); return [Math.min(...v), Math.max(...v)]; });
    truthy(bnd[0] < 0 && bnd[1] > 2000, 'record date bounds are ' + bnd.join(' to '));
    // calendar opens from the field, keeps typing focus, and closes
    await p.click(fi);
    eq(await p.getAttribute(fi, 'aria-expanded'), 'true', 'clicking the field opens the calendar');
    truthy(await p.isVisible(from + ' .ccs-cal'), 'calendar is visible');
    eq(await p.evaluate(s => document.activeElement === document.querySelector(s), fi), true, 'focus stays in the text box so you can keep typing');
    const m1 = await p.$eval(from + ' .ccs-cal__title', e => e.textContent);
    await p.click(from + ' .ccs-cal__nav >> nth=0');
    truthy(m1 !== await p.$eval(from + ' .ccs-cal__title', e => e.textContent), 'previous month button navigates (the calendar stops at the latest record date)');
    await p.keyboard.press('Escape');
    eq(await p.getAttribute(fi, 'aria-expanded'), 'false', 'Escape closes the calendar');
    // numbers only
    await p.fill(fi, ''); await p.type(fi, 'ab1c5/0d3/1950x');
    eq(await p.inputValue(fi), '15/03/1950', 'typing letters is ignored');
    truthy(/^[0-9\/\-]*$/.test(await p.inputValue(fi)), 'the field only ever contains digits and slashes');
    // format + range validation
    await p.fill(fi, '31/02/1950'); await p.press(fi, 'Tab');
    truthy((await p.$eval(from + ' .ccs-error', e => e.textContent)).includes('format dd/mm/yyyy'), 'an impossible date is rejected');
    await p.fill(fi, '1/1/2999'); await p.press(fi, 'Tab');
    truthy((await p.$eval(from + ' .ccs-error', e => e.textContent)).includes('earliest and latest'), 'a date after the latest record date is rejected');
    await p.fill(fi, '-9000'); await p.press(fi, 'Tab');
    truthy(await p.isVisible(from + ' .ccs-error'), 'a year before the earliest record date is rejected');
    await p.fill(fi, '-400'); await p.press(fi, 'Tab');
    eq(await p.isVisible(from + ' .ccs-error'), false, 'a BCE year inside the range is accepted');
    await p.fill(fi, '15/03/1950'); await p.press(fi, 'Tab');
    eq(await p.isVisible(from + ' .ccs-error'), false, 'a valid date is accepted');
    // end before start
    await p.fill(ti, '01/01/1940'); await p.press(ti, 'Tab');
    truthy(await p.isVisible(to + ' .ccs-error'), 'an end date before the start date shows an error');
    eq(await p.getAttribute(ti, 'aria-invalid'), 'true', 'invalid field has aria-invalid');
    await p.click('#adv-form button[type=submit]');
    eq(p.url().includes('advanced-search'), true, 'invalid range blocks submission');
    truthy(await p.isVisible('#adv-errors'), 'error summary is shown');
    // calendar: days outside the allowed range are disabled; keyboard selection
    await p.fill(ti, '10/03/1950'); await p.press(ti, 'Tab');
    await p.click(ti);
    eq(await p.$eval(to + ' .ccs-cal__day[data-d="14"]', e => e.disabled), true, 'days before the start date are disabled in the "to" calendar');
    await p.keyboard.press('Escape');
    await p.fill(ti, ''); await p.click(ti); await p.keyboard.press('ArrowDown');
    await p.keyboard.press('ArrowRight'); await p.keyboard.press('Enter');
    truthy(/^\d\d\/\d\d\/\d{4}$/.test(await p.inputValue(ti)), 'arrow keys + Enter select a date');
    await p.waitForTimeout(150);
    truthy((await p.$eval(to + ' [role=status]', e => e.textContent)).includes('set to'), 'selected date is announced');
    await p.click(ti); await p.click(to + ' .ccs-cal__action >> nth=0');
    eq(await p.inputValue(ti), '', 'Clear empties the date');
    await p.fill(fi, ''); await p.press(fi, 'Tab');
    eq(await p.inputValue(fi), '', 'the start date can be cleared');
    await p.fill(fi, '1950'); await p.fill(ti, '1960'); await p.press(ti, 'Tab');
    await Promise.all([p.waitForNavigation(), p.click('#adv-form button[type=submit]')]);
    const qq = new URL(p.url()).searchParams;
    eq(qq.get('range[year][begin]') + '-' + qq.get('range[year][end]'), '1950-1960', 'valid range submits as years');
    await p.close();

    eq(pageErrors.length, 0, 'no page errors (' + pageErrors.join('; ') + ')');
  } catch (e) {
    fail('advanced-filters test crashed: ' + (e && e.stack || e));
  } finally {
    await browser.close(); srv.close();
  }
  finish('advanced-filters');
})();
