// The two links in Help's "Indigenous Cultural Data and Access" lead to other University sites, so each ends in the open-in-new icon
// (the Rails Help page has the same: ead-ccs-test/test/controllers/pages_test.rb) and says "external link" to screen readers.
const { PUBLIC, fail, ok, finish, path, fs } = require('./lib');

const html = fs.readFileSync(path.join(PUBLIC, 'help', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(PUBLIC, 'styles', 'pages', 'help.css'), 'utf8');
const check = (name, cond, detail) => (cond ? ok(name) : fail(name + (detail ? ' -> ' + detail : '')));

for (const [href, label] of [
  ['https://www.unimelb.edu.au/murmuk-djerring', 'Read about our Indigenous priorities'],
  ['https://www.unimelb.edu.au/indigenous/acknowledgement-of-country', 'Read our full Acknowledgement of Country']
]) {
  const m = html.match(new RegExp(`<a href="${href.replace(/[./]/g, '\\$&')}">([\\s\\S]*?)</a>`));
  check(`the link to ${href} exists`, !!m);
  if (!m) continue;
  const inner = m[1];
  check(`"${label}" is followed by the open-in-new icon, inside the link`, inner.startsWith(label) && /<span class="blacklight-icons blacklight-icons-open_in_new">\s*<svg[^>]*aria-hidden="true"/.test(inner.slice(label.length)));
  check('and by "external link" for screen readers', /<span class="sr-only"> \(external link\)<\/span>/.test(inner.slice(label.length)));
}
check('only those two links in Help have the icon', (html.match(/blacklight-icons-open_in_new/g) || []).length === 2);
check('the shared stylesheet sizes the icon next to the label', /\.help-section__text\s+\.blacklight-icons/.test(css) && /\.help-section__text\s+\.blacklight-icons svg/.test(css));
finish('external-link-icons');
