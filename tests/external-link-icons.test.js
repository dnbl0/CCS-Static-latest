// A link in Help's content that leads to another website ends in the open-in-new icon and says "external link" to screen readers (the Rails
// Help page has the same: ead-ccs-test/test/controllers/pages_test.rb). Links within this site, and email links, have none.
const { PUBLIC, fail, ok, finish, path, fs } = require('./lib');

const html = fs.readFileSync(path.join(PUBLIC, 'help', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(PUBLIC, 'styles', 'pages', 'help.css'), 'utf8');
const check = (name, cond, detail) => (cond ? ok(name) : fail(name + (detail ? ' -> ' + detail : '')));

const content = html.slice(html.indexOf('help-layout__content'), html.indexOf('</main>'));
const links = [...content.matchAll(/<a [^>]*href="(https?:\/\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
check('Help has at least three links to other websites', links.length >= 3, `found ${links.length}`);
for (const [, href, inner] of links) {
  const label = inner.split('<')[0];
  check(`${href}: "${label}" is followed by the open-in-new icon, inside the link`,
    /<span class="blacklight-icons blacklight-icons-open_in_new">\s*<svg[^>]*aria-hidden="true"/.test(inner.slice(label.length)));
  check(`${href}: and the link says "external" to screen readers`, /<span class="sr-only">[^<]*\bexternal\b[^<]*<\/span>/.test(inner.slice(label.length)));
}
check('no other link in Help has the icon', (content.match(/blacklight-icons-open_in_new/g) || []).length === links.length);
check('email links have no icon', ![...content.matchAll(/<a [^>]*href="mailto:[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].some(m => /blacklight-icons/.test(m[1])));
check('the shared stylesheet sizes the icon next to the label', /\.help-layout__content\s+\.blacklight-icons\s*\{/.test(css) && /\.help-layout__content\s+\.blacklight-icons svg\s*\{/.test(css));
finish('external-link-icons');
