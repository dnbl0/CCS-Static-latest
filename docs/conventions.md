# Conventions shared by both codebases

## Names

- **Collections** have one slug each, used in URLs on both sites: `medical-history-museum`,
  `henry-forman-atkinson-dental-museum`, `harry-brookes-allen-museum`, `university-art-collection`, `grainger-museum`.
  Static: `public/collections/<slug>/`. Rails: `/collections/<slug>`, `config/pages.yml` and
  `NexusCcs::SiteNavigation::COLLECTIONS`, which also holds the Solr facet value (`collection_ssim`) and the menu label.
  Adding a collection means adding it in those places and in `scripts/build-collection-pages.js`; there is no single
  list yet (see "Not done" in `docs/code-quality-plan.md`).
- **Pages** are named the same on both sites: home, collections (browse), a collection, help (with topics `faq`,
  `search-tips`, `copyright`, `access`, `privacy`), indigenous data, contact, about. Search results are `/search/search-results`
  (static) and `/catalog` (Rails).
- **CSS classes** follow BEM (`block__element--modifier`). The static pages scope a page's rules with a `page-<name>` class
  on `<body>`; the Rails pages use the same classes (they are generated from the static styles).
- **Design tokens** are the static site's `public/styles/tokens/tokens.css` (three tiers: primitives, semantic, component).
  The Rails app's own results styles use its `--ccs-*` tokens; the content pages use the static ones.
- **Collections are listed alphabetically** by name wherever they are all shown (header dropdown, Browse collections
  cards, contact groups): Grainger, Harry Brookes Allen, Henry Forman Atkinson, Medical History, University Art.
- **Header dropdowns** are a single column about 306px wide, anchored to the right edge like the About us panel on
  unimelb.edu.au (`.ccs-nav__panel` static, `.site-nav__panel` Rails).

## Where a change is made

| Change | Edit | Then |
|---|---|---|
| Styles or images shared by the pages | `public/styles`, `public/images` | `npm run sync:rails` |
| Header, search overlay, footer, Browse collections cards (static) | `src/partials/` | `npm run sync:partials` |
| Header and Browse collections cards (Rails) | `NexusCcs::HeaderComponent`, `app/views/pages/_browse_collections.html.erb` | keep in step with the static partials; `npm run parity` |
| A collection page (static) | `src/collection-landing.template.html` and the page's data tables | `npm run build:collections` |
| Page copy | the static page and the Rails view / `config/pages.yml`, together | `npm run parity` to check styles |
| Rails results, record, filters | `ead-ccs-test/app` | `bin/rails test`, `bin/rails test:system` |

## Accessibility checklist (both sites)

Automated: axe-core (WCAG 2.1 A and AA) runs on the static pages (`tests/accessibility.test.js`) and the Rails pages
(`test/system/accessibility_test.rb`). Check by hand when a page changes:

- Keyboard: every control reachable and operable, visible focus, no keyboard trap (dialogs trap focus and close on Esc).
- One `h1` per page and headings in order; landmarks labelled (header, nav, main, footer).
- Text and controls meet contrast (4.5:1 text, 3:1 large text and controls); do not rely on colour alone.
- Images have `alt` text (empty for decoration); icons that are controls have a name.
- Reflow at 320px without horizontal scrolling; targets at least 44px on touch.
- Reduced motion respected (`prefers-reduced-motion`).
- Links that open a new tab say so to screen readers.
