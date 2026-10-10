// Guards the stylesheet architecture: tokens/ -> base.css -> components/ -> pages/.
// Fails on unreferenced sheets, missing links, :root token blocks outside tokens/, and the old per-page copies coming back.
const { PUBLIC, fail, ok, walk, finish, fs, path } = require('./lib');

const STYLES = path.join(PUBLIC, 'styles');
const rel = p => path.relative(STYLES, p).split(path.sep).join('/');
const sheets = walk(STYLES, p => p.endsWith('.css')).map(rel).filter(p => !p.startsWith('vendor/'));
const pages = walk(PUBLIC, p => p.endsWith('.html') && p !== path.join(PUBLIC, 'search.html'));
const REQUIRED = ['vendor/bootstrap-uom.min.css', 'tokens/tokens.css', 'base.css'];
const ALLOWED_DIRS = ['tokens/', 'components/', 'pages/', 'vendor/'];

const linked = new Set();
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const hrefs = [...html.matchAll(/<link rel="stylesheet" href="\/styles\/([^"]+)"/g)].map(m => m[1]);
  hrefs.forEach(h => linked.add(h));
  for (const r of REQUIRED) if (!hrefs.includes(r)) fail(`${path.relative(PUBLIC, page)}: missing /styles/${r}`);
  for (const h of hrefs) if (!fs.existsSync(path.join(STYLES, h))) fail(`${path.relative(PUBLIC, page)}: links missing stylesheet ${h}`);
  if (/href="[^"]*(?:components\/fig-|colour-tokens|base-elements|skip-link)/.test(html)) fail(`${path.relative(PUBLIC, page)}: links a retired stylesheet`);
  const order = hrefs.map(h => (h.startsWith('pages/') ? 2 : h.startsWith('components/') ? 1 : 0));
  if (order.some((v, i) => i && v < order[i - 1])) fail(`${path.relative(PUBLIC, page)}: stylesheets must load tokens, then components, then page CSS`);
}
for (const s of sheets) {
  if (!ALLOWED_DIRS.some(d => s.startsWith(d)) && s !== 'base.css') fail(`styles/${s}: put stylesheets in tokens/, components/ or pages/`);
  if (!linked.has(s)) fail(`styles/${s} is not linked from any page`);
  if (!s.startsWith('tokens/') && /^:root\s*\{[^}]*^\s*--(?:col|brand|uom-ds)-[\w-]+\s*:/m.test(fs.readFileSync(path.join(STYLES, s), 'utf8'))) fail(`styles/${s}: colour tokens belong in styles/tokens/`);
}
// Keep stylesheets one component or page area in size: split a sheet before it grows past this (tokens are one file by design)
const MAX_BYTES = 32 * 1024;
for (const s of sheets) {
  if (s.startsWith('tokens/')) continue;
  const bytes = fs.statSync(path.join(STYLES, s)).size;
  if (bytes > MAX_BYTES) fail(`styles/${s} is ${Math.round(bytes / 1024)} KB: split it by component (limit ${MAX_BYTES / 1024} KB)`);
}
// Smooth scrolling must be opt-in (reduced motion is respected): the back-to-top buttons rely on it being instant then.
for (const s of sheets) {
  const css = fs.readFileSync(path.join(STYLES, s), 'utf8').replace(/@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{[^{}]*\{[^{}]*\}\s*\}/g, '');
  if (/scroll-behavior\s*:\s*smooth/.test(css)) fail(`styles/${s}: scroll-behavior: smooth outside @media (prefers-reduced-motion: no-preference)`);
}
// The results body is a flex item that centres itself: without width:100% it shrinks to its content and misses the page container
if (!/\.search-results-body\s*\{[^}]*width:\s*100%[^}]*max-width:\s*var\(--layout-container\)/s.test(fs.readFileSync(path.join(STYLES, 'pages/search-results/layout.css'), 'utf8'))) fail('search-results/layout.css: .search-results-body must be width: 100% up to var(--layout-container)');
ok(`${sheets.length} stylesheets, ${pages.length} pages: structure and load order consistent`);
finish('stylesheet-structure');
