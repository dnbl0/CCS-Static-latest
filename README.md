# Cultural Collections Search - University of Melbourne

A static front-end prototype for searching and browsing the University of Melbourne's cultural collections (Grainger Museum, Medical History Museum, University Art Collection, Harry Brookes Allen Museum, Henry Forman Atkinson Dental Museum, and a few smaller collections).

**Design system**: UoM Gen 3 | **Bootstrap**: 5.3.3 (built locally) | **Hosting**: Vercel | **Repository**: https://github.com/dnbl0/CCS-Static-latest

The site is a prototype driven by an in-repo dataset (735 listed records), not a live catalogue. Accessibility work has been done and checked with axe-core scans (clean apart from the items listed under [Known issues](#known-issues--follow-ups)), but the site has **not** had a formal WCAG audit or certification.

---

## Contents

1. [Recent changes](#recent-changes)
2. [Pages and URLs](#pages-and-urls)
3. [Repository layout](#repository-layout)
4. [Data: how records work](#data-how-records-work)
5. [Field labels and the spreadsheet](#field-labels-and-the-spreadsheet)
6. [Record page behaviour](#record-page-behaviour)
7. [Styling](#styling)
8. [Develop, test and deploy](#develop-test-and-deploy)
9. [Known issues / follow-ups](#known-issues--follow-ups)
10. [Related docs](#related-docs)

---

## Recent changes

### 2026-10-03

- **No inline styles in pages**: every `style="..."` attribute and `<style>` block was moved into stylesheets (`public/styles/pages/*.css`, `public/styles/shared/*.css`). Runtime values (colours, paddings, positions that the page logic computes) are passed through CSS custom properties, e.g. `style="--dyn-padding:{{ padSum }}"`, and the property that uses them lives in the stylesheet. `tests/no-inline-styles.test.js` (part of `npm test`) fails if a `<style>` block, a `style-hover` attribute or a presentational `style=""` is added to a page.
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

## Pages and URLs

All pages live in `public/` (the web root). They are "DC template" HTML: `{{ }}` placeholders in the markup plus a `class Component extends DCLogic` script, rendered at runtime by `public/support.js` (a generated runtime - do not edit it).

| URL | File | Notes |
|---|---|---|
| `/` | `public/index.html` | Home (Figma design: hero search, collection cards, help and guidance, FAQ accordion) |
| `/search` | `public/search.html` | Redirect stub to `/search/search-results` (meta refresh, JS, and server redirect) |
| `/search/search-results` | `public/search/search-results.html` | Search, facets (`FACETS`), results grid/list |
| `/search/advanced-search` | `public/search/advanced-search.html` | Advanced Filters form (multi-row field search, filters, production-date range); submits to `/search/search-results` |
| `/collections` | `public/collections/index.html` | Browse all collections |
| `/collections/<slug>` | `public/collections/<slug>/index.html` | Five landing pages: `grainger-museum`, `harry-brookes-allen-museum`, `henry-forman-atkinson-dental-museum`, `medical-history-museum`, `university-art-collection`. They share one template with per-collection data in JS dicts, so a change to the shared structure must be made in all five files |
| `/collections/record?id=<id>` | `public/collections/record.html` | Record detail and media viewer |
| `/contact` | `public/contact.html` | Contact groups and collection contacts |
| `/help` | `public/help/index.html` | Help and guidance. `?topic=faq`, `search-tips`, `copyright`, `access` or `privacy` shows one topic |
| `/help/indigenous-data` | `public/help/indigenous-data.html` | Indigenous cultural data and access |

Legacy `*.dc.html` filenames (for example `Collection Search v3.dc.html`) 301-redirect to the pages above (see [Hosting](#hosting)).

---

## Repository layout

```
public/                     Deployed web root
  index.html, search.html, contact.html
  nav.js                    Header behaviour: dropdown menus + mobile drawer (event-delegated; used by every page)
  search/search-results.html
  search/advanced-search.html     # advanced search form (logic in search/advanced-search-form.js)
  collections/{index.html, record.html, <slug>/index.html}
  help/{index.html, indigenous-data.html}
  collection-data.js        Record data -> window.CCS (single source of truth)
  blacklight-adapter.js     Optional live/mock adapter for a Blacklight JSON API (mock by default)
  support.js                DC template runtime (generated)
  image-slot.js             <image-slot> placeholder component (loaded by index.html)
  components/               fig-tokens.css, fig-assets.css (live CSS), plus Figma-exported .jsx/.d.ts components
  styles/                   home.css (Navigation + Section components), advanced-filters.css (form components), header.css (search overlay + tokens), collection.css, vendor/bootstrap-uom.min.css
  assets/                   images/collections (digital assets), data (audio/video, metadata sheets), documents
  images/                   Optimised web images and icons used by pages (home/ = Figma homepage assets, advanced/ = Advanced Filters icons)
  .htaccess                 Apache equivalent of the vercel.json redirects
src/scss/custom-bootstrap.scss   Bootstrap 5.3.3 theme source (see Styling)
tests/                      Plain-Node test scripts (see Develop, test and deploy)
config/redirects.json      Documentation-only list of legacy redirects (nothing reads it at runtime; vercel.json and .htaccess are authoritative)
assets/                     Source material for content: spreadsheets, CSVs, help/landing-page copy (.docx), original images. Not deployed (listed in .vercelignore)
.github/workflows/          ci.yml, auto-merge.yml, vercel-deploy.yml
.agents/rules/              PR workflow rule for coding agents
verify-bootstrap.sh         Checks Bootstrap references in pages (run by npm test)
vercel.json                 Vercel config
design.md, github.md, jira-mvp-mapping.md, BOOTSTRAP-DEPENDENCIES.md   Supporting docs
```

Notes on directories:

- `public/blacklight-adapter.js` is loaded by `search/search-results.html` and `collections/record.html`. Its default mode is `mock` (local `collection-data.js`); `?api=live` switches to the Blacklight endpoint set in the adapter. It is covered by `tests/blacklight-adapter.test.js`.
- `public/components/*.jsx` / `*.d.ts` are exported design-system component sources; pages only load the two CSS files.

---

## Data: how records work

`public/collection-data.js` is an IIFE that sets:

```js
window.CCS = {
  records,   // id -> display-ready record (built by build()); superseded ids are non-enumerable aliases
  items,     // normalised search items (objectType, culture, img) used by search/search-results.html
  ids,       // listed record ids
  related(id, n = 4)  // related-record cards for the record page
}
```

`ITEMS` (an array of plain objects near the top of the file) is the raw data; `build(it)` turns each item into a record. `Object.values(CCS.records)` has one entry per listed record (735 today).

### Add or edit a record

1. Add or edit an object in the `ITEMS` array. Use a unique numeric `id` that is not already in `ITEMS` or in `SUPERSEDED` (ids in use today: 1-238, 10001-10250, 20001-20250, 50001-50007, 60001-60008).
2. Use the item keys that `build()` reads, for example: `title`, `collection` (one of the constants at the top, e.g. `MHM`, `UAC`, `GMC`), `objectType`, `date`/`dateStart`/`dateEnd`, `creator`, `creatorRole`, `associatedEntity`, `place`, `description`, `series`, `material`, `dimensions`, `inscription`, `language`, `culturalAffiliation`, `accession`, `named`, `access`, `classification`, `subject`/`subjects`, `relatedParent`/`relatedChild`/`relatedRecord`, `copyright`, `creditLine`, `licence`, `advisories`, `img` or `images`.
3. Leave a field out and it is not shown; no placeholder is rendered.
4. Run `npm test`. `collection-data.test.js` checks unique ids, non-empty titles, that every field label is one of the specification labels, and that referenced `/assets` files exist.

### Superseded records (`SUPERSEDED`)

Some early prototype stubs duplicate a fuller record. `SUPERSEDED = { oldId: canonicalId, ... }` folds them: `records[oldId]` still resolves (old links keep working) to the canonical record, but the old id is not enumerable, so it is not listed or counted twice. To retire a duplicate, add `oldId: canonicalId` to the map; the old item is dropped from `ACTIVE`.

### Digital assets (`ASSET_IMAGES`, `ASSET_AV`)

- `ASSET_IMAGES` maps a record id to a list of file names in `public/assets/images/collections/` (the filename stem is the accession number with `.` replaced by `_`; numbered suffixes are extra views). Files are URL-encoded and served from `/assets/images/collections/`.
- `ASSET_AV` maps a record id to audio/video objects `{ kind: 'audio'|'video', src, type, label }` with files in `public/assets/data/`. They play in the media viewer after any images.
- Records without an `ASSET_IMAGES` entry fall back to the web image named by `img` (or `images`) in `public/images/`.
- Add the file under `public/assets/...` first (not the top-level `assets/`, which is not deployed), then add the mapping.

---

## Field labels and the spreadsheet

Field labels, sequence numbers and order follow `assets/CCS Field labels and filters - Final - PRG - 1 OCT 2026.xlsx` (sheets "CCS Field labels" and "CCS Filters").

- Record page fields: the `f` array in `build()` in `public/collection-data.js` (`[seq, label, lines]`). Rights fields (16, 17, 29) come from the `rights` array; media metadata (Title, Format, Licence type, Terms of use, Advisory ...) from `media`.
- Filters: the `FACETS` array in `public/search/search-results.html` (group, key, title, kind).

### Field mapping (spreadsheet "#" and Display Field to site label)

| # | Spreadsheet field | Site label / location |
|---|---|---|
| 1 | Title | Page heading (`title`) |
| 2 | Object Type | Object type |
| 3 | Date | Date |
| 4 | Creator | Creator |
| 5 | Associated Entity | Associated entity |
| 6 | Place | Place |
| 7 | Description | Description |
| 8 | Series | Series |
| 9 | Editions | Editions (no record populates it yet) |
| 10 | Material | Material |
| 11 | Dimensions | Dimensions (H x W x D) |
| 12 | Inscription | Inscription |
| 13 | Language | Language |
| 14 | Cultural Affiliation | Cultural affiliation |
| 15 | Accession Number | Accession number |
| 16 | Copyright | Copyright (rights block) |
| 17 | Credit Line | Credit line (rights block) |
| 18 | Named Collection | Named collection |
| 19 | Collection | Collection |
| 20 | Access | Access |
| 21 | Classification | Classification |
| 22 | Subject | Subject |
| 23 | Source URL | Source URL (no record populates it yet) |
| 24 | Related Parent Record | Related parent record |
| 25 | Related Child Record | Related child record (no record populates it yet) |
| 26 | Related Record | Related record |
| 27 | Licence Type | Licence type (media metadata, records with digital assets) |
| 28 | Advisory | Advisory (media metadata) |
| 29 | Terms of Use | Terms of use (rights block and media metadata, records with digital assets) |
| 30 | Producer | Producer (no record populates it yet) |

Filter groups in the spreadsheet map to `FACETS` groups in `search/search-results.html`: Collection details, Creator, Object, Subject / topic, Copyright & advisory, Access, Media type.

---

## Advanced Search

`public/search/advanced-search.html` is a stand-alone form built from the Figma Advanced Filters frames. Markup uses the reusable classes in `public/styles/advanced-filters.css` (`.ccs-banner`, `.ccs-page`, `.ccs-combo`, `.ccs-input`, `.ccs-date` / `.ccs-cal`, `.ccs-btn`, `.ccs-delete`, `.ccs-instructions`, `.ccs-errors`). Its logic lives in `public/search/advanced-search-form.js` (plain JS, no framework; option lists and counts are built from `window.CCS.items`) and is made of three small components: `Select` (single-select combobox/listbox), `Multi` (checkbox menu, used by filter values and "Add filter") and `DateField` (typed date + calendar popover). Keyboard: Arrow keys, Home, End, Enter, Space, Esc and Tab; menus close on selection (single), Esc, outside click or re-activating the field, and multi-select menus stay open while ticking. Search rows range from 1 to 8 (the last row cannot be deleted). Dates accept digits and `/` only (`dd/mm/yyyy` or a year; a leading minus means BCE), must lie between the earliest and latest dates in `window.CCS.items`, and an end date cannot precede the start date; invalid input shows an error beside the field and in a summary at the top of the form. It is a plain GET form that opens the results page, `search/search-results.html`, with these URL parameters (the results page parses them in `parseAdvancedParams`):

| Parameter | Meaning |
|---|---|
| `clause[i][field]` | `all_fields`, `title`, `creator`, `subject` or `description` |
| `clause[i][op]` | `must` (contains all), `should` (contains any) or `must_not` (does not contain) |
| `clause[i][query]` | search text; `"quotes"` make an exact phrase |
| `f_inclusive[key][]` | filter values where ANY may match; `key` is `collection`, `type`, `creator`, `licence` or `access` |
| `f[key][]` | filter values where ALL must match |
| `range[year][begin]`, `range[year][end]` | production year range (the form sends the year of the chosen date) |
| `sort` | `relevance`, `year-desc`, `year-asc` or `az` |

Rows combine as: every `must` row matches, at least one `should` row matches (if any exist), and no `must_not` row matches. The results page shows each row and filter as a removable chip, and its "Advanced Search" button re-opens the form pre-filled with the current search (`advancedFormHref`). Empty rows are not sent, so URLs stay short.

## Record page behaviour

`public/collections/record.html?id=<id>`:

- Reads `window.CCS.records[id]`. An unknown or missing id shows "Record not found" and sets that as the document title. A found record sets the title to `<record title> - Cultural Collections Search - University of Melbourne`.
- Only the **Contact us** button opens the request dialog. Tabs: General enquiry, Request to use, Request to view. The dialog traps focus, closes on Esc, and returns focus to the opener. Submitting only shows a confirmation; nothing is sent anywhere.
- Media viewer shows images, audio and video from `slides`, with thumbnails and a metadata sidebar. The viewer handles keyboard shortcuts only while it has focus or is full screen (see the script in `record.html` for the exact keys).
- "Copy persistent link" and citation formats are generated from the record.

---

## Styling

- **Bootstrap 5.3.3** is compiled locally from `src/scss/custom-bootstrap.scss` (sharp corners, no shadows, UoM colours) into `public/styles/vendor/bootstrap-uom.min.css`. This file is committed because Vercel runs no build step. Rebuild with `npm run build:css` (`build:css:dev` and `watch:css` write an unminified `bootstrap-uom.css`). After Sass compiles, `scripts/purge-css.js` removes every rule whose classes appear nowhere in the pages or scripts (the committed file is about 26 KB instead of 227 KB); **after adding a Bootstrap class to a page, run `npm run build:css` and commit the result**, otherwise the class has no CSS. Every page links the compiled file; only `index.html` also loads the Bootstrap JS bundle from jsDelivr (version-pinned with an SRI hash).
- **Live CSS**: `public/components/fig-tokens.css` (Gen 3 design tokens; sizes are unitless numbers, so component CSS writes px values), `fig-assets.css`, `public/styles/home.css`, `advanced-filters.css`, `header.css` and `collection.css` (collection landing pages). Pages also carry page-local `<style>` blocks, including `:root` token overrides, so check the page itself before editing a colour.
- **Page styles (no inline styles)**: each page links its own `public/styles/pages/<page>.css` (class rules, scoped by the `page-<page>` class on `<body>` so they win over shared component CSS the way the old inline styles did) plus any former `<style>` blocks, now `public/styles/pages/<page>.<role>.css` or, when several pages shared the same block, `public/styles/shared/<role>.css` (skip link, colour tokens, base elements). Do not add `style=""` attributes or `<style>` blocks; add a class and a rule instead. For a value that only the page logic knows, set a custom property inline (`style="--dyn-height:{{ b.h }}"`) and use `var(--dyn-height)` in the stylesheet. The five collection landing pages share `collection-landing*.css`.
- **Content templates (Matrix patterns)**: `public/styles/shared/content-templates.css` holds the components modelled on the University's Matrix CMS content templates (unimelb.edu.au/web/matrix-cms/content-templates and /styling-content): `ct-listing` (Page Listing: image or text lists, `--alt` grey band), `pathfinder-alt` (navy Pathfinder tiles), `contact-box`, `notice` (`--warning`, `--success`), `side-nav`, `def-table`, `contact-cards`, `steps-list`, and the help/collection layouts (`help-layout`, `collection-layout`). Used by Browse collections, the five collection pages, Help and Indigenous data. Reuse these before writing new page CSS; values (type sizes, colours) were measured from the Matrix pages.
- **Record media access rules**: `webAccess`, `accessMessage`, `viewRestricted`, `usageNotice` and `caption` are computed in `public/collection-data.js` (see `jira-mvp-mapping.md`, CCS-27/45/50/68/69). Licence types live in the `LIC` table there; `Not licensed` hides the media and offers a request to view.
- **Class naming**: `block__element` (BEM style), where the block is the nearest section, form or id and the element describes the thing (`__heading`, `__item-link`, `__button-clear-all`); repeated look-alikes with different styling get `--v1`, `--v2`. Names are labels for humans; do not rely on them from scripts.
- **Components** (plain CSS classes + static markup, no build step): `home.css` defines **Navigation** (`.ccs-nav--header`, `.ccs-nav--footer`) and **Section** (`.ccs-section--hero | intro | cards | help | faq`, plus the shared `.ccs-link` and `.ccs-acc` accordion). The header/footer markup is repeated in every page (there is no include mechanism), so a change must be made in all of them; `nav.js` provides the dropdown and drawer behaviour. `advanced-filters.css` defines the form components listed under Advanced Search. Hidden/shown state of menus is driven by `aria-expanded` and CSS rather than the `hidden` attribute where the DC template layer could re-render the markup.
- **Fonts**: Fraunces (headings), Source Sans 3 (body) and Source Code Pro (code) from Google Fonts. The homepage and Advanced Filters pages request Fraunces with its SOFT/WONK axes (the Figma heading settings); the homepage matches the families and weights loaded by unimelb.edu.au.
- Bootstrap's `!important` utilities can override same-named custom classes; check for collisions when naming new classes.

Design tokens and rationale: see `design.md`. Bootstrap details: `BOOTSTRAP-DEPENDENCIES.md`.

---

## Develop, test and deploy

```bash
npm ci            # installs bootstrap, sass and playwright-core (dev dependencies only)
npm run build:css # rebuild public/styles/vendor/bootstrap-uom.min.css
npm test          # full check, see below
python3 -m http.server 8933 --directory public   # local server (as in .claude/launch.json)
```

Clean URLs (`/search/search-results`, `/collections/record`) only resolve on a host that applies `vercel.json` or `.htaccess`; with a plain static server use the `.html` paths.

### What `npm test` runs

1. `build:css` - compiles Bootstrap (fails on Sass errors).
2. `verify-bootstrap.sh` - for each page referencing Bootstrap, checks that the compiled `bootstrap-uom.min.css` exists (or that any CDN reference is version 5.3.3 with SRI).
3. `tests/blacklight-adapter.test.js` - default mode is `mock`, request-parameter building and document transformation.
4. `tests/page-integrity.test.js` - every `public/**/*.html` has a `<title>` and `lang`, no merge-conflict markers, and every local `href`/`src` resolves (clean-URL forms like `/search/search-results` resolve to `.html`/`index.html`). Broken css/js/page links fail; broken image links only warn.
5. `tests/collection-data.test.js` - loads `collection-data.js` in a bare sandbox; checks unique ids, titles, that field labels come from the specification list, and that `/assets` media files exist.
6. `tests/no-inline-styles.test.js` - fails if a page contains a `<style>` block, a `style-hover` attribute or a `style` attribute that is not a pure CSS-custom-property pass-through.
7. `tests/advanced-filters.test.js` - browser test (playwright-core with a Chromium build) of the Advanced Filters page: responsive layout at 1440 and 390px, dropdown keyboard behaviour and ARIA roles, multi-select and Add filter, row management limits, submission URL, pre-fill and Reset, and date-range validation. It starts its own static server. If no Chromium is found it prints `SKIP` and passes; set `PLAYWRIGHT_CHROMIUM_PATH` or run `npx playwright-core install chromium` to enable it locally.

**Warnings policy**: failures exit non-zero and fail CI. Warnings (printed as `WARNING:`) are informational and never fail the build; they track open data/content gaps (see Known issues). Current output: 0 failures, 5 warnings (no `<h1>` in `search.html`; the four unpopulated spec fields).

### CI and merge workflow

- `.github/workflows/ci.yml`: Node 20, `npm ci` (or `npm install` without a lockfile), installs Chromium for the browser test, then `npm test`, on every pull request and push to `main`.
- `.github/workflows/auto-merge.yml`: pushes to `feature/**`, `bugfix/**` or `enhance/**` that change html/css/js/md files and have 3+ commits or 2+ changed files open (or reuse) a PR against `main`, run basic documentation/structure checks, approve it, and squash-merge it. It does not run `npm test` itself. Auto-approval only works if the repository setting **Settings > Actions > General > "Allow GitHub Actions to create and approve pull requests"** is enabled; otherwise the approve step logs a warning and the job continues to the merge step. See `github.md` and `.agents/rules/pr-workflow.md`.
- `.github/workflows/vercel-deploy.yml`: on push to `main`, `vercel pull`/`build`/`deploy --prod` using the `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` secrets.

### Hosting

Deployed on Vercel. The project link (`.vercel/`) is local and git-ignored.

- `vercel.json`: `cleanUrls: true`, `trailingSlash: false`, and 301 redirects from the legacy `*.dc.html` names (plain and `%20`-encoded) and from `/search` and `/search.html` to `/search/search-results`.
- `public/.htaccess`: the Apache equivalent (redirects plus clean-URL rewrites) for hosting on Apache.
- `.vercelignore` excludes the top-level `assets/` source material, `public/assets/`, `*.dc.html` and `.reorganization/` from uploads when deploying with the CLI. Because `public/assets/` is excluded there, check that digital assets load on the deployed site after changing how deployment is done.

---

## Known issues / follow-ups

- **Accession numbers**: 15 of 735 records have no accession number (the data owner needs to supply them). `npm test` reports `accession number present on 720/735 records`.
- **Unpopulated spec fields**: Editions, Source URL, Related child record and Producer are supported by `build()` but no record sets them (reported as test warnings).
- **`search.html`** redirect stub has no `<h1>` (test warning).
- **Hosting behaviour unverified**: `vercel.json` redirects and `cleanUrls` have not been checked against the live Vercel deployment.
- **Thin audio/video data**: only two audio/video items exist, so the sound-recording and film browse tiles map to small keyword searches.
- **Object type facet is long**: object types are free text (about 370 distinct values), so the Object type facet is long and uneven.
- **Accessibility**: axe-core scans of the pages were clean except for the items above; there has been no formal WCAG audit, manual screen-reader pass or certification.
- **Data is a prototype snapshot**: records are hand-maintained in `collection-data.js`; the Blacklight adapter's live mode is not part of the tested flow.
- **Jira mapping**: several requirement rows in `jira-mvp-mapping.md` are marked as not re-verified.

---

## Related docs

- `design.md` - tokens, typography, components, IA notes
- `BOOTSTRAP-DEPENDENCIES.md` - Bootstrap build and usage
- `github.md` - source-repo sync notes
- `jira-mvp-mapping.md` - 2026 MVP requirements mapping

For Gen 3 guidance see https://designsystem.web.unimelb.edu.au/.

© 2026 The University of Melbourne. All rights reserved.

**Last updated**: 2026-10-03
