# Coverage audit: page-level scenarios (Wave B2)

Date: 2026-10-13. Method: every ID in the five catalogues compared with the scenario matrices and captions in the four Doc frames
of Figma file `LiHK4sj5u56DOM5kiVFX2E` (Patterns: Search, Record, Content, Feedback). Matrix rows were read from the file; counts
are recounted here, not taken from agent reports.

Rule (PLAN section 6): every ID is shown, listed as behaviour-only with a reason, or listed under Gaps.

## Result

| Catalogue | IDs | Drawn | Behaviour-only | Gap | Not covered |
|---|---|---|---|---|---|
| Search, results, filters, advanced search, search history | 68 | 56 | 12 | 0 | 0 |
| Saved records, save control, saved bar, history | 34 | 27 | 6 | 1 | 0 |
| Record page | 24 | 22 | 0 | 2 | 0 |
| Content pages | 38 | 28 | 10 | 0 | 0 |
| Global chrome, loading, flash, errors | 52 | 27 | 1 | 1 | 23 |
| Total | 216 | 160 | 29 | 4 | 23 |

Findings:
1. **Search, saved, record and content catalogues are fully covered.** Every ID has a matrix row.
2. **Global catalogue has gaps.** The planned `Pages: Global patterns` and `Pages: Errors and system` pages were never built. Header, footer, skip link, back to top, redirects, params and JS-off scenarios have no stage and no behaviour-only reason. `Sections: Site header` and `Sections: Footer` document the components, not these scenarios. Items marked NOT COVERED need a stage, a behaviour-only line or a Gaps entry.
3. **A3 count reconciled:** the Content catalogue has 38 rows (C1-C5 is one row, so 42 IDs): 32 drawn and 10 behaviour-only in the matrices (B2, B3, A4, C10, C11, C13, T2, T5, P3, P5). The "30 plus 12" in the earlier report was a wording slip.
4. **R10 and R14 (dialogs):** the hand-off holds. Doc / Feedback has the Request dialog (R10), Request success and Leaving site (global VF, R14) stages; Doc / Record points to them.
5. **Matrix rows without a named caption:** saved B6, S5 and S8 are marked drawn in the matrix but no scenario caption names them (B1s, B5 and the Save control component cover them). Minor.
6. **Rails UI removed on main (2026-10-13):** custom advanced search, facet field and item components, range slider and histogram, facet panel and dropdowns, advanced flyout and the filter rail CSS are gone; Rails uses default Blacklight facets. The Figma stages for these are kept. They are marked below as obsolete or Static only, not deleted. Figma matrix cells still say Rails for them; update the Rails/Static column when the owner agrees.
7. **Not re-checked:** whether each "Drawn" stage renders correctly (only Search anatomy was visually checked this session); Rails record page behaviour after the stock record page commits; `/catalog/advanced` route status in Rails.

Status key: Drawn = a stage or matrix specimen exists; Behaviour-only = matrix gives a reason a still cannot show it; Gap = flagged as not built in the app; NOT COVERED = no stage, reason or gap entry found.

## Search, results, filters, advanced search, search history

Catalogue: `docs/page-level/scenarios-search-and-results.md`. Stages: Doc / Search (322:87544): sections Search results, Advanced search, Search history Matrix.

68 IDs: 56 drawn, 12 behaviour-only, 0 gap, 0 not covered.

