# Blacklight features and plugins

Configuration-only use of Blacklight 9.2.1 and its official plugins, in `CatalogController`
(`config/locales/blacklight.en.yml` for labels). No custom facet UI.

| Feature | Mechanism | Solr field(s) |
|---|---|---|
| Search fields: all, title, creator, subject | `add_search_field` (qf/pf in `solr/conf/solrconfig.xml`) | `title_tsim`, `creator_tsim`, `subject_*`, `all_text_timv` |
| Facets with "more" modal, collapse, limits, in sections | `add_facet_field ... limit:`, `group:`, built from the workbook | see `docs/data-model.md` |
| Year selectors (production date, creator birth and death) | `blacklight_range_limit` 9.3.0, `range: true` | `date_start_isi`, `creator_birth_isim`, `creator_death_isim` |
| Constraints and Start over | built in (restyled in `unimelb.css`) | n/a |
| Sort: relevance, title A-Z / Z-A, date newest / oldest | `add_sort_field` | `title_si`, `date_start_isi` |
| Per page 12 / 24 / 40 / 96 (default 40) | `config.per_page`, `default_per_page` | n/a |
| Advanced search | `config.advanced_search.enabled` | search and facet fields |
| Citation, JSON API, did-you-mean, autocomplete | built in | n/a |
| Search history (CCS-143, CCS-206) | Blacklight's own: searches saved in the session and listed at `/search_history`, with Clear history and a 100-search cap. We add only the day headings (`app/views/search_history/index.html.erb`, `SearchHistoryHelper`), the overlay's last-5 list and a 30-day session cookie (`config/initializers/session_store.rb`) | n/a |
| Bookmarks, shown as "Save / Saved" and "saved records" (CCS-46) | Blacklight's own: `BookmarksController`, `/bookmarks` routes, `Bookmark` model, the bookmark JavaScript (no page reload, updates every `data-role="bookmark-counter"`), `current_or_guest_user`, `config.add_results_document_tool :bookmark`, Clear bookmarks. We add: a minimal `users` table + `User` model (guests only, no login, no email or password), `GuestBookmarks` (the guest row is only created on the first save, so browsing writes nothing; tied to the 30-day session cookie), `NexusCcs::SaveControlComponent` (the Save / Saved toggle, a real checkbox named "Save record: <title>"), `NexusCcs::Icons::BookmarkComponent` (`config.bookmark_icon_component`), `NexusCcs::SavedBarComponent` + `saved_bar_controller.js` (the slate-teal "N saved records" block at the right end of the breadcrumb strip, rendered by both breadcrumb components, exactly as tall as the strip; on a page with no breadcrumb (home) it stays in the header top strip; `site-nav__saved`, live region), the `/bookmarks` view and `blacklight.bookmarks` wording in `config/locales/en.yml` | n/a |
| List and mosaic (masonry) views | built-in list + `blacklight-gallery` (git `main`) via `config.view.*`; grid and slideshow removed | `thumbnail_path_ssi` |

## Notes

