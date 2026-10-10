// Tests for the shared search bar component (public/search-bar.js), used by the homepage hero and by the results
// page banner and sticky bars. Real Chromium (playwright-core), a local static server on a free port; skipped
// gracefully when playwright-core or Chromium is not installed.
//   1. Homepage form: collections menu is multi-select, routes to the results page with repeated collection params
//   2. Suggestions and recent searches: panel contents, keyboard navigation, remove / clear, Enter on a suggestion
//   3. Hook API used by the results page: scope get/set, onSubmit, chip/onClearChip, placeholder, filterTerm,
//      onInput, sync(), setValue(), create(host, opts) and mount() are idempotent
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };

const G = 'Grainger Museum Collection', U = 'University Art Collection', M = 'Medical History Museum';

// A bare page that loads the component the way the real pages do, with two empty hosts for create()
const HARNESS = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>search bar harness</title>
<link rel="stylesheet" href="/styles/tokens/tokens.css"><link rel="stylesheet" href="/styles/components/search-bar.css"></head><body>
<div id="host-a"></div><div id="host-b"></div>
<script src="/collection-data.js"></script><script src="/nav.js"></script><script src="/search-bar.js"></script></body></html>`;

(async () => {
  let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP search-bar browser checks: playwright-core is not installed'); return finish('search-bar'); }
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH]; try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
  }
  const exe = cands.filter(Boolean).find(x => fs.existsSync(x));
  if (!exe) { console.log('SKIP search-bar browser checks: no Chromium found'); return finish('search-bar'); }

  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
  const srv = await new Promise(res => { const s = http.createServer((req, rsp) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/__harness.html') { rsp.writeHead(200, { 'Content-Type': 'text/html' }); return rsp.end(HARNESS); }
    let f = path.join(PUBLIC, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(s)); });
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const errors = [];
  const open = async (url, seedHistory) => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(h => { try { localStorage.setItem('ccs-cultural-ack', '1'); if (h && !sessionStorage.getItem('seeded')) { localStorage.setItem('ccs-search-history-v2', JSON.stringify(h.map((q, i) => ({ q, t: Date.now() - i })))); sessionStorage.setItem('seeded', '1'); } } catch (e) { /* none */ } }, seedHistory || null);
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    return page;
  };
  const scopeLabel = (page, root) => page.evaluate(r => document.querySelector(r + ' .ccs-searchbar__scope-btn').textContent.trim(), root);
  const selected = (page, root) => page.evaluate(r => [...document.querySelectorAll(r + ' .ccs-searchbar__menu [aria-selected="true"]')].map(b => b.dataset.v), root);
  const tick = async (page, root, v) => { await page.click(root + ' .ccs-searchbar__menu [data-v="' + v + '"]'); };

  try {
    /* ---- 1. homepage form ------------------------------------------------------------------------- */
    let page = await open('/');
    const H = '.ccs-hero__form-search';
    eq(await page.evaluate(h => { const f = document.querySelector(h); return [f.classList.contains('ccs-searchbar'), f.getAttribute('action'), f.querySelector('input[name="q"]').getAttribute('role')]; }, H), [true, '/search/search-results.html', 'combobox'], 'homepage form is enhanced (class, action, combobox role)');
    eq(await scopeLabel(page, H), 'All collections', 'starts on All collections');
    eq(await selected(page, H), ['all'], 'only "All collections" is selected at first');
    await page.click(H + ' .ccs-searchbar__scope-btn');
    eq(await page.getAttribute(H + ' .ccs-searchbar__scope-btn', 'aria-expanded'), 'true', 'scope button opens the menu (aria-expanded)');
    eq(await page.evaluate(h => document.querySelectorAll(h + ' .ccs-searchbar__menu [role="option"]').length, H), 6, 'menu lists All collections plus the five collections');
    eq(await page.getAttribute(H + ' .ccs-searchbar__menu', 'aria-multiselectable'), 'true', 'menu is announced as multi-select');
    await tick(page, H, U); await tick(page, H, G);
    eq(await page.evaluate(h => document.querySelector(h + ' .ccs-searchbar__menu').hidden, H), false, 'menu stays open while ticking several collections');
    eq(await scopeLabel(page, H), '2 collections', 'label shows "2 collections" after ticking two');
    eq((await selected(page, H)).sort(), [G, U].sort(), 'both ticked collections are selected');
    await tick(page, H, U);
    eq(await scopeLabel(page, H), G, 'unticking one leaves the single collection name as the label');
    await tick(page, H, M);
    await tick(page, H, 'all');
    eq([await scopeLabel(page, H), await selected(page, H)], ['All collections', ['all']], '"All collections" clears the selection');
    await tick(page, H, U); await tick(page, H, G);
    await page.fill('#hero-search', 'dog');
    await Promise.all([page.waitForURL(/search-results/), page.keyboard.press('Enter')]);
    const u = new URL(page.url());
    eq([u.pathname, u.searchParams.get('q'), u.searchParams.getAll('collection').sort()], ['/search/search-results.html', 'dog', [G, U].sort()], 'submit routes to the results page with q and one repeated collection param per ticked collection');
    await page.close();

    page = await open('/'); await page.fill('#hero-search', 'cat'); await Promise.all([page.waitForURL(/search-results/), page.keyboard.press('Enter')]);
    eq(new URL(page.url()).searchParams.has('collection'), false, 'no collection param when All collections is chosen');
    eq(await page.evaluate(() => JSON.parse(localStorage.getItem('ccs-search-history-v2')).map(x => x.q)), ['cat'], 'a submitted term is saved to the shared history');
    await page.close();

    page = await open('/?collection=' + encodeURIComponent(G) + '&collection=Nonsense');
    eq([await scopeLabel(page, H), await selected(page, H)], [G, [G]], 'collections in the page URL pre-select the menu; unknown names are ignored');
    await page.close();

    page = await open('/'); await page.click('#hero-search'); await page.keyboard.press('Enter');
    await page.waitForTimeout(200); eq(new URL(page.url()).pathname, '/', 'an empty search does not navigate'); await page.close();

    /* ---- 2. suggestions, recent searches, keyboard ------------------------------------------------ */
    page = await open('/', ['alpha one', 'beta two', 'gamma']);
    const P = H + ' .ccs-searchbar__panel', IN = '#hero-search';
    await page.focus(IN);
    eq(await page.evaluate(p => document.querySelector(p).hidden, P), false, 'focusing the box with saved history opens the panel');
    eq(await page.evaluate(p => [...document.querySelectorAll(p + ' .ccs-searchbar__row > button[role="option"] span')].map(s => s.textContent), P), ['alpha one', 'beta two', 'gamma'], 'recent searches are listed newest first');
    eq(await page.getAttribute(IN, 'aria-expanded'), 'true', 'input reports aria-expanded=true');
    await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown');
    eq(await page.evaluate(p => [...document.querySelectorAll(p + ' [role="option"]')].findIndex(o => o.getAttribute('aria-selected') === 'true'), P), 1, 'ArrowDown moves the highlight (second option)');
    eq(await page.evaluate(i => document.querySelector(i).getAttribute('aria-activedescendant') === document.querySelectorAll('.ccs-searchbar__panel [role="option"]')[1].id, IN), true, 'aria-activedescendant follows the highlighted option');
    await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp');
    eq(await page.evaluate(p => document.querySelectorAll(p + ' [aria-selected="true"]').length, P), 0, 'ArrowUp past the first option clears the highlight');
    await page.keyboard.press('Escape');
    eq([await page.evaluate(p => document.querySelector(p).hidden, P), await page.getAttribute(IN, 'aria-expanded')], [true, 'false'], 'Escape closes the panel');
    await page.fill(IN, 'beta');
    eq(await page.evaluate(p => [...document.querySelectorAll(p + ' .ccs-searchbar__row span')].map(s => s.textContent), P), ['beta two'], 'typing filters recent searches');
    await page.fill(IN, '');
    await page.click(P + ' [data-rm="beta two"]');
    eq(await page.evaluate(() => JSON.parse(localStorage.getItem('ccs-search-history-v2')).map(x => x.q)), ['alpha one', 'gamma'], 'the x button removes one recent search');
    await page.click(P + ' [data-act="clear"]');
    eq(await page.evaluate(() => localStorage.getItem('ccs-search-history-v2')), null, '"Clear all" empties the history');
    eq(await page.evaluate(p => document.querySelector(p).hidden, P), true, 'panel closes when there is nothing to show');
    const sample = await page.evaluate(() => window.CCS.items.find(i => i.title && i.title.length > 6).title);
    const word = sample.slice(0, 4);
    await page.fill(IN, word);
    const sug = await page.evaluate(p => [...document.querySelectorAll(p + ' .ccs-searchbar__sug span')].map(s => s.textContent), P);
    eq([sug.length > 0, sug.length <= 6, sug.every(s => s.toLowerCase().includes(word.toLowerCase()))], [true, true, true], 'typing 2+ letters shows at most 6 suggested terms drawn from the records (' + sug.length + ' for "' + word + '")');
    await page.fill(IN, 'a'); eq(await page.evaluate(p => document.querySelectorAll(p + ' .ccs-searchbar__sug').length, P), 0, 'one letter gives no suggestions');
    await page.fill(IN, word); await page.keyboard.press('ArrowDown');
    await Promise.all([page.waitForURL(/search-results/), page.keyboard.press('Enter')]);
    eq(new URL(page.url()).searchParams.get('q'), sug[0], 'Enter on a highlighted suggestion searches for that suggestion');
    await page.close();

    page = await open('/', ['kept']); await page.focus(IN); await page.evaluate(() => document.querySelector('.ccs-hero__title').click());
    eq(await page.evaluate(p => document.querySelector(p).hidden, P), true, 'clicking outside the bar closes the panel'); await page.close();

    /* ---- 3. hook API (results page usage) --------------------------------------------------------- */
    page = await open('/__harness.html');
    await page.evaluate(({ G }) => {
      const L = window.log = { scopeSet: [], submits: [], inputs: [], clears: 0 };
      window.state = { scope: [], chip: 'skull', ph: 'Search for something else', allow: null };
      window.barA = CCSSearchBar.create(document.getElementById('host-a'), {
        className: 'bar-a',
        scope: { get: () => state.scope, set: a => { L.scopeSet.push(a); state.scope = a; barA.sync(); window.barB && barB.sync(); } },
        onSubmit: (q, s) => L.submits.push([q, s]),
        chip: () => state.chip, onClearChip: () => { L.clears++; state.chip = ''; barA.sync(); },
        placeholder: () => state.ph,
        filterTerm: t => !state.allow || state.allow(t),
        onInput: v => L.inputs.push(v)
      });
      window.barB = CCSSearchBar.create(document.getElementById('host-b'), { className: 'bar-b', scope: { get: () => state.scope, set: a => { state.scope = a; barA.sync(); barB.sync(); } } });
    }, { G });
    const A = '.bar-a', IA = '.bar-a input[name="q"]', B = '.bar-b';
    eq(await page.evaluate(() => [document.querySelectorAll('#host-a form').length, document.querySelector('#host-a form').getAttribute('role'), document.querySelector('.bar-a').classList.contains('ccs-searchbar'), !!document.querySelector('.bar-a button[type="submit"] img')]), [1, 'search', true, true], 'create() builds one search form inside the host (role, class, submit button)');
    eq(await page.evaluate(() => [CCSSearchBar.create(document.getElementById('host-a'), {}) === barA, document.querySelectorAll('#host-a form').length]), [true, 1], 'create() on the same host again returns the same bar and adds no second form');
    eq(await page.evaluate(() => CCSSearchBar.mount(document.querySelector('.bar-a'), {}) === barA), true, 'mount() on an already-mounted form returns the same bar');
    eq(await page.evaluate(() => Object.keys(barA).sort()), ['setValue', 'sync'], 'a bar exposes sync() and setValue()');
    eq(await page.getAttribute(IA, 'placeholder'), 'Search for something else', 'placeholder() text is applied');
    eq(await page.getAttribute(B + ' input[name="q"]', 'placeholder'), 'Search, or use "quotes" for an exact phrase', 'default placeholder is used when no placeholder hook is given');
    await page.evaluate(() => { state.ph = 'Search within these results'; barA.sync(); });
    eq(await page.getAttribute(IA, 'placeholder'), 'Search within these results', 'sync() refreshes the placeholder');

    // chip
    eq(await page.evaluate(() => { const c = document.querySelector('.bar-a .ccs-searchbar__chip'); return [c.hidden, c.textContent.trim(), c.getAttribute('aria-label')]; }), [false, 'skull', 'Remove search term skull'], 'chip shows the active term');
    eq(await page.evaluate(() => !document.querySelector('.bar-b .ccs-searchbar__chip')), true, 'a bar with no chip hook has no chip');
    await page.click(A + ' .ccs-searchbar__chip');
    eq(await page.evaluate(() => [log.clears, document.querySelector('.bar-a .ccs-searchbar__chip').hidden]), [1, true], 'clicking the chip calls onClearChip and sync() hides it');
    await page.evaluate(() => { state.chip = 'wing'; barA.sync(); });
    eq(await page.evaluate(() => document.querySelector('.bar-a .ccs-searchbar__chip-text').textContent), 'wing', 'sync() updates the chip text');
    await page.fill(IA, 'x'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace');
    eq(await page.evaluate(() => [log.clears, state.chip]), [2, ''], 'Backspace in an empty box removes the chip; Backspace in a non-empty box does not');
    await page.keyboard.press('Backspace');
    eq(await page.evaluate(() => log.clears), 2, 'Backspace with no chip showing does nothing');
    await page.fill(IA, ''); await page.evaluate(() => { log.inputs.length = 0; });

    // scope get/set, shared state and sync()
    eq(await scopeLabel(page, A), 'All collections', 'scope.get() drives the label');
    await page.click(A + ' .ccs-searchbar__scope-btn'); await tick(page, A, G); await tick(page, A, M);
    eq(await page.evaluate(() => log.scopeSet), [[G], [G, M]], 'ticking collections calls scope.set() with the new array each time');
    eq([await scopeLabel(page, A), await scopeLabel(page, B)], ['2 collections', '2 collections'], 'both bars follow the shared state after sync()');
    await tick(page, A, G);
    eq(await page.evaluate(() => state.scope), [M], 'unticking calls scope.set() without that collection');
    await tick(page, A, 'all');
    eq(await page.evaluate(() => state.scope), [], '"All collections" calls scope.set([])');
    await page.evaluate(() => { state.scope = ['University Art Collection']; barA.sync(); });
    eq([await scopeLabel(page, A), await selected(page, A)], [U, [U]], 'sync() repaints the menu after an outside state change');
    await page.evaluate(() => { state.scope = []; barA.sync(); });
    await page.keyboard.press('Escape'); await page.click(IA); await page.keyboard.press('Escape');

    // onInput, setValue
    await page.type(IA, 'ab');
    eq(await page.evaluate(() => log.inputs), ['a', 'ab'], 'onInput fires for each typed change');
    await page.evaluate(() => { log.inputs.length = 0; barA.setValue('typed elsewhere'); });
    eq(await page.inputValue(IA), 'typed elsewhere', 'setValue() sets the box text');
    eq(await page.evaluate(() => log.inputs), [], 'setValue() does not fire onInput (no feedback loop between the two bars)');
    await page.evaluate(() => { barA.setValue('typed elsewhere'); });
    eq(await page.inputValue(IA), 'typed elsewhere', 'setValue() with the same text leaves it alone');

    // onSubmit
    await page.evaluate(() => { state.scope = ['Grainger Museum Collection']; log.inputs.length = 0; });
    const url0 = page.url();
    await page.fill(IA, 'sheet music'); await page.evaluate(() => { log.inputs.length = 0; });
    await page.keyboard.press('Enter');
    eq(await page.evaluate(() => log.submits), [['sheet music', ['Grainger Museum Collection']]], 'onSubmit receives the term and the current scope');
    eq([page.url(), await page.inputValue(IA)], [url0, ''], 'with onSubmit the page does not navigate and the box is cleared');
    eq(await page.evaluate(() => log.inputs), [''], 'onInput(\'\') tells the page the box was cleared');
    eq(await page.evaluate(() => JSON.parse(localStorage.getItem('ccs-search-history-v2')).map(x => x.q)), ['sheet music'], 'an in-place search is still saved to history');
    await page.fill(IA, '   '); await page.keyboard.press('Enter');
    eq(await page.evaluate(() => log.submits.length), 1, 'blank submit does not call onSubmit');
    await page.evaluate(() => { log.submits.length = 0; });
    await page.click(A + ' button[type="submit"]');
    eq(await page.evaluate(() => log.submits.length), 0, 'the submit button with an empty box does not call onSubmit');
    await page.fill(IA, 'x'); await page.click(A + ' button[type="submit"]');
    eq(await page.evaluate(() => log.submits.map(s => s[0])), ['x'], 'the submit button calls onSubmit');

    // history row picked in place goes through onSubmit as well
    await page.evaluate(() => { log.submits.length = 0; localStorage.setItem('ccs-search-history-v2', JSON.stringify([{ q: 'old term', t: Date.now() }])); });
    await page.focus(IA); await page.click(A + ' .ccs-searchbar__row > button[role="option"]');
    eq(await page.evaluate(() => log.submits.map(s => s[0])), ['old term'], 'picking a recent search runs it through onSubmit');

    // filterTerm
    await page.evaluate(() => { localStorage.removeItem('ccs-search-history-v2'); });
    await page.fill(IA, 'th');
    const all = await page.evaluate(() => document.querySelectorAll('.bar-a .ccs-searchbar__sug').length);
    await page.evaluate(() => { state.allow = t => t.cat === 'Title'; });
    await page.fill(IA, 't'); await page.fill(IA, 'th');
    const cats = await page.evaluate(() => [...document.querySelectorAll('.bar-a .ccs-searchbar__sug em')].map(e => e.textContent));
    eq([all > 0, cats.length > 0, cats.every(c => c === 'Title')], [true, true, true], 'filterTerm(term) restricts which suggestions are offered (' + all + ' unfiltered, ' + cats.length + ' Title only)');
    await page.evaluate(() => { state.allow = () => false; });
    await page.fill(IA, 't'); await page.fill(IA, 'th');
    eq(await page.evaluate(() => document.querySelectorAll('.bar-a .ccs-searchbar__sug').length), 0, 'filterTerm returning false for everything leaves no suggestions');

    // bars are independent: B has no onSubmit, so it still navigates
    await Promise.all([page.waitForURL(/search-results/), (async () => { await page.fill(B + ' input[name="q"]', 'wing'); await page.keyboard.press('Enter'); })()]);
    eq(new URL(page.url()).searchParams.get('q'), 'wing', 'a bar created without onSubmit still opens the results page');
    await page.close();

    eq(errors, [], 'no page errors');
  } finally { await browser.close(); srv.close(); }
  finish('search-bar');
})().catch(e => { fail(e.stack || e); finish('search-bar'); });
