# Hand-off: CCS Design System and modal work

Written 2026-10-13. Everything below comes from session reports. Frames and the modal worktree were not re-checked.

## Context
- Repo: `dnbl0/CCS-Static-latest`. Rails app in `ead-ccs-test/`, static site in `public/` (sources in `src/`, scripts in `scripts/`, tests in `tests/`).
- Figma file: `LiHK4sj5u56DOM5kiVFX2E` (CCS Design System).
- Read `CLAUDE.md` first: check other agents, announce what you touch, stay on `main` in the shared checkout, use worktrees for branches, never put secrets in messages or PRs.
- Figma work: load the `figma:figma-use` skill before every `use_figma` call, and the `figma-doc-components` skill for documentation work. The skill is `~/.claude/skills/figma-doc-components/SKILL.md` (a zip copy is `figma-doc-components.skill.zip` in this folder).
- Memory notes (local): `/Users/nobled/.claude/projects/-Users-nobled-CCS-Static/memory/`. Key ones: `figma-doc-kit-2026-10-12.md`, `feedback-layout-qa-mandatory.md`, `ccs-static-pr-workflow.md`, `ci-and-worktree-gotchas.md`.
- Plan and scenario catalogues: `docs/page-level/PLAN.md` and `docs/page-level/scenarios-*.md`. Library audit: `docs/figma-library-audit-2026-10-12.md`.

## 1. Modal scroll lock and UoM Gen 3 styling (code, unfinished)
Task: modals in both apps must not scroll the page behind them, and must follow the UoM Gen 3 modal (https://designsystem.web.unimelb.edu.au/components/modal/ and https://www.unimelb.edu.au/web/matrix-cms/styling-content/modal).

State: the agent hit the session rate limit partway. Partial work is in the worktree `/Users/nobled/CCS-Static/.claude/worktrees/agent-a5353b261b7874db5` on branch `worktree-agent-a5353b261b7874db5`. Not inspected, not pushed, no PR.

Plan:
- Lock: `html:has(dialog[open]) { overflow: hidden; scrollbar-gutter: stable }` for native dialogs; a counted root class for the filter drawer and search overlays. Restore the same scrollY on close, including on Turbo cache restore.
- Styling: navy 80% backdrop (`rgba(0, 11, 52, 0.8)`), square white panel, 24px padding, "Close" button with icon at top right. Keep existing accessibility (aria-labelledby, focus, Escape).
- Rails surfaces: Country acknowledgement and View full record (`dialog_controller.js`), Blacklight `#blacklight-modal` (advanced-search flyout, facet "Show more"), the filter drawer, the search overlay.
- Static surfaces: search overlay (`src/partials/search-overlay.html`, `public/nav.js`), dialogs in `record.html`, `search-results.html`, `advanced-search.html`, `bookmarks.html`. Change sources in `src/`, then rebuild generated pages.
- Tests: `tests/modal-scroll-lock.test.js` plus Rails component or system tests. `npm test` must pass.
- Deliver: PR to `main`, ready for review, not merged.

## 2. Figma page-level components and docs
Wave A is done. Each page holds component sets, page templates and a doc frame built from doc-kit parts.

| Page | Page id | Doc frame | Built by |
|---|---|---|---|
| Patterns: Feedback | `312:43437` | `321:76923` | A1 |
| Patterns: Record | `320:43554` | `322:6942` | A2 |
| Patterns: Content | `312:43128` | `322:86900` | A3 |
| Patterns: Search | `312:43146` | `322:87544` | A4 |

Remaining:
- Fix-ups:
  - Swap A3's drawn Acknowledgement modal on the Home page templates for A1's Dialog set `321:51326`.
  - Fix the 2px mobile overflow on Page / Indigenous data (the Article's second Arrow link, 360 vs 358).
  - Fix A4's anatomy markers that slightly overlap text.
  - Recheck A4's instances of A1's Notice `312:43633`, Empty state `312:43676`, Skeleton: Result card `321:49149` and Skeleton: Pill `321:49152`.
- Wave B2, coverage audit: check every scenario ID in `docs/page-level/scenarios-*.md` against a drawn stage or a stated behaviour-only reason. Recount A3 first (its report says 32 shown and 10 behaviour-only beside a list of 30 plus 12). A1 and A2 each assumed the other covered R10 and R14 (leaving-site dialog), so verify that hand-off.
- Wave B1: add only what the audit finds missing (for example a global patterns page).
- Wave C: consistency pass, a `Pages: Index` page, update the skill and memory notes, final report.
- Layout QA is mandatory on every Figma change: packing routine, overlap/out-of-bounds/clipping checks, then read screenshots.

## 3. Other open items
- Build a CCS Alert component from app styles (Rails spelling-correction `alert-info`; the 2px red error box on advanced-search).
- Alias the Inverse-mode semantic colours to the Foundation Library after per-value checks.
- Migrate older doc pages onto the doc kit. The Button pilot review is pending Dean's approval. Also the remaining Sections doc pages and the Templates page.
- PR #230 (docs only: library audit and page-level plan) is awaiting checks, not merged.
- Do not commit `.claude/settings.local.json` or `CLAUDE-azure-deploy.md`.

## Known approximations (details in each agent's report)
Nearest-token snaps (for example 14px to 12px, 20/56/72/80/120px padding), rescaled specimens with "Shown at N%" captions, dialog fields drawn as frames not the Input component, some image heights that differ from the CSS, and several text styles that are nearest matches.

## Update 2026-10-13 (later): main moved
- PR #230 and PR #232 are merged. `docs/page-level/*`, the library audit and `.claude/skills/figma-doc-components/SKILL.md` are on `main`.
- Another session ("Search facets default Blacklight functionality") also merged a large removal of the custom Rails search UI (about 3,100 lines): the advanced search form, views, locale and controller, the facet field and item components, `filter_rail.css`, the range slider and histogram code, the facet panel and dropdown Stimulus controllers, and their tests. Rails now uses default Blacklight facets.
- Modal task: the worktree branch predates this. Rebase it onto `main`, drop surfaces that no longer exist in Rails (advanced-search form, facet panels), and keep the rest.
- Figma audit (B2): check Patterns: Search (advanced search form, range slider state, facet state, filter rail) for Rails scenarios that are now obsolete. They may still apply to Static; mark them Static-only instead of deleting.

## Update 2026-10-13 (evening): Carbon session work (reported by that session, not re-checked)
- Product-library fixes: new tokens `color/stone/250` (365:130374) and `border/neutral-mid` (365:130375); Search bar Scope select strokes bound; Arrow link docs link; Link descriptions decoded; Section header Fill width in the 14 `Masters / *` frames.
- Patterns: and Sections: pages tidied (x/y moves only, 364 token bindings in Sections doc frames, Footer acknowledgement Fill, Collection grid Row hug).
- Six Sections doc pages migrated onto the Doc kit: Site header 375:9, Search banner 372:5653, Results 379:9, Collection grid 381:9, Content section 382:9, Footer 383:9. Old docs kept as "Archive 2026-10-13 / ...". Sections pages are free to edit again.
- Builder gotchas: set principle/related-card texts after appending the section; never `findAll("Caption")` on a Guidance (matches captions inside specimens).
- Modal PR #234 open, all four checks pass, awaiting Dean's go-ahead to merge.
- Still open: cloud session B2 audit and its three fix-ups; Wave C; CCS Alert; Inverse-mode aliasing; Templates page; Button pilot review.