- **Saved records / guests.** There is no login: a visitor's bookmarks belong to a `User` row (just an id and timestamps)
  that is created on their first Save and remembered in the session cookie (`blacklight_guest_user_id`, 30 days). Clearing
  cookies, or another browser or device, starts an empty list; there is no transfer between devices. Stale guest rows
  (no activity for a long time) are not pruned yet. Deploy needs `db:migrate`; the image's start command already runs `db:prepare`.
  The result cards render the control themselves (the title's own tool actions are turned off) and the record page renders it in its summary, so the control is not repeated in the hidden show-tools sidebar.

- **Results page width.** `BlacklightHelper#container_classes` makes the results page `container-fluid`
  (no max width); other pages keep the fixed container.

- **blacklight-gallery** 6.0.0 on rubygems pins `blacklight ~> 9.0.0beta1`, so the Gemfile uses its
  `main` branch (gemspec allows `~> 9.0`). Its generator also adds OpenSeadragon (IIIF viewer) and a
  jQuery CDN pin; neither is used here.
- **Digital assets.** 30 records have images (about 60 files), mapped by accession number in
  `config/digital_assets.yml` (generated from the static prototype's `ASSET_IMAGES`). The indexer
  (`Collections::DigitalAssets`) adds `thumbnail_path_ssi`, `digital_asset_paths_ssim` and
  `digital_asset_large_paths_ssim` and `has_digital_asset_bsi`; thumbnails (800 px) and large images
  (1600 px) are JPEGs in `public/digital-assets/thumbs` and `/large`, made from the originals by
  `bin/rails digital_assets:thumbnails` (needs `vipsthumbnail`; originals are not in this repo, they
  live in the static site's `public/assets/images/collections`). `config.index.thumbnail_field`
  shows them in both views (the list shows one only when a record has an asset); the mosaic shows
  a placeholder otherwise, and mosaic placeholders vary in shape so the masonry still reads as a mosaic.
  On a record's page `NexusCcs::DigitalAssetsComponent` (the show page's `document_embed_component`)
  shows the first image large under the title and the rest as thumbnails that open the large image.
  The "Digital Asset Format Type" filter lists records with assets. More assets: add
  accession numbers and file names to the YAML, make thumbnails, reindex.
- **Date quality.** `date_start_isi` has no value for about 12,700 of 41,000 records, and about
  1,700 values are 0 or below, which stretches the range histogram.
- **JS.** chart.js and `@kurkle/color` (range-limit's dependencies) are vendored in
  `vendor/javascript`; the plugin's generator pins them to a CDN instead.
- **Facets only render when they have values.** The facets, sections and record fields now come from the
  workbooks (`docs/data-model.md`); the earlier pivot, "Record includes" query facets and contextual
  `if:` facets are no longer configured because the workbook does not define them.

## Advanced search against Blacklight's own

Audited against the installed gem, `blacklight-9.2.1` (`Blacklight::AdvancedSearchFormComponent`,
`Blacklight::Solr::SearchBuilderBehavior#add_adv_search_clauses`, `blacklight/app/views/catalog/_advanced_search_form.html.erb`),
not just the GitHub repo at head, so the "Why" column reflects what the installed version actually does.

| Blacklight default | This app | Why |
|---|---|---|
| Route `/catalog/advanced`, `config.advanced_search.enabled`, `AdvancedSearchFormComponent`, `copy_search_field_config_to_advanced!`, `copy_facet_field_config_to_advanced!` | Same; the form is a subclass of the component | Keeps Blacklight's field, facet and response handling |
| A standalone page (Blacklight's `advanced_search` action just renders a view) | Same: a real page with the site's header, breadcrumbs (`NexusCcs::HeaderComponent#breadcrumbs`) and its own banner. There used to be an XHR path into Blacklight's `<dialog id="blacklight-modal">` as a right-hand flyout (`advanced_flyout_controller.js`); removed, so the "Advanced search" link in the search banner and the home hero is now a plain navigation to the page | The modal duplicated page chrome (its own header/close button) instead of using the site's; a standalone page is what Blacklight already does by default |
| One "match all / any of the fields" menu (`op`) and one fixed row per search field | Rows the visitor adds (up to 8), each with its own field and match type (`clause[i][field\|op\|query]`, `op` = must / should / must_not). `op` in a link still sets the default for rows that have none | The search builder (`add_adv_search_clauses`) already builds a `must`/`should`/`must_not` Solr JSON Query DSL bool query per clause — Blacklight's own form just never exposes `must_not` as a per-row choice. CCS's row UI surfaces a capability the query engine already had, it does not add one. See `test/models/search_builder_test.rb` for the Solr query this actually produces. |
| Facet limits in an accordion (`f_inclusive[facet][]`, with counts) | Same parameters and counts, shown as a card per filter with Includes any / Includes all (`f_all`, see `AllFacetFilters`) | "Includes all" is not something Blacklight offers; it is CCS's own filter-query path (`SearchBuilder#add_all_facet_filters`), isolated from and tested alongside Blacklight's own `f`/`f_inclusive` handling rather than replacing it |
| Range limit plugin | Same (`range[field][begin\|end]`) | none |
| Sort menu | Same (`sort`) | none |
| Hidden search state (`view`, `per_page`) | Same | none |
| Search + Start over | Same; Start over is a link to the empty form | none |
| "Within search" constraints block (the query and filters the form was opened with, Blacklight's own search-history layout) | Same: `NexusCcs::AdvancedSearchFormComponent#constraints` renders `Blacklight::ConstraintsComponent.for_search_history` (plus a pill per `f_all` value, which isn't a native Blacklight filter) above the form, read-only, when the form was opened from an already-filtered search | Previously not done (the form showed the current search only by prefilling its own fields, which looks like a fresh search when opened from a filtered results page); reinstated rather than rebuilt, so it keeps whatever Blacklight does with query/facet labelling on upgrade |
| `blacklight.advanced_search.op.{must,should}` labels ("all" / "any") | Same scope, fuller wording ("Contains all (AND)" / "Contains any (OR)"), plus `must_not` ("Does not contain (NOT)") added to it, in `config/locales/advanced_search.en.yml` | One i18n namespace for the operator labels instead of a second, CCS-only `advanced_search.match.*` scope duplicating the same three strings |

What is still CCS's own, deliberately (not a gap to close): the dynamic add/remove rows and their JavaScript
(`controllers/advanced_search_controller.js`), the filter-visibility menu and Includes any/all toggle, and the
whole form template. Blacklight's default form is a single static block (one row per search field, a facet
accordion, no JS); matching CCS's design (a dynamic row builder, per-filter AND/OR) through Blacklight's
`search_field_controls`/`search_filter_controls` slot API would mean re-deriving most of that custom behaviour
inside the slots anyway, for no behavioural gain — so the template stays a full override, documented here
instead of forced through machinery it doesn't fit.
