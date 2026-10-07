# Code quality plan

A plan to make both codebases clean, well structured and in line with best practice: the **static site** (`public/`,
`scripts/`, `tests/`) and the **Rails/Blacklight app** (`ead-ccs-test/`). Written 2026-10-07 after the Rails app gained
the home, collections, help and contact pages.

Each item has a size (S under half a day, M a day or two, L longer) and a check that shows it is done. The phases are
in priority order; phases 1 and 2 are the ones that stop things going wrong, the rest is tidying.

## Where things stand

| Area | Static site | Rails/Blacklight |
|---|---|---|
| Tests | 19 node suites in `npm test` (6 need Chromium, skipped in some environments) | 168 Minitest runs; one system test |
| Lint | none for CSS, JS or HTML | Rubocop (omakase) and Brakeman clean |
| CI | `ci.yml` runs `npm test` | `rails` job added to `ci.yml` (Rubocop, Brakeman, tests) |
| Largest files | `search-results.css` 75 KB, `record.css` 30 KB, `support.js` (generated runtime) 1,900 lines | `catalog_controller.rb`, `record_page.css`, `advanced_search.css` |
| Duplication | five collection landing pages of 769 lines each differ only in data; header and footer repeated in every page | `pages/static_shared.css` and `tokens/static_site.css` are copies of static files |

Mobile (390px) check, 2026-10-07: home, collections, a collection, contact, help and indigenous data pages have no
horizontal overflow on either site, the computed font sizes and spacing match, and the menu drawer matches. One
difference was found and fixed: the Rails mobile breadcrumb back link was dark on dark (the per-page `.bc-mobile*`
rules did not travel with the copied markup; they are now one shared rule set). Remaining visual differences are the
search bar on the home page (the Rails app keeps its Blacklight bar) and font fallback in offline test runs.

## Progress

- **Done 2026-10-07 (Phase 1):** decision taken (shared source for tokens, CSS and images; copy stays separate), items
  2 and 3 built (`scripts/sync-rails-assets.js`, `scripts/parity.js`, both in CI), item 4 settled by documentation,
  and items 6 and part of 5 done (CI split into `ci.yml` and `rails-ci.yml` with path filters, the Rails job gained
  gem and importmap audits).
- Item 5 changed: `ead-ccs-test/.github/workflows/deploy.yaml` builds and deploys the Rails image through the
  organisation's `unimelb-enterprise-apps` actions and its secrets. Those only work in the repository that owns them,
  so the nested workflows and `dependabot.yml` are left in place. They run if `ead-ccs-test` is published as its own
  repository. Confirm how the app is delivered before removing them.
- **Done 2026-10-07 (Phase 3, items 10-12):**
  - Item 10: ESLint (`eslint.config.js`, 0 errors, 12 warnings to clean up) and Stylelint (`.stylelintrc.json`, 0
    errors, 23 warnings: duplicate selectors and `!important`) run first in `npm test` (`npm run lint`). HTML
    validation is left out: the pages are DC templates with `{{ }}` and custom tags that validators reject.
  - Item 11: the five collection pages are generated from `src/collection-landing.template.html` by
    `scripts/build-collection-pages.js` (output unchanged, byte for byte); `--check` runs in `npm test`.
  - Item 12: the header, search overlay and footer are `src/partials/*`, written into every page by
    `scripts/sync-partials.js` (`--check` in `npm test`). Three pages changed: the contact page's Contact link class,
    the search page's search button class (neither is styled) and the home page footer's image paths (now absolute).
    The page-named BEM classes in the header (`contact-university-melbourne__list`) are kept: the partial is a template
    with `@PAGE@`.
