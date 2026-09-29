# Cultural Collections Search - 2026 MVP Requirements Mapping

**Project**: CCS-2026 | **Jira Source**: [unimelb.atlassian.net CCS board](https://unimelb.atlassian.net/jira/software/c/projects/CCS/boards/6889?label=CCS-2026) (label `CCS-2026`, ~140 issues)
**Audit Method**: Live Jira MCP fetch (66 frontend-relevant epics/stories/bugs, verbatim descriptions) cross-checked against a from-scratch read of the actual `public/` codebase — not against this document's own prior claims.
**Audit Date**: 2026-09-29 | **Status**: Corrected — see "Correction Notice" below

---

## Correction Notice

The previous version of this document (dated 2026-09-29, "100% Complete") was inaccurate in two ways:

1. **It mapped requirements to the wrong files.** It cited `Collection Search v3.dc.html`, `Collection Record.dc.html`, `Browse Collections.dc.html`, etc. — the **legacy, pre-reorganization root-level files**. These are orphaned: `grep -rn "\.dc\.html" public/` returns zero navigational links from the live site. The real, linked site is entirely under `public/` (`public/search/advanced.html`, `public/collections/record.html`, `public/collections/index.html`, etc.). `public/.htaccess` 301-redirects the legacy filenames to the real URLs, but nothing in the live site links to the legacy files directly.
2. **It asserted things were "Done"/"in scope" or "out of scope" based on assumption, not the actual Jira board or actual code.** For example, it claimed CCS-158 (spelling suggestions) was "out of scope — post-2026," but Jira shows it as **Done**, backed by three real bug tickets (CCS-288, 292, 293) describing tested production behavior. The code had none of it.

This revision was produced by fetching the live Jira issues directly (see audit method above) and reading the actual `public/` code, and a set of genuine discrepancies found during that process have since been fixed (see "Fixes Applied" below).

---

## Site Structure (ground truth)

- **Canonical live site**: `public/` — `index.html`, `search.html` (redirect shim → `search/advanced.html`), `search/advanced.html` (real search), `collections/index.html`, `collections/{grainger-museum,harry-brookes-allen-museum,henry-forman-atkinson-dental-museum,medical-history-museum,university-art-collection}.html`, `collections/record.html`, `contact.html`, `help/index.html`, `indigenous-data.html`.
- **Legacy/orphaned**: root-level `*.dc.html` files (`CCS Home page.dc.html`, `Browse Collections.dc.html`, `Collection Record.dc.html`, `Collection Search v3.dc.html`, `Contact Us.dc.html`, `Help and Support.dc.html`, `Collection Landing.dc.html`) and root `index.html`/`collection-data.js`. Not linked from `public/`; retained only as 301-redirect sources in `public/.htaccess`. Do not treat these as the current implementation.
- **`config/redirects.json`**: documentation-only (grepped — nothing in the codebase reads it at runtime); now corrected to match `public/.htaccess`'s real redirect targets.
- **Shared data source**: `public/collection-data.js` (`ITEMS` array) feeds both `search/advanced.html` and the collection/record pages — single source, not duplicated.
- **Live stylesheet**: pages load `public/components/fig-tokens.css` + `fig-assets.css`. `public/styles/variables.css`/`components.css` are byte-identical but **unreferenced by any page** — dead code kept in sync as a precaution, worth removing in a follow-up cleanup.

---

## Fixes Applied (this audit cycle)

| # | Finding | Fix |
|---|---|---|
| 1 | `public/search.html` was a full duplicate of the homepage with a bolted-on JS redirect — flashed wrong content, broke with JS disabled | Reduced to a minimal, honest redirect (meta-refresh + JS fallback + visible link); added a server-side 301 in `.htaccess` |
| 2 | CCS-158 (Spelling Suggestions, Done in Jira) had zero implementation | Implemented per-word Levenshtein-based "did you mean" in `search/advanced.html`, fixing the exact bugs described in CCS-288 (last-word correction) and CCS-292 (per-word, vocabulary-validated correction) |
| 3 | CCS-34 (Boolean/exact-phrase search, Done in Jira) only had implicit AND + quoted-phrase; no explicit operators | Added real `AND`/`OR`/`NOT` parsing (left-to-right, no parentheses), with prior behavior preserved as fallback for non-boolean queries |
| 4 | 3 records (`id` 152, 155, 171) had corrupted `year`/`dateDisplay` values (e.g. `year: 2663`) — not recoverable from source CSVs | Set to `year: null` (dateDisplay removed), matching the file's existing "unknown date" convention — no fabricated dates |
| 5 | `config/redirects.json` mapped legacy files to a nonexistent `/pages/*.html` scheme, contradicting `.htaccess` | Rewritten to match `.htaccess`'s real targets |
| 6 | 4 of 5 museum collection pages had a stale `data-props` schema default of `"MHM"` (actual render logic was already correct per-page) | Corrected each page's default to its real code (GMC/HBA/DENT/UAC) |
| 7 | No centralized `:focus-visible` styling anywhere in the live stylesheet (WCAG 2.4.7 gap) | Added a `:focus-visible` rule using the design system's `--focus-focus` token to `public/components/fig-tokens.css` (the file actually loaded by pages) |
| 8 | CCS-234 epic lists "Indigenous Cultural Data and Access" as its own static page; only existed as a subsection of the help page | Extracted to standalone `public/indigenous-data.html` (content preserved verbatim, no invented claims), linked from help and the homepage nav |

---

## Requirements Mapping

### Search & Discovery

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-33 | Basic search | Done | `public/search/advanced.html` — real search UI; header/hero search on `public/index.html` submits into it. `public/search.html` is a redirect shim, not a duplicate page (fixed) |
| CCS-34 | Boolean / exact-phrase search | Done | `search/advanced.html` — quoted exact-phrase + implicit AND (pre-existing) **plus** explicit `AND`/`OR`/`NOT` operators (added this cycle) |
| CCS-37 | Search within a collection | Done | Collection-scope filter in `search/advanced.html` facets |
| CCS-38 | Search filters | New | Type/date/format facet filters present in `search/advanced.html`. Indigenous-material-specific filter labels (per the Jira description's red-highlighted note) are **not** implemented — see Gaps below |
| CCS-41 | Digital-assets-only filter | New | `f.digital` toggle in `search/advanced.html`, verified real (default true, filters records with no `img`) |
| CCS-116 | Semantic search (app level) | Done | No frontend trace found; appears to be backend-scoped. Not independently verifiable from this repo — flag to backend team rather than assume |
| CCS-123 | Fuzzy search | In Testing | No fuzzy-match logic beyond the spelling-suggestion feature added this cycle (which covers the "did you mean" UX, not general fuzzy ranking of results) |
| CCS-124 | No-results messaging | New | Real implementation in `search/advanced.html` ("No records match your search" + "Clear all filters") |
| CCS-158 | Offer spelling suggestions | Done | **Implemented this cycle** (see Fixes Applied #2) — was previously entirely absent despite Done status |
| CCS-20 | Filter and refine public data | New | Covered by CCS-38's filters; Indigenous "subject area" sourcing from CMS not verifiable from this static repo (data-layer requirement) |
| CCS-21 | Sensitivity notifications | New | Not independently verified this cycle — recommend a follow-up check against `advisories` field usage in `collection-data.js` and record page display |
| CCS-22 | UoM ID surfacing | New | `accession` field displayed on `collections/record.html` |
| CCS-25 | Persistent URLs | In Testing | `collections/record.html` has a "Copy persistent link" button (verified in code) |
| CCS-27 | Display rights information | Done | `collections/record.html` displays `licence`/`rights` fields and licence icons |
| CCS-217 | View Collection Asset Details (with/without DAs) | New | `collections/record.html` and collection pages handle both cases (records with `img: null` render without a media viewer) |

### Content Classification & Access

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-64 | Link DAs and metadata with CA metadata | New | Data-layer requirement; `collection-data.js`'s single shared `ITEMS` structure is consistent with this, but the "aspect ratio without distortion" clause (item 4 in the Jira description) was not independently re-verified this cycle |
| CCS-65 | Digital asset formats | New | 2026 priority is Images/Audio/Video/PDF per Jira; current dataset/UI is image-only — audio/video/PDF handling not verified in this repo |
| CCS-66 | Categories of content | New | Parent story for CCS-166/68/69 below |
| CCS-68 | Content classification — Request to USE | Done | Not independently re-verified this cycle (was claimed present in the prior doc version; recommend explicit re-check of `collections/record.html` for a request-to-use flow) |
| CCS-69 | Content classification — Request to VIEW | New | Same caveat as CCS-68 |
| CCS-166 | Content classification — VIEW only | New | Same caveat as CCS-68 |

### Accessibility & Security

| Story | Summary | Jira Status | Implementation |
|---|---|---|---|
| CCS-51 | WCAG 2.1 AA compliance | New | Skip links, aria-labels present (verified); `:focus-visible` gap fixed this cycle (Fixes Applied #7). Full WCAG AA conformance has **not** been formally tested — treat as partially verified, not certified |
| CCS-62 | Accessibility (Assistive Technology Compatibility) | New | Not implemented; correctly reflects Jira's "New" status |
| CCS-70 | Security model — Guest | Done | All `public/` pages are guest-accessible by default (no login gating found) |
| CCS-145 | Security (BR-18.04) | New | Backend/infrastructure scope; not applicable to this static frontend |
| CCS-172 | Web Application Firewall | New | Infrastructure/DevOps scope; not applicable to this static frontend |

### Core & Static Pages (CCS-234 epic)

| Page | Story | Jira Status | Implementation |
|---|---|---|---|
| Home | CCS-294 | New (no Jira description) | `public/index.html` |
| Browse all collections | CCS-19 | New | `public/collections/index.html` |
| Grainger Museum | CCS-295 | New (no Jira description) | `public/collections/grainger-museum.html` |
| Harry Brookes Allen Museum | CCS-296 | New (no Jira description) | `public/collections/harry-brookes-allen-museum.html` |
| Henry Forman Atkinson Dental Museum | CCS-297 | New (no Jira description) | `public/collections/henry-forman-atkinson-dental-museum.html` |
| Medical History Museum | CCS-298 | New (no Jira description) | `public/collections/medical-history-museum.html` |
| University Art Collection | CCS-299 | New (no Jira description) | `public/collections/university-art-collection.html` |
| Contact | CCS-233 | New | `public/contact.html` |
| Indigenous Cultural Data and Access | CCS-52 | New | **Was a subsection of `help/index.html`; extracted to standalone `public/indigenous-data.html` this cycle** (Fixes Applied #8) |
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

EMu, Vernon (MDHS), and Nexus DAM integration stories (CCS-48, 49, 118, 183–187, 197, 207, 209, 211, 230, 231, 237, 238, 240, 241, 244, 245, 263, 265, 266, 304, 310–313, 321, 322, 332, 333, and related bugs CCS-306/307) are backend/data-pipeline work with no frontend surface in this repo. `public/collection-data.js`'s field structure (`id`, `title`, `img`/`images[]`, `collection`, `type`, `creator`, `licence`, `access`, `accession`, `subject`, etc.) is what a real backend integration would need to populate — this document does not assert those integrations are complete, only that the frontend has a consistent shape ready to receive real data.

Specs referenced but not machine-readable from this repo: `public/assets/data/metadata/CCS Data inventory - final - 12 Aug.xlsx` (CCS-272), `CCS Fields and Filters.xlsx` (CCS-216) — these are one-line stub issues in Jira pointing at attachments; the actual field/attribute list was not retrievable via the Jira API and should be reviewed directly by whoever owns those spreadsheets.

---

## Open Items For Follow-Up

1. **Re-verify, not assumed**: CCS-21 (sensitivity notifications), CCS-47 (contact-us record view), CCS-64 (item 4 — image aspect ratio), CCS-65 (audio/video/PDF format handling), CCS-68/69/166 (request-to-use/view flows) — these were asserted "implemented" in the prior version of this document without the same rigor applied to the items above; they should get the same live-code verification treatment before being marked confirmed.
2. **Dead code cleanup**: `public/styles/variables.css` and `public/styles/components.css` are unreferenced duplicates of `public/components/fig-tokens.css`/`fig-assets.css`. Consider removing to avoid future edits landing in the wrong (dead) file.
3. **WCAG AA certification**: no formal automated or manual WCAG 2.1 AA audit has been run against this codebase as part of this cycle — the prior document's "certified" claim was not backed by an actual audit trail and should not be relied upon.

---

## Document Information

**Corrected**: 2026-09-29 | **Method**: Live Jira MCP fetch + from-scratch code read (not derived from the prior version of this document) | **Maintained By**: Development team — re-verify "Open Items" above before treating this as complete.
