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
ok(`${sheets.length} stylesheets, ${pages.length} pages: structure and load order consistent`);
finish('stylesheet-structure');
