# Handover: Rails/Blacklight app (`ead-ccs-test`)

Written 2026-10-06 so a fresh session can continue. Current branch with the work:
`feat/blacklight-oob` (local, not pushed), on top of `feat/rails-ccs-theme`. Both were committed with
git plumbing off `origin/main`, because the parent repo's checked-out branch belongs to other work.
`data/*.csv` (20 MB of collection exports) is deliberately not committed.

## State

- Rails 8.1.3, Blacklight **9.0.0** (not 9.2.1), Ruby 4.0.6, Postgres 17, 47 tests passing (no Solr needed).
- Plugins: `blacklight-gallery` (git `main`, grid and mosaic only; slideshow removed; the rubygems 6.0.0 pins `blacklight ~> 9.0.0beta1`) and
  `blacklight_range_limit` 9.3.0. Config-only use; see `docs/blacklight-features.md`.
- Styling: tokens, themed Bootstrap (dartsass-rails), site header, footer, search overlay, breadcrumb
  and search banner as `NexusCcs::*` ViewComponents; see `docs/styling.md`.
- Run: `SOLR_URL=http://127.0.0.1:8984/solr/blacklight-core bundle exec rails server -p 3002`
  (3000 is the static site). This app has its **own** Solr core (see `docs/solr-dev.md`); 40,962 records
  indexed with `rails collections:index`.
- Decision pending with D: the shared Solr on :8983 (used by `uom-collections`) was killed by mistake and
  a leftover process of mine holds the port. Do **not** touch :8983 or restart it without D's instruction.

## Evidence about Europeana and the British Museum

Observed live in Chrome by the side-panel agent on 2026-10-06; headless browsers are blocked by
Cloudflare on both sites, so treat these as the only rendered evidence.

- **Europeana current portal** is Nuxt 2.18 / Vue 2.7 / bootstrap-vue (`europeana/portal.js`), no Blacklight.
  Views: `?view=grid|list|mosaic`, default grid, persisted in a `searchResultsView` cookie. Filters are
  repeated `qf` params (`qf=collection:art&qf=TYPE:"TEXT"`) shown as removable chips beside the result
  count, with a "Clear filters" link and a "Search filters (n)" count in the sidebar. The sidebar always
  shows Theme, Type of media and "Can I use this?"; "Item quality" appears only once a Theme is chosen
  (a contextual facet); other facets sit behind "Show additional filters"; "Show advanced search" opens a
  query builder. Grid and mosaic interleave editorial cards; list rows had none. Results are capped at
  1,000 (26,547 matches showed 42 pages at 24 per page). List cards: provider above title,
  creator/description, rights + media type + Save/Like actions, thumbnail on the right.
- **Europeana code** (verified from clones): `packages/portal/src/components/search/SearchInterface.vue`,
  `SearchFilters.vue`, `SearchViewToggles.vue`, `components/item/ItemPreviewCardGroup.vue`,
  `ItemPreviewCardMosaic.vue`, `ItemPreviewCard.vue`, `utils/europeana/themes.js`,
  `plugins/europeana/search.js`. Full notes: scratchpad `europeana/source-specs.md`.
- **Europeana old portal** (`europeana-portal-collections`, archived 2022): Rails 4.2 + a forked
  Blacklight 6.0.2 + `europeana-blacklight` gem (custom Repository/SearchBuilder over the Search API).
  Its `app/controllers/concerns/blacklight_config.rb` has custom facet options worth reading if we ever go
  past out-of-the-box: hierarchical/parent, boolean toggles, range, `when:` lambdas per collection, `only:`
  filters, group/splice.
- **British Museum**: Drupal 11 (theme `numiko`), not Blacklight; GitHub org is unrelated R/DH scripts.
  URL scheme `/collection/search?keyword=&view=grid|list&sort=object_name__asc&page=N` (page 0-based,
  about 100 per page); term pages at `/collection/term/{id}`. Facet parameter names unverified.

## Open issues and next steps (in suggested order)

1. **Decide the :8983 Solr** (D's call; see State).
2. **Images.** 30 records now show real assets (see `docs/blacklight-features.md`), taken from the static
   prototype's files; every other record shows a placeholder in grid/mosaic and nothing in the list. For
   all records, ask the EMu and Vernon owners for a derivative or IIIF URL, whether it is public, and
   rights/Indigenous cultural-data restrictions (`access_condition_ssi` and `restrictions_tsi` are
   deliberately not shown), then index it into `thumbnail_path_ssi` (or a URL field) instead of the YAML.
   Also: some titles are mojibake in Solr (for example "InrÅ" for "Inrō") because of a character-encoding
   problem reading the Vernon CSV; investigate in `Collections::Source`.
3. **Dates.** About 12,700 of 41,000 records have no `date_start_isi` and about 1,700 are 0 or below, which
   distorts the range histogram. Either exclude year <= 0 from the range facet or fix it at index time.
4. **Style the new views and facets** to the UoM static design (results cards, toolbar, facet rail,
   mobile drawer): see `docs/styling-inventory.md` and the plan in `scratchpad/europeana/` (cards as one
   component with variants, left sticky 296px rail, drawer under 992px, accessible chips and drawer).
5. **Bookmarks** need a user model; `/bookmarks` redirects without one. The Blacklight guest-user /
   devise-guests pattern would make them work if D wants it.
6. **Lint.** 13 existing RuboCop offenses (whitespace/final newlines) in files not touched by this work.
7. **Push and PR** `feat/blacklight-oob` (decide first whether `data/*.csv` belongs in this repo).

## Deferred custom work (D said leave out for now)

Collection/theme landing pages with a default view; editorial cards in results; custom facet UI
(nesting, toggle-switch styling); British Museum style authority term pages; a view-preference cookie
beyond the session (Blacklight already stores the view in the session); a non-Solr API repository (avoid).

## Gotchas

- Never kill processes by command-line pattern (that killed the shared Solr). Take a PID from `lsof`.
- `form_with` drops `role:`; use `html: { role: "search" }`.
- Blacklight 9.0.0 `BookmarksController#verify_user` calls `action` (breaks on Rails 8.1); the app overrides it.
- The facet `if:` lambda receives the controller as its first argument; use `context.params`, not `search_state` (private).
- Blacklight remembers the last view in the session, so `?view=` matters when scripting checks.
