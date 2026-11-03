// Every file in docs/page-copy/ shows the full live URL of its page (written by scripts/export-page-copy.js).
const { ROOT, fail, ok, finish, path } = require('./lib');
const fs = require('fs');

const SITE = 'https://enterprise-services-group.github.io/CCS-2026-MVP';
const dir = path.join(ROOT, 'docs', 'page-copy');
const PAGES = {
  home: '/', about: '/about.html', collections: '/collections/', help: '/help/',
  'collections-record': '/collections/record.html?item=CA-010071',
  'search-advanced-search': '/search/advanced-search.html', 'search-search-results': '/search/search-results.html',
  'search-no-results': '/search/search-results.html?q=zzzzqqqq',
  'collections-record-not-found': '/collections/record.html?item=CA-999999',
  'collections-record-restricted-media': '/collections/record.html?item=CA-000001'
};

for (const [slug, p] of Object.entries(PAGES)) {
  const want = SITE + p;
  const first = fs.readFileSync(path.join(dir, slug + '.md'), 'utf8').split('\n')[0];
  first.includes(`**URL:** ${want}`) ? ok(`${slug}.md starts with its full URL`) : fail(`${slug}.md first line should contain "**URL:** ${want}", got: ${first}`);
}
for (const f of ['site-header', 'site-footer']) {
  const first = fs.readFileSync(path.join(dir, f + '.md'), 'utf8').split('\n')[0];
  first.includes(`${SITE}/`) && /every page/.test(first) ? ok(`${f}.md gives the home page URL and says it is on every page`) : fail(`${f}.md first line: ${first}`);
}
const readme = fs.readFileSync(path.join(dir, 'README.md'), 'utf8');
Object.values(PAGES).every(p => readme.includes(SITE + p)) ? ok('README.md lists the full URL of every page') : fail('README.md is missing a full page URL');
finish('page-copy-urls');
