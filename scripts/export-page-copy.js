// Writes the copy of every static page as Markdown, one file per page, into docs/page-copy/.
//   npm run export:page-copy        (starts its own dev server on COPY_PORT, default 3918; COPY_BASE uses a running site)
// Each page is rendered in headless Chromium, so copy written by page scripts is included. The header, footer and search
// overlay are the same on every page, so they are written once (site-header.md, site-footer.md) and left out of the pages.
// Pages are found by walking public/: redirect stubs, the 404 page and pages that are not part of the 2026 MVP are skipped.
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');
const { findChromium } = require('./lib/chromium');
const { domToMarkdown } = require('./lib/dom-to-markdown');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(root, process.env.COPY_MD_DIR || 'docs/page-copy');
const SITE = 'Cultural Collections Search (CCS), University of Melbourne';

// Not part of the 2026 MVP (search history and saved searches are 2027), or not a page of copy
const SKIP_FILES = new Set(['404.html', 'search/search-history.html', 'search/bookmarks.html']);
// Pages that need a query string to show anything, and a note about what the example shows
const QUERY = { 'collections/record.html': '?item=CA-010071' };
// Page names for the index (the browser titles are long, and the record page's is a sample item's name)
const NAMES = {
  home: 'Home', about: 'About', collections: 'Browse collections', 'collections-record': 'Item record (one sample record)', help: 'Help and support',
  'search-advanced-search': 'Advanced search', 'search-search-results': 'Search results'
};
const NOTES = {
  'search/search-results.html': 'The result cards are sample records, so they are left out here.',
  'collections/record.html': 'Shown with one sample record (CA-010071). The field labels and page copy are static; the values are that record\'s.'
};

// Other states of a page that a tester needs to see: the same page file, shown another way
const STATES = [
  { slug: 'search-no-results', name: 'Search results: no results', url: '/search/search-results.html?q=zzzzqqqq', source: 'public/search/search-results.html',
    note: 'The page when a search finds nothing. The result cards are left out.' },
  { slug: 'collections-record-not-found', name: 'Item record: record not found', url: '/collections/record.html?item=CA-999999', source: 'public/collections/record.html',
    note: 'The page when a record link does not match any record.' },
  { slug: 'collections-record-restricted-media', name: 'Item record: restricted media ("Request to view")', url: '/collections/record.html?item=CA-000001', source: 'public/collections/record.html',
    restricted: true,
    note: 'A record whose digital asset cannot be viewed online. The sample data has none, so for this file the page is shown with the access restriction switched on for the sample record CA-000001.' }
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? (['assets', 'vendor', 'styles', 'images', 'components'].includes(e.name) ? [] : walk(p)) : [p];
  });
}
const isStub = file => /http-equiv=["']refresh["']/i.test(fs.readFileSync(file, 'utf8').slice(0, 3000));
const urlOf = rel => (rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? '/' + rel.slice(0, -'index.html'.length) : '/' + rel);
const slugOf = rel => (rel === 'index.html' ? 'home' : rel.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\//g, '-'));

function pages() {
  return walk(publicDir).filter(f => f.endsWith('.html')).map(f => path.relative(publicDir, f)).filter(r => !SKIP_FILES.has(r) && !isStub(path.join(publicDir, r))).sort()
    .map(rel => ({ rel, slug: slugOf(rel), url: urlOf(rel) + (QUERY[rel] || ''), source: 'public/' + rel, note: NOTES[rel] }));
}

function waitForServer(url, ms = 15000) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    (function tick() {
      http.get(url, r => { r.resume(); resolve(); }).on('error', () => (Date.now() - t0 > ms ? reject(new Error('dev server did not start at ' + url)) : setTimeout(tick, 250)));
    })();
  });
}

// One file: an info line, the page copy, then the interface text (buttons, fields, image text) as a table for testers
const cell = t => String(t).replace(/\|/g, '\\|').replace(/\n/g, ' ');
function doc(title, { url, source, note }, { copy, ui }) {
  const body = /^# /m.test(copy) ? copy : `# ${title}\n\n${copy}`;
  const info = `> **Page:** ${url} · **Source file:** \`${source}\`` + (note ? `\n>\n> ${note}` : '');
  const table = ui.length
    ? ['## Interface text', '', 'Buttons, form fields and image text on this page. Check each is on the page, spelled the same.', '', '| Type | Text |', '| --- | --- |', ...ui.map(u => `| ${u.type} | ${cell(u.text)} |`)].join('\n')
    : '';
  return [info, '', body.trim(), ...(table ? ['', '---', '', table] : []), ''].join('\n');
}
const convert = (page, selector) => page.evaluate(domToMarkdown, { selector, separateUi: true });

