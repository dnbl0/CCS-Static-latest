// The browser suites (accessibility, advanced filters, search bar, ...) skip themselves when no Chromium is found, which is
// right on a laptop and wrong in CI, where a skipped accessibility scan looks like a pass. In CI (CI=true) this fails
// when there is no Chromium, so the suites cannot be skipped there.
const { fail, ok, finish } = require('./lib');
const { findChromium } = require('../scripts/lib/chromium');

const { exe } = findChromium();
if (process.env.CI && !exe) fail('CI has no Chromium: install it (npx playwright-core install --with-deps chromium) so the browser suites run instead of skipping');
else ok(exe ? `Chromium found: the browser suites run` : 'no Chromium here (not CI): the browser suites will skip');
finish('browser-available');
