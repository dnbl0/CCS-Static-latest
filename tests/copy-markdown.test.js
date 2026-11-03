// scripts/lib/dom-to-markdown.js turns a rendered page's copy into Markdown (run in the page by scripts/export-page-copy.js).
// The expected text below is written by hand from the fixture, not produced by the code.
const { ROOT, fail, ok, finish, path } = require('./lib');
const { findChromium } = require(path.join(ROOT, 'scripts', 'lib', 'chromium'));
const { domToMarkdown } = require(path.join(ROOT, 'scripts', 'lib', 'dom-to-markdown'));

const FIXTURE = `<!doctype html><html><body>
<header><p>Site header</p></header>
<main>
  <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Help and support</li></ol></nav>
  <h1>Help and support</h1>
  <p>Find <a href="/help/faq">answers</a> to <strong>common</strong> questions.</p>
  <ul><li>First</li><li>Second <em>point</em><ul><li>Nested</li></ul></li></ul>
  <ol><li>One</li><li>Two</li></ol>
  <p class="sr-only">Read only by screen readers</p>
  <p hidden>Not shown</p>
  <p style="display:none">Also not shown</p>
  <script>var x = 1;</script>
  <button type="button">Save</button>
  <label for="q">Search</label><input id="q" placeholder="Type here">
  <img src="a.jpg" alt="A violin">
  <table><tr><th>Name</th><th>Count</th></tr><tr><td>Violin</td><td>3</td></tr><tr><td>Subject</td><td><p>Music</p><p>Strings</p></td></tr></table>
  <ul class="faq"><li><h3>How do I search?</h3><p>Use the search box.</p></li></ul>
  <p class="links"><a href="/a">One</a><a href="/b">Two</a></p>
  <h2>Contact</h2>
  <p>Line one<br>line two</p>
</main>
<footer><p>Site footer</p></footer>
</body></html>`;

const EXPECTED = `Home › Help and support

# Help and support

Find [answers](/help/faq) to **common** questions.

- First
- Second *point*
  - Nested

1. One
2. Two

**Button:** Save

**Field:** Search (placeholder: "Type here")

*Image: A violin*

| Name | Count |
| --- | --- |
| Violin | 3 |
| Subject | Music; Strings |

- **How do I search?**  
  Use the search box.

[One](/a) [Two](/b)

## Contact

Line one
line two`;

(async () => {
  const { chromium, exe } = findChromium();
  if (!exe) { console.log('no Chromium here: skipped'); return; }
  const browser = await chromium.launch({ executablePath: exe });
  try {
    const page = await browser.newPage();
    await page.setContent(FIXTURE);
    const md = await page.evaluate(domToMarkdown, 'main');
    md.trim() === EXPECTED ? ok('page copy becomes Markdown: headings, links, emphasis, lists, controls, images, tables') : fail('Markdown differs.\n--- got ---\n' + md.trim() + '\n--- want ---\n' + EXPECTED);
    const sep = await page.evaluate(domToMarkdown, { selector: 'main', separateUi: true });
    !/\*\*Button:\*\*|\*\*Field:\*\*|Image: A violin/.test(sep.copy) ? ok('with separateUi the copy has no interface text in it') : fail('interface text should not be in the copy:\n' + sep.copy);
    JSON.stringify(sep.ui) === JSON.stringify([{ type: 'Button', text: 'Save' }, { type: 'Field', text: 'Search (placeholder: "Type here")' }, { type: 'Image alt text', text: 'A violin' }])
      ? ok('with separateUi the interface text is listed on its own, with its type') : fail('interface text list differs: ' + JSON.stringify(sep.ui));
    const all = await page.evaluate(domToMarkdown, 'body');
    /Site header/.test(all) && /Site footer/.test(all) ? ok('the whole body includes header and footer when asked') : fail('body should include header and footer');
    !/Read only by screen readers|Not shown|Also not shown|var x/.test(md) ? ok('screen-reader-only, hidden and script text is left out') : fail('hidden text leaked into the copy');
  } finally { await browser.close(); }
  finish('copy-markdown');
})().catch(e => { console.error(e); process.exit(1); });
