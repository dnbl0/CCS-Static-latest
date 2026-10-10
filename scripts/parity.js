// Compares the static pages with their Rails twins: for a list of selectors on each page, the computed text, colour,
// spacing and display values must match at desktop and mobile widths. Sizes that depend on the fonts that loaded
// (width, height, font-family) are left out, so the check holds with or without web fonts.
//
// Usage: STATIC_URL=http://localhost:3100 RAILS_URL=http://localhost:3200 node scripts/parity.js
//   PLAYWRIGHT_CHROMIUM_PATH   Chromium to use (default: Playwright's own)
//   PARITY_RESULTS             'required' fails (instead of skipping the search results checks) when Rails has no Solr records
//   PARITY_ONLY                'results' runs only the search results checks (quicker to iterate on)
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
  ['/help/index.html?topic=faq', '/help?topic=faq', ['.page-banner h1', '.side-nav__title', '.side-nav__link', '.help-faq__question',
    '.help-faq__answer', '.contact-box__title']],
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

// Search results: the static `/search/search-results` and the Rails `/catalog` are built from different markup (the static page
// from a template, Rails from Blacklight), so elements are compared in pairs [label, static selector, Rails selector, options]
// for the same query, at rest and in the states a visitor reaches (hover, keyboard focus). The static design is the reference.
// Options: scene (which page state to measure in, see SCENES), states ('hover' and/or 'focus'), only ('desktop' or 'mobile'),
// props (compare only these properties: images and icons), size (also compare width and height: fixed-size controls only), skip (properties that differ by design). A selector can end in
// ::before or ::after. Only leaf elements are compared (the text, box or control itself), so inherited values on wrappers do not
// raise false alarms, and outline and border colours are read only where an outline or border is drawn.
//
// Left out on purpose, because the two cannot match by design (documented here and in the pull request):
//  - page width and column positions: the static page centres its content in a 1200px column, the Rails page is fluid;
//  - the result count and filter chips on phones, which the static page hides (the pairs are compared at desktop width);
//  - the filter rail on phones: the static page opens a modal with its own markup (.search-results-filters*), Rails a drawer holding the same rail as
//    on desktop, so the rail is compared at desktop width only;
//  - focus rings drawn in the static page's pale cyan (--blue-400, about 1.9:1 on white) keep Rails' blue ring (--ccs-focus-ring, 5:1): the
//    colour is skipped for those pairs, the ring's width and offset still match;
//  - the sort and per-page menus: custom listboxes on the static page, Bootstrap/Blacklight dropdowns on Rails (the toggle buttons
//    that open them are compared, the open menus are not), and the static default label "Sort by" against Rails "Sort by relevance";
//  - the static "Save search" and "Records mode" controls, the in-panel filter search box, the "N more" expanders and the range
//    slider's handles: widgets Rails does not have, or has from another library;
//  - the numbers and records themselves: the static page lists the 735 sample records, Rails the Solr index.
const RESULT_REST = ['display', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'backgroundColor', 'textDecorationLine',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth',
  'borderLeftWidth', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderTopLeftRadius', 'boxShadow', 'opacity'];
const RESULT_FOCUS = ['color', 'backgroundColor', 'boxShadow', 'textDecorationLine', 'outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset'];
const NO_MEDIA = ':not(:has(.search-results-article__link-image))';
const CARD = `.search-results-main-content__article${NO_MEDIA}`;
const RESULT_PAIRS = [
  // result card (mosaic view): the card, its title, the metadata lines
  ['card', CARD, '.result-card--no-media', { states: ['hover'], skip: ['color', 'marginBottom'] }], // marginBottom: the gap between cards is the masonry gutter on Rails
  ['card title', `${CARD} .search-results-article__link--v4`, '.result-card--no-media .document-title-heading a', { states: ['hover', 'focus'] }],
  ['card metadata', `${CARD} .search-results-article__line`, '.result-card--no-media .result-card__lines li', { skip: ['display'] }],
  // result card with a thumbnail
  ['card thumbnail', '.search-results-article__link-image', '.result-card__media img', { scene: 'media', props: ['display', 'opacity', 'borderTopLeftRadius'] }],
  // toolbar
  ['result count', '.search-results-summary__heading', '.constraints-label', { only: 'desktop', skip: ['display'] }],  // the static page hides the count and the chips on phones (visually hidden in the sticky bar)
  ['sort button', '.search-results-search-tools__button-toggle-sort', '.sort-dropdown .dropdown-toggle', { states: ['hover', 'focus'], skip: ['fontSize', 'display', 'lineHeight', 'paddingRight', 'paddingLeft', 'color', 'backgroundColor'] }],
  ['per-page button', '.search-results-summary__button-toggle-pp', '.per_page-dropdown .dropdown-toggle', { states: ['hover', 'focus'], skip: ['display', 'lineHeight', 'paddingRight', 'paddingLeft', 'color', 'backgroundColor'] }],
  ['list view button', '.search-results-view__button-set-list', '.view-type-list', { states: ['hover', 'focus'], size: true, skip: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] }],
  ['mosaic view button (selected)', '.search-results-view__button-set-grid', '.view-type-masonry', { size: true, skip: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] }],
  ['filters button', '.search-results-search-tools__button-filter-btn', '.filters-toggle', { only: 'mobile', states: ['focus'] }],
  // active filter chips: the query chip, its text and its remove button
  ['filter chip', '.search-results-pill', '.applied-filter', { only: 'desktop', skip: ['display', 'color', 'fontSize', 'lineHeight'] }],
  ['filter chip text', '.search-results-pill__text', '.applied-filter .constraint-value', { only: 'desktop', skip: ['display'] }],
  ['filter chip remove', '.search-results-pill__remove', '.applied-filter .remove', { only: 'desktop', states: ['hover', 'focus'], props: ['backgroundColor', 'color'], skip: ['outlineColor'] }],
  // facet rail (on small screens the rail is a drawer: the Filters button opens it)
  ['rail title', '.facet-rail__title', '.filter-sidebar__heading', { only: 'desktop', scene: 'facets' }],
  ['rail switch caption', '.facet-rail__switches .facet-rail__name', '.filter-sidebar__switch-caption', { only: 'desktop', scene: 'facets' }],
  ['rail switch track', '.filter-switch__track', '.filter-switch__track', { only: 'desktop', scene: 'facets', size: true, skip: ['color'] }],
  ['rail switch label', '.filter-switch__label', '.filter-switch__label', { only: 'desktop', scene: 'facets', skip: ['color'] }],
  ['facet name', '.facet-rail__name#rail-name-coll', '.facet-title', { only: 'desktop', scene: 'facets', skip: ['display'] }],
  ['facet toggle', '.facet-rail__toggle', '.facet-field-heading .accordion-button', { only: 'desktop', scene: 'facets', states: ['hover', 'focus'], skip: ['outlineColor', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'display'] }],
  ['facet toggle value', '.facet-rail__value', '.facet-summary', { only: 'desktop', scene: 'facets' }],
  ['facet option label', '.facet-rail__label', '.facet-values .facet-select', { only: 'desktop', scene: 'facets', states: ['hover'], skip: ['display', 'paddingTop', 'paddingBottom'] }],  // Rails pads the link for a bigger target
  ['facet option count', '.facet-rail__count', '.facet-values .facet-count', { only: 'desktop', scene: 'facets' }],
  ['facet checkbox', '.facet-rail__box', '.facet-values .facet-select::before', { only: 'desktop', scene: 'facets', size: true, skip: ['display', 'color'] }],
  ['facet checkbox (ticked)', '.facet-rail__option[aria-checked="true"] .facet-rail__box', '.facet-values .facet-select.is-selected::before', { only: 'desktop', scene: 'selected', size: true, skip: ['display', 'color'] }],
  ['rail clear all', '.facet-rail__clear', '.filter-sidebar__clear', { only: 'desktop', scene: 'selected', states: ['hover', 'focus'], skip: ['display', 'outlineColor'] }],
  // pagination
  ['pagination page link', '.search-results-pagination__button-go:not([aria-current])', '.pagination .page-item:not(.active) .page-link[href]', { scene: 'results', states: ['hover'], skip: ['display', 'lineHeight', 'paddingTop', 'paddingBottom', 'backgroundColor'] }],  // Rails tints a hovered page number, the static page does not
  ['pagination current page', '.search-results-pagination__button-go[aria-current="page"]', '.pagination .page-item.active .page-link', { skip: ['display', 'lineHeight', 'paddingTop', 'paddingBottom'] }],
  ['pagination next button', '.search-results-pagination__button-next-page', '.pagination__item--next .pagination__button', { states: ['hover', 'focus'], skip: ['display', 'lineHeight'] }],
  // floating back-to-top button (shown once the page is scrolled; not on phones)
  ['back to top', '.back-to-top', '.back-to-top', { scene: 'scrolled', only: 'desktop', states: ['hover', 'focus'], size: true, skip: ['outlineColor'] }],
  // empty state
  ['empty title', '.search-results-main-content__heading-no-records-match', '.results-empty__title', { scene: 'empty' }],
  ['empty text', '.search-results-main-content__text--v2', '.results-empty__text', { scene: 'empty' }],
  ['empty button', '.search-results-main-content__button-clear-all--v2', '.results-empty__button', { scene: 'empty', states: ['hover', 'focus'] }]
];
// How each page is brought into the state a scene measures
const FACET_URL = 'f%5Bcollection_ssim%5D%5B%5D=Medical+History+Museum';
const SCENES = {
  results: { static: '/search/search-results?q=museum', rails: '/catalog?q=museum' },
  media: { static: '/search/search-results?q=museum', rails: '/catalog?q=tone-tool' }, // a query whose first Rails records have thumbnails
  scrolled: { static: '/search/search-results?q=museum', rails: '/catalog?q=museum', scroll: true },
  empty: { static: '/search/search-results?q=zzzqxqx', rails: '/catalog?q=zzzqxqx' },
  facets: { static: '/search/search-results?q=museum', rails: '/catalog?q=museum', rail: true },
  selected: { static: '/search/search-results?q=museum', rails: `/catalog?q=museum&${FACET_URL}`, rail: true, tick: true }
};
const RAIL = { static: { open: '.search-results-search-tools__button-filter-btn', toggle: '.facet-rail__toggle', option: '.facet-rail__option' },
  rails: { open: '.filters-toggle', toggle: '.facet-field-heading .accordion-button', option: '.facet-values .facet-select:not(.is-selected)' } };
