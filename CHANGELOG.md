# Changelog

Recent changes to the static site, newest first. Earlier history is in `git log`. (Moved out of the README on 2026-10-07.)

### 2026-10-10

- **Search history by day (CCS-143, CCS-206)**: the static site keeps each search with its time for 30 days (up to 100) in the browser (`window.CCSHistory` in `public/nav.js`, shared by the header overlay, the search bar and the results page) and lists them on `/search/search-history` grouped as Today, Yesterday, "N days ago" (Melbourne days), with Clear history. The header search overlay links to it ("All recent searches", on Rails too). On Rails the history is Blacklight's own `/search_history` with day headings and a 30-day session cookie. Tests: `tests/search-history.test.js`.

### 2026-10-08

- **Figma files removed**: the token export and sync (`scripts/build-figma-tokens.js`, `npm run build:figma-tokens`, `design-tokens/figma/`), the archived Figma variables export (`docs/design-tokens/figma-variables-export.css`) and the 114 Figma-exported `.jsx`/`.d.ts` files in `public/components/`. Nothing loaded them. `tests/tokens.test.js` still checks the token tiers and that every `var(--token)` resolves.
- **About page** (`/about`, static and Rails): hero, intro (`ccs-section--intro`), key facts, feature panel, how to search, Indigenous cultural material, the shared Browse collections cards and contact links. A new **About** item sits between Help and Contact in the header.
- **Shared Browse collections section**: the home page's cards are now `src/partials/browse-collections.html` (static) and `pages/_browse_collections.html.erb` (Rails), reused on the home, About and Collections pages. The "Our collections" list and the "Browse by sub-collection" section were removed from the Collections page. Collections are listed alphabetically everywhere they are all shown, including the header dropdown.
- **Home hero text** now reads "Unrivalled among Australian universities, our collections span visual arts, medical history, zoology, archives and Aboriginal and Torres Strait Islander cultural heritage."
- **Contact page** re-laid out to match unimelb.edu.au/contact (an "On this page" list beside one column); the breadcrumb reads "Contact" on both sites.
- **Header dropdowns** narrowed to a single column about 306px wide, like the UoM About us panel.
- **Grainger image**: the violin banner was replaced with the supplied Grainger photo (600px wide, so soft on wide screens).
- **Search results and record pages** follow the Blacklight pages (#176, #177); the pathfinder component follows the design system (#169).
- **Hosting**: GitHub Pages on the organisation repo is public (https://enterprise-services-group.github.io/CCS-2026-MVP/). Vercel is no longer used.

### 2026-10-09

- **Help restructured**: `/help` is one page with a section each for FAQ, Copyright and Terms of Use, Access and Information, and Privacy (`help-section`: heading, description, list of sub headings and descriptions). Search tips moved to its own page, `/help/search-tips`; Indigenous data stays at `/help/indigenous-data`. The old `/help?topic=` links are now `/help#<section>` and `/help/search-tips` (the Rails app redirects the old URLs). Done in the static site and the Rails app together.

### 2026-10-03

- **No inline styles in pages**: every `style="..."` attribute and `<style>` block was moved into stylesheets (`public/styles/pages/*.css`, `public/styles/components/*.css`). Runtime values (colours, paddings, positions that the page logic computes) are passed through CSS custom properties, e.g. `style="--dyn-padding:{{ padSum }}"`, and the property that uses them lives in the stylesheet. `tests/no-inline-styles.test.js` (part of `npm test`) fails if a `<style>` block, a `style-hover` attribute or a presentational `style=""` is added to a page.
- **Semantic class names on every element**: elements in the page body carry `block__element` classes (for example `help-faq__heading`, `search-results-search-tools__button-sort`) so the markup is easy to read in dev tools. These labels have no styling of their own unless a rule exists for them.

### 2026-10-02

- **Homepage rebuilt from Figma** (`public/index.html`, desktop and mobile frames) using reusable **Navigation** and **Section** components (`public/styles/home.css`, see [Styling](#styling)). The hero uses the Parkville banner photo; collection cards use the collection banner images in `public/images/banners/`.
- **New header and footer on every page** (`.ccs-nav--header` / `.ccs-nav--footer`). The header has Browse collections and Help **dropdown menus**, a UniMelb-style mobile menu drawer, and behaviour in `public/nav.js` (Esc, click outside, Tab-out close a menu). The old `.uom-page-header` rules and `styles/footer.css` were removed; the colour variables that other styles used moved into `styles/header.css`.
- **Help**: help links use `/help?topic=faq|search-tips|copyright|access|privacy`; the FAQ topic page reuses the homepage accordion (`.ccs-acc`).
- **Advanced Filters page rebuilt from Figma** (`/search/advanced-search`): custom dropdown, multi-select checkbox menus, "Add filter", a From/To date range with calendar, validation and error summary. Dates accept digits only and must lie between the earliest and latest dates in the records. See [Advanced Search](#advanced-search).
- **Browser tests**: `tests/advanced-filters.test.js` (playwright-core + Chromium) runs in `npm test` and CI.
- **Fonts**: the homepage loads the same Google Fonts families and weights as the live unimelb.edu.au site (Fraunces 300-700 incl. italic, Source Sans 3 300-700 incl. italic, Source Code Pro 400); Fraunces is requested with its SOFT and WONK axes.
- **Tidy-up**: unused images, the empty `skills/` gitlink and the unused `src/js/utils/` copies were removed.

### 2026-10-01

- **Search pages renamed**: the results page is now `search/search-results.html` (`/search/search-results`) and the new stand-alone form is `search/advanced-search.html`. Old `/search/advanced` and `/search/advanced.html` URLs redirect (`vercel.json`, `.htaccess`). The results page's "Advanced Search" button opens the form pre-filled with the current search.
- **Collections removed**: the "Faculty of Engineering and Information Technology" and "Prints and Drawing Collection, Special Collections and Archives" collections (and their records 50001-50004 and 50007 and images) were removed from the data, filters and landing-page code.
- **Filters modal**: facet vocabularies now follow the CCS Filters sheet - Object type is every term of a record's object type (case-insensitive), Classification is the museum subject classification, Film & gaming classification is the rating only (G, PG, M, MA 15+, R 18+, X 18+, RC), Digital asset format is Image / Audio / Video / PDF; Harry Brookes Allen Museum was missing from Collection title and is now listed; empty facets are hidden.
- **Production date slider** rebuilt (Airbnb-style): fixed 1700-2030 scale with a 10-year histogram (earlier records are grouped in the first bar), two large draggable handles (mouse, touch, keyboard), click-the-track, live-updating Earliest/Latest year fields (negative = BCE), a live "N dated records" summary and a reset link; no Apply button.

- **Single data source**: `public/collection-data.js` now defines `window.CCS` and is read by both `search/search-results.html` and `collections/record.html`. The embedded copy in the search page and `public/assets/data/collections.js` are gone. Early duplicate stub records are folded into fuller records via an alias map (`SUPERSEDED`); 735 records are listed.
- **Record page**: per-record document title, "Record not found" state for unknown ids, a single "Contact us" button opening a keyboard-accessible request dialog (General enquiry / Request to use / Request to view), and a media viewer for images, audio and video. Field labels and order follow the 1 Oct 2026 PRG spreadsheet.
- **Collections**: landing pages moved to `collections/<slug>/index.html`; the browse page's record counts are computed from the data and browse-by-type links repaired.
- **Accessibility**: sitewide footer contrast, labelled landmarks, heading order, dialog focus management, 404 asset fixes.
- **Tooling**: `vercel.json` (clean URLs + legacy redirects), a test suite run by `npm test` and by CI, and a locally built Bootstrap.
- **Deploy fix**: `.vercelignore` previously excluded `public/assets/`, so record images, audio and video returned 404 on the live site; it now ignores only the top-level `assets/` working folder. (`public/assets` is ~237 MB; consider trimming unused media.)
- **Cleanup**: root-level `.dc.html` files, the `.reorganization/` notes, `variables.css` / `typography.css` / `components.css` and the top-level `styles/` and `images/` duplicates were deleted.

Earlier history (2026-09-29 and before: SRI fix, IA restructure, header rollout, Gen 3 audit) is in `git log`.

---

## 2026-10-07

- Rails app: content pages (home, collections, help, contact) matching the static pages; see `docs/code-quality-plan.md` for the cleanup that followed (shared assets, parity check, generated pages and chrome, lint, size budgets, system tests).
- Static site: `src/partials` (header, search overlay, footer) and `src/collection-landing.template.html` are the sources of those parts of the pages; the search results styles are split by component; the page runtime is served from `public/vendor/runtime`; ESLint, Stylelint and size budgets run in `npm test`.
