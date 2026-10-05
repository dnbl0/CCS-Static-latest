#!/usr/bin/env node
// Computed-style snapshot of every page/state/viewport of the prototype, the safety net for CSS refactors.
//   node scripts/style-snapshot.js <label> [--pages=index,record] [--states=default,filters-modal] [--viewports=1280,378] [--concurrency=6]
// Output: .style-snapshots/<label>/<page>__<viewport>__<state>.json.gz (git-ignored) + meta.json. Compare with scripts/style-diff.js.
// See docs/css-refactor.md.
const fs = require('fs'), path = require('path');
const { findChromium } = require('./lib/chromium');
const { createServer } = require('./dev-server');
const { writeSnapshot, dirFor, ROOT } = require('./lib/snapshot-format');

/* ---- what to capture --------------------------------------------------------------------------------------------- */
const LANDINGS = ['medical-history-museum', 'university-art-collection', 'grainger-museum', 'henry-forman-atkinson-dental-museum', 'harry-brookes-allen-museum'];
const PAGES = {
  index: '/',
  'search-results': '/search/search-results.html?q=skull',
  'advanced-search': '/search/advanced-search.html',
  'collections-index': '/collections/',
  ...Object.fromEntries(LANDINGS.map(l => ['collection-' + l, `/collections/${l}/`])),
  record: '/collections/record.html?id=1',
  help: '/help/',
  'help-indigenous-data': '/help/indigenous-data.html',
  contact: '/contact.html',
  lists: '/lists.html'
};
// search.html is only a redirect shim to the results page (no rendering of its own), so it is not snapshotted.
const VIEWPORTS = { 1280: { width: 1280, height: 900 }, 378: { width: 378, height: 800 } };
const SEEDED_FAVOURITES = JSON.stringify({ v: 1, lists: [{ id: 'default', name: 'My favourites', created: 1, items: [1, 5] }, { id: 'l1', name: 'Dental tools', created: 2, items: [6] }] });

const click = async (page, sel, opts) => { await page.locator(sel).first().click({ timeout: 8000, ...opts }); };
const clickVisible = async (page, sel) => { await page.locator(sel + ':visible').first().click({ timeout: 8000 }); };
const STATES = {
  default: { run: async () => {} },
  'ack-modal': { pages: ['search-results', 'record'], noAck: true, run: async () => {} },
  seeded: { pages: ['lists'], seedFavourites: true, run: async () => {} },
  'mobile-menu': { viewports: [378], run: async p => { await click(p, '.ccs-nav__menu'); } },
  'mobile-menu-drilled': { viewports: [378], run: async p => { await click(p, '.ccs-nav__menu'); await click(p, '.ccs-nav__trigger'); } },
  'desktop-dropdown': { viewports: [1280], run: async p => { await clickVisible(p, '.ccs-nav__trigger'); } },
  'header-search-overlay': { viewports: [1280], run: async p => { await click(p, '.ccs-nav__search'); await p.waitForSelector('#uom-search-popover:popover-open, #uom-search-popover[open]', { timeout: 4000 }).catch(() => {}); } },
  'scope-menu': { pages: ['index', 'search-results'], run: async p => { await clickVisible(p, '.ccs-searchbar__scope-btn'); } },
  'sticky-bar': { pages: ['search-results'], run: async p => { await p.evaluate(() => window.scrollTo(0, 900)); await p.waitForTimeout(500); } },
  'filters-modal': { pages: ['search-results'], run: async p => { await click(p, 'button:has-text("Filters")'); await p.waitForTimeout(400); await click(p, 'button:has-text("Expand all")'); } },
  'fav-dialog': { pages: ['search-results', 'record'], run: async p => { await clickVisible(p, '.fav-heart'); await p.waitForTimeout(300); } }
};

/* ---- determinism: frozen clock, seeded random, no animation ------------------------------------------------------- */
const INIT = ({ ack, favourites }) => {
  try { if (ack) localStorage.setItem('ccs-cultural-ack', '1'); if (favourites) localStorage.setItem('ccs-favourites', favourites); } catch (e) { /* storage blocked */ }
  const FIXED = 1790000000000, RealDate = Date;
  class FrozenDate extends RealDate {
    constructor(...a) { if (a.length) super(...a); else super(FIXED); }
    static now() { return FIXED; }
  }
  window.Date = FrozenDate;
  let seed = 123456789;
  Math.random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
};
const FREEZE_CSS = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}';