- **Done 2026-10-07 (more):**
  - Item 13 (part): `search-results.css` is split into eight files under `public/styles/pages/search-results/`, cut
    only at the section comments that were already there and loaded in the same order, so the cascade is unchanged.
    It is not yet split by component: the sheet is layered (later rules refine earlier ones, 23 duplicate-selector
    warnings), so merging the layers needs the Chromium `style-diff` suite to prove nothing moved. Do that in CI.
  - Item 18: `HelpTopic`, `SitePages` and `CollectionCounts` replace the logic in `PagesController`; breadcrumb, page
    banner and pathfinder card are ViewComponents with tests.
  - Item 7: `auto-merge.yml` no longer fires for changes under `ead-ccs-test/`. Item 8: a pull request template asks for
    the checks and for desktop and mobile screenshots (no `CODEOWNERS` yet: it needs the owners' usernames).
- **Done 2026-10-07 (item 14, first step):** the page runtime no longer needs unpkg.com. `public/runtime-libs.js`
  (loaded before `support.js` on every page) maps the three CDN URLs to the exact builds in `public/vendor/runtime`,
  using the runtime's own `__resources` hook, so `support.js` (generated, not edited) is untouched.
  `tests/runtime-libs.test.js` checks the load order and that the files match the hashes `support.js` pins. The pages
  now render offline and the Chromium suites run in the sandbox: search-bar, results-filter-parity, image-aspect,
  style-diff and search-live pass, accessibility passes (30 page states; one run flagged a contrast failure while
  results were still rendering and did not repeat). `advanced-filters` fails 5 checks on the arrow-key behaviour of
  the dropdown; it fails the same way on the code from before this work, so it is not caused by it. Investigate in CI
  against the pinned Playwright browser.
- **Pre-rendering, assessed:** with the CDN dependency gone the remaining cost is speed: Babel (3 MB) compiles every
  page's template at load. The interactive pages (search results, record, advanced search) need the runtime whatever
  is done, so pre-rendering would only cover contact, help, indigenous data, the browse page and the collection pages,
  and the help topics would need their own URLs (today `?topic=`). Worth doing if first paint on those pages matters;
  not needed for correctness.
- **Done 2026-10-07 (item 19):** `CatalogController` went from 263 to 165 lines. The facet, record field and search
  field configuration is `CatalogConfig::Facets`, `RecordFields` and `SearchFields` (`app/models/catalog_config`), and the
  range histogram action's Solr work is `RangeHistogramQuery`. The resulting Blacklight configuration is identical to
  before (checked by dumping it from both versions). The histogram endpoint had no tests; it now has endpoint and query tests.
- Still to do: items 9, 15, 16, the rest of 13 and 14, 17, 20-28. The Chromium suites could not run in the sandbox
  (the page runtime needs unpkg.com): they run in CI.

## Phase 1 - Stop the two sites drifting apart (highest value)

The pages exist twice and are kept in step by hand. That is the main structural risk.

1. **Decide the source of truth (S, a decision).** Either (a) the static site stays the design reference and the Rails
   app is a faithful port, or (b) one shared package of tokens, CSS and images feeds both. Recommended: (b) for
   tokens, CSS and images only. Copy and templates stay separate because one is DC templates and the other ERB.
2. **Share one design-token and CSS source (M).** Make `public/styles/tokens/tokens.css`, the page CSS and the images
   the origin, and add a script (`scripts/sync-rails-assets.js`) that writes the Rails copies
   (`tokens/static_site.css`, `pages/*.css`, `images/site/`). Today `/tmp`-style one-off generators produced them, and
   nothing records how. Done when: one command regenerates the Rails files and a CI step fails if they differ from
   the committed copies.
3. **Add a parity test (M).** A Playwright test that loads each static page and its Rails twin at 1440 and 390px and
   compares computed styles for a list of key selectors (the technique used for this review). Reuse
   `scripts/style-snapshot.js` and `style-diff.js`, which already exist. Done when: a style change on one side
   without the other fails CI.
4. **One place for page copy (S).** `ead-ccs-test/config/pages.yml` and the static pages' JS dictionaries hold the
   same text. Pick the YAML as the origin and have the static build read it, or document that both are edited
   together.

## Phase 2 - Safety nets and process

5. **Check the CI layout (S).** `ead-ccs-test/.github/workflows/{ci,deploy}.yaml` are nested workflows that GitHub
   does not run from this repository. See Progress: they stay until it is confirmed how the app is delivered. Add a
   root `dependabot.yml` for npm, Bundler (`/ead-ccs-test`) and GitHub Actions.
6. **Path-filter CI (S).** Run the `npm test` job only for static changes and the `rails` job only for
   `ead-ccs-test/**`, so neither blocks the other. Add Bundler and npm caching.
7. **Review the auto-merge workflow (S).** `auto-merge.yml` squash-merges `feature/**`, `bugfix/**` and `enhance/**`
   pushes into `main` after a design check. Decide whether that is still wanted now that two applications live in one
   repository, and restrict it so Rails changes get a human review.
8. **Branch and release hygiene (S).** Work currently lands on `wip/local-main`. Agree the branch flow, add a
   `CODEOWNERS` file (static vs Rails owners) and a pull request template that asks for desktop and mobile
   screenshots for UI changes.
9. **Dependency updates (S).** Keep Dependabot for Bundler, npm and GitHub Actions. Brakeman is pinned by
   `bin/brakeman --ensure-latest`, so budget a bump when it releases.

## Phase 3 - Static site (HTML, CSS, JS)

10. **Add linters and formatters (S).** Stylelint (standard config plus a ban on `!important` and ID selectors),
    ESLint (recommended), HTML validation with `html-validate` or `vnu`, and Prettier. Run them in `npm test`. Fix or
    baseline the findings; there are only three `!important`s today.
11. **Collapse the five landing pages (M).** `collections/*/index.html` are 769 lines each and differ only in data.
    Generate them in `scripts/build-pages.js` from one template and one data file (the same shape as the Rails
    `pages.yml`). Done when: adding a collection means adding data, not copying a file.
12. **Pull the repeated header, footer and search overlay out of every page (M).** They are pasted into each HTML
    file. Generate them at build time from one partial. The `no-inline-styles` and `page-integrity` tests already
    protect the output.
13. **Split the large stylesheets (M).** `search-results.css` (75 KB) and `record.css` (30 KB) should be split by
    component (toolbar, filters, results card, record media) and ordered by an import manifest. Keep the BEM naming
    already in use. Done when: no stylesheet is over about 15 KB and `stylesheet-structure.test.js` enforces it.
14. **Retire what the build replaces (M).** `support.js` is a generated runtime that needs React and Babel from a CDN
    at page load (so the pages are blank offline) and renders client-side. Evaluate pre-rendering the DC templates
    to plain HTML in the build, which removes the runtime dependency, improves first paint and makes the pages
    testable without a browser. This is the largest single improvement for the static site.
15. **Accessibility and performance gates (M).** Run `axe-core` over every page in CI (the Chromium suite exists but
    is skipped when Chromium is missing: make CI fail rather than skip), add Lighthouse CI budgets, and trim
    `public/assets` (about 238 MB) with image derivatives and lazy loading.
16. **Docs (S).** `README.md` is long and carries a changelog. Move the changelog to `CHANGELOG.md`, keep the README
    to setup, structure and conventions, and fix the stale repository URL.

## Phase 4 - Rails/Blacklight app

17. **Lint everything Rails (S).** Rubocop stays as is; add `erb_lint` (ERB), `stylelint` for the asset CSS and
    `bin/importmap audit` / `bundler-audit` to the CI job (they are already in `config/ci.rb`: run that file in CI so
    local and CI checks cannot diverge).
18. **Make the pages layer idiomatic (M).**
    - `PagesController` holds the help topic list and YAML loading; move them to `app/models/help_topic.rb` and
      `app/models/collection_page.rb` (plain Ruby objects) and cache the YAML parse at boot rather than in a class
      variable.
    - Turn the repeated page chrome (breadcrumb, banner, contact box, `ct-listing` and pathfinder cards) into
      ViewComponents next to the existing `NexusCcs::*` ones, with component tests.
    - Move the generated static HTML for the contact, help and indigenous pages to i18n or content partials so copy is
      editable without touching markup.
19. **Slim `CatalogController` (M).** About 270 lines of configuration plus actions. Extract the facet setup, the
    range histogram action and the default-redirect into concerns or config objects (`CatalogConfig`,
    `RangeHistogramsController`) so each can be tested alone. Keep Blacklight's own extension points (components,
    search builder, search state fields) as the only coupling.
