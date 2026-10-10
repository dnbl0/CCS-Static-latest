# Handoff (2026-10-10, evening)

For the next Claude agent (any account) continuing Dean's work. Dean is non-technical: decide, do, report briefly; ask only what blocks you. Dean's standing rule: do routine tasks (PRs, merges on green checks, org syncs, rollouts) without asking; still ask before destructive actions. Read `CLAUDE.md` (agent coordination) first.

## State
- Repos: `origin` = dnbl0/CCS-Static-latest (work happens here, squash-merge PRs), `org` = Enterprise-Services-Group/CCS-2026-MVP (GitHub Pages, the public site). Everything through PR #224 is on both (org PRs #43, #44). PR #225 (Advanced Search link, scope chevron) and the test-hardening PR after it are newer than that: sync the org when they merge.
- Static site: `public/` (+ `src/partials`). Rails/Blacklight 9.2.1 prototype: `ead-ccs-test/`. Azure runs the Rails app; session `Fix Azure deployment on laptop` (or `ccs-static-7d`) owns Azure/Docker and now rolls out merged Rails changes without asking Dean. Tell it whenever a PR that touches `ead-ccs-test/` merges; never run `az`/acr-push yourself.
- Round 4 is complete on both sides: 24px breadcrumb home icon (#218), Save on Rails mosaic cards (#219: blacklight-gallery's stretched title link sat over the control; it now sits above, z-index 2), record page Save top right (#220 static, #222 Rails), advanced-search dropdowns like the facet rail (#221 static, #222 Rails), saved-records link in the phone menu on the home page (#223), size test for the dropdowns (#224).

## Open items for Dean
- Confirm that "move the border left" on the Rails dropdown chevron meant removing the chevron's left border (done in #216).
- The Advanced Search link is now a footer-style link (blue arrow left, bold white label) per Dean's screenshot (#225); confirm it is what he wanted.

## Known flaky checks
- The Rails system tests `SavedRecordsTest` ("Save becomes Saved...", at `click_link "2 saved records"`) and `SearchJourneysTest` ("the view buttons switch...") each failed once in a full run and passed alone, on a busy machine; I could not reproduce either even with 12 busy loops running. Both gave up while a Turbo page change was still in flight, so `ApplicationSystemTestCase` now sets `Capybara.default_max_wait_time = 6` (the default is 2 s). If either still flakes, look at that first, then at the layout shift when the saved bar's text changes width.
- `tests/bookmarks.test.js` "Save button is at least 44px tall" failed on about half of CI runs until #226 made it poll until the layout settles.

## How to work here
- Per task: `git worktree add -B <branch> /tmp/<dir> origin/main`; never switch branches in /Users/nobled/CCS-Static (shared, stay on main).
- Checks (all four must pass before merge): parity, rails, system, test. Merge: `gh pr merge N --squash` (allowed in `.claude/settings.local.json`). Look at the CI conclusion before merging; rerun a flaky failed job with `gh run rerun <run> --failed`.
- Static: `npm install --no-package-lock` (or symlink root node_modules into the worktree, remove before committing), `npm run sync:partials` after editing `src/partials/*`, `npm run sync:rails` after static CSS, `npm test`. `package.json`'s test script is one long line, so two PRs adding a test collide there: rebase after the first merges. Rails: `SOLR_URL=http://127.0.0.1:8984/solr/blacklight-core bin/rails test` and `test:system`, `bin/rubocop`, `bin/erb_lint --lint-all`, `bin/rails dartsass:build` once per worktree (system tests are unstyled without it). The axe system test needs the root node_modules symlinked. Solr 8984 is ours; 8983 is another project's: never pkill by pattern.
- Org sync after merging: `git fetch org`, worktree on `org/main`, `git merge --no-commit origin/main`, `git read-tree --reset -u origin/main`, commit, push the branch to `org`, `gh pr create -R Enterprise-Services-Group/CCS-2026-MVP`, wait for four checks, `gh pr merge N -R ... --merge`, confirm "Deploy to GitHub Pages" success, remove the temp worktree/branch.
- Limits: study.unimelb.edu.au is behind Cloudflare (automation blocked; do not bypass); the Claude in Chrome extension was not connectable, so use Playwright (`scripts/lib/chromium.js`) and Dean's screenshots.
- Style rules enforced by tests: tokens only (no hard-coded colours), no inline styles, BEM names.
- Tests that compare against the live facet rail (`tests/combo-dropdowns.test.js`) fail when either side drifts; change both together.
