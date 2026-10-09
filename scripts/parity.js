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
  ['/contact', '/contact', ['.page-banner h1', '.page-banner__desc', '.side-nav__title', '.side-nav__link', '.help-layout__content h2', '.help-layout__content h3', '.help-layout__content li']],
  ['/help/index.html', '/help', ['.page-banner h1', '.side-nav__title', '.side-nav__link', '.help-section__heading', '.help-section__description',
    '.help-section__subheading', '.help-section__text', '.cta-band__heading']],
  ['/help/search-tips.html', '/help/search-tips', ['.page-banner h1', '.side-nav__link', '.help-search-tips__heading', '.contact-box__title']],
  ['/help/indigenous-data', '/help/indigenous-data', ['.page-banner h1', '.side-nav__link', '.help-layout__content h2', '.help-layout__content p']]
];

// Header navigation labels: the static `.ccs-nav*` and Rails `.site-nav*` classes differ, so they are compared in pairs. Both must
// match the UniMelb navigation (e.g. students.unimelb.edu.au): 16px / 600 / -0.16px primary labels with a pale-blue hover, a
// 2px inset blue focus ring, and 18px dropdown items. The font stack is left out like the other font-family checks.
const NAV_PROPS = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'backgroundColor', 'textDecorationLine',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'columnGap', 'minHeight', 'boxShadow', 'outlineStyle', 'outlineOffset'];
const NAV_PAIRS = [
  ['nav link', '.ccs-nav__primary > ul > li > a', '.site-nav > ul > li > a'],
  ['nav trigger', '.ccs-nav__trigger', '.site-nav__trigger'],
  ['nav trigger label', '.ccs-nav__trigger > span', '.site-nav__trigger > span'],
  ['dropdown title', '.ccs-nav__panel-title', '.site-nav__panel-title'],
  ['dropdown item', '.ccs-nav__panel-list a', '.site-nav__panel-list a'],
  ['audience link', '.ccs-nav__top a', '.site-header__utility a'],
  ['site title', '.ccs-nav__title', '.site-header__title']
];
const closeDialogs = (page) => page.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
async function navStyles(page, url, width) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await closeDialogs(page);
  const read = (selector) => page.locator(selector).first().evaluate((el, props) => {
    const style = getComputedStyle(el); return Object.fromEntries(props.map((p) => [p, style[p]]));
  }, NAV_PROPS);
  return { read };
}
async function checkNav(browser, width) {
  let failures = 0;
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const sides = [];
  for (const [i, base] of [STATIC, RAILS].entries()) {
    const { read } = await navStyles(page, base + '/', width);
    const out = {};
    for (const [label, a, b] of NAV_PAIRS) out[label] = await read(i ? b : a);
    if (width >= 1024) {
      const trigger = i ? '.site-nav__trigger' : '.ccs-nav__trigger', link = i ? '.site-nav > ul > li > a' : '.ccs-nav__primary > ul > li > a';
      await page.locator(trigger).first().hover(); await page.waitForTimeout(250); out['trigger hover'] = await read(trigger);
      await page.mouse.move(5, 800);
      await page.locator(link).first().hover(); await page.waitForTimeout(250); out['link hover'] = await read(link);
      await page.mouse.move(5, 800);
      await page.locator(trigger).first().focus(); await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab'); await page.waitForTimeout(250);
      out['trigger focus'] = await read(trigger);
      await page.locator(trigger).first().click(); await page.waitForTimeout(250); out['trigger open'] = await read(trigger);
      await page.mouse.move(5, 800);
    }
    sides.push(out);
  }
  // Values measured on students.unimelb.edu.au (desktop): primary labels, their hover, and dropdown items.
  const UNIMELB = { 'nav trigger': { fontSize: '16px', fontWeight: '600', letterSpacing: '-0.16px', lineHeight: '16px', color: 'rgb(255, 255, 255)', paddingTop: '8px', paddingLeft: '12px' },
    'trigger hover': { backgroundColor: 'rgb(163, 228, 247)', color: 'rgb(0, 15, 70)' },
    'dropdown item': { fontSize: '18px', fontWeight: '600', letterSpacing: '-0.135px' } };
  if (width >= 1024) {
    for (const [side, out] of [['static', sides[0]], ['Rails', sides[1]]]) for (const [label, want] of Object.entries(UNIMELB)) {
      const diffs = Object.keys(want).filter((p) => out[label][p] !== want[p]).map((p) => `${p}: ${side} ${out[label][p]}, UniMelb ${want[p]}`);
      if (diffs.length) { console.error(`FAIL: ${width}px header ${label} differs from UniMelb\n   ${diffs.join('\n   ')}`); failures++; }
    }
  }
  for (const label of Object.keys(sides[0])) {
    const diffs = NAV_PROPS.filter((p) => sides[0][label][p] !== sides[1][label][p]).map((p) => `${p}: static ${sides[0][label][p]}, Rails ${sides[1][label][p]}`);
    if (diffs.length) { console.error(`FAIL: ${width}px header ${label}\n   ${diffs.join('\n   ')}`); failures++; }
  }
  await context.close();
  return failures;
}

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
  for (const width of WIDTHS) failures += await checkNav(browser, width);
  await browser.close();
  console.log(`\nparity: ${failures} failure(s)`);
  process.exit(failures ? 1 : 0);
})();
