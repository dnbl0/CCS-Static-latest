## What changed and why

<!-- One or two sentences. Link the Jira story if there is one. -->

## Where

- [ ] Static site (`public/`, `scripts/`, `tests/`)
- [ ] Rails/Blacklight app (`ead-ccs-test/`)

## Checks

- [ ] `npm test` passes (static) and/or `bin/rails test`, `bin/rubocop` and `bin/brakeman` pass (Rails)
- [ ] A change to shared styles or images was made in `public/` and `npm run sync:rails` was run
- [ ] A change to the header, search overlay or footer was made in `src/partials/` and `npm run sync:partials` was run
- [ ] A change to the search rules (URLs, matching, filters, counts, sorting) was made in `public/search/search-query.js`, with a test in `tests/search-query.test.js`

## Screenshots (for any visible change)

<!-- Desktop (1440px) and mobile (390px), before and after. -->