async function openScene(page, scene, side, width) {
  const spec = SCENES[scene];
  await page.goto((side === 'static' ? STATIC : RAILS) + spec[side], { waitUntil: 'networkidle' });
  await closeDialogs(page);
  const accept = page.locator('.search-results-ack-title__button-accept-ack').first();
  if (await accept.isVisible().catch(() => false)) { await accept.click(); await page.waitForTimeout(300); }
  if (spec.rail) {
    const r = RAIL[side];
    if (width < 1024) { await page.locator(r.open).first().click(); await page.waitForTimeout(500); }
    const toggle = page.locator(r.toggle).first();
    if (await toggle.getAttribute('aria-expanded') !== 'true') { await toggle.click(); await page.waitForTimeout(500); }
    if (spec.tick && side === 'static') { await page.locator(r.option).first().click(); await page.waitForTimeout(500); }
  }
  if (spec.scroll) { await page.evaluate(() => window.scrollTo(0, 1500)); await page.waitForTimeout(900); }
}
// One element's computed values (the first match); `size` adds its box
function readResult(page, selector, props, size) {
  const [element, pseudo] = selector.split(/(?=::(?:before|after))/);
  return page.locator(element).first().evaluate((el, [props, pseudo, size]) => {
    const style = getComputedStyle(el, pseudo || null); const out = Object.fromEntries(props.map((p) => [p, style[p]]));
    // an outline or a border that is not drawn has no colour to compare
    if (style.outlineStyle === 'none' || style.outlineWidth === '0px') for (const p of ['outlineColor', 'outlineOffset', 'outlineWidth']) if (p in out) out[p] = '-';
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) if (style[`border${side}Width`] === '0px' && `border${side}Color` in out) out[`border${side}Color`] = '-';
    if (size) { const r = el.getBoundingClientRect(); out.width = pseudo ? style.width : r.width + 'px'; out.height = pseudo ? style.height : r.height + 'px'; }
    return out;
  }, [props, pseudo, size]).catch(() => null);
}
async function measurePair(page, selector, [label, , , opts], out, skips) {
  for (const key of [label, ...(opts.states || []).map((s) => `${label} ${s}`)]) skips[key] = opts.skip || [];
  const loc = page.locator(selector.split(/(?=::(?:before|after))/)[0]).first();
  if (!(await loc.count())) { out[label] = null; return; }
  await page.mouse.move(1, 1); // the pointer rests in the corner, off the elements measured at rest
  await loc.evaluate((el) => el.scrollIntoView({ block: 'center' })).catch(() => {});
  await page.waitForTimeout(300); // let colour transitions finish
  out[label] = await readResult(page, selector, opts.props || RESULT_REST, opts.size);
  for (const state of opts.states || []) {
    await page.mouse.move(1, 1); await page.evaluate(() => document.activeElement && document.activeElement.blur());
    if (state === 'hover') await loc.hover({ force: true }); else { await page.keyboard.press('F9'); await loc.focus(); } // a key press that does nothing (not Tab: it scrolls, Esc: it closes menus) makes the focus ring show
    await page.waitForTimeout(300);
    out[`${label} ${state}`] = await readResult(page, selector, state === 'focus' ? RESULT_FOCUS : (opts.props || RESULT_REST), opts.size);
  }
  await page.mouse.move(1, 1); await page.evaluate(() => document.activeElement && document.activeElement.blur());
}
// Colours within 1 of each channel count as equal (the Rails token set rounds a few palette entries by one)
const same = (a, b) => a === b || (/^rgba?\(/.test(a) && /^rgba?\(/.test(b) && a.match(/[\d.]+/g).every((n, i) => Math.abs(n - b.match(/[\d.]+/g)[i]) <= 1));
// The Rails results page needs Solr. Without it (CI's parity job has none) no cards or facets render, so the results checks are
// skipped with a note; PARITY_RESULTS=required turns that into a failure.
async function railsHasResults(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(RAILS + SCENES.results.rails, { waitUntil: 'networkidle' });
    return (await page.locator('.result-card').count()) > 0 && (await page.locator('.facet-field-heading .accordion-button').count()) > 0;
  } catch (e) { return false; } finally { await context.close(); }
}
async function checkResults(browser, width) {
  let failures = 0;
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const desktop = width >= 1024;
  const sides = { static: {}, rails: {} }, skips = {};
  const pairs = RESULT_PAIRS.filter(([, , , opts = {}]) => !(opts.only === 'mobile' && desktop || opts.only === 'desktop' && !desktop)).map(([l, a, b, o = {}]) => [l, a, b, o]);
  for (const side of ['static', 'rails']) {
    for (const scene of [...new Set(pairs.map((p) => p[3].scene || 'results'))]) {
      await openScene(page, scene, side, width);
      for (const pair of pairs.filter((p) => (p[3].scene || 'results') === scene)) await measurePair(page, side === 'static' ? pair[1] : pair[2], pair, sides[side], skips);
    }
  }
  for (const label of Object.keys(sides.static)) {
    const skip = skips[label];
    const [x, y] = [sides.static[label], sides.rails[label]];
    if (!x || !y) { console.error(`FAIL: ${width}px results ${label} is ${x ? 'missing from Rails' : y ? 'missing from static' : 'on neither page'}`); failures++; continue; }
    const diffs = Object.keys(x).filter((p) => !skip.includes(p) && !same(x[p], y[p])).map((p) => `${p}: static ${x[p]}, Rails ${y[p]}`);
    if (diffs.length) { console.error(`FAIL: ${width}px results ${label}\n   ${diffs.join('\n   ')}`); failures++; }
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
  const only = process.env.PARITY_ONLY; // 'results' runs just the search results checks
  for (const width of only ? [] : WIDTHS) {
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
  if (!only) for (const width of WIDTHS) failures += await checkNav(browser, width);
  if (await railsHasResults(browser)) for (const width of WIDTHS) failures += await checkResults(browser, width);
  else if (process.env.PARITY_RESULTS === 'required') { console.error('FAIL: the Rails results page shows no records or filters (is Solr running?) and PARITY_RESULTS=required'); failures++; }
  else console.log('SKIP: search results checks: the Rails results page shows no records or filters (no Solr?). Set PARITY_RESULTS=required to fail instead.');
  await browser.close();
  console.log(`\nparity: ${failures} failure(s)`);
  process.exit(failures ? 1 : 0);
})();
