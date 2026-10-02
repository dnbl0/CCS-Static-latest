// Style hygiene: pages must not carry presentation inline.
//  - no <style> blocks (styles live in public/styles/**)
//  - no style="..." attributes except ones that only pass runtime values through CSS custom properties,
//    i.e. style="--dyn-padding:{{ padSum }}" (the property that uses the value lives in a stylesheet)
//  - no style-hover="..." attributes (use :hover rules)
//  - every <link rel=stylesheet> to a local file resolves (covered more generally by page-integrity)
const { PUBLIC, fail, ok, walk, finish, fs, path } = require('./lib');

const pages = walk(PUBLIC, p => p.endsWith('.html'));
const rel = p => path.relative(PUBLIC, p);
let problems = 0;

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')   // inline scripts may build markup strings; they are not page markup
    .replace(/<!--[\s\S]*?-->/g, '');
  if (/<style\b/i.test(html)) { fail(`${rel(file)}: contains a <style> block (move it to public/styles/)`); problems++; }
  if (/\sstyle-hover\s*=/i.test(html)) { fail(`${rel(file)}: contains a style-hover attribute (use a :hover rule)`); problems++; }
  const re = /\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let m;
  while ((m = re.exec(html))) {
    const value = (m[2] != null ? m[2] : m[3]).trim();
    // allowed: only custom-property declarations, each of the form --name:value
    const decls = value.split(/;(?![^{]*\}\})/).map(s => s.trim()).filter(Boolean);
    const bad = decls.filter(d => !/^--[\w-]+\s*:/.test(d));
    if (bad.length) {
      const line = html.slice(0, m.index).split('\n').length;
      fail(`${rel(file)}:${line}: inline style "${value.slice(0, 70)}" (move it to a class in public/styles/pages/)`);
      problems++;
    }
  }
}
if (!problems) ok(`${pages.length} pages: no <style> blocks, no presentational inline styles`);
finish('no-inline-styles');
