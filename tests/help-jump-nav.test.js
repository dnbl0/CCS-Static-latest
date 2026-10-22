// Help page jump navigation (public/help/jump-nav.js): one link is always marked as the section being read, including after
// the page's template layer redraws the menu late. A redraw that came after the load event used to leave no link marked until
// the reader scrolled, which also made the static-vs-Rails parity check flaky. Real Chromium, a local static server; skipped
// when Chromium is not installed.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium || !exe) { console.log('SKIP help-jump-nav: playwright-core or Chromium is not installed'); return finish('help-jump-nav'); }
  const srv = await new Promise(res => { const s = http.createServer((req, rsp) => {
    let f = path.join(PUBLIC, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(s)); });
  const browser = await chromium.launch({ executablePath: exe });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const marked = () => page.evaluate(() => [...document.querySelectorAll('.jump-nav__link')].filter((a) => a.classList.contains('is-current') && a.getAttribute('aria-current') === 'location').map((a) => a.textContent.trim()));

  await page.goto(`http://127.0.0.1:${srv.address().port}/help/index.html`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const first = await page.locator('.jump-nav__link').first().textContent();
  const onLoad = await marked();
  if (onLoad.length === 1 && onLoad[0] === first.trim()) ok('on load, the first link is the one marked'); else fail('on load, expected only the first link marked, got ' + JSON.stringify(onLoad));

  // a late redraw: the links are replaced by fresh copies without the marking, after the load event has fired
  await page.evaluate(() => document.querySelectorAll('.jump-nav__link').forEach((a) => {
    const b = a.cloneNode(true); b.classList.remove('is-current'); b.removeAttribute('aria-current'); a.replaceWith(b);
  }));
  await page.waitForTimeout(300);
  const afterRedraw = await marked();
  if (afterRedraw.length === 1 && afterRedraw[0] === first.trim()) ok('after a late redraw, the first link is marked again'); else fail('after a late redraw, expected only the first link marked, got ' + JSON.stringify(afterRedraw));

  await browser.close(); srv.close();
  finish('help-jump-nav');
})();
