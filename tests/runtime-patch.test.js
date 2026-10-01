// public/support.js is the generated DC runtime. We carry one local patch: resolved {{ }} interpolations are
// rendered as plain text instead of being wrapped in <span class="sc-interp"> (the wrapper spans cluttered the DOM,
// including the filters modal). If the runtime is regenerated and loses the patch, this test fails.
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');

const src = fs.readFileSync(path.join(PUBLIC, 'support.js'), 'utf8');
if (/h\("span",\s*\{\s*key:\s*i,\s*className:\s*"sc-interp"\s*\},\s*String\(v\)\)/.test(src)) {
  fail('support.js wraps interpolated text in span.sc-interp again - re-apply the local patch (return String(v);)');
} else {
  ok('support.js: interpolations render as plain text (no sc-interp wrapper spans)');
}
finish('runtime-patch');