| ID | Scenario | Type | App | Status | Note |
|---|---|---|---|---|---|
| S1 | Search overlay, empty | Happy | Both | Drawn |  |
| S2 | Overlay with history | Happy | R | Drawn |  |
| S3 | Typeahead | Happy | R | Behaviour-only |  |
| S4 | Query over 255 | Edge | R | Behaviour-only |  |
| H1 | Bare front page | Happy | Both | Drawn |  |
| H2 | Banner | Happy | Both | Drawn |  |
| H3 | Banner summary | Happy | R | Drawn |  |
| H4 | Toolbar count | Happy | Both | Drawn |  |
| H5 | One result | Edge | Both | Drawn |  |
| H6 | Mosaic (default) | Happy | R | Drawn |  |
| H7 | List view | Happy | R | Drawn |  |
| H8 | Card with image | Happy | Both | Drawn |  |
| H9 | Card without image | Edge | R | Drawn |  |
| H10 | Missing fields, long title | Edge | R | Drawn |  |
| H11 | Save states | Happy/Edge | Both | Drawn |  |
| H12 | Saved bar count | Happy | R | Drawn |  |
| H13 | Sort menu | Happy | Both | Behaviour-only |  |
| H14 | Per-page menu | Happy | Both | Behaviour-only |  |
| H15 | View toggle | Happy | Both | Drawn |  |
| F1 | Rail, desktop | Happy | R | Drawn | Rails rail changed: default Blacklight facet groups under "Search filters"; keep as Static reference, re-check Rails |
| F2 | Facet collapsed | Happy | R | Drawn | Rails-only, custom facet UI removed: obsolete |
| F3 | Facet with selection | Happy | R | Drawn | Rails-only, custom facet UI removed: obsolete |
| F4 | Facet expanded | Happy | R | Drawn | Rails-only, custom facet UI removed: obsolete |
| F5 | Long list | Edge | R | Drawn | Rails-only, custom facet UI removed: obsolete |
| F6 | Facet modal | Edge | R | Drawn | Rails-only, custom facet UI removed: obsolete |
| F7 | Range slider + histogram | Happy | R | Drawn | Rails-only, range slider removed: obsolete |
| F8 | Slider, no spread | Edge | R | Drawn | Rails-only, range slider removed: obsolete |
| F9 | Histogram fetch fails | Sad | R | Drawn | Rails-only, range slider removed: obsolete |
| F10 | Range in URL | Edge | R | Drawn | Rails-only, range slider removed: obsolete |
| F11 | Digital assets switch | Happy | Both | Drawn | Rails switch not in the sidebar template now: Static only; verify |
| F12 | "Includes all" filter | Edge | R | Drawn | Rails-only, advanced search removed: obsolete |
| P1 | Applied pills | Happy | Both | Drawn |  |
| P2 | Clear all | Happy | R | Drawn | Rails Clear all not in the sidebar template now: obsolete in Rails; verify |
| M1 | Filter drawer | Happy | R | Drawn | Drawer and Filters button remain in Rails; contents are now default facets; re-check |
| M2 | Toolbar | Happy | R | Drawn |  |
| M3 | Banner | Happy | R | Drawn |  |
| M4 | Static layout | Edge | S | Behaviour-only |  |
| N1 | Middle | Happy | Both | Drawn |  |
| N2 | First / last | Edge | Both | Drawn |  |
| N3 | One page | Edge | Both | Drawn |  |
| N4 | Mobile | Edge | R | Drawn |  |
| N5 | Range text | Edge | S | Drawn |  |
| N6 | Large counts | Edge | R | Drawn |  |
| Z1 | Empty state | Sad | Both | Drawn |  |
| Z2 | Spelling auto-correct | Sad | R | Drawn |  |
| Z3 | "Did you mean" | Sad | Both | Drawn |  |
| Z4 | Smart notices | Edge | S | Behaviour-only |  |
| E1 | Special characters stripped | Edge | R | Drawn |  |
| E2 | Only invalid characters | Sad | R | Drawn |  |
| E3 | Blank search | Edge | R | Behaviour-only |  |
| E4 | Advanced clause validation | Sad | R | Behaviour-only |  |
| U1 | Solr down or timeout | Sad | R | Drawn |  |
| U2 | Static API offline | Sad | S | Behaviour-only |  |
| L1 | Page loader | Happy | R | Drawn |  |
| L2 | Skeleton | Happy | R | Drawn |  |
| L3 | Static skeleton | Happy | S | Drawn |  |
| A1 | Page | Happy | Both | Drawn | Rails advanced page removed: Static only now |
| A2 | Flyout | Happy | Both | Drawn | Rails flyout removed: Static only now |
| A3 | Row limit | Edge | R | Drawn | Rails-only, UI removed: obsolete |
| A4 | Empty submit | Sad | R | Drawn | Rails-only, UI removed: obsolete |
| A5 | Date order | Sad | R | Drawn | Rails-only, UI removed: obsolete |
| A6 | Filter with 13+ values | Edge | R | Drawn | Rails-only, UI removed: obsolete |
| A7 | Static date errors | Sad | S | Drawn |  |
| A8 | Static year errors | Sad | S | Behaviour-only |  |
| H20 | Rails | Happy | R | Drawn |  |
| H21 | Static | Happy/Edge | S | Drawn |  |
| U10 | Params that change UI | Edge | Both | Behaviour-only |  |
| U11 | Save this search | Edge | S | Behaviour-only |  |

