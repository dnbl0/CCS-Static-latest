# Handoff (2026-10-10)

For the next Claude agent (any account) continuing Dean's work. Dean is non-technical: decide, do, report briefly; ask only what blocks you. Read `CLAUDE.md` (agent coordination) first.

## State
- Repos: `origin` = dnbl0/CCS-Static-latest (work happens here, squash-merge PRs), `org` = Enterprise-Services-Group/CCS-2026-MVP (GitHub Pages, public site). Everything up to PR #216 is merged on both (org PR #42).
- Static site: `public/` (+ `src/partials`). Rails/Blacklight 9.2.1 prototype: `ead-ccs-test/`. Azure runs the Rails app; another session (`ccs-static-7d`) owns Azure/Docker and redeploys only after Dean approves. Tell it when things merge; never run `az`/acr-push yourself.
- Recent work: search history by day, Blacklight bookmarks (Rails) + saved records (static), saved bar in the breadcrumb strip, results parity, dependency bumps, record page tweaks.

## Do these next (round 4, not started; no branches/PRs exist)
Do static and Rails separately (worktree per task, branch from origin/main), keep them looking the same.
1. Breadcrumb home icon must be exactly 24x24px (currently 16px: static `images/home.svg` in each page's breadcrumb + `.page-local-history__link-image` rules in `public/styles/pages/*.css`; Rails `NexusCcs::BreadcrumbComponent` and `PageBreadcrumbsComponent` + `app/assets/stylesheets/pages/*.css`). Keep the strip 44px high with the saved-records bar flush right, same height.
2. Save on search result cards must toggle to Saved in place, not navigate to the record page (seen on Rails: `NexusCcs::SaveControlComponent`, `.result-card`; check static `search-results.html` too). Find the cause (card link/click bubbling), fix, add a test (URL unchanged, reads Saved, header count updates, Space/Enter work).
3. Advanced search flyout dropdowns (Rails shows a native-style select "Search field: All Fields") must use the same dropdown as the facet sidebar ("Select collection title" 48px trigger: `NexusCcs::FacetFieldComponent`, `facet_panel_controller.js`, `filter_rail.css`; sort/per-page box: `.ccs-select` + `select_dropdown_controller.js` + `results_toolbar.css`). Menus must not clip in the flyout; form params unchanged. Static: `public/search/advanced-search*.{html,js}` and its CSS.
4. Record page: move the Save button to the top right of `.record-summary__inner` (Rails: `record_document_component.html.erb`, `record_page.css`; static: `.record-page__save` in `public/collections/record.html`), not stacked under the tags.

## Open items for Dean
- Home page on phones has no saved-records link (no breadcrumb strip there; header strip hidden below 1024px). Options: bar under the header on home, link in the mobile menu, or leave.
- The "Advanced search" button under the search input is a sage button (same as pagination Next, PR #216). Dean wanted it to match "Browse all courses" on study.unimelb.edu.au/dashboard, which could not be viewed; ask for a screenshot.
- Azure needs another rollout (only #216 is not deployed); `ccs-static-7d` asks Dean.
- I read Dean's "move the border left" on the Rails dropdown chevron as "remove the left border" (removed in #216); confirm.

## How to work here
- Per task: `git worktree add -B <branch> /tmp/<dir> origin/main`; never switch branches in /Users/nobled/CCS-Static (shared, stay on main).
- Checks (all four must pass before merge): parity, rails, system, test. Merge: `gh pr merge N --squash` (rule allowed in `.claude/settings.local.json`); force-pushing to another session's branch is blocked, use a new branch.
- Static: `npm install --no-package-lock` (or symlink root node_modules into the worktree, remove before committing), `npm run sync:partials`, `npm run sync:rails` after static CSS, `npm test` (browser tests may time out once; rerun). Rails: `SOLR_URL=http://127.0.0.1:8984/solr/blacklight-core bin/rails test` and `test:system`, `bin/rubocop`, `bin/erb_lint --lint-all`, `bin/rails dartsass:build` once. Solr 8984 is ours; 8983 is another project's: never pkill by pattern.
- Org sync after merging: worktree on `org/main`, `git merge --no-commit origin/main`, `git read-tree --reset -u origin/main`, commit, push branch to `org`, PR, wait for four checks, `gh pr merge --merge`, confirm "Deploy to GitHub Pages" success, remove temp worktree/branch.
- Limits: study.unimelb.edu.au is behind Cloudflare (automation blocked; do not bypass), the Claude in Chrome extension was not connectable (account mismatch), so use Playwright (`scripts/lib/chromium.js`) and Dean's screenshots.
- Style rules enforced by tests: tokens only (no hard-coded colours), no inline styles, BEM names.
