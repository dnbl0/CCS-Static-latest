# Page-level components and documentation: plan

Date: 2026-10-12. Scope: every page type in the Rails app (`ead-ccs-test`) and the static site (`public/`), each with all
happy, sad and edge scenarios. Inputs: five scenario catalogues in this folder (about 230 scenarios). Rule: the apps decide;
where Rails and Static differ, design the Rails behaviour as primary and document the Static difference, and where Static has
a feature Rails lacks, still show it flagged "Static only". Gaps neither app covers are flagged "Not built" and designed only
if listed under "Gaps to propose" below.

## 1. Architecture (four layers)

| Layer | What | Naming | Where in Figma |
|---|---|---|---|
| L1 Sections (exist) | Site header, Page banner, Search banner, Results, Collection grid, Content section, Footer, Pathfinder item | existing | `Sections: *` pages |
| L2 Pattern components (new) | State and block components that scenarios need: notices, empty states, error pages, loading and skeletons, dialogs, record blocks, content-page blocks, search/saved blocks | `<Area>: <Part>` e.g. `Notice`, `Empty state`, `Error page`, `Skeleton: Result card`, `Record: Media viewer` | `Patterns: *` pages |
| L3 Page templates (new) | One component set per page type, composed only of L1 and L2 instances; properties `Breakpoint` (Desktop, Tablet, Mobile) and `State` | `Page / <Name>` | `Pages: *` pages |
| L4 Page documentation (new) | One doc page per page type built only from doc-kit components | `Doc / Page / <Name>` | same `Pages: *` page |

Construction rules (all from the `figma-doc-components` skill): auto layout everywhere; every value token-bound; Text component
only; hug heights with `minHeight`; Fill-width text in fixed-width containers; slots for specimens and content areas; media
via the Foundation `aspect-ratio` component; Show toggles and exposed instances; descriptions in the Purpose/Use when/Props/Slots
template with documentation links; layout QA (packing routine plus overflow detector plus read screenshots) after every build.

### Variant strategy (avoids a cross-product explosion)
- `Page / X` has `Breakpoint` x `State`. `State` lists only states that change the **page layout or region composition** (for example Results, Zero results, Unavailable). Region-only states (a notice above the results, a pill, a card without an image) are shown as L2 state components inside doc Stages, and as a `State` value only when the page template needs them.
- Tablet and Mobile variants are built for every layout-changing state; documentation shows Tablet evidence at 100% unless the rule is about small screens.
- Light only unless the section already has an Inverse variant that appears on the page.

## 2. Page inventory and scenario ownership

| # | Page type | Rails route / static file | Catalogue IDs |
|---|---|---|---|
| 1 | Home | `/` / `index.html` | content H1-H5, global AK |
| 2 | Browse collections | `/collections` / `collections/index.html` | content B1-B3 |
| 3 | Collection landing (x5) | `/collections/:slug` | content C1-C13 |
| 4 | Search results | `/catalog` / `search/search-results.html` | search S, H, F, P, M, N, Z, E, U, L |
| 5 | Advanced search (page and flyout) | `/catalog/advanced` | search A1-A8 |
| 6 | Search history | `/search_history` / `search-history.html` | search H20-H21, saved H1-H4 |
| 7 | Record | `/catalog/:id` / `collections/record.html` | record R1-R24 |
| 8 | Saved records | `/bookmarks` / `search/bookmarks.html` | saved B, S, N, P, X |
| 9 | Help (index), Search tips, Indigenous data | `/help*` | content P1-P6, S1-S2, I1-I2 |
| 10 | About | `/about` | content A1-A4 |
| 11 | Contact | `/contact` | content T1-T7 |
| 12 | Error and system pages | 400, 404, 406, 422, 500, 503, record not found, JS off | global E*, FL*, NJ, EM, record R20-R22 |
| 13 | Global patterns (header, overlay, drawers, footer, loader, modals) | every page | global H*, F*, A*, B1, L*, AK, VF |

## 3. Pattern components to build (L2), by owner

**Agent A1: feedback and states** (page `Patterns: Feedback`)
- `Notice` Type: Info (spelling-correction `alert-info`), Error summary (advanced-search "There is a problem" 2px red box), Warning advisory (`notice--warning`), Flash notice/alert (query-rule messages), Success.
- `Empty state` Type: Zero results (Rails), No records match (Static), Saved empty (Rails and Static copy), History empty (Rails and Static), Facet no values.
- `Error page` Type: Search unavailable 503 (in site chrome), Stock 404, 422, 500, 400, 406 (no chrome, as shipped), Record not found (Static), Record not found (Rails shows stock 404).
- Loading: `Page loader`, `Skeleton: Result card` (mosaic, list), `Skeleton: Facet row`, `Skeleton: Pill`, `Loading block` (Static "Loading results").
- Dialogs: `Dialog` Type: Country acknowledgement, Leaving-site, Request (Static; each of the seven titles), Clear confirm (documented as the browser/Turbo confirm, with the exact strings, not drawn as a custom dialog).

**Agent A2: record blocks** (page `Patterns: Record`)
`Record: Media viewer` (one image, several images with thumbs, Static pager First/Prev/Next/Last + "x of N" + Go to, video, audio, PDF, none, media failed to load, restricted gate, view-only note, full-screen toggle), `Record: Media metadata panel`, `Record: Details list` (full, sparse, long and multivalued), `Record: Persistent link` (default, copied, with and without accession note), `Record: Copyright card` (full, partial, omitted, classification rating, web access), `Record: Prev/next row` (with context, ends, 1 of 1, none), `Record: Title band`, `Record: Advisory` (generic, deceased persons, language), `Record: Related items`, `Record: Citation`.

