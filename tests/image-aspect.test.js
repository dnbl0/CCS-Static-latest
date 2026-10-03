// CCS-64: images must keep their source aspect ratio (no stretching or squashing).
// An image may be cropped (object-fit: cover) or letterboxed (contain / scale-down), but its rendered
// box must not be a different shape from the file unless object-fit protects it.
// Needs playwright-core and a Chromium build; skipped with a notice when unavailable.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

let chromium;
try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP image-aspect: playwright-core is not installed'); process.exit(0); }

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
      const p = decodeURIComponent(req.url.split('?')[0]);
      let f = path.join(PUBLIC, p);
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
      if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
      rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rsp);
    }).listen(0, () => res(srv));
  });
}

const PAGES = ['/', '/collections/index.html', '/collections/grainger-museum/index.html', '/search/search-results.html?q=a', '/collections/record.html?id=10116', '/collections/record.html?id=20015'];
const TOLERANCE = 0.03;

(async () => {
  const exe = findChromium();
  if (!exe) { console.log('SKIP image-aspect: no Chromium found (set PLAYWRIGHT_CHROMIUM_PATH)'); process.exit(0); }
  const srv = await serve(); const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  let checked = 0;
  try {
    for (const width of [1440, 390]) {
      for (const url of PAGES) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        page.setDefaultTimeout(8000);
        await page.goto(base + url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1200);
        // load lazy images
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
        await page.waitForTimeout(500);
        const bad = await page.$$eval('img', (imgs, tol) => imgs.filter(i => i.complete && i.naturalWidth > 0).map(i => {
          const r = i.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return null;
          const cs = getComputedStyle(i), fit = cs.objectFit;
          const natural = i.naturalWidth / i.naturalHeight, shown = r.width / r.height;
          const distorted = Math.abs(natural - shown) / natural > tol && !['cover', 'contain', 'scale-down', 'none'].includes(fit);
          return { src: (i.currentSrc || i.src).split('/').slice(-2).join('/'), natural: +natural.toFixed(2), shown: +shown.toFixed(2), fit, distorted, n: 1 };
        }).filter(Boolean), TOLERANCE);
        checked += bad.length;
        for (const b of bad.filter(x => x.distorted)) fail(`${url} @${width}px: ${b.src} is distorted (file ratio ${b.natural}, shown ${b.shown}, object-fit ${b.fit})`);
        await page.close();
      }
    }
    ok(`${checked} rendered images checked for aspect-ratio distortion`);
  } finally { await browser.close(); srv.close(); }
  finish('image-aspect');
})().catch(e => { console.error(e); process.exit(1); });