## Saved records, save control, saved bar, history

Catalogue: `docs/page-level/scenarios-saved-records.md`. Stages: Doc / Search (322:87544): Saved records Matrix (history rows are "Saved H1-H4" in Search history).

34 IDs: 27 drawn, 6 behaviour-only, 1 gap, 0 not covered.

| ID | Scenario | Type | App | Status | Note |
|---|---|---|---|---|---|
| B1 | Empty (new visitor, no guest row created) | Edge/Happy | Rails | Drawn |  |
| B1s | Empty | Edge | Static | Drawn |  |
| B2 | 1 record | Happy | Rails | Drawn |  |
| B3 | Many records | Happy | Both | Drawn |  |
| B4 | Very many | Edge | Both | Behaviour-only |  |
| B5 | Remove one record (toggle Saved) | Happy | Both | Drawn |  |
| B6 | Remove last record | Edge | Both | Drawn |  |
| B7 | Clear all | Happy | Both | Drawn |  |
| B8 | Clear cancelled | Edge | Both | Behaviour-only |  |
| B9 | Clear fails | Sad | Rails | Drawn |  |
| B10 | Save failed | Sad | Rails | Drawn |  |
| S1 | Unsaved default | Happy | Both | Drawn |  |
| S2 | Saved | Happy | Both | Drawn |  |
| S3 | Hover | Happy | Both | Drawn |  |
| S4 | Focus | Happy | Both | Drawn |  |
| S5 | Pending | Edge | Rails | Drawn |  |
| S6 | Disabled / error | Edge | Both | Gap (flagged) |  |
| S7 | No-JS | Edge | Both | Drawn |  |
| S8 | On dark banner | Edge | Both | Drawn |  |
| N1 | Count 0 | Edge | Rails | Drawn |  |
| N2 | Count 1 | Happy | Both | Drawn |  |
| N3 | Count N / 999+ | Edge | Both | Drawn |  |
| N4 | Live region | Happy | Both | Behaviour-only |  |
| N5 | Current page | Edge | Both | Drawn |  |
| N6 | Mobile/tablet | Edge | Both | Drawn |  |
| P1 | Session vs account | Happy | Both | Behaviour-only |  |
| P2 | Cookies blocked / private mode | Sad/Edge | Both | Behaviour-only |  |
| P3 | Record no longer available | Sad/Edge | Both | Drawn |  |
| P4 | Solr down | Sad | Rails | Drawn |  |
| X1 | none on saved list | n/a | Rails | Behaviour-only |  |
| H1 | Empty | Edge | Static | Drawn |  |
| H2 | Populated | Happy | Static | Drawn |  |
| H3 | Clear | Happy | Static | Drawn |  |
| H4 | Rails | Happy/Edge | Rails | Drawn |  |

## Record page

Catalogue: `docs/page-level/scenarios-record-page.md`. Stages: Doc / Record (322:6942): section 04 Scenario matrix.

24 IDs: 22 drawn, 0 behaviour-only, 2 gap, 0 not covered.

