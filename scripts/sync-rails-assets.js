// Writes the Rails app's copies of the shared design assets from their source in public/:
//   public/styles/tokens/tokens.css            -> ead-ccs-test/app/assets/stylesheets/tokens/static_site.css
//   public/styles/components + pages (CSS)     -> ead-ccs-test/app/assets/stylesheets/pages/*.css (filtered)
//   public/images (banners, tiles, home icons) -> ead-ccs-test/app/assets/images/site/
// The static site is the origin; never edit the Rails copies by hand. `--check` writes nothing and exits 1 when a
// copy is stale (run by `npm test`). Usage: node scripts/sync-rails-assets.js [--check]
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLES = path.join(ROOT, 'public/styles');
const IMAGES = path.join(ROOT, 'public/images');
const RAILS = path.join(ROOT, 'ead-ccs-test/app/assets');
const check = process.argv.includes('--check');

// Rules of the static navigation, footer and search popover: the Rails app has its own header, footer and overlay.
const DROP = /^\s*(\.ccs-nav|\.ccs-foot|\.uom-search-popover|\.uom-menu|\.uom-primary|:root|\.home-university|\.home-form|section\[data-component)/;

// Splits CSS into top-level blocks: [prelude, body|null, raw].
function splitRules(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i) + 2;
      out.push(['/*', null, css.slice(i, end)]);
      i = end;
      continue;
    }
    const open = css.indexOf('{', i);
    const semi = css.indexOf(';', i);
    if (semi !== -1 && (open === -1 || semi < open)) {
      out.push([css.slice(i, semi), null, css.slice(i, semi + 1)]);
      i = semi + 1;
      continue;
    }
    let depth = 0;
    let k = open;
    for (; k < css.length; k++) {
      if (css[k] === '{') depth++;
      else if (css[k] === '}' && --depth === 0) break;
    }
    out.push([css.slice(i, open).trim(), css.slice(open + 1, k), css.slice(i, k + 1)]);
    i = k + 1;
  }
  return out;
}

function filter(css) {
  const kept = [];
  for (const [prelude, body, raw] of splitRules(css)) {
    if (body === null) { kept.push(raw); continue; }
    if (prelude.startsWith('@media') || prelude.startsWith('@supports')) {
      const inner = filter(body);
      if (inner.trim()) kept.push(`${prelude} {\n${inner}\n}`);
      continue;
    }
    if (prelude.startsWith('@')) { kept.push(raw); continue; }
    if (prelude.split(',').every((selector) => DROP.test(selector))) continue;
    kept.push(raw);
  }
  return kept.join('\n');
}

const fixUrls = (css) => css
  .replace('url("/images/chevron-right.svg")', 'url("../site/chevron-right.svg")')
  .replace("url('/images/arrow-right.svg')", "url('../site/arrow-right.svg')");
const header = (file) => `/* Generated from public/styles/${file} by scripts/sync-rails-assets.js. Edit the static file, not this copy. */\n`;
const read = (file) => fs.readFileSync(path.join(STYLES, file), 'utf8');

// Rules the Rails markup needs that the static pages get from base.css, header.css or per-page files.
const SHARED_EXTRAS = `
/* Generated: helpers and link treatments (from public/styles/base.css and components/header.css). */
/* The mobile breadcrumb (a back link to the parent page), shown by the rule below under 769px. */
.bc-mobile--styled { display: none; align-items: center; gap: var(--space-6); list-style: none; margin: 0; padding: 0; font-size: var(--font-size-body-lg); color: var(--white-100); }
.bc-mobile__item { display: flex; align-items: center; }
.bc-mobile__link { display: inline-flex; align-items: center; gap: var(--space-6); min-height: 44px; color: var(--white-100); text-decoration: none; }
/* The static base layer: body text colour (the home page sets its own in ccs.css), and links are plain navy and underline on hover (Bootstrap's default underlines them). */
body.page-collection-landing, body.page-collections-browse, body.page-help, body.page-contact, body.page-indigenous-data { color: var(--col-text-primary); }
:where(body.page-home, body.page-collection-landing, body.page-collections-browse, body.page-help, body.page-contact, body.page-indigenous-data) a { color: #0b2a6b; text-decoration: none; }
:where(body.page-home, body.page-collection-landing, body.page-collections-browse) a:hover { text-decoration: underline; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.skip-link{position:absolute;top:-120px;left:16px;background:var(--col-btn-action-bg);color:var(--col-btn-action-text);padding:12px 18px;z-index:var(--z-99999);font-weight:700;text-decoration:none;border:2px solid var(--col-bg-primary);transition:top var(--duration-base) ease}
.skip-link:focus{top:16px}
@media (max-width:768px){
  nav[aria-label="Breadcrumb"] > ol:not(.bc-mobile){display:none!important}
  nav[aria-label="Breadcrumb"] .bc-mobile{display:flex!important}
}
:where(body.page-help, body.page-contact, body.page-indigenous-data) a{text-decoration:underline;text-underline-offset:2px}
:where(body.page-help, body.page-contact, body.page-indigenous-data) a:hover{color:var(--col-bg-primary)}
:where(body.page-home, body.page-collection-landing, body.page-collections-browse) a:hover{color:var(--col-bg-primary)}
`;

const SHARED = ['ccs', 'breadcrumbs', 'page-banner', 'content-templates', 'campaign-banner', 'collection'];
const PAGES = { home: 'home', 'collections-browse': 'collections_browse', 'collection-landing': 'collection_landing', contact: 'contact', help: 'help', 'indigenous-data': 'indigenous_data' };

const files = new Map(); // path relative to RAILS -> Buffer | string
files.set('stylesheets/tokens/static_site.css', read('tokens/tokens.css'));
files.set('stylesheets/pages/static_shared.css',
  (SHARED.map((name) => `\n${header(`components/${name}.css`)}${fixUrls(filter(read(`components/${name}.css`)))}`).join('') + SHARED_EXTRAS).trimStart());
for (const [source, target] of Object.entries(PAGES)) {
  // The shared .bc-mobile rules replace each page's copy of them.
  const body = fixUrls(filter(read(`pages/${source}.css`))).replace(/^body\.page-[a-z-]+ \.bc-mobile[^{]*\{[^}]*\}\n?/gm, '');
  files.set(`stylesheets/pages/${target}.css`, header(`pages/${source}.css`) + body);
}
const IMAGE_FILES = [
  ['arrow-right.svg', 'arrow-right.svg'],
  ...fs.readdirSync(path.join(IMAGES, 'banners')).map((f) => [`banners/${f}`, `banners/${f}`]),
  ...fs.readdirSync(IMAGES).filter((f) => f.startsWith('tile-')).map((f) => [f, `tiles/${f}`]),
  ...fs.readdirSync(path.join(IMAGES, 'home')).map((f) => [`home/${f}`, f])
];
for (const [from, to] of IMAGE_FILES) files.set(`images/site/${to}`, fs.readFileSync(path.join(IMAGES, from)));

const stale = [];
for (const [relative, content] of files) {
  const target = path.join(RAILS, relative);
  const current = fs.existsSync(target) ? fs.readFileSync(target) : null;
  if (current && Buffer.compare(current, Buffer.from(content)) === 0) continue;
  stale.push(relative);
  if (!check) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
}

if (check && stale.length) {
  console.error(`FAIL: ${stale.length} Rails asset(s) are out of date with public/. Run: node scripts/sync-rails-assets.js\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(check ? `ok: ${files.size} Rails assets match public/` : `synced ${files.size} Rails assets (${stale.length} changed)`);
