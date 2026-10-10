// The "Advanced Search" link under the search bars is styled like the footer links (a blue arrow on the left, then a bold white
// label, no button box), and the dropdown chevrons turn upside down while their menu is open: the header's "Browse all
// collections" and the search bar's "All collections" scope menu.
// Skipped gracefully when playwright-core or Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const FLIPPED = 'matrix(-1, 0, 0, -1, 0, 0)';

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium) { console.log('SKIP advanced link and chevrons: playwright-core is not installed'); return finish('advanced-link-chevrons'); }
  if (!exe) { console.log('SKIP advanced link and chevrons: no Chromium found'); return finish('advanced-link-chevrons'); }

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

    for (const [name, url, sel] of [['results page', '/search/search-results.html?q=skull', '.search-results-search-tools__link-advanced-search'], ['home page', '/index.html', '.ccs-hero__form-search ~ a[href*="advanced-search"], a.ccs-link[href*="advanced-search"]']]) {
      const p = await ctx.newPage();
      p.on('pageerror', e => errors.push(e.message));
      await p.goto(base + url);
      const link = p.locator(sel).first();
      await link.waitFor();
      eq((await link.textContent()).trim(), 'Advanced Search', name + ': the label is "Advanced Search"');
      const look = await link.evaluate(a => { const c = getComputedStyle(a), i = a.querySelector('img'), r = document.createRange(); r.selectNodeContents(a.lastChild); return { bg: c.backgroundColor, color: c.color, weight: c.fontWeight, border: c.borderTopWidth, img: i && i.getAttribute('src'), size: i && [i.getBoundingClientRect().width, i.getBoundingClientRect().height], arrowLeftOfLabel: !!i && i.getBoundingClientRect().right <= r.getBoundingClientRect().left + 0.5 }; });
      eq(look.bg, 'rgba(0, 0, 0, 0)', name + ': no button fill');
      eq(look.border, '0px', name + ': no border');
      eq(look.color, 'rgb(255, 255, 255)', name + ': the label is white');
      eq(Number(look.weight) >= 600, true, name + ': the label is bold');
      eq(look.img, '/images/home/icon-arrow-footer.svg', name + ': the arrow is the footer links\' arrow');
      eq(look.size, [24, 24], name + ': the arrow is 24px');
      eq(look.arrowLeftOfLabel, true, name + ': the arrow sits on the left of the label');
      // The footer links are the reference: the same type, spacing and arrow, read live from the page's own footer
      const props = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'columnGap', 'textDecorationLine', 'minHeight'];
      const pick = el => el.evaluate((a, ps) => { const c = getComputedStyle(a), o = {}; ps.forEach(q => { o[q] = c[q]; }); const r = a.getBoundingClientRect(); o.height = r.height; return o; }, props);
      const mine = await pick(link), foot = await pick(p.locator('.ccs-foot__item a.ccs-link').first());
      delete mine.fontFamily; delete foot.fontFamily; // the stacks differ only in their fallbacks
      eq(mine, foot, name + ': type, spacing, underline and height match the footer links');
      await p.close();
    }

    // Chevrons turn upside down while their menu is open
    const p = await ctx.newPage();
    p.on('pageerror', e => errors.push(e.message));
    await p.goto(base + '/index.html');
    const trigger = p.locator('.ccs-nav__trigger').first();
    const turn = async loc => { await p.waitForTimeout(500); return loc.evaluate(e => getComputedStyle(e.querySelector('img, svg')).transform); }; // the chevron animates
    eq(await turn(trigger), 'none', 'header "Browse all collections": the chevron points down when closed');
    await trigger.click();
    eq(await trigger.getAttribute('aria-expanded'), 'true', 'header "Browse all collections" opens');
    eq(await turn(trigger), FLIPPED, 'header "Browse all collections": the chevron points up when open');
    await trigger.click();
    eq(await turn(trigger), 'none', 'header "Browse all collections": it points down again when closed');

    const scope = p.locator('.ccs-searchbar__scope-btn').first();
    eq(await turn(scope), 'none', 'search bar "All collections": the chevron points down when closed');
    await scope.click();
    eq(await scope.getAttribute('aria-expanded'), 'true', 'search bar "All collections" opens');
    eq(await turn(scope), FLIPPED, 'search bar "All collections": the chevron points up when open');
    await scope.click();
    eq(await turn(scope), 'none', 'search bar "All collections": it points down again when closed');
    await p.close();
  } finally { await browser.close(); srv.close(); }
  eq(errors, [], 'no page errors');
  finish('advanced-link-chevrons');
})().catch(e => { console.error(e); process.exit(1); });