| ID | Scenario | Type | App | Status | Note |
|---|---|---|---|---|---|
| R1 | Full record, one image | Happy | Both | Drawn |  |
| R2 | Several images | Happy | Both (different UI) | Drawn |  |
| R3 | No digital asset | Edge | Both | Drawn |  |
| R4 | Video, audio, PDF | Happy | Both | Drawn |  |
| R5 | Media fails to load | Sad | Static | Drawn |  |
| R6 | Media metadata panel | Edge | Both | Drawn |  |
| R7 | Indigenous or deceased-persons advisory | Edge | Static (gap in Rails) | Gap (flagged) |  |
| R8 | Restricted view (gate) | Sad | Static | Drawn |  |
| R9 | View-only access note | Edge | Static | Drawn |  |
| R10 | Request dialog | Happy/Edge | Static | Drawn |  |
| R11 | Film/game classification | Edge | Static | Drawn |  |
| R12 | Missing or null fields | Edge | Both | Drawn |  |
| R13 | Very long title, values, multivalued | Edge | Both | Drawn |  |
| R14 | "View full record" | Happy | Both | Drawn |  |
| R15 | Persistent link copy | Happy/Edge | Both | Drawn |  |
| R16 | Save control | Happy | Both | Drawn |  |
| R17 | Previous/next with search context | Happy | Rails | Drawn |  |
| R18 | Direct arrival, no search context | Edge | Rails | Drawn |  |
| R19 | Breadcrumb | Edge | Both | Drawn |  |
| R20 | Record not found | Sad | Both | Drawn |  |
| R21 | Solr error | Sad | Rails | Drawn |  |
| R22 | Withdrawn or unavailable record | Edge | none | Gap (flagged) |  |
| R23 | Mobile / tablet | Edge | Both | Drawn |  |
| R24 | Related items / citation | Edge | Static | Drawn |  |

## Content pages

Catalogue: `docs/page-level/scenarios-content-pages.md`. Stages: Doc / Content (322:86900): one Scenario matrix per page.

38 IDs: 28 drawn, 10 behaviour-only, 0 gap, 0 not covered.

| ID | Scenario | Type | App | Status | Note |
|---|---|---|---|---|---|
| H1 | Default | Happy | Both | Drawn |  |
| H2 | FAQ accordion collapsed vs open | Happy | Both | Drawn |  |
| H3 | Acknowledgement of Country modal | Edge | Rails only | Drawn |  |
| H4 | Restack at 1023 and 768 | Edge | Both | Drawn |  |
| H5 | Card focus, hover, long title | Edge | Both | Drawn |  |
| B1 | Default | Happy | Both | Drawn |  |
| B2 | Solr down | Sad | Rails | Behaviour-only |  |
| B3 | Card order | Edge | Rails | Behaviour-only |  |
| C1-C5 | Each of the 5 collections | Happy | Both | Drawn |  |
| C6 | Advisory present vs absent | Edge | Both | Drawn |  |
| C7 | Visitors box variants | Edge | Both | Drawn |  |
| C8 | Inline link types in box | Edge | Both | Drawn |  |
| C9 | External links | Edge | Both | Drawn |  |
| C10 | Unknown slug | Sad | Rails | Behaviour-only |  |
| C11 | Unknown `?collection=` | Sad | Static | Behaviour-only |  |
| C12 | Banner and mobile | Edge | Both | Drawn |  |
| C13 | Banner button hover and focus | Edge | Both | Behaviour-only |  |
| A1 | Default | Happy | Both | Drawn |  |
| A2 | Anchor jump | Edge | Both | Drawn |  |
| A3 | Mobile | Edge | Both | Drawn |  |
| A4 | mailto | Edge | Both | Behaviour-only |  |
| T1 | Default | Happy | Both | Drawn |  |
| T2 | General enquiries | Happy | Both | Behaviour-only |  |
| T3 | "Before you get in touch" | Happy | Both | Drawn |  |
| T4 | Mobile | Edge | Both | Drawn |  |
| T5 | JS off or slow | Sad | Static | Behaviour-only |  |
| T6 | Access Request Form link | Edge | Both | Drawn |  |
| T7 | Email mismatch | Edge | Both | Drawn |  |
| P1 | All topics | Happy | Both | Drawn |  |
| P2 | FAQ is not an accordion on /help | Edge | Both | Drawn |  |
| P3 | Old `?topic=key` links | Edge | Rails | Behaviour-only |  |
| P4 | Dead link in Access section | Sad | Both | Drawn |  |
| P5 | Anchored section | Edge | Both | Behaviour-only |  |
| P6 | Mobile | Edge | Both | Drawn |  |
| S1 | Default | Happy | Both | Drawn |  |
| S2 | Long content | Edge | Both | Drawn |  |
| I1 | Default | Happy | Both | Drawn |  |
| I2 | Link target mismatch | Edge | Both | Drawn |  |

## Global chrome, loading, flash, errors

Catalogue: `docs/page-level/scenarios-global-and-errors.md`. Stages: Doc / Feedback (321:76923) captions; Doc / Search "Global ..." rows. No Global patterns or Errors pages exist.

