// WCAG 2.1 A/AA regression checks (CCS-51): axe-core on key page states at desktop and phone widths,
// plus reflow at 320px (1.4.10), distinct page titles (2.4.2) and a single h1 per page.
// axe cannot prove conformance (it finds roughly a third of issues); see jira-mvp-mapping.md for the manual checklist.
// Needs playwright-core, axe-core and a Chromium build; skipped with a notice when unavailable.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

let chromium, axeSrc;
try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP accessibility: playwright-core is not installed'); process.exit(0); }
try { axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8'); } catch (e) { console.log('SKIP accessibility: axe-core is not installed'); process.exit(0); }

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

const PAGES = [
  '/index.html', '/collections/index.html', '/collections/grainger-museum/index.html', '/search/search-results.html?q=kangaroo', '/search/advanced-search.html',
  '/collections/record.html?id=10116', '/collections/record.html?id=23', '/collections/record.html?id=10004',
  '/help/index.html', '/help/index.html?topic=faq', '/help/index.html?topic=search-tips', '/help/index.html?topic=copyright', '/help/indigenous-data.html', '/contact.html', '/about.html'
];

(async () => {
  const exe = findChromium();
  if (!exe) { console.log('SKIP accessibility: no Chromium found (set PLAYWRIGHT_CHROMIUM_PATH)'); process.exit(0); }
  const srv = await serve(); const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const titles = new Map();
  let scanned = 0;
  try {
    for (const width of [1440, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      ctx.setDefaultTimeout(8000);
      await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* ignore */ } });
      for (const url of PAGES) {
        const page = await ctx.newPage();
        await page.goto(base + url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1200);
        await page.addScriptTag({ content: axeSrc });
        const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, help: v.help, nodes: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })));
        scanned++;
        for (const v of violations) fail(`${url} @${width}px: ${v.id} (${v.help}) at ${v.nodes.join(' | ')}`);
        if (url.indexOf('/search/search-results') === 0) {
          // the Filters modal is part of this page: scan it while open too
          // beside the desktop filter rail the Filters button is hidden; the modal still opens
          await page.evaluate(() => document.querySelector('.search-results-search-tools__button-filter-btn').click());
          await page.waitForTimeout(700);
          const open = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, help: v.help, nodes: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })));
          for (const v of open) fail(`${url} (Filters modal open) @${width}px: ${v.id} (${v.help}) at ${v.nodes.join(' | ')}`);
          scanned++;
          await page.keyboard.press('Escape');
          await page.waitForTimeout(400);
        }
        if (width === 1440) {
          const meta = await page.evaluate(() => ({ title: document.title, h1: document.querySelectorAll('h1').length, lang: document.documentElement.lang }));
          if (meta.h1 !== 1) fail(`${url}: expected one h1, found ${meta.h1}`);
          if (meta.lang !== 'en') fail(`${url}: html lang is "${meta.lang}"`);
          if (titles.has(meta.title)) fail(`${url}: title "${meta.title}" repeats ${titles.get(meta.title)}`); else titles.set(meta.title, url);
        }
        await page.setViewportSize({ width: 320, height: 800 });
        await page.waitForTimeout(500);
        const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
        if (ov.sw > ov.cw + 1) fail(`${url}: content wider than a 320px viewport (${ov.sw} > ${ov.cw})`);
        await page.close();
      }
      await ctx.close();
    }
    ok(`${scanned} page states scanned with axe (WCAG 2.1 A/AA) plus 320px reflow and title checks`);
  } finally { await browser.close(); srv.close(); }
  finish('accessibility');
})().catch(e => { console.error(e); process.exit(1); });