**Agent A3: content-page blocks** (page `Patterns: Content`)
`Collection: Details table`, `Collection: Visitors box` (2, 3, 4, 5 sections; with mailto, long text), `Advisory notice` (none, short, long), `Link strip`, `Side nav` (current item), `Contact box`, `CTA band`, `FAQ item` (collapsed, open, always-open), `Help section` (items, contacts, list), `About: Journey`, `About: Split`, `About: Support list`, `Contact: Group` (email rows, Access Request Form rows), `Article` (long-form text with table, ordered list, notice), `Home: Hero`, `Home: Card`.

**Agent A4: search, saved and advanced blocks** (page `Patterns: Search`)
`Search overlay` (empty, with recent searches, with typed query), `Filter drawer` (closed, open, with applied badge), `Facet filter` states not yet drawn (collapsed with selection summary, expanded, long list with Show all, facet modal with A-Z index, no values), `Range slider` (histogram, no bars, one end only, missing, fetch failed), `Applied pills` (query, filters, includes-all, Clear all), `Results toolbar` states (count wording singular and plural, sort, per page, view toggle), `Pagination` (middle with ellipsis, first, last, one page, mobile stack, Static range text), `Result card` states not yet drawn (no image mosaic placeholders x3 shapes, list without image, missing fields, long title, Save states Save/Saving/Saved/failed/no-JS), `Saved list row` (Static compact row, missing record), `Saved toolbar` (count, Clear), `History: Day group`, `Advanced search: Form` (rows, add row, limit, filters, dates, errors, Static date errors), `Saved bar` (0, 1, N, drawer, header, breadcrumb).

## 4. Page templates and docs (L3, L4) by owner (Wave B, after Wave A)

- **Agent B1:** Search results, Advanced search, Search history, Saved records.
- **Agent B2:** Record, Error and system pages, Global patterns.
- **Agent B3:** Home, Browse collections, Collection landing (all five), About, Contact, Help, Search tips, Indigenous data.

Each page doc contains: Header; Anatomy (regions with numbered markers, Figure); **Scenarios** section where every catalogue ID mapped to this page has a Stage specimen (a `Page / X` variant or an L2 instance in context) with a caption naming the ID, trigger, and exact copy; a **Scenario matrix** table (ID, scenario, type, trigger, Rails/Static, specimen or reason it is behaviour-only); **Responsive**; **Rails vs Static** table; **Accessibility** (landmarks, focus, live regions, announcements, `aria-current`); **In code** (components, CSS, locale keys); Related; Feedback. Coverage rule: every ID is either shown, or listed as behaviour-only with the reason, or listed under Gaps.

## 5. Gaps and inconsistencies to propose (not built in the apps)
These come from the research; each is documented as a flagged item in the relevant doc, not silently designed:
1. Rails 404/500/422/400/406 are stock, unbranded and have no site chrome; Static has no error pages. Propose branded error page (Error page, Proposed).
2. No unavailable/withdrawn/restricted-record state exists in either app (record R22); Rails has no restricted-view gate or deceased-persons advisory on the record page (Static has both).
3. Saved list: Rails card stays until reload after removal; no undo or export in either; failure uses a browser `alert()`; no message when cookies are blocked.
4. Save control has no visible error state (alert only).
5. Contact email mismatch (HFA and MHM: contact page `MDHS-museum@`, landing pages `mhm-info@`); dead `#` Access Request link on Help; Home card names vs link targets; FAQ is an accordion on Home but plain list on Help; Indigenous priorities link differs between pages and footer.
6. Static `contact.html` shows raw `{{ }}` placeholders until JS runs; no noscript fallback anywhere; header menu and search overlay need JS.
7. Static pagination CSS is stale (15px Next) compared with Rails; Static search has no Z-A sort.
8. Rails has no maintenance, offline or timeout page (a timeout surfaces as the 503 card).

## 6. Delivery waves
- **Wave 0 (done):** five research catalogues.
- **Wave A (4 agents, parallel):** L2 pattern components and their pages, as above. Exit: each agent returns component ids, scenario IDs covered, layout QA result.
- **Wave B (3 agents, parallel):** L3 templates and L4 docs. Exit: a coverage table per page (IDs shown / behaviour-only / gap).
- **Wave C (me):** consistency pass, index page `Pages: Index` listing all pages and scenario coverage, skill and memory updates, final report.

## 7. Agent working rules
Load `figma:figma-use` before any `use_figma`; read `~/.claude/skills/figma-doc-components/SKILL.md` and the catalogues. Create only new pages and nodes; do not edit existing components, sections, variables or the doc kit (add-only exceptions need a note in the report). One agent per page. Fan out `use_figma` calls sparingly (batch scripts; the MCP has an account call limit). Exact copy, numbers and thresholds come from the catalogues and the source files they cite; read the source CSS for exact measurements and never invent values. Run the overflow detector and the canvas layout check, and read screenshots, before reporting.

## 8. Revision (same day): templates folded into Wave A
To save a round, each Wave A agent also builds the page templates and documentation for its own area:
- A2: `Page / Record` + `Doc / Record` (record R1-R24).
- A3: `Page / Home`, `Browse collections`, `Collection landing` (x5), `About`, `Contact`, `Help`, `Search tips`, `Indigenous data` + docs.
- A4: `Page / Search results`, `Advanced search`, `Search history`, `Saved records` + docs.
- A1: pattern components only (Notice, Empty state, Error page, Loading, Dialog) + their documentation.
Wave B is reduced to: **B1** error and system pages and global patterns page (`Pages: Errors and system`, `Pages: Global patterns`: header menu and overlay states, footer, loader, modals, JS off) using A1's components; and **B2** a coverage audit that checks every catalogue ID has a specimen, a behaviour-only note or a gap entry.