52 IDs: 27 drawn, 1 behaviour-only, 1 gap, 23 not covered.

| ID | Scenario | Type | App | Status | Note |
|---|---|---|---|---|---|
| H1 | Default | Happy | Both | NOT COVERED |  |
| H2 | Current-page indicator | Happy | Both | NOT COVERED |  |
| H3 | Desktop dropdown: Browse collections | Happy | Both | NOT COVERED |  |
| H4 | Desktop dropdown: Help | Happy | Both | NOT COVERED |  |
| H5 | Mobile menu closed and open | Happy | Both | NOT COVERED |  |
| H6 | Mobile drill-in | Edge | Both | NOT COVERED |  |
| H7 | Search overlay open, empty | Happy | Both | Drawn |  |
| H8 | Overlay with recent searches | Happy | Both | Drawn |  |
| H9 | Overlay with typed query | Edge | Both | Drawn |  |
| H10 | Empty submit | Edge | Rails | Behaviour-only |  |
| H11 | Saved bar counts | Happy/Edge | Both | Drawn |  |
| H12 | Saved bar placement | Edge | Rails | NOT COVERED |  |
| H13 | Sticky/scrolled | Edge | n/a | NOT COVERED |  |
| H14 | Breadcrumb trails | Happy | Both | NOT COVERED |  |
| H15 | Banner choice | Happy | Rails | NOT COVERED |  |
| F1 | Standard | Happy | Both | NOT COVERED |  |
| F2 | Responsive stacking | Edge | Both | NOT COVERED |  |
| A1 | Skip to content | Happy | Both | NOT COVERED |  |
| A2 | Blacklight layout | Sad/Edge | Rails | NOT COVERED |  |
| B1 | Visible | Happy | Both | NOT COVERED |  |
| L1 | Page loader | Happy | Rails | Drawn |  |
| L2 | Search skeleton | Happy | Rails | Drawn |  |
| L3 | Static results loading | Happy | Static | Drawn |  |
| L4 | Save in progress | Happy | Rails | Drawn |  |
| FL1 | notice, alert, error | Happy/Sad | Rails | Drawn |  |
| FL2 | Special characters removed | Edge | Rails | Drawn |  |
| FL3 | Invalid search | Sad | Rails | Drawn |  |
| FL4 | Bookmark access denied | Sad | Rails | Gap (flagged) |  |
| FL5 | Bookmark outcomes | Happy/Sad | Both | Drawn |  |
| E404 | 404 | Sad | Rails | Drawn |  |
| E404r | Unknown record | Sad | Both | Drawn |  |
| E422 | 422 | Sad | Rails | Drawn |  |
| E500 | 500 | Sad | Rails | Drawn |  |
| E400 | 400 | Sad | Rails | Drawn |  |
| E406 | Unsupported browser | Sad | Rails | Drawn |  |
| E503 | Search unavailable | Sad | Rails | Drawn |  |
| E503s | Static live API failed | Edge | Static | NOT COVERED |  |
| EM | Maintenance, timeout page, offline | Sad | n/a | NOT COVERED |  |
| NJ | JavaScript disabled | Edge | Both | NOT COVERED |  |
| N1 | Zero results | Sad | Both | Drawn |  |
| N2 | Spelling correction | Edge | Both | Drawn |  |
| N3 | Empty list | Sad | Both | Drawn |  |
| N4 | Empty search history | Sad | Both | Drawn |  |
| N5 | Validation | Sad | Both | Drawn | Rails advanced search removed: Static only now |
| P1 | Invalid URL parameters | Edge | Rails | NOT COVERED |  |
| P2 | `?q` over 255 characters | Edge | Rails | NOT COVERED |  |
| P3 | unknown slug | Sad | Rails | Drawn |  |
| R1 | Bare `/catalog` | Edge | Rails | NOT COVERED |  |
| R2 | `/help?topic=` | Edge | Rails | NOT COVERED |  |
| R3 | Static legacy URLs | Edge | Static | NOT COVERED |  |
| AK | Country modal | Happy | Rails | Drawn |  |
| VF | Leaving-site dialog | Edge | Rails | Drawn |  |
