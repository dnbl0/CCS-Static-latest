# Cultural Collections Search - 2026 MVP Requirements Mapping

**Project**: CCS-2026 | **Jira Source**: [unimelb.atlassian.net CCS board](https://unimelb.atlassian.net/jira/software/c/projects/CCS/boards/6889?label=CCS-2026) (label `CCS-2026`, ~140 issues)
**Audit Method**: Live Jira MCP fetch (66 frontend-relevant epics/stories/bugs, verbatim descriptions) cross-checked against a from-scratch read of the actual `public/` codebase — not against this document's own prior claims.
**Audit Date**: 2026-09-29 (file paths and data notes refreshed 2026-10-01) | **Status**: Corrected — see "Correction Notice" below. Jira statuses and requirement rows reflect the 29 Sept audit and have not been re-fetched since.

---

## Correction Notice

The previous version of this document (dated 2026-09-29, "100% Complete") was inaccurate in two ways:

1. **It mapped requirements to the wrong files.** It cited `Collection Search v3.dc.html`, `Collection Record.dc.html`, `Browse Collections.dc.html`, etc. — the **legacy, pre-reorganization root-level files**. These are orphaned: `grep -rn "\.dc\.html" public/` returns zero navigational links from the live site. The real, linked site is entirely under `public/` (`public/search/search-results.html`, `public/collections/record.html`, `public/collections/index.html`, etc.). `public/.htaccess` 301-redirects the legacy filenames to the real URLs, but nothing in the live site links to the legacy files directly.
2. **It asserted things were "Done"/"in scope" or "out of scope" based on assumption, not the actual Jira board or actual code.** For example, it claimed CCS-158 (spelling suggestions) was "out of scope — post-2026," but Jira shows it as **Done**, backed by three real bug tickets (CCS-288, 292, 293) describing tested production behavior. The code had none of it.

This revision was produced by fetching the live Jira issues directly (see audit method above) and reading the actual `public/` code, and a set of genuine discrepancies found during that process have since been fixed (see "Fixes Applied" below).

---

## Site Structure (ground truth, 2026-10-01)

- **Live site**: everything under `public/` - `index.html`, `search.html` (redirect stub to `/search/search-results`), `search/search-results.html` (real search), `collections/index.html`, `collections/<slug>/index.html` (five landing pages: `grainger-museum`, `harry-brookes-allen-museum`, `henry-forman-atkinson-dental-museum`, `medical-history-museum`, `university-art-collection`), `collections/record.html`, `contact.html`, `help/index.html`, `help/indigenous-data.html`.
- **Legacy files**: the old root-level `*.dc.html` files and root `index.html` / `collection-data.js` no longer exist. The legacy `.dc.html` filenames survive only as 301-redirect sources in `vercel.json` and `public/.htaccess`.
- **`config/redirects.json`**: documentation-only (nothing reads it at runtime). `vercel.json` and `public/.htaccess` are authoritative; the JSON file does not list the `/search` redirects.
- **Shared data source**: `public/collection-data.js` defines `window.CCS` (`records`, `items`, `ids`, `related()`); `search/search-results.html` and `collections/record.html` both read it. 735 records are listed. See README.md.
- **Live stylesheets**: `public/components/fig-tokens.css`, `public/styles/components/*.css` (shared component CSS), `fig-assets.css`, `public/styles/home.css`, `advanced-filters.css`, `header.css`, `collection.css`, and the locally built `public/styles/vendor/bootstrap-uom.min.css`. The dead duplicates `variables.css` / `components.css` have been deleted.

---

## Fixes Applied (this audit cycle)

| # | Finding | Fix |
|---|---|---|
| 1 | `public/search.html` was a full duplicate of the homepage with a bolted-on JS redirect — flashed wrong content, broke with JS disabled | Reduced to a minimal, honest redirect (meta-refresh + JS fallback + visible link); added a server-side 301 in `.htaccess` |
| 2 | CCS-158 (Spelling Suggestions, Done in Jira) had zero implementation | Implemented per-word Levenshtein-based "did you mean" in `search/search-results.html`, fixing the exact bugs described in CCS-288 (last-word correction) and CCS-292 (per-word, vocabulary-validated correction) |
| 3 | CCS-34 (Boolean/exact-phrase search, Done in Jira) only had implicit AND + quoted-phrase; no explicit operators | Added real `AND`/`OR`/`NOT` parsing (left-to-right, no parentheses), with prior behavior preserved as fallback for non-boolean queries |
| 4 | 3 records (`id` 152, 155, 171) had corrupted `year`/`dateDisplay` values (e.g. `year: 2663`) — not recoverable from source CSVs | Set to `year: null` (dateDisplay removed), matching the file's existing "unknown date" convention — no fabricated dates |
| 5 | `config/redirects.json` mapped legacy files to a nonexistent `/pages/*.html` scheme, contradicting `.htaccess` | Rewritten to match `.htaccess`'s real targets |
| 6 | 4 of 5 museum collection pages had a stale `data-props` schema default of `"MHM"` (actual render logic was already correct per-page) | Corrected each page's default to its real code (GMC/HBA/DENT/UAC) |
| 7 | No centralized `:focus-visible` styling anywhere in the live stylesheet (WCAG 2.4.7 gap) | Added a `:focus-visible` rule using the design system's `--focus-focus` token to the global focus ring (now `public/styles/components/focus.css`, linked on every page) |
| 8 | CCS-234 epic lists "Indigenous Cultural Data and Access" as its own static page; only existed as a subsection of the help page | Extracted to standalone `public/help/indigenous-data.html` (content preserved verbatim, no invented claims), linked from help and the homepage nav |

---

## Requirements Mapping

### Search & Discovery

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-33 | Basic search | Done | `public/search/search-results.html` — real search UI; header/hero search on `public/index.html` submits into it. `public/search.html` is a redirect shim, not a duplicate page (fixed) |
| CCS-34 | Boolean / exact-phrase search | Done | `search/search-results.html` — quoted exact-phrase + implicit AND (pre-existing) **plus** explicit `AND`/`OR`/`NOT` operators (added this cycle) |
| CCS-37 | Search within a collection | Done | Collection-scope filter in `search/search-results.html` facets |
| CCS-38 | Search filters | New | Type/date/format facet filters present in `search/search-results.html`. Indigenous-material-specific filter labels (per the Jira description's red-highlighted note) are **not** implemented — see Gaps below |
| CCS-41 | Digital-assets-only filter | New | `f.digital` toggle in `search/search-results.html` (default off; when on, filters out records with no `img`) |
| CCS-116 | Semantic search (app level) | Done | No frontend trace found; appears to be backend-scoped. Not independently verifiable from this repo — flag to backend team rather than assume |
| CCS-123 | Fuzzy search | In Testing | No fuzzy-match logic beyond the spelling-suggestion feature added this cycle (which covers the "did you mean" UX, not general fuzzy ranking of results) |
| CCS-124 | No-results messaging | New | Real implementation in `search/search-results.html` ("No records match your search" + "Clear all filters") |
| CCS-158 | Offer spelling suggestions | Done | **Implemented this cycle** (see Fixes Applied #2) — was previously entirely absent despite Done status |
| CCS-20 | Filter and refine public data | New | Covered by CCS-38's filters; Indigenous "subject area" sourcing from CMS not verifiable from this static repo (data-layer requirement) |
| CCS-21 | Sensitivity notifications | New | Verified 2026-10-03: record page shows advisory banners from `advisories` (ADVISORY dict in `collection-data.js`). Only 2 of 728 records carry advisories, so Indigenous deceased-persons / language notices are not applied sitewide: **data gap**, not a UI gap |
| CCS-22 | UoM ID surfacing | New | **Done 2026-10-03**: every record shows a copyable `UoM ID` (stable `CA-000123` asset ID) above the accession number, so the 12 records with no accession (child records) still have a visible identifier |
| CCS-25 | Persistent URLs | In Testing | **Done 2026-10-03**: persistent link now resolves: `/item/CA-000123` rewrites (vercel.json + .htaccess) to the record page, and the displayed/copied link uses the current host. Production domain (collections.unimelb.edu.au) is a deployment concern |
| CCS-27 | Display rights information | Done | `collections/record.html` displays `licence`/`rights` fields and licence icons |
| CCS-217 | View Collection Asset Details (with/without DAs) | New | `collections/record.html` handles both cases (records with no digital asset render without a media viewer) |

### Content Classification & Access

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-64 | Link DAs and metadata with CA metadata | New | Data-layer requirement; `collection-data.js`'s single shared `ITEMS` structure is consistent with this, but the "aspect ratio without distortion" clause (item 4 in the Jira description) was not independently re-verified this cycle |
| CCS-65 | Digital asset formats | New | 2026 priority is Images/Audio/Video/PDF per Jira; images, audio and video are supported by the record page media viewer (`ASSET_IMAGES` / `ASSET_AV` in `collection-data.js`), but only two audio/video items exist; PDF handling is not implemented |
| CCS-66 | Categories of content | New | Parent story for CCS-166/68/69 below |
| CCS-68 | Content classification — Request to USE | Done | The record page's "Contact us" dialog has a "Request to use" tab (form is front-end only; submitting shows a confirmation and sends nothing). Not otherwise verified against the Jira description |
| CCS-69 | Content classification — Request to VIEW | New | "Request to view" tab exists in the same dialog; same caveat as CCS-68 |
| CCS-166 | Content classification — VIEW only | New | Same caveat as CCS-68 |

### Accessibility & Security

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-51 | WCAG 2.1 AA compliance | New | Skip links, aria-labels present (verified); `:focus-visible` gap fixed this cycle (Fixes Applied #7; fix made in 2026-09-29 cycle). Axe-core scans have been run and their findings fixed, but full WCAG AA conformance has **not** been formally tested — treat as partially verified, not certified |
| CCS-62 | Accessibility (Assistive Technology Compatibility) | New | Not implemented; correctly reflects Jira's "New" status |
| CCS-70 | Security model — Guest | Done | All `public/` pages are guest-accessible by default (no login gating found) |
| CCS-145 | Security (BR-18.04) | New | Backend/infrastructure scope; not applicable to this static frontend |
| CCS-172 | Web Application Firewall | New | Infrastructure/DevOps scope; not applicable to this static frontend |

### Core & Static Pages (CCS-234 epic)

| Page | Story | Jira Status | Implementation |
|---|---|---|---|
| Home | CCS-294 | New (no Jira description) | `public/index.html` |
| Browse all collections | CCS-19 | New | `public/collections/index.html` |
| Grainger Museum | CCS-295 | New (no Jira description) | `public/collections/grainger-museum/index.html` |
| Harry Brookes Allen Museum | CCS-296 | New (no Jira description) | `public/collections/harry-brookes-allen-museum/index.html` |
| Henry Forman Atkinson Dental Museum | CCS-297 | New (no Jira description) | `public/collections/henry-forman-atkinson-dental-museum/index.html` |
| Medical History Museum | CCS-298 | New (no Jira description) | `public/collections/medical-history-museum/index.html` |
| University Art Collection | CCS-299 | New (no Jira description) | `public/collections/university-art-collection/index.html` |
| Contact | CCS-233 | New | `public/contact.html` |
| Indigenous Cultural Data and Access | CCS-52 | New | **Was a subsection of `help/index.html`; extracted to standalone `public/help/indigenous-data.html` this cycle** (Fixes Applied #8) |
| Help/Guidance | — ("tbd" in epic) | — | `public/help/index.html` |
| CCS-47 | Contact Us — record view | New | Not independently re-verified this cycle |
| CCS-50 | Acknowledgements (home page) | Done | Land acknowledgement present in `public/index.html` footer (verified) |

**Content-requirement gap**: CCS-83 (UX/UI Design epic) and CCS-294–299 (Home + all 5 museum pages) have **no description text in Jira at all** — their detailed content requirements live elsewhere (Confluence/Figma/attachments), not in the issue body. This document cannot confirm those pages match approved content specs beyond what's visibly implemented; flag to design/content owners for sign-off rather than assuming completeness.

---

## Genuinely Out of Scope (Jira status = New, correctly unimplemented)

These match between Jira and code — no discrepancy:

| Issue | Title |
|---|---|
| CCS-46 | Create favorites (personal) lists |
| CCS-143 | Save search history (recent searches exist in suggestions; see alignment list) |
| CCS-206 | Search history display (daily grouping) |
| CCS-157 | Display hero image functionality |
| CCS-55 | Search filter for 'Indigenous data' |
| CCS-53 | Activity reporting stories |

---

## Data Integration (backend scope, not applicable to this static frontend)

EMu, Vernon (MDHS), and Nexus DAM integration stories (CCS-48, 49, 118, 183–187, 197, 207, 209, 211, 230, 231, 237, 238, 240, 241, 244, 245, 263, 265, 266, 304, 310–313, 321, 322, 332, 333, and related bugs CCS-306/307) are backend/data-pipeline work with no frontend surface in this repo. `public/collection-data.js`'s field structure (`id`, `title`, `img`/`images[]`, `collection`, `objectType`, `creator`, `licence`, `access`, `accession`, `subject`, etc., following `assets/CCS Field labels and filters - Final - PRG - 1 OCT 2026.xlsx`) is what a real backend integration would need to populate — this document does not assert those integrations are complete, only that the frontend has a consistent shape ready to receive real data.

Specs referenced but not machine-readable from this repo: `public/assets/data/metadata/CCS Data inventory - final - 12 Aug.xlsx` (CCS-272), `CCS Fields and Filters.xlsx` (CCS-216) — these are one-line stub issues in Jira pointing at attachments; the actual field/attribute list was not retrievable via the Jira API and should be reviewed directly by whoever owns those spreadsheets.

---

## Gap List for Stories Still "New" (re-read from Jira 2026-10-03)

| Issue | Requirement (verbatim intent) | Prototype status | Gap |
|---|---|---|---|
| CCS-19 | Browse collections, sub-collections or hierarchies from source systems | The Browse collections page lists "Browse by sub-collection" (named collections, with counts); each link opens search pre-filtered (`?collection=&named=` / `&classification=`) | **Partial**: one level of hierarchy (collection > named collection); deeper source-system hierarchies (series, parent/child) are not navigable |
| CCS-20 | Filter by theme, date, type, format incl. DA metadata; Indigenous "subject area" from CMS | Type, date, format, collection filters on search; Advanced Filters | **Gap**: Indigenous subject-area is a data-layer item; no theme facet |
| CCS-21 | Notify users of sensitive material + usage guidance | Advisory banner on record | **Data gap**: only 2 records tagged |
| CCS-22 | Visible stable identifier for citation/reuse | UoM ID + accession shown, copyable | Done |
| CCS-25 | Link to existing public sites (IMu/Vernon) | Persistent link + `Source URL` field (when present) | **Partial**: `Source URL` only populated where source data supplies it |
| CCS-38 | Refine results by type/date/theme/format; Indigenous labels (Indigeneity, research/non-research, region, country, family group, language, issue) | Type, date, format, collection filters | **Gap**: Indigenous filter labels and theme not implemented |
| CCS-41 | Digital-assets-only toggle | Toggle on search results | Done |
| CCS-44 | Authorised users can access content classified G, PG, M15+ etc. | Rating badge + guidance on record; moving-image records with no recorded rating show "Unclassified (CTC)" (4 of 728 records show a classification) | **Partial**: no authorised-user gating (needs login, BR-09); real ratings need to come from the collection teams |
| CCS-46 | Save favourites / personal lists | Not present | **Gap**: needs login (BR-09); not in prototype |
| CCS-47 | Contact collections team (use, view, more info, digitisation, physical access, contribute) | Request to use / view / contact dialog on record | **Partial**: use/view/contact covered; digitisation, physical access and contribute-information request types not offered |

## DA Licence Type, Terms of Use and Web Access (2026-10-03)

Source: Nexus DAM Knowledge Hub pages "License Type & Terms of Use" and "Cross Collection Search (Web) Readiness". The record page now shows the standard Terms of Use statement for the licence type (with copyright holder, date and responsible collection filled in), a Web access status, and the official Australian Classification marking for rated records. Web access is derived (open licence with a digital asset = View + Download, otherwise View only; no digital asset = no status) until the real DA Web Access Status field is supplied by the DAM integration. Search cards show the same status and marking.

## Page redesigns on Matrix content templates (2026-10-03)

Contact (collection contact cards, general enquiries table, numbered steps), Browse collections, the five collection pages (about + advisory notice, details table, visit and enquiries contact box with address, opening hours and contact details, four explore-further pathfinder tiles), Help (landing, topic pages, Indigenous data) now use the shared components in `styles/shared/content-templates.css`. Sub-collection browse (CCS-19) now lives on the Browse collections page only; the individual collection pages no longer list sub-collections or classifications; no requirement text changed.

## Prototype vs Jira alignment: stories not aligned or missing (re-read from Jira 2026-10-03)

Every user-facing story description in the CCS-2026 label (49 stories; integration, cyber, UX-task and hiring issues excluded) was re-read from Jira and compared with the prototype.

**Missing entirely**

| Story | Requirement | Note |
|---|---|---|
| CCS-46 | Favourites and personal lists | Needs login; CCS-70's guest security model lists "create/add/edit/delete lists" as guest actions, so lists are expected without a login |
| CCS-206 | Search history grouped by day | Recent searches exist but are not grouped by day |
| CCS-62 | Assistive-technology compatibility | No screen-reader or voice-control testing recorded |
| CCS-55 | Search filter for Indigenous data (on/off toggle) | Not built; needs cultural approval and data |
| CCS-65 (part) | PDF in the viewer (2026 priority: images, audio, video, PDF) | Images, audio and video only |
| CCS-27 (part) | DA caption in rights information | No caption field in the data or record page; accession, credit line, copyright, terms of use and contact are present |
| CCS-116 | Semantic search (Jira: Done) | No frontend trace |

**Partly aligned**

| Story | Gap |
|---|---|
| CCS-19 | One level only (collection > named collection); no series or parent/child navigation |
| CCS-20, 38 | No theme filter; Indigenous labels (Indigeneity, research/non-research, region, country, family group, language, issue) not offered |
| CCS-21 | Banner works; only 2 of 728 records carry an advisory |
| CCS-25 | Link to the museum's own site only where the data supplies one |
| CCS-45 | Jira means navigating multi-page assets (folios, books). The record page has previous/next with an "n of N" count, but no page-sequence navigation or thumbnails for books |
| CCS-50 | Jira (Done) asks for a usage notice users must accept before viewing certain items. The prototype has a one-time cultural acknowledgement on the search page only; none on record pages or per item |
| CCS-44, 66, 166 | Rating badge works but only 4 records show a classification; no authorised-user gating; no View + Download (the record page has no download) |
| CCS-68 | Licensed items should be view-only with a message that download is on request and approval only. Web access shows "View only" but the message is not shown |
| CCS-69 | Not-licensed assets should not be viewable, with a message that access is on request and approval. The prototype shows images for all in-copyright records and has no such message or hidden state |
| CCS-47 | Use, view and contact requests exist; digitisation, physical access and contribute-information are missing, and no form sends anything |
| CCS-123, 158 | Typos and partial phrases: spelling suggestion covers "did you mean"; results are not fuzzy-ranked |
| CCS-143 | "Know and access past few search terms": recent searches show in the suggestions list with a clear option, so this is mostly met (earlier note listing it as out of scope was wrong) |
| CCS-64 | Image aspect ratio kept via object-fit; not systematically verified |
| CCS-51 | axe scans only; no formal WCAG 2.1 AA audit |
| CCS-294 to 299, 83 | No requirement text in Jira |

**Aligned (verified in prototype):** CCS-22, 25, 33, 34, 37, 41, 52, 124, 157, 217, 233, 288, 292, 293.

**Jira status vs prototype**

- Marked Done but not met: CCS-50 (usage notice), CCS-68 (download message), CCS-70 (list actions), CCS-116 (semantic search), CCS-123 (fuzzy search, In Testing).
- Marked New but built: CCS-22, 25, 41, 124, 157, 217.

## 2026 MVP scope from the Jira "Remarks" field (filter 26999, read 2026-10-03)

The CCS 2026 filter holds 82 stories. The Remarks field says "Feasibility 2026: MVP" on 65 of them, "Not considered as core function or feature for the MVP, marked for review in the post-2026 implementation phase" on 8, and is empty on 9. Nothing says "2027" in those words, so the post-2026 remark is treated as the later-phase marker. Empty remarks are treated as 2026, as agreed.

**Post-2026 (not MVP): not counted as gaps**

| Story | Item | Prototype |
|---|---|---|
| CCS-19 | Explore collections and hierarchies (remark: not core if it means browsing a series of pages or a sitemap) | Collection pages plus the sub-collection list on Browse collections exist anyway |
| CCS-46 | Favourites and personal lists | Not built (matches Jira) |
| CCS-52 | Info page for Indigenous data | Built ahead of scope as `help/indigenous-data.html`; remark says to confirm the approach with the business |
| CCS-53 | Activity reporting | Not built (matches) |
| CCS-55 | Indigenous data filter (also "data is not ready") | Not built (matches) |
| CCS-62 | Assistive-technology compatibility | Not built (matches); CCS-51 WCAG AA stays MVP |
| CCS-158 | Spelling suggestions | Built ahead of scope, even though Jira status is Done |
| CCS-206 | Search history grouped by day | Not built (matches) |

**No remarks, treated as 2026**

- CCS-233 Contact us static page: built and redesigned.
- CCS-294 to 299 Home page and the five museum pages: built and redesigned; Jira has no description to check them against.
- CCS-272 Specifications for the CCS data inventory: a stub pointing to an attachment.
- CCS-310 Test Semantic Search story: a test ticket, not a requirement.

**MVP stories that still need work in the prototype**

| Story | What is missing |
|---|---|
| CCS-20, 38 | Theme filter; Indigenous labels and subject area |
| CCS-21 | Advisory data is on 2 of 728 records only (data gap) |
| CCS-27 | DA caption in rights information |
| CCS-44, 66, 166 | Ratings on only 4 records; no View + Download; no per-user access |
| CCS-45 | Page-sequence navigation for multi-page assets (folios, books) |
| CCS-47 | Digitisation, physical access and contribute-information request types; forms send nothing |
| CCS-50 | Usage notice accepted before viewing certain items (only a search-page acknowledgement exists) |
| CCS-51 | Formal WCAG 2.1 AA audit |
| CCS-65 | PDF viewing |
| CCS-68, 69 | "Download on request and approval" and "not viewable, request access" messages and states |
| CCS-116, 123 | Semantic and fuzzy result matching |
| CCS-143 | Mostly met: recent searches in suggestions |
| CCS-64 | Image aspect ratio check |
| CCS-70 | Guest list actions are not needed for 2026 because favourites (CCS-46) are post-2026 |

**MVP and already met in the prototype:** CCS-22, 25, 33, 34, 37, 41, 124, 157, 217. The remaining MVP stories (EMu, Vernon and DAM loads, indexing, security and firewall) are backend work with no frontend surface here.

## CCS-27, 45, 50, 68, 69 build (2026-10-03)

- **CCS-68 / 69:** records with a digital asset now carry an access message. "View only" (in-copyright) records say that downloading is on request with approval and link to "Request to use"; a new "Not licensed" licence type (`view: false`) shows "Request to view" in place of the media with a button that opens the request dialog. No current record is "Not licensed", so the state is exercised by tests and manual checks only until the DAM supplies that value.
- **CCS-50:** records with an advisory or a film/game classification show a usage notice in place of the media until the user accepts it ("I understand, view this item"). Acceptance is remembered per item for the browser session (`sessionStorage`).
- **CCS-27:** `caption` (record) and `captions` (per image) are supported in the data, shown under the media and in the media metadata panel. The current data has no captions, so none appear until the DAM `DA Caption` field is loaded.
- **CCS-45:** with more than three media items the viewer bar adds First / Last buttons and a "Go to" selector (n of N), and Home / End keys, alongside previous / next and thumbnails.

## MVP batch: CCS-47, 65, 20/38, 64, 143 (2026-10-03)

- **CCS-47 request types:** the record page's "Contact the collection" list now opens a request dialog with six types: more information, use, view, digitisation, physical access and contribute information (the scenarios in the Jira description). After submitting, the dialog says nothing was emailed (prototype) and lists what would be sent. Previously the dialog could not be opened from the page.
- **CCS-65 PDF:** the record viewer supports PDFs (embedded frame, "Open in a new tab" link, thumbnail, First/Last/Go to). `ASSET_PDF` in `collection-data.js` is empty: the DAM folder holds `Crossley_GM 06.0026.pdf` and `GraingerTalkOnCrossley_UAC_09.0010.pdf` but no matching record exists in the prototype data, so none are attached.
- **CCS-20 / 38 Theme filter:** a "Theme" facet (10 themes) in Subject / topic, derived from the museum classification (`THEME_OF` in `collection-data.js`); 482 of 728 records have a theme. Indigenous objects are deliberately not given a theme until the Indigenous labels are approved.
- **CCS-64 aspect ratio:** `tests/image-aspect.test.js` measures every rendered image on six pages at desktop and phone widths and fails if one is stretched; 357 images pass. Cropping (`object-fit: cover`) is allowed.
- **CCS-143 recent searches:** the header search overlay on every page lists the last five search terms from the session, as well as the existing suggestions on the search page. History is kept for the browser session only.

## WCAG 2.1 AA pass (CCS-51), 2026-10-03

**Automated (now a test: `tests/accessibility.test.js`)**: axe-core WCAG 2.1 A and AA rules on 14 page states (home, Browse collections, a collection page, search results, Advanced Filters, three record states, four help pages, Indigenous data, contact) at 1440px and 390px, plus content fitting a 320px viewport (1.4.10), one h1 and `lang="en"` per page, and a distinct title per page (2.4.2).

**Found and fixed**

| Finding | WCAG | Fix |
|---|---|---|
| Date fields in Advanced Filters used `aria-expanded` on a plain text input | 4.1.2 | Input now has the combobox role (date picker pattern) |
| Usage-notice heading failed contrast on the dark media panel | 1.4.3 | Notice panel is now white |
| Record page media bar and notice panel were wider than a 320px screen | 1.4.10 | Bar wraps; panel padding and heading size reduce on phones |
| "Media metadata" was an h3 directly under the h1 | 1.3.1 / 2.4.6 | Now an h2 |
| All help topic pages shared one page title | 2.4.2 | Each topic sets its own title |

**Checked by script and passing:** skip link is the first tab stop on every page; every checked page has one h1, a main landmark, labelled navigations, no images without alt text and no buttons or links without a name; the request dialog and Filters modal trap focus, label themselves, close on Escape and return focus; the search overlay focuses its input, closes on Escape and returns focus; focus indicators are visible on every tab stop (card links show the indicator on the card).

**Manual checks still needed before sign-off (cannot be automated)**

1. Screen reader pass (NVDA and VoiceOver) on search, a record with media, the request dialog and the Filters modal. Story CCS-62 (assistive technology) is post-2026; WCAG sign-off still needs a human pass.
2. Audio and video: no captions, transcripts or audio description exist for the sample media (1.2.1, 1.2.2, 1.2.5). The collection teams must supply them with the files.
3. Text spacing (1.4.12) and zoom to 200% on the record viewer.
4. Colour use and contrast of images of text in collection photographs (content, not interface).
5. Real-content review of alt text: viewer images use the record title; descriptive alt text from the collections would be better.
6. A formal audit by the University accessibility team, which is the only valid basis for a conformance claim.

## CCS-116 semantic and CCS-123 fuzzy search without a backend (2026-10-03)

Built in the browser in `public/search/smart-search.js` (tests: `tests/smart-search.test.js`). It is a prototype approximation, not the production search service.

- **Fuzzy (CCS-123):** a word that is not in the catalogue vocabulary (4,400 words) is matched to close words using edit distance with transpositions (one edit up to 8 letters, two beyond; the first letter must match), and the last word also matches as a prefix, so partial phrases work. "kangeroo" finds kangaroo records; "mediacl instruments" finds medical instruments.
- **Semantic (CCS-116):** everyday words are expanded through a curated vocabulary (about 30 synonym groups and 20 broad-to-specific groups: "tooth" reaches dental, "pottery" reaches ceramic and porcelain, "fiddle" reaches violin, "xray" reaches radiograph, "instrument" reaches harp and piano) and, for words with no curated entry, terms that strongly co-occur with them in the records. Specific words are not widened to their siblings: a harp search does not return violins.
- **Ranking and transparency:** exact matches (title first) rank before close spellings, then related meanings; each non-exact card is labelled "Close spelling" or "Related meaning"; a notice explains what was widened and offers "Show exact matches only" (also `?exact=1`).
- **Never widened:** quoted phrases and AND / OR / NOT queries stay exact.
- **Limits:** this is vocabulary-and-statistics based, not a language model. It cannot answer questions ("who treats babies"), understand context or rank by meaning. The curated vocabulary is small and should be extended by the collection teams; the real service (CCS-116 backend) should replace it. Jira still marks CCS-116 as Done, which the production search must back up.

## Record data table on small screens (2026-10-04)

On screens 768px wide or narrower the record page's data table stacks each value under its label (single column) instead of a fixed 200px label column beside a squeezed value; above 768px it stays two columns.
## Collection page "Visitors information" (2026-10-04)

The box on each collection page is now "Visitors information" and shows the content of each museum's own visitor page (copied 2026-10-04): Harry Brookes Allen (harrybrookesallenmuseum.mdhs.unimelb.edu.au/about/visitors-info), Medical History Museum (medicalhistorymuseum.mdhs.unimelb.edu.au/about/contact-us), Henry Forman Atkinson Dental Museum (henryformanatkinsondentalmuseum.mdhs.unimelb.edu.au/visitors-info), Grainger Museum (grainger.unimelb.edu.au/visit) and, because it has no visitor page, the University Art Collection's access text from museumsandcollections.unimelb.edu.au. Each box links to its source page. The text lives in `VISITS` in each collection page's script; re-check it against the source pages from time to time (the Medical History Museum's temporary closure notice for 25 Dec 2025 to 1 Jan 2026 was left out because it has passed).

## Full cross-check of all 82 CCS-2026 stories against the prototype (2026-10-04)

Source: filter 26999 (`project = CCS AND type = Story AND labels = CCS-2026`), read live through the Jira REST API: 82 stories (19 Done, 3 In Progress, 60 New). Prototype: `main` at #103, tested in Chromium (counts below are from running the site, not from reading code).

**1. Stories with no prototype surface (34): backend, data, security, test.** CCS-48, 49, 118, 159, 160, 169, 170, 172, 183 to 187, 197, 207, 209, 211, 230, 231, 237, 238, 240, 241, 244, 245, 263, 265, 266, 304, 311 to 313 (EMu, Vernon, Nexus DAM loads, indexing, database records, firewall), plus CCS-145 (security), CCS-70 (guest security model), CCS-272 (data inventory spec) and CCS-310 (test ticket). Not testable in a static prototype. Done ones among them (118, 237, 238, 240, 241, 244, 245, 312) are backend work.

**2. Post-2026 per the Remarks field (8).** CCS-19, 46, 52, 53, 55, 62, 206 (and 158 is flagged "Feasib…"). Not counted as gaps. Built ahead of scope: CCS-52 (Indigenous data info page) and CCS-158 (suggestions).

**3. Every Done story checked in the running prototype**

| Story | Jira | Prototype result | Verdict |
|---|---|---|---|
| CCS-27 Rights information | Done | Rights, credit line, terms of use and contact on record pages. Caption supported, but no record has a caption (data gap) | Met, caption data missing |
| CCS-33 Basic search | Done | "harp" returns 3 results | Met |
| CCS-34 Boolean / exact phrase | Done | Phrase "percy grainger" 19; harp OR violin 3 (2 + 1); harp NOT violin 2; AND/OR/NOT stay exact | Met |
| CCS-37 Search within a collection | Done | "All collections" menu plus the five collection pages | Met |
| CCS-45 Pagination | Done | Pager and per-page selector on results; First / Last / Go to on the 47 records with several assets | Met |
| CCS-50 Usage notice | Done | Shown before media on the 4 records with an advisory or film rating; accepted per session | Met for the data we have |
| CCS-68 Licensed: view only | Done | 41 records show the "downloading on request" message | Met |
| CCS-116 Semantic search | Done | "pottery" returns 28 related results, "fiddle" reaches violin, via a thesaurus (not a real semantic engine) | Met as an approximation; real semantic search needs the backend |
| CCS-123 Fuzzy matching | Done | "skul" finds skull (17), "mediacl instruments" finds medical | Met |
| CCS-158 Spelling suggestions | Done | Replaced in practice by the "close spellings" notice; the old "Did you mean" link no longer appears for typos like "harpp" | Met in effect; the explicit link was dropped |

**4. User-facing stories not Done: what the prototype does**

| Story | Prototype today | Gap |
|---|---|---|
| CCS-20, 38 Filters | 24 facets in the Filters modal including Theme, Licence, Film and gaming classification, Cultural affiliation; digital-only switch (47 records) | Indigenous labels not approved; Jira still says New |
| CCS-21 Sensitivity notices | Banner and usage notice work | Only 2 records carry an advisory (data) |
| CCS-22 UoM ID | "UoM ID CA-nnnnnn" on every record page | Met; Jira says New |
| CCS-25 Persistent URLs | Link to the museum's own record where the data supplies one | Data-dependent |
| CCS-41 Digital assets only | Switch returns 47 of 728 | Met; Jira says New |
| CCS-44, 66, 166 Classification / formats | Rating badge (for example "General (G)") on film records | No View + Download, no authorised-user gating, few rated records |
| CCS-47 Contact us, record view | Six request types in a dialog | Nothing is sent (needs a backend) |
| CCS-51 WCAG 2.1 AA | Automated axe test on 30 page states plus 320px reflow, all passing | No formal manual audit |
| CCS-64 Image aspect | 357 images checked by test | Met |
| CCS-65 Formats | Images and PDF viewer in the code | No audio or video asset present, and no PDF is matched to a record |
| CCS-69 Not licensed | Hidden-media state exists and is tested | No record is "Not licensed" (data) |
| CCS-124 No-results message | "No records match your search" with advice | Met; Jira says New |
| CCS-143 Search history | Recent searches in the overlay, plus Save this search | Met; daily grouping is CCS-206 (post-2026) |
| CCS-157 Hero image | Hero on home and collection pages | Met; Jira says New |
| CCS-217 Collection asset details | Record page with grouped metadata | Met; Jira says New |
| CCS-233 Contact static page | Contact page redesigned, with form | Met |
| CCS-294 to 299 Home pages | Home plus five museum pages | No requirement text in Jira to check against |

**5. Where Jira status and the prototype disagree**
- Built but Jira says New: CCS-20, 22, 25, 38, 41, 47 (UI part), 64, 124, 143, 157, 217, 233, 294 to 299.
- Jira says Done but the real thing is not there: CCS-116 (thesaurus only), CCS-70 (list actions need CCS-46, post-2026).

**6. Remaining real gaps for the 2026 MVP (all need data, approval or a backend, not more front-end work)**
1. Advisory, rating, caption, Not-licensed and PDF data from the collection teams (CCS-21, 27, 44, 66, 69, 65).
2. Indigenous labels and subject area, pending cultural approval (CCS-20, 38).
3. A backend to send requests (CCS-47) and real semantic search (CCS-116).
4. A formal WCAG 2.1 AA audit with a person and assistive technology (CCS-51).
5. Download and authorised-user access (CCS-44, 66, 166).

## CCS-158, 27 and 116 acceptance criteria (2026-10-04)

**CCS-158 (spelling suggestions, acceptance criteria: a misspelt term or partial phrase gets a suggested correct spelling the user can search with).** Previously "Did you mean" only appeared when a search found nothing, because close spellings were quietly widened. Now a "Did you mean <word>?" notice sits above the results whenever a word is misspelt or only partly typed ("skul" gives "skull", "dent" gives "dental", a typo inside a phrase is corrected word by word), and clicking it runs the corrected search. A partial word is completed to the shortest catalogue word it begins (at most three letters longer); otherwise the closest spelling is offered.

**CCS-27 (usage rights).** The record page's Copyright box now lists, in the order of the acceptance criteria: Accession number, Caption (digital assets only; "No caption recorded" until the DAM caption field is loaded), Credit line, Copyright, then Web access, Terms of use (digital assets only) and the contact. Previously the accession number was not in this box. Records without a digital asset omit Caption and Terms of use, as the story requires. A data test checks every one of the 728 records. Still needed from the data: real captions and the "Pending on Data model and Concatenation discussion" source-field mapping that the story itself lists.

**CCS-116 (semantic search).** The acceptance criteria are: meaning plus exact matches, synonyms, the whole phrase understood as one idea, and useful results for short or vague terms. Done without a backend: exact-first ranking with synonym and broader-term matches; and now whole-phrase meanings ("false teeth" finds dentures, "x ray" finds radiographs, "sheet music" finds scores and manuscripts, "pulling teeth" finds extraction forceps) so every word no longer has to appear. Vague words such as "old" are ignored. What cannot be done in a static site: real language understanding for phrases we have not listed. That needs a search engine with embeddings (for example the Blacklight/Solr backend plus a vector index); the phrase list (`PHRASES` in `smart-search.js`) is the stop-gap and needs the collection teams to add the phrases their users actually type.

## Free search API on the same Vercel URL (2026-10-04)

`api/catalog.js` is a Vercel serverless function (Hobby plan, no cost, no database) that answers `/catalog.json` and `/catalog/:id.json` in the Blacklight JSON shape the adapter already expects (`response.docs`, `numFound`, `facet_counts`). It loads the catalogue from `public/collection-data.js` and uses the same fuzzy, synonym and phrase engine as the browser, plus quoted phrases and AND / OR / NOT, collection / type / theme / licence facets, date range, sorting and paging. `vercel.json` rewrites `/catalog.json` to it. `public/blacklight-adapter.js` now defaults to `/catalog.json`; the site still starts in mock (browser) mode, and the API toggle on the results page or `?api=live` switches to it. To use a real Blacklight/Solr server later, pass `?endpoint=<url>` or set `CCS_CONFIG.apiEndpoint`. Test: `tests/catalog-api.test.js`.

Why not Solr on Render's free plan: the free tier has 512 MB of memory and no disk, which is not enough to run Solr and Rails together. Solr on any host costs money (about $7 to $25 a month on Render); the repo's `blacklight-app/` stays ready for that step.

## Open Items For Follow-Up

1. **Re-verify, not assumed**: CCS-21 (sensitivity notifications), CCS-47 (contact-us record view), CCS-64 (item 4 — image aspect ratio), CCS-65 (audio/video/PDF format handling), CCS-68/69/166 (request-to-use/view flows) — these were asserted "implemented" in the prior version of this document without the same rigor applied to the items above; they should get the same live-code verification treatment before being marked confirmed.
2. **Dead code cleanup**: done - `public/styles/variables.css` / `components.css` and the other duplicates were deleted (2026-10-01).
3. **WCAG AA certification**: no formal WCAG 2.1 AA audit has been run (axe-core scans only) — the prior document's "certified" claim was not backed by an actual audit trail and should not be relied upon.

### Search results banner and sticky tools bar (2026-10-04)
- Fix: the search form now lives permanently in the banner. The sticky bar holds only the tools plus a compact search box that appears when stuck, so its height no longer flips between a tall and a short layout while scrolling. The smart-search notices sit in their own full-width row (`.search-results-notices`) above the results grid.
- The results page banner is now compact (title plus a "N results for “query”" line). The search form sits inside the banner on the navy strip.
- Below it, one sticky `.search-results-bar` holds Sort, Filters, the Digital asset switch, the view toggle and Save this search. An IntersectionObserver sentinel adds `is-stuck` once the banner scrolls away. When stuck, the search box stays visible next to the tools on desktop and tablet.
- On phones the bar stacks: search, then Sort | Filters, then Digital asset | view | Save (icon only). When stuck it shrinks to the search row plus Sort | Filters | Digital.
- The per-page selector moved to sit above the pagination. CSS lives in `public/styles/pages/search-results.css`.
- Follow-up: banner and search strip padding increased; the search form reuses the homepage `ccs-hero__search` wrapper (full width, Advanced Search underneath). When stuck, Advanced Search is hidden, the bar is one row from 1280px and two rows below, and all controls are 48px tall.
- Scope menu and suggestions now open over the sticky bar (banner z-index above it).
- The banner's Advanced Search link is now a toggle ("Advanced Search" / "Hide advanced search") that opens the advanced form inline: an iframe of `/search/advanced-search?embed=1` pre-filled with the current search, auto-sized through a `postMessage` of its height. In `?embed=1` mode the page hides the header, breadcrumbs, banner, help and footer and uses compact spacing (`html.is-embed` rules in `styles/advanced-filters.css`); submitting targets the top window.
- Advanced Search page: heading renamed "Advanced Search" (banner, breadcrumb, test), "Add filter" label is light on the dark desktop field (dark on the sage phone field), and Reset / Search sit at the right.

---

## Document Information

**Corrected**: 2026-09-29 | **Method**: Live Jira MCP fetch + from-scratch code read (not derived from the prior version of this document) | **Maintained By**: Development team — re-verify "Open Items" above before treating this as complete.
