# Post-IA Fixes Summary

**Date**: 2026-09-29
**Commits**: `9c39695`, `2f7bd64`, `128d82c`, `cabb640`, `f2da0bd`, `35135dd`

Consolidated summary of fixes made after the IA restructure, found via a `/design-critique` of the live homepage and a subsequent MVP-scope audit. Each commit message has full technical detail; this doc is the index.

## 1. Critical bug: fabricated Bootstrap SRI hashes (`9c39695`)
The Bootstrap CDN `<link>`/`<script>` tags had SRI `integrity=` hashes that didn't match the real files. Browsers silently block a resource on SRI mismatch — network tab shows 200 OK, but the CSS/JS never applies. This was the root cause of the site-wide unstyled, stacked navbar. Fixed by recomputing real hashes via `openssl dgst -sha384` against live jsDelivr files.

Also fixed in the same pass: broken relative asset paths (IA migration script only patched `href=`, not `src=`, and treated the homepage as depth-0 when it had moved to `public/`), `public/` not being self-contained for production deployment, duplicate footers on all 12 restructured pages, dead links to pre-migration filenames, and all 5 collection pages showing "Medical History Museum" regardless of URL (template's `this.props.collection` is always empty in static exports — hardcoded the correct key per page instead).

## 2. JS-embedded image paths (`128d82c`)
The SRI-hash fix pass only matched `src="images/` as an HTML attribute pattern — missed image paths embedded as JS string literals inside `<script>` blocks (`collections/index.html` tile arrays, `search/advanced.html` licence icons). Fixed separately once the new card grid made the broken images visible.

## 3. Design audit + Gen 3 alignment (`2f7bd64`)
From a `/design-critique` of `Collection Landing.dc.html` and `Browse Collections.dc.html`:
- Added missing `<title>`/`<meta description>` (WCAG 2.4.2 failure)
- Rebuilt the breadcrumb to match the [Gen 3 Page Header component](https://designsystem.web.unimelb.edu.au/components/page-header/) — see `design.md` → Breadcrumb Component
- Added a 640px responsive breakpoint (previously zero `@media` queries)
- Redesigned "Collections" from a plain divided list into a card grid, matching the visual language already used elsewhere on the site

## 4. Grainger Museum tile image (`cabb640`)
Sourced from `assets/Collections - image tiles.docx` (specifies `Hardanger_Fiddle.tif` for this collection). Extracted the embedded TIFF, converted to web JPEG, wired into both the root template and its live `public/` derivative.

## 5. MVP 2026 scope audit (`f2da0bd`)
Cross-referenced the prototype against [Jira filter 26999](https://unimelb.atlassian.net/issues/?filter=26999) — the `Remarks` custom field marks 8 items as post-2026/out-of-scope. Removed two that had real, functioning code: the "Did you mean?" spelling-suggestion UI, and a dormant (no UI control) Indigenous-data search filter. Checked and ruled out the other 6 (feature doesn't exist in the prototype, or doesn't match what the excluded story describes).

**Left for a human decision**: `Help and Support.dc.html`'s dedicated "Indigenous Cultural Data and Access" section matches what Jira item CCS-52 describes as post-2026 scope — not removed, since deleting Indigenous cultural guidance content is a culturally sensitive call that shouldn't be made unilaterally.

## 6. Content accuracy fixes (`35135dd`)
Read the remaining `/assets` Help/advisory docs (converted locally via `textutil`, not read as binary). Found the live Help page content already closely matches the approved source docs (FAQ, copyright, Indigenous statements). Found and fixed one real defect: mismatched museum contact emails (`mhm.info@`/`mhm-info@` typo'd variants used instead of the correct `MDHS-museum@unimelb.edu.au` for Medical History Museum and Henry Forman Atkinson Dental Museum) across `Contact Us.dc.html`, its `public/` derivative, and all 5 collection landing pages.
