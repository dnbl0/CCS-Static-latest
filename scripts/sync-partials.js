// Keeps the parts every page repeats (site header, search overlay and its script, site footer) identical on every page.
// The source of each is a file in src/partials; this script writes it into each page between the page's own markup.
// A page's classes carry its name (`contact-university-melbourne__list`, the BEM convention of the site), so the header
// is a template: @PAGE@ is that name, read from the page's existing header, and @CUR:...@ marks the menu items that are
// the current page (aria-current).
// `--check` writes nothing and exits 1 when a page differs (run by `npm test`).
// Usage: node scripts/sync-partials.js [--check]
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const check = process.argv.includes('--check');
const partial = (name) => fs.readFileSync(path.join(ROOT, 'src/partials', name), 'utf8').replace(/\n$/, '');
const HEADER = partial('header.html');
const FOOTER = partial('footer.html');
const OVERLAY = partial('search-overlay.html');

// Regions of a page to replace: [start marker, end marker (kept in the region)]
const REGIONS = {
  header: ['<header class="ccs-nav ccs-nav--header"', '</header>'],
  overlay: ['<div id="uom-search-popover"', '</script>'],
  footer: ['<footer class="ccs-nav ccs-nav--footer"', '</footer>']
};

// Which header items mark the current page, from the page's path under public/
function current(relative) {
  const items = new Set();
  let m;
  if (relative === 'contact.html') items.add('contact');
  else if (relative === 'search/search-results.html' || relative === 'collections/record.html') items.add('search');
  else if (relative === 'collections/index.html') items.add('collections');
  else if ((m = relative.match(/^collections\/([a-z-]+)\/index\.html$/))) items.add('collections').add(`coll-${m[1]}`);
  else if (relative === 'help/index.html') items.add('help');
  else if (relative === 'help/indigenous-data.html') items.add('help').add('help-indigenous');
  return items;
}
const ATTRIBUTES = { collections: ' aria-current="true"', help: ' aria-current="true"' };

function renderHeader(relative, page) {
  const prefix = page.match(/class="([a-z-]+?)-university-melbourne"/)?.[1];
  if (!prefix) throw new Error(`${relative}: cannot read the page name from its header`);
  const items = current(relative);
  return HEADER.replaceAll('@PAGE@', prefix).replace(/@CUR:([a-z-]+)@/g,
    (_, key) => (items.has(key) ? (ATTRIBUTES[key] || ' aria-current="page"') : ''));
}

function replaceRegion(page, [start, end], text) {
  const a = page.indexOf(start);
  if (a === -1) return null;
  const b = page.indexOf(end, a) + end.length;
  return page.slice(0, a) + text + page.slice(b);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

// A page with its header, search overlay and footer taken from the partials; null when it has no site chrome
function renderChrome(relative, original) {
  if (!original.includes(REGIONS.header[0])) return null;
  let page = replaceRegion(original, REGIONS.header, renderHeader(relative, original));
  page = replaceRegion(page, REGIONS.overlay, OVERLAY) ?? page;
  return replaceRegion(page, REGIONS.footer, FOOTER) ?? page;
}
module.exports = { renderChrome };
if (require.main !== module) return;

const stale = [];
let pages = 0;
for (const file of walk(PUBLIC)) {
  const relative = path.relative(PUBLIC, file);
  const original = fs.readFileSync(file, 'utf8');
  const page = renderChrome(relative, original); // redirect stubs and the like have no site chrome
  if (page === null) continue;
  pages++;
  if (page === original) continue;
  stale.push(relative);
  if (!check) fs.writeFileSync(file, page);
}

if (check && stale.length) {
  console.error(`FAIL: ${stale.length} page(s) differ from src/partials. Run: node scripts/sync-partials.js\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(check ? `ok: the header, search overlay and footer on ${pages} pages match src/partials` : `synced ${pages} pages (${stale.length} changed)`);
