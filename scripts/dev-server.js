// Local preview server that mirrors vercel.json (clean URLs, /item/CA-nnnnnn rewrite, redirects).
// Usage: npm run dev [-- 3000]   (default port 3000)
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'public');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8'));
const catalog = require('../api/catalog.js');
const port = +process.argv[2] || +process.env.PORT || 3000;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.json': 'application/json', '.woff2': 'font/woff2' };
const redirects = (cfg.redirects || []).map(r => [r.source, r.destination, r.statusCode || 308]);
const rewrites = (cfg.rewrites || []).map(r => [new RegExp('^' + r.source.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), r.destination]);
const file = p => [p, p + '.html', path.join(p, 'index.html')].find(f => fs.existsSync(f) && fs.statSync(f).isFile());
function handler(req, res) {
  const [rawPath, qs = ''] = req.url.split('?');
  let url = decodeURIComponent(rawPath);
  const red = redirects.find(([s]) => s === url);
  if (red) { res.writeHead(red[2], { Location: red[1] }); return res.end(); }
  let query = qs;
  for (const [re, dest] of rewrites) {
    const m = re.exec(url);
    if (m) { const d = dest.replace(/:(\w+)/g, (_, k) => m.groups[k]).split('?'); url = d[0]; query = d[1] || query; break; }
  }
  if (url === '/api/catalog') return catalog({ url: '/api/catalog?' + query }, { setHeader: (k, v) => res.setHeader(k, v), status(c) { res.statusCode = c; return this; }, json(b) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(b)); } });
  const f = file(path.join(root, url));
  if (!f || !f.startsWith(root)) { res.writeHead(404); return res.end('Not found'); }
  const st = fs.statSync(f), type = mime[path.extname(f)] || 'application/octet-stream', range = req.headers.range;
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range), s = +m[1] || 0, e = m[2] ? +m[2] : st.size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${s}-${e}/${st.size}`, 'Content-Length': e - s + 1 });
    return fs.createReadStream(f, { start: s, end: e }).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': st.size });
  fs.createReadStream(f).pipe(res);
}

// `node scripts/dev-server.js` serves on a port; other scripts (style snapshots) require() it and call createServer().
const createServer = () => http.createServer(handler);
module.exports = { createServer };
if (require.main === module) createServer().listen(port, () => console.log(`CCS preview: http://localhost:${port}`));