20. **CSS structure (M).** The `components/` files for the search results are large (`record_page.css` 400+ lines,
    `advanced_search.css` 400+). Apply the rule used on the static side: one file per component, tokens only, no
    `!important` (26 today). Remove the per-page `bc-mobile` style of duplication from the copied static files (done
    for breadcrumbs; sweep for the rest after step 2).
21. **JavaScript (S).** Stimulus controllers are small and conventional. Add unit tests with a lightweight runner
    (Vitest or the Rails system test driver) for the ones with logic (`range_slider`, `advanced_search`,
    `select_dropdown`) and delete `hello_controller.js`.
22. **Test depth (M).** Add system tests (Capybara) for the main journeys: search, filter, open a record, open the
    advanced search flyout, the mobile menu. Add integration tests for the error paths (Solr down shows a friendly
    page; the pages work without Solr, which is the case today and is logged).
23. **Operational basics (S).** Health check `up`, structured logging, Solr timeouts and a rescue for
    `Blacklight::Exceptions::InvalidRequest` that renders a useful message; confirm Content-Security-Policy is on
    (`config/initializers/content_security_policy.rb`) now that the layout loads only same-origin assets.
24. **Docs (S).** Refresh `docs/handover.md` (it names old branches and Ruby 4.0.6; the sandbox ran 3.3.6), keep
    `docs/` as the single place for architecture notes, and add an ADR folder for decisions like step 1.

