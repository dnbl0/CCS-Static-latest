# Styling inventory: static CCS site vs Blacklight

Generated 2026-10-06 from the Blacklight 9.0.0 gem, rendered pages of this app (home, results,
faceted results, record, search history, advanced search, citation, zero results) and the
static site's `public/` tree. Class detection is word-based, so plain-English words that are
also Bootstrap class names (`active`, `show`, `small`) inflate the "shared" numbers slightly.

## Bootstrap classes

| | Count |
|---|---|
| Classes in the themed Bootstrap build | 2,235 |
| Classes Blacklight (plus this app) renders | 265 |
| ...of which Bootstrap classes | 124 |
| ...of which Blacklight's own hooks | 141 |
| Bootstrap classes the static site uses | 51 (about 20 are real components or layout, the rest are words) |
| Used by both | 26 |

The static site uses Bootstrap lightly: grid and layout (`container row col d-flex flex-wrap`),
`btn`, `accordion`, `card`, `modal`, `dropdown`, `pagination`, `table`, `alert`, `badge`,
`collapse`, `lead`.

Blacklight leans on it far more. It renders 104 Bootstrap classes the static site never uses,
including `navbar*`, `list-group*`, `input-group`, `form-control/select`, `accordion-*`,
`modal-*`, `page-link`, `btn-outline-*`, `btn-close`, `dropdown-*`, and spacing and display
utilities. These all come from the themed Bootstrap build, so they take the UoM colours,
square corners and fonts from the Sass variables with no per-class CSS.

## Static CSS rules by how they port

1,160 rules in `public/styles` (excluding vendor):

| Group | Files | Rules | How it ports |
|---|---|---|---|
| Already portable | element-level rules in `base.css`, `tokens.css` | 19 | Tokens done; element rules fold into `unimelb.css` |
| Layout chrome | `ccs.css`, `header.css`, `search-bar.css`, `hero-search.css` | 261 | Override Blacklight's header, footer and search bar partials with the static markup, then port the CSS (class names kept or renamed) |
| Results and facets | `search-results.css`, `advanced-filters.css` | 491 | Style Blacklight's hooks or override its components (see below) |
| Record page | `record.css` | 188 | Override the document show component, then port |
| Static-only content | breadcrumbs, banners, content templates, licence badge, collection, help, contact, indigenous data | 201 | No Blacklight equivalent: port as is into new views and partials |

Only 17 rules (1.5%) target classes that both sides emit. The other 1,143 key off static-only
class names (`ccs-nav__item`, `search-results-article__text--v3`, `facet-rail__field`).
No rule restyles a Bootstrap class that Blacklight also renders, so nothing is lost or
duplicated at the Bootstrap layer.

## Component mapping

| Static component | Static classes | Blacklight hook | Approach |
|---|---|---|---|
| Header, nav | `ccs-nav__*`, `ccs-link*` | `.navbar`, `.navbar-brand`, `.topbar` | Replace `shared/_header_navbar` |
| Footer | `ccs-foot__*` | `shared/_footer` | Replace partial |
| Search bar, query chip | `search-bar`, `uom-search-popover__*` | `.search-query-form`, `.search-field`, `.search-btn`, `.constraint`, `.constraint-value` | Style hooks; override `SearchBarComponent` only if markup must change |
| Result cards | `search-results-article__*`, `ccs-card__*` | `.document`, `.documents-list`, `.documents-masonry`, `.document-title-heading`, `.dl-invert` | Override the index document component; gallery view is the card grid |
| Result toolbar | `search-results-section__*` | `.sort-pagination`, `.sort-dropdown`, `.per_page-dropdown`, `.view-type` | Style hooks |
| Facets | `facet-rail__*`, advanced-filters | `.facets`, `.facet-limit`, `.facet-field-heading`, `.facet-toggle-button` | Largest piece: static uses selects and checkboxes, Blacklight uses accordions. Style hooks first; custom facet components for the select UI |
| Pagination | `.pagination` | `.page-item`, `.page-link` | Direct |
| Record page | `record-*` | `.show-document`, `.document-main-section`, `.show-tools` | Override show component |
| Consent dialog | `uom-dialog*` | `.uom-dialog*` (already in this app) | Restyle the existing one to the static copy |
| Breadcrumbs, banners, home, help, contact | various | none | New views and partials |

## Notes

- Bootstrap Sass variables live in `app/assets/stylesheets/_bootstrap-uom-variables.scss`;
  `test/assets/bootstrap_theme_tokens_test.rb` keeps them in step with `tokens/primitives.css`.
- Many static class names look machine-generated (`search-results-article__text--v2`,
  `search-results-ack-title__text`). Rename to Rails and Blacklight conventions (component
  prefix such as `ccs-`, semantic element names) as each group is ported; don't copy them.
