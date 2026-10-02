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
- **Live stylesheets**: `public/components/fig-tokens.css`, `fig-assets.css`, `public/styles/home.css`, `advanced-filters.css`, `header.css`, `collection.css`, and the locally built `public/styles/vendor/bootstrap-uom.min.css`. The dead duplicates `variables.css` / `components.css` have been deleted.

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
| 7 | No centralized `:focus-visible` styling anywhere in the live stylesheet (WCAG 2.4.7 gap) | Added a `:focus-visible` rule using the design system's `--focus-focus` token to `public/components/fig-tokens.css` (the file actually loaded by pages) |
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
| CCS-143 | Save search history |
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
| CCS-19 | Browse collections, sub-collections or hierarchies from source systems | Landing pages now list "Browse by sub-collection" (named collections, with counts) and "Browse by classification"; each link opens search pre-filtered (`?collection=&named=` / `&classification=`) | **Partial**: one level of hierarchy (collection > named collection); deeper source-system hierarchies (series, parent/child) are not navigable |
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

## Open Items For Follow-Up

1. **Re-verify, not assumed**: CCS-21 (sensitivity notifications), CCS-47 (contact-us record view), CCS-64 (item 4 — image aspect ratio), CCS-65 (audio/video/PDF format handling), CCS-68/69/166 (request-to-use/view flows) — these were asserted "implemented" in the prior version of this document without the same rigor applied to the items above; they should get the same live-code verification treatment before being marked confirmed.
2. **Dead code cleanup**: done - `public/styles/variables.css` / `components.css` and the other duplicates were deleted (2026-10-01).
3. **WCAG AA certification**: no formal WCAG 2.1 AA audit has been run (axe-core scans only) — the prior document's "certified" claim was not backed by an actual audit trail and should not be relied upon.

---

## Document Information

**Corrected**: 2026-09-29 | **Method**: Live Jira MCP fetch + from-scratch code read (not derived from the prior version of this document) | **Maintained By**: Development team — re-verify "Open Items" above before treating this as complete.
