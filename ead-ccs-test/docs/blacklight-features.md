# Blacklight features and plugins

Configuration-only use of Blacklight 9.0.0 and its official plugins, in `CatalogController`
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
| Citation, search history, JSON API, did-you-mean, autocomplete | built in | n/a |
| Bookmarks | built in, but needs a user model; `/bookmarks` redirects without one | n/a |
| List and mosaic (masonry) views | built-in list + `blacklight-gallery` (git `main`) via `config.view.*`; grid and slideshow removed | `thumbnail_path_ssi` |

## Notes

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
