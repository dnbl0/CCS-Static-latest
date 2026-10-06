# Styling

How the app's CSS and JavaScript are organised, and how to run them in development.

## Layout

```
app/assets/stylesheets/
  application.css           manifest: the only file the layout links; @imports the rest in order
  bootstrap-uom.scss        entry point for the themed Bootstrap build (compiled by dartsass-rails)
  _bootstrap-uom-variables.scss   Bootstrap Sass variables (UoM colours, square corners, no shadows)
  fonts.css                 self-hosted Source Sans 3 and Fraunces (files in app/assets/fonts)
  tokens/primitives.css     tier 1 design tokens: raw values, --ccs-<category>-<name>
  tokens/semantic.css       tier 2 design tokens: roles (text, surface, border, action, focus)
  unimelb.css               theme: maps tokens onto --bs-* / --bl-* and restyles Blacklight pages
  components/               one file per component, named after it (site_header.css ...)
app/components/nexus_ccs/   ViewComponents, each with the CSS file of the same name
app/javascript/controllers/ Stimulus controllers (site_header, search_overlay, dialog)
vendor/javascript/          vendored ES modules pinned in config/importmap.rb (no CDN)
```

Load order is vendor (Bootstrap, Blacklight), fonts, tokens, theme, then components.

## Conventions

- **Tokens first.** Use `--ccs-*` tokens, preferring semantic ones. Raw colours, font sizes and
  spacing in component CSS are a smell. Bootstrap's Sass variables must be literal colours, so
  `_bootstrap-uom-variables.scss` repeats a few values; `test/assets/bootstrap_theme_tokens_test.rb`
  keeps them in step with the tokens.
- **One component, one file.** Each block gets `components/<block>.css` (snake_case file, kebab-case
  class): `site_header.css`, `site_footer.css`, `search_banner.css`, `breadcrumb_bar.css`.
- **BEM names, no page prefixes.** Blocks are nouns for the thing (`site-header`, `site-nav`,
  `site-footer`, `search-banner`, `breadcrumb-bar`, `arrow-link`); elements use `__`, variants `--`.
  Don't name classes after pages or Figma frames.
- **Use Blacklight's classes where Blacklight owns the markup** (`.facet-limit`, `.document`,
  `.search-btn` ...) rather than replacing its views. Replace markup only through Blacklight's
  extension points (`config.header_component`, `shared/_footer`, document components).
- **Behaviour in Stimulus**, not global scripts. Controllers declare their targets and actions in
  the markup (`data-controller`, `data-action`).
- **Don't rely on `form_with ..., role:`**: `form_with` drops it. Use `html: { role: "search" }`.
- **Layers.** Use `--ccs-z-*`. The header sits above Bootstrap's sticky and fixed layers and below modals.

## Static site class names

Components ported from the static CCS prototype were renamed; the old names are gone.

| Static | Rails |
|---|---|
| `.ccs-nav--header`, `__brand`, `__top`, `__bottom`, `__title` | `.site-header`, `__brand`, `__utility`, `__bar`, `__title` |
| `.ccs-nav__search`, `__menu` | `.site-header__search-toggle`, `__menu` |
| `.ccs-nav__primary`, `__trigger`, `__panel*`, `__back`, `__drawer-*` | `.site-nav`, `__trigger`, `__panel*`, `__back`, `__search`, `__audience` |
| `.ccs-nav--footer`, `.ccs-foot__*` | `.site-footer`, `.site-footer__*` |
| `.ccs-link` | `.arrow-link` |
| `.uom-search-popover*` | `.search-overlay*` |
| `.page-breadcrumbs`, `.page-local-history*` | `.breadcrumb-bar`, `__trail`, `__item` |
| `.search-results-banner`, `.page-banner__*`, `.ccs-searchbar*` | `.search-banner`, `__title`, `__summary`, `__form` (Blacklight's own form) |

## Development

```sh
bin/dev                 # Rails on :3002 (override with PORT) and the Sass watcher
bundle exec rails dartsass:build   # one-off build of app/assets/builds/bootstrap-uom.css
bundle exec rails test
```

`app/assets/builds` is git-ignored; `assets:precompile` and `test:prepare` build it.
`CCS_STATIC_URL` is the base URL of the static site that hosts Help and Contact; when unset the
header omits those items (in development it defaults to `http://localhost:3000`).

## Filter rail and record page

- **Filter rail** (`components/filter_rail.css`): Blacklight's facet groups, one per section of the Filters
  sheet, styled after the static "Search filters" rail: small-capital section titles over a rule, flat
  hairline filter rows, checkbox values (ticked when selected) with right-aligned counts, "+ Show more".
  Pure CSS on Blacklight's markup; the rail as a whole is sticky on wide screens (not each section).
- **Record page** (`components/record_page.css`, `digital_assets.css`): `RecordBannerComponent` (dark title
  band, hidden from assistive technology because Blacklight's own h1 stays), `RecordEmbedComponent` (the
  digital assets on a dark band, then type and collection, creator and date, licence), Blacklight's details
  list as ruled label and value rows in one white card, and `PersistentLinkComponent` (CCS-25, with a copy
  button, `clipboard_controller.js`). Field labels have no trailing colon (`blacklight.en.yml`).

## Search results layout

Designed in `search-results-bl.png` (the search results design); Europeana's open-source front end
informed the drawer and cards. Files: `components/results_layout.css`, `filter_rail.css`, `filter_drawer.css`,
`results_toolbar.css`, `search_banner.css`; `NexusCcs::FilterSidebarComponent`, `FilterToggleComponent`,
`ConstraintsComponent`, `ResultCardComponent`; `catalog/_sort_and_per_page.html.erb`.

- **Banner**: compact: "Search the Collection" and a 2.5rem search bar (field selector left, cyan button).
  The result count moved to the toolbar; "Advanced search" is "Advanced filters" at the top of the sidebar.
- **Sidebar** (left, 14rem, flush with the window edge, ruled on its right): "Advanced filters", then
  "Search filters (n)" and "Clear filters" (the search stays, the filters go), then one flat list of
  filters in blue with chevrons. The workbook's section titles stay for screen readers only. Creator role
  follows the creator dates (in the design, not in the workbook).
- **Toolbar**: "N results for" with the search and each filter as a removable pill; sort and page size as
  select-style boxes; the view buttons flush right; a Filters button replaces the sidebar below 992px.
- **Results**: grid and mosaic columns step with the width (written out as `repeat(N, 1fr)`, because the
  mosaic polyfill mis-sizes `auto-fill`): six columns at 2000px, 17rem tiles, 16px gutters. List is one
  column, two from 1880px, with the collection above the title and the image right on a dark box.
- **Pager**: small-caps Previous and Next around the page numbers, current page filled.
- **Below 992px** the sidebar is an off-canvas drawer from the left (320px / 75vw max, 300ms, scrim
  `rgba(0,0,0,.7)`); focus moves in and is trapped, Escape and the scrim close it, scroll is locked, focus
  returns to the Filters button.

Not copied from Europeana on purpose: dropdown facets that apply at once, the page-number input, the
right-hand sidebar. Europeana's live site is bot-protected, so its values were not compared rendered.

## Not ported yet

The home hero and the static-only pages (help, contact, collection landing pages). See
`docs/styling-inventory.md`.
