// Compares the static pages with their Rails twins: for a list of selectors on each page, the computed text, colour,
// spacing and display values must match at desktop and mobile widths. Sizes that depend on the fonts that loaded
// (width, height, font-family) are left out, so the check holds with or without web fonts.
//
// Usage: STATIC_URL=http://localhost:3100 RAILS_URL=http://localhost:3200 node scripts/parity.js
//   PLAYWRIGHT_CHROMIUM_PATH   Chromium to use (default: Playwright's own)
//   PARITY_LIBS                directory holding react, react-dom and @babel/standalone node_modules, served in place
//                              of unpkg.com for the static pages' template runtime (only needed offline)
const path = require('path');
const { chromium } = require('playwright-core');

const STATIC = process.env.STATIC_URL || 'http://localhost:3100';
const RAILS = process.env.RAILS_URL || 'http://localhost:3200';
const WIDTHS = [1440, 390];
const PROPS = ['display', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'textAlign', 'textDecorationLine',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderBottomWidth', 'borderLeftColor'];

// [static path, Rails path, selectors both pages carry]
const PAGES = [
  ['/', '/', ['.ccs-hero__title', '.ccs-hero__text', '.ccs-intro', '.ccs-section__heading', '.ccs-card__title a', '.ccs-card__text',
    '.ccs-help__title', '.ccs-help__text', '.ccs-faq__text', '.ccs-acc__summary-text']],
  ['/collections/', '/collections', ['.page-banner h1', '.page-banner__desc', '.ct-listing__title', '.ct-listing__lead',
    '.ccs-section__heading', '.ccs-card__title a', '.ccs-card__text', '.pathfinder__title', '.pathfinder__summary']],
  ['/collections/grainger-museum/', '/collections/grainger-museum', ['.campaign-banner-split__heading', '.campaign-banner-split__text',
    '.campaign-banner-split__content a.button', '.collection-section__text', '.def-table__term', '.def-table__text', '.contact-box__title',
    '.contact-box__term', '.contact-box__para', '.ct-listing__title']],
  ['/contact', '/contact', ['.page-banner h1', '.contact-cards__title', '.contact-cards__label', '.contact-cards__link', '.collection-section__text']],
  ['/help/index.html?topic=faq', '/help?topic=faq', ['.page-banner h1', '.side-nav__title', '.side-nav__link', '.help-faq__question',
    '.help-faq__answer', '.contact-box__title']],
  ['/help/indigenous-data', '/help/indigenous-data', ['.page-banner h1', '.side-nav__link', '.help-layout__content h2', '.help-layout__content p']]
];

async function snapshot(page, url, selectors) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  return page.evaluate(([selectors, props]) => Object.fromEntries(selectors.map((selector) => {
    const elements = [...document.querySelectorAll(selector)];
    const style = elements[0] && getComputedStyle(elements[0]);
    return [selector, { count: elements.length, style: style ? Object.fromEntries(props.map((p) => [p, style[p]])) : null }];
  })), [selectors, PROPS]);
}

(async () => {
  const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {});
  const libs = process.env.PARITY_LIBS;
  let failures = 0;
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    if (libs) {
      await page.route(/unpkg\.com/, (route) => {
        const url = route.request().url();
        const file = url.includes('babel') ? '@babel/standalone/babel.min.js' : url.includes('react-dom') ? 'react-dom/umd/react-dom.production.min.js' : 'react/umd/react.production.min.js';
        route.fulfill({ path: path.join(libs, 'node_modules', file), contentType: 'text/javascript' });
      });
      await page.route(/fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr/, (route) => route.abort());
    }
    for (const [staticPath, railsPath, selectors] of PAGES) {
      const [a, b] = [await snapshot(page, STATIC + staticPath, selectors), await snapshot(page, RAILS + railsPath, selectors)];
      for (const selector of selectors) {
        const [x, y] = [a[selector], b[selector]];
        const label = `${width}px ${railsPath} ${selector}`;
        if (!x.count || !y.count) { console.error(`FAIL: ${label} is ${x.count ? 'missing from Rails' : y.count ? 'missing from static' : 'on neither page'}`); failures++; continue; }
        if (x.count !== y.count) { console.error(`FAIL: ${label} appears ${x.count}x in static, ${y.count}x in Rails`); failures++; }
        const diffs = PROPS.filter((p) => x.style[p] !== y.style[p]).map((p) => `${p}: static ${x.style[p]}, Rails ${y.style[p]}`);
        if (diffs.length) { console.error(`FAIL: ${label}\n   ${diffs.join('\n   ')}`); failures++; }
      }
    }
    await context.close();
  }
  await browser.close();
  console.log(`\nparity: ${failures} failure(s)`);
  process.exit(failures ? 1 : 0);
})();
