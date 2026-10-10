// The advanced search dropdowns (.ccs-combo) must stay the same box and menu as the results page facet rail
// (.facet-rail__toggle / .facet-rail__panel): 48px, 1px pale border that turns navy on hover and while open, 14px text,
// a 16px chevron inside the right edge with no divider, and a menu with a navy border the width of the box, 15px items
// and a max height of min(18rem, 50vh). The rail's own computed values are read from the live results page, so a change
// to either side that is not made to the other fails here. Runs on the full page and in the results-page flyout (?embed=1).
// Skipped gracefully when playwright-core or Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(msg + ' (got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b) + ')'); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2' };

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium) { console.log('SKIP combo dropdown checks: playwright-core is not installed'); return finish('combo-dropdowns'); }
  if (!exe) { console.log('SKIP combo dropdown checks: no Chromium found'); return finish('combo-dropdowns'); }

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
  const style = (loc, props) => loc.evaluate((el, ps) => { const c = getComputedStyle(el); const o = {}; ps.forEach(p => { o[p] = c[p]; }); return o; }, props);
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });

    // The rail's own values, read live
    const rp = await ctx.newPage();
    rp.on('pageerror', e => errors.push(e.message));
    await rp.goto(base + '/search/search-results.html?q=skull');
    await rp.waitForSelector('.facet-rail__toggle');
    const toggle = rp.locator('.facet-rail__toggle').first();
    const railBox = await toggle.boundingBox();
    const railField = await style(toggle, ['borderTopColor', 'borderTopWidth', 'fontSize', 'paddingLeft', 'backgroundColor']);
    await toggle.hover();
    const railHover = (await style(toggle, ['borderTopColor'])).borderTopColor;
    await toggle.click();
    const panel = rp.locator('.facet-rail__panel:visible').first();
    await panel.waitFor();
    const railPanel = await style(panel, ['borderTopColor', 'borderTopWidth', 'boxShadow', 'backgroundColor']);
    const railOpt = await style(rp.locator('.facet-rail__panel:visible .facet-rail__option').first(), ['fontSize', 'lineHeight', 'paddingTop']);
    eq(railBox.height, 48, 'rail toggle is 48px tall');

    for (const [label, url, vp] of [['page', '/search/advanced-search.html', { width: 1280, height: 900 }], ['flyout', '/search/advanced-search.html?embed=1', { width: 560, height: 800 }]]) {
      const c = await browser.newContext({ viewport: vp });
      await c.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
      const p = await c.newPage();
      p.on('pageerror', e => errors.push(e.message));
      await p.goto(base + url);
      await p.waitForSelector('.ccs-combo:not(.ccs-combo--add) .ccs-combo__field');
      const field = p.locator('.ccs-combo:not(.ccs-combo--add) .ccs-combo__field').first();
      const box = await field.boundingBox();
      eq(box.height, railBox.height, label + ': the dropdown box is as tall as the rail toggle (48px)');
      const f = await style(field, ['borderTopColor', 'borderTopWidth', 'fontSize', 'paddingLeft', 'backgroundColor']);
      eq(f, railField, label + ': border, font size, padding and fill match the rail toggle');
      const chevron = await field.locator('.ccs-combo__icon img').boundingBox();
      eq([chevron.width, chevron.height], [16, 16], label + ': the chevron is 16px');
      const gap = await field.evaluate(el => { const r = el.getBoundingClientRect(), i = el.querySelector('.ccs-combo__icon').getBoundingClientRect(); return Math.round(r.right - i.right); });
      eq(gap, 13, label + ': the chevron sits 12px inside the right border (1px border + 12px padding)');
      eq((await style(field.locator('.ccs-combo__icon'), ['borderLeftWidth'])).borderLeftWidth, '0px', label + ': no rule before the chevron');
      await field.hover();
      eq((await style(field, ['borderTopColor'])).borderTopColor, railHover, label + ': the border turns navy on hover, as the rail does');
      await field.click();
      const menu = p.locator('.ccs-combo:not(.ccs-combo--add).is-open .ccs-combo__menu').first();
      await menu.waitFor();
      const m = await style(menu, ['borderTopColor', 'borderTopWidth', 'boxShadow', 'backgroundColor', 'maxHeight']);
      eq({ c: m.borderTopColor, w: m.borderTopWidth, s: m.boxShadow, b: m.backgroundColor }, { c: railPanel.borderTopColor, w: railPanel.borderTopWidth, s: railPanel.boxShadow, b: railPanel.backgroundColor }, label + ': the menu border, shadow and fill match the rail panel');
      eq(m.maxHeight, Math.min(18 * 16, vp.height * 0.5) + 'px', label + ': the menu is at most min(18rem, 50vh) tall');
      const mb = await menu.boundingBox();
      eq(Math.round(mb.width), Math.round(box.width), label + ': the menu is as wide as the box');
      const o = await style(menu.locator('.ccs-combo__option').first(), ['fontSize', 'lineHeight', 'paddingTop']);
      eq(o, railOpt, label + ': menu items use the rail option font size, line height and padding');
      await c.close();
    }
  } finally { await browser.close(); srv.close(); }
  eq(errors, [], 'no page errors');
  finish('combo-dropdowns');
})().catch(e => { console.error(e); process.exit(1); });
