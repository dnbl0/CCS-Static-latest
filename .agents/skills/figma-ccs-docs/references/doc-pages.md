# The documentation pages

All page ids are in the CCS Component Library file (`cbE2B9pmg3rSWNuvT2qcfd`). Verified
2026-10-21.

## The pages that carry the Dev documentation

| Page | id | Notes |
|---|---|---|
| Contents | 164:5121 | The entry point. `Start here` section with a link table. |
| Changelog | 188:27009 | Release notes for the library. |
| Text input | 197:32894 | Has a loose section still marked "documentation required". |
| Button | 204:975 | The most complete page; use it as the structural reference. |
| Notification bar | 206:494 | |
| Tag | 206:44084 | |
| Breadcrumbs (library) | 206:44465 | |
| Link | 206:45037 | |

Supporting pages: `Doc kit` (5:6), `Assets` (5:7), `Foundations` (5:2) and its children
(colour, spacing, radius, borders, opacity, typography, elevation, layout, motion, icons),
`Global` (5:3), `Site header` (5:4), `Footer` (19:2555), `Search` (27:86) and its parts,
`Library components` (226:89385, currently empty), `Results and record` (40:86) and its
parts, `Pages` (49:86) and its parts, `Page templates` (49:90) with the six
`Template · …` pages, and `—— Archive` (188:22126).

## The second file

`2026-MVP-user-stories` (`efuChltynfWhqmgSd2jtG1`) holds 27 pages: a Cover, then the user
stories grouped as `Search and browse` (7:308), `Home and collections` (12:42) and
`Record page` (12:49), each page named with its CCS identifier (for example
`CCS-19 · Explore collections` 7:309, `CCS-404 · Record details with digital asset`
12:50), plus `Media types` (12:58), `Accessibility` (12:60) and `Proposed components`
(12:62). These pages carry the scenario content that the Patterns pages illustrate.

## The shape of a doc page

A doc page is a frame named `Doc / Page / <Component>` holding:

1. a `page/header` instance of `Doc / Header`,
2. one or more page-section instances of `Doc / Page section`, each with a `Heading` slot
   (Title and Description text) and a `Content` slot,
3. inside `Content`: `Doc / Stage` instances with a `Specimen` slot and a `Caption`,
   `Doc / Table` instances whose `Rows` slot holds `Doc / Table row` instances, and
   `Doc / Guidance` instances for Do and Don't rules.

Every `Doc / Table row` carries a `Cell 1 content` frame with a hidden `Leading` slot
alongside `Cell 1` … `Cell 4` text layers.

## Defects found on 2026-10-21

Each of these is verified against the file, not inferred.

1. **Three page widths.** The house width is 1344. `Doc / Section` is built at 1344 and
   `Doc / Header` at 1344, but `Doc / Page section` is built at 1280, and every doc page
   frame is 1720 wide — Button `204:976`, Text input `201:43010`, Contents `164:5122`.
   Pick one width and make the masters and the pages agree.

2. **The page-section instance is named after the component.** On the Button page the
   instance is `204:978` named "Text input"; on the Text input page the instance is
   `201:43012` also named "Text input"; on Contents it is `229:92039` named "Start here".
   The name is the only way to tell a page-section instance from a component instance,
   so an agent reading the tree cannot find the page frame. Rename the instances to the
   master name, or to a section name that is unique on the page.

3. **Live masters sit in an Archive section.** `Doc / Section` (5:27) and `Doc / Header`
   (5:12) live in section `188:22127` named "Archive" on the Doc kit page, while the live
   kit is section `17:2952`. Both are in use on every doc page.

4. **A loose specimen section waits for documentation.** The Text input page holds
   section `197:33054` named "Text input component - documentation required" with 13 loose
   `Text input` instances (288 wide) scattered in a grid at three heights (83, 104, 115),
   outside any doc frame. Either fold them into a `Doc / Stage` with captions that name
   each state, or remove them.

5. **The Doc kit section is wider than the house limit.** `17:2952` is 3460 wide against
   the 3400 packing limit.

## Before you write

The house standard for what a good page contains is `figma-doc-components`. Read it before
changing any doc page; this file only records what is true of this file today.

`docs/figma-library-audit-2026-10-12.md`, `docs/figma-carbon-parity-2026-10-13.md` and
`docs/figma-token-crossref-2026-10-14.md` in this repo hold the earlier audits, and
`docs/page-level/PLAN.md` with `docs/page-level/scenarios-*.md` hold the page-level plan
and the scenario catalogue.