/* ---- in-page extraction ------------------------------------------------------------------------------------------- */
const RUNTIME_VARS = ['--header-total-height'];   // set by page scripts racing the template render; value differs run to run
const EXTRACT = async (RUNTIME_VARS) => {
  const SKIP_TAGS = new Set(['HEAD', 'SCRIPT', 'STYLE', 'LINK', 'META', 'TITLE', 'NOSCRIPT', 'TEMPLATE', 'BASE']);
  const KEEP_WEBKIT = /^-webkit-(line-clamp|box-orient|text-fill-color|text-stroke|mask|background-clip|appearance)/;
  const SKIP_PROP = /^(animation|transition)|^caret-color$|^scroll-behavior$|^will-change$|^view-transition|^speak|^app-region|^interactivity|^anchor-|^position-anchor|^position-try|^timeline-scope|^scroll-timeline|^view-timeline/;
  const wanted = n => !n.startsWith('--') && !SKIP_PROP.test(n) && (!/^-(webkit|moz|ms|o)-/.test(n) || KEEP_WEBKIT.test(n));
  const strings = [], strIdx = new Map();
  const intern = v => { let i = strIdx.get(v); if (i === undefined) { i = strings.length; strings.push(v); strIdx.set(v, i); } return i; };
  const styles = [], styleIdx = new Map(), els = [];
  let propNames = null;
  const styleOf = cs => {
    if (!propNames) { propNames = []; for (let i = 0; i < cs.length; i++) if (wanted(cs[i])) propNames.push(cs[i]); propNames.sort(); }
    const row = propNames.map(n => intern(cs.getPropertyValue(n)));
    const key = row.join(',');
    let i = styleIdx.get(key); if (i === undefined) { i = styles.length; styles.push(row); styleIdx.set(key, i); }
    return i;
  };
  const sx = window.scrollX, sy = window.scrollY, r05 = n => Math.round(n * 100) / 100;   // 0.01px; style-diff applies a tolerance for sub-pixel text-measurement jitter
  const classOf = e => (e.getAttribute('class') || '').split(/\s+/).filter(Boolean).sort().join('.');
  const keyOf = (e, parentKey) => {
    let n = 1; for (let s = e.previousElementSibling; s; s = s.previousElementSibling) if (s.tagName === e.tagName) n++;
    const c = classOf(e);
    return (parentKey ? parentKey + ' > ' : '') + e.tagName.toLowerCase() + (c ? '.' + c : '') + ':' + n;
  };
  const pseudo = (e, key, which) => {
    const cs = getComputedStyle(e, which);
    const content = cs.getPropertyValue('content');
    if (which !== '::placeholder' && (content === 'none' || content === 'normal' || content === '')) return;
    if (cs.display === 'none') return;
    els.push([key + which, styleOf(cs), null]);
  };
  const walk = (e, parentKey) => {
    if (SKIP_TAGS.has(e.tagName)) return;
    const cs = getComputedStyle(e);
    if (cs.display === 'none') return;
    const key = keyOf(e, parentKey), r = e.getBoundingClientRect();
    els.push([key, styleOf(cs), [r05(r.x + sx), r05(r.y + sy), r05(r.width), r05(r.height)]]);
    pseudo(e, key, '::before'); pseudo(e, key, '::after');
    if (e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') pseudo(e, key, '::placeholder');
    for (const c of e.children) walk(c, key);
  };
  walk(document.documentElement, '');

  // resolved custom properties on :root and body, discovered from the stylesheets
  const names = new Set(), usedVars = new Set(), varRef = /var\(\s*(--[\w-]+)/g;
  const scan = rules => { for (const r of rules) { if (r.style) for (let i = 0; i < r.style.length; i++) if (r.style[i].startsWith('--')) names.add(r.style[i]); if (r.cssRules) scan(r.cssRules); } };
  let cssText = '';
  for (const sh of document.styleSheets) { try { scan(sh.cssRules); for (const r of sh.cssRules) cssText += r.cssText + '\n'; } catch (e) { /* cross-origin sheet */ } }
  const sources = [cssText, document.documentElement.outerHTML];
  for (const s of document.scripts) { if (s.src) { try { sources.push(await (await fetch(s.src)).text()); } catch (e) { /* skip */ } } }
  for (const text of sources) { let m; varRef.lastIndex = 0; while ((m = varRef.exec(text))) usedVars.add(m[1]); }
  // custom properties set at run time by page scripts (inline on <html>, e.g. record.html's --header-total-height, which races the template render) are masked
  const resolved = el => { const cs = getComputedStyle(el), o = {}; for (const n of [...names].sort()) { if (RUNTIME_VARS.includes(n) || document.documentElement.style.getPropertyValue(n) !== '') continue; o[n] = cs.getPropertyValue(n).trim(); } return o; };
  return { strings, propNames, styles, els, vars: { root: resolved(document.documentElement), body: resolved(document.body) }, usedVars: [...usedVars].sort() };
};

/* ---- job runner --------------------------------------------------------------------------------------------------- */
function jobs(opts) {
  const out = [];
  for (const [page] of Object.entries(PAGES)) {
    if (opts.pages && !opts.pages.includes(page)) continue;
    for (const vw of Object.keys(VIEWPORTS)) {
      if (opts.viewports && !opts.viewports.includes(vw)) continue;
      for (const [state, def] of Object.entries(STATES)) {
        if (opts.states && !opts.states.includes(state)) continue;
        if (def.pages && !def.pages.includes(page)) continue;
        if (def.viewports && !def.viewports.includes(+vw)) continue;
        out.push({ page, vw, state, def });
      }
    }
  }
  return out;
}

async function runJob(browser, base, job) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS[job.vw], reducedMotion: 'reduce', deviceScaleFactor: 1, locale: 'en-AU', timezoneId: 'Australia/Melbourne' });
  await ctx.addInitScript(INIT, { ack: !job.def.noAck, favourites: job.def.seedFavourites ? SEEDED_FAVOURITES : null });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(base + PAGES[job.page], { waitUntil: 'networkidle', timeout: 30000 });
    await page.addStyleTag({ content: FREEZE_CSS });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(500);
    await job.def.run(page);
    await page.mouse.move(1, 1);
    await page.waitForTimeout(400);
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const data = await page.evaluate(EXTRACT, RUNTIME_VARS);
    // the server port is random: keep it out of resolved url(...) values
    const norm = v => v.replace(/http:\/\/127\.0\.0\.1:\d+/g, 'http://localhost');
    data.strings = data.strings.map(norm);
    for (const scope of ['root', 'body']) for (const k of Object.keys(data.vars[scope])) data.vars[scope][k] = norm(data.vars[scope][k]);
    const snap = { v: 1, page: job.page, viewport: job.vw, state: job.state, url: PAGES[job.page], ...data };
    return { snap, errors };
  } finally { await ctx.close(); }
}

