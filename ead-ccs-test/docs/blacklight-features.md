# Blacklight features and plugins

Configuration-only use of Blacklight 9.0.0 and its official plugins, in `CatalogController`
(`config/locales/blacklight.en.yml` for labels). No custom facet UI.

| Feature | Mechanism | Solr field(s) |
|---|---|---|
| Search fields: all, title, creator, subject | `add_search_field` (qf/pf in `solr/conf/solrconfig.xml`) | `title_tsim`, `creator_tsim`, `subject_*`, `all_text_timv` |
| Facets with "more" modal, collapse, limits | `add_facet_field ... limit:` | see facet table below |
| Pivot (parent/child) | `pivot:` on `collection_pivot` | `collection_ssim` > `named_collection_ssim` |
| Query facets (yes/no toggles) | `query:` on `record_includes` | `description_tsim`, `date_start_isi` |
| Contextual facets | `if:` lambda (cultural/language group appear once a collection is selected) | `cultural_group_ssim`, `language_group_ssim` |
| Date range | `blacklight_range_limit` 9.3.0, `range: true` | `date_start_isi` |
| Constraints and Start over | built in (restyled in `unimelb.css`) | n/a |
| Sort: relevance, title A-Z / Z-A, date newest / oldest | `add_sort_field` | `title_si`, `date_start_isi` |
| Per page 12 / 24 / 48 / 96 (default 24) | `config.per_page`, `default_per_page` | n/a |
| Advanced search | `config.advanced_search.enabled` | search and facet fields |
| Citation, search history, JSON API, did-you-mean, autocomplete | built in | n/a |
| Bookmarks | built in, but needs a user model; `/bookmarks` redirects without one | n/a |
| Grid (gallery), mosaic (masonry), slideshow views | `blacklight-gallery` (git `main`) via `config.view.*` | no image field yet |

## Notes

- **blacklight-gallery** 6.0.0 on rubygems pins `blacklight ~> 9.0.0beta1`, so the Gemfile uses its
  `main` branch (gemspec allows `~> 9.0`). Its generator also adds OpenSeadragon (IIIF viewer) and a
  jQuery CDN pin; neither is used here.
- **Images.** No image, thumbnail or IIIF field is indexed, so the grid, mosaic and slideshow views
  show `placeholder-thumbnail.svg`. When an image URL is indexed, set `config.index.thumbnail_field`.
- **Date quality.** `date_start_isi` has no value for about 12,700 of 41,000 records, and about
  1,700 values are 0 or below, which stretches the range histogram.
- **JS.** chart.js and `@kurkle/color` (range-limit's dependencies) are vendored in
  `vendor/javascript`; the plugin's generator pins them to a CDN instead.
- **Facets only render when they have values**, so `language_group_ssim` stays hidden until the
  export populates it.
- The sidebar shows the pivot as "Collection"; `collection_ssim` and `named_collection_ssim` stay
  configured with `show: false` for constraints and advanced search.
