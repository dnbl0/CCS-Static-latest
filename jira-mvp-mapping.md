# CCS-2026 MVP → Website mapping (filter 26999)

Rule applied: Remarks = "Feasibility 2026: MVP" (or blank) → **in scope, must map**. Remarks = "…Not considered as core function…post‑2026…" or "This is now flagged for MVP scope" → **hidden/excluded** per instruction.

82 issues total → 73 in scope, 9 hidden.

## Hidden (excluded from MVP mapping)
- CCS-206 Search history display (daily grouping)
- CCS-158 Offer spelling suggestions
- CCS-157 Display hero image functionality
- CCS-62 Accessibility (Assistive Technology Compatibility)
- CCS-55 Search filter for 'Indigenous data'
- CCS-53 Activity reporting stories
- CCS-52 Info page for Indigenous data
- CCS-46 Create favorites (personal) lists
- CCS-19 Explore collections/hierarchies (sitemap-style browse)

## In-scope MVP items — mapped to current site

### Search & discovery (Collection Search v3.dc.html)
- CCS-33 Basic search — ✅ header + toolbar search
- CCS-34 Boolean / exact phrase search — ✅ Search Tips documents syntax; backend behavior N/A to UI
- CCS-37 Search within a collection — ✅ scope dropdown
- CCS-38 Search filters — ✅ filter modal, sections, checkboxes
- CCS-41 Digital assets only filter — ✅ toggle switch (toolbar + modal)
- CCS-44 Viewing classification — ✅ licence/access labels on cards
- CCS-45 Pagination — ✅ pager
- CCS-116 Semantic search (app level) — backend; no UI change needed
- CCS-123 Fuzzy search — backend; "Did you mean" UI present ✅
- CCS-124 No-results messaging — ✅ empty state
- CCS-20 Filter and refine public data — ✅ filters
- CCS-21 Sensitivity notifications — ✅ advisory banner + Indigenous acknowledgement modal
- CCS-22 UoM ID surfacing — ✅ accession number shown on record
- CCS-25 Persistent URLs — ✅ Record page "Persistent link" row
- CCS-27 Display rights information — ✅ licence icons/labels
- CCS-217 View collection asset details (with/without DAs) — ✅ Record page + "No digital asset" state

### Content classification & access (spans Record + Help)
- CCS-64 Link digital assets/metadata with CA metadata — data layer; reflected in Record media panel
- CCS-65 Digital asset formats — ✅ Search Tips "Digital asset format type" facet doc
- CCS-66 Categories of content — data/backend
- CCS-68 Content classification - Request to USE — ✅ Record page request-access modal
- CCS-69 Content classification - Request to VIEW — ✅ same modal flow
- CCS-166 Content classification - VIEW only — ✅ Access & Information help page

### Accessibility & security
- CCS-51 WCAG 2.1+ AA compliance — ✅ ARIA labels/landmarks/heading hierarchy pass done
- CCS-70 Security model - Guest — backend/auth; no guest-gated UI blocking browse
- CCS-145 Security (BR 18.04) — backend
- CCS-172 Web Application Firewall — infra, no UI

### Home / collections / contact (CCS Home page.dc.html, Browse Collections.dc.html)
- CCS-294 CCS Home page — ✅
- CCS-295 Home page - Grainger Museum — ✅ featured/tile
- CCS-296 Home page - Harry Brookes Allen Museum — ✅
- CCS-297 Home page - Henry Forman Atkinson Dental Museum — ✅
- CCS-298 Home page - Medical History Museum — ✅
- CCS-299 Home page - University Art Collection — ✅
- CCS-50 Acknowledgements (home page) — ✅ footer Acknowledgement of Country
- CCS-47 Contact us - Record view — ✅ Record page collection contact/request modal
- CCS-233 Contact us - Static page — ⚠️ **gap** — no standalone "Contact us" page exists (Help & Support has collection contacts but not a general Contact Us static page)

### Data pipeline / integrations (EMu, Vernon MDHS, Nexus DAM) — backend, no direct UI
CCS-48, 49, 118, 183, 184, 185, 186, 187, 197, 207, 209, 211, 230, 231, 237, 238, 240, 241, 244, 245, 263, 265, 266, 304, 310, 311, 312, 313, 321, 322, 332, 333
→ All are sync/index/DB stories for source systems. Not represented in the frontend by design — flagged as backend scope, verified no UI conflicts (e.g. record counts/fields on Record & Search pages are consistent with what these integrations would populate).

### Other
- CCS-272 Specifications for CCS Data inventory — documentation artifact, not a UI feature

## Gaps found
1. **CCS-233 Contact us (static page)** — not built. Recommend a standalone "Contact us" page or section, linked from footer/header, distinct from the per-record request-access flow.

Everything else in the MVP scope is either already reflected in the live pages or is backend/integration work with no direct frontend surface.