async function main() {
  const args = process.argv.slice(2), label = args.find(a => !a.startsWith('--'));
  const opt = n => { const a = args.find(x => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : null; };
  if (!label) { console.error('usage: node scripts/style-snapshot.js <label> [--pages=a,b] [--states=a,b] [--viewports=1280,378] [--concurrency=N]'); process.exit(2); }
  const { chromium, exe } = findChromium();
  if (!chromium || !exe) { console.error('style-snapshot: playwright-core and a Chromium are required (set PLAYWRIGHT_CHROMIUM_PATH)'); process.exit(2); }
  const opts = { pages: opt('pages') && opt('pages').split(','), states: opt('states') && opt('states').split(','), viewports: opt('viewports') && opt('viewports').split(',') };
  const list = jobs(opts), concurrency = +opt('concurrency') || 6;
  if (!list.length) { console.error('style-snapshot: nothing matches those filters'); process.exit(2); }
  fs.rmSync(dirFor(label), { recursive: true, force: true });

  const server = createServer(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const t0 = Date.now(); let done = 0, elements = 0, bytes = 0, failed = 0; const pageErrors = {};
  const queue = list.slice();
  const worker = async () => {
    for (let job; (job = queue.shift());) {
      let res, lastErr;
      for (let attempt = 0; attempt < 3 && !res; attempt++) { try { res = await runJob(browser, base, job); } catch (e) { lastErr = e; } }
      if (!res) { failed++; console.error(`FAILED ${job.page} @${job.vw} [${job.state}]: ${lastErr && lastErr.message.split('\n')[0]}`); continue; }
      writeSnapshot(label, res.snap); elements += res.snap.els.length; done++;
      if (res.errors.length) pageErrors[`${job.page}@${job.vw}[${job.state}]`] = res.errors.slice(0, 2);
      if (done % 20 === 0) console.log(`  ${done}/${list.length}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, list.length) }, worker));
  await browser.close(); server.close();
  const seconds = Math.round((Date.now() - t0) / 100) / 10;
  for (const f of fs.readdirSync(dirFor(label))) bytes += fs.statSync(path.join(dirFor(label), f)).size;
  const commit = (() => { try { return require('child_process').execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim(); } catch (e) { return null; } })();
  fs.writeFileSync(path.join(dirFor(label), 'meta.json'), JSON.stringify({ label, commit, combos: done, failed, elements, bytes, seconds, pageErrors }, null, 1));
  console.log(`style-snapshot "${label}": ${done} page/state/viewport combos, ${elements} elements, ${(bytes / 1048576).toFixed(1)} MB, ${seconds}s${failed ? `, ${failed} FAILED` : ''}`);
  if (failed) process.exit(1);
}

if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
module.exports = { PAGES, STATES, VIEWPORTS, jobs };