(async () => {
  const { chromium, exe } = findChromium();
  if (!chromium || !exe) throw new Error('No Chromium found for playwright-core (set PLAYWRIGHT_CHROMIUM_PATH).');
  const port = +process.env.COPY_PORT || 3918;
  const base = process.env.COPY_BASE || `http://localhost:${port}`;
  const server = process.env.COPY_BASE ? null : spawn(process.execPath, [path.join(__dirname, 'dev-server.js'), String(port)], { stdio: 'ignore' });
  if (server) await waitForServer(base + '/');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: exe });
  try {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    const list = [...pages(), ...STATES];
    const index = [];
    let wroteShared = false;
    for (const p of list) {
      if (p.restricted) {
        await page.route('**/collection-data.js*', async route => {
          const res = await route.fetch();
          const body = (await res.text()).replace("lic.view === false ? 'Request to view'", "true ? 'Request to view'");
          if (body.indexOf("true ? 'Request to view'") < 0) throw new Error('collection-data.js no longer has the restricted-media line this export switches on');
          await route.fulfill({ response: res, body });
        });
      }
      await page.goto(base + p.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);
      if (p.restricted) await page.unroute('**/collection-data.js*');
      const title = p.name || (await page.title());
      if (!wroteShared) {
        const header = await convert(page, 'header');
        const overlay = await convert(page, '#uom-search-popover');
        const footer = await convert(page, 'footer');
        const shared = { note: 'The same on every page, so it is not repeated in the page files.' };
        fs.writeFileSync(path.join(outDir, 'site-header.md'), doc('Site header', { ...shared, url: 'every page', source: 'src/partials/header.html' }, { copy: header.copy + '\n\n' + overlay.copy, ui: [...header.ui, ...overlay.ui] }));
        fs.writeFileSync(path.join(outDir, 'site-footer.md'), doc('Site footer', { ...shared, url: 'every page', source: 'src/partials/footer.html' }, footer));
        wroteShared = true;
      }
      // The shared parts and the skip link are written once; take them out before reading the page's own copy
      await page.evaluate(() => document.querySelectorAll('header, footer, #uom-search-popover, .skip-link, article').forEach(el => el.remove()));
      const out = await convert(page, 'body');
      fs.writeFileSync(path.join(outDir, p.slug + '.md'), doc(NAMES[p.slug] || title.split(' — ')[0], p, out));
      index.push([p.slug, NAMES[p.slug] || title.split(' — ')[0], p.url]);
      console.log(p.slug.padEnd(42), out.copy.split('\n').length, 'lines,', out.ui.length, 'interface items');
    }
    fs.writeFileSync(path.join(outDir, 'README.md'), [
      '# Page copy', '',
      `The words on each page of ${SITE}, one Markdown file per page.`, '',
      '## How to use these files', '',
      '- **Content producers:** read or review the page copy at the top of each file. To change it, edit the page named in "Source file", then run `npm run export:page-copy` to refresh these files. Do not edit these files by hand: they are overwritten.',
      '- **Testers:** compare each file with the live page. The page copy is the text on the page, in reading order. The "Interface text" table at the bottom lists every button, form field, dropdown and image description, so you can check each one is there and spelled the same.', '',
      'The header, footer and search overlay are the same on every page, so they are written once: [site-header.md](site-header.md) and [site-footer.md](site-footer.md).', '',
      '## Pages', '',
      '| Page | File | URL |', '| --- | --- | --- |',
      ...index.map(([slug, t, u]) => `| ${t} | [${slug}.md](${slug}.md) | \`${u}\` |`), ''
    ].join('\n'));
    console.log(`Wrote ${index.length} pages, the header and footer, and README.md to ${path.relative(root, outDir)}`);
  } finally {
    await browser.close();
    if (server) server.kill();
  }
})().catch(e => { console.error(e); process.exit(1); });