## Phase 5 - Across both

25. **Naming and conventions (S).** Agree one vocabulary: collection slugs, the facet values (`collection_ssim`) and
    the labels in the header (`SiteNavigation::COLLECTIONS` and `pages.yml` repeat them).
26. **Content model (M).** The data model workbooks (`data/*.xlsx`, `data-model/*.json`, `config/data_model`) are the
    third copy of the field and filter definitions. Make the workbook the origin and generate the JSON for both sites
    (the Rails docs describe this; the static `scripts/extract-data-model.py` is the other half).
27. **Security (S).** Keep Brakeman and bundler-audit blocking, add `npm audit` for the static tooling, and rotate any
    secret that ever appeared in history (Solr password hash is in `solr/security.json`; see `docs/secrets.md`).
28. **Accessibility (S).** One checklist for both sites (focus order, contrast, landmarks, reduced motion), run in the
    parity test from step 3 with axe on both.

## Suggested order and effort

| Week | Items | Outcome |
|---|---|---|
| 1 | 5, 6, 7, 17 | CI is correct, scoped and fast; nothing runs twice or never |
| 2 | 1, 2, 3 | The two sites cannot drift unnoticed |
| 3 | 10, 11, 12 | Static site lints and has no copy-paste pages |
| 4-5 | 13, 14, 15 | Static CSS split, templates pre-rendered, accessibility gated |
| 4-5 | 18, 19, 20 | Rails controllers, components and CSS follow the same structure |
| 6 | 21, 22, 23, 24, 25-28 | Test depth, operations, docs, shared conventions |

## Definition of done for the whole plan

- One command runs every check for both codebases locally and in CI, and a failing check blocks merging.
- A style or copy change shows up in both sites or fails the parity test.
- No file is generated by an undocumented one-off script.
- Every page is covered by a test at desktop and mobile widths.
