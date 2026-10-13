# UoM Figma libraries: what the CCS Design System file can use

Audit date: 2026-10-12. Scope: the four UoM libraries linked to the CCS Design System Figma file
(Foundation, Component, Asset, Utility) compared with the CCS file (`LiHK4sj5u56DOM5kiVFX2E`) and with the two apps
(`ead-ccs-test` Rails app and the static site in `public/`). Rule for every verdict: **the Rails and static UI is the
source of truth. A library item is only adopted if it does not change what the apps render.**

Nothing in the CCS file was changed by this audit. Temporary comparison boards were built and deleted.

## 1. What each library holds

| Library | File key | Contents |
|---|---|---|
| Foundation | `hgFO4N25XCZ4aPYQxF1iB8` | Variables: `99 Primitive Colours` (116), `01 Colours` (184 semantic), `02 Typography` (160), `99 Primitive Typography` (52), `03 Dimensions` (41), `04 Responsive` (10). Component: `aspect-ratio` (11 ratios). Pages: Colours, Typography, Dimensions, Grid. |
| Component | `cQcZOOuiVd79v9meOELcIb` | Accordion, Breadcrumbs, Button, Button group, Card image / icon / no media, Checkbox (+group), Content and media, Content block (+expand), CTA footer, Dropdown menu, Footer, Link, Link list (+description, heading, heading section), Notification bar, Pathfinder, Quick links, Radio (+group), Search bar, Select, Stats and rankings, Tag, Text area, Text input (+action, + impactful variants). **Pages marked 🚧 (work in progress): Breadcrumbs, Card, Content block, Content and media, Notification bar, Tooltip.** |
| Asset | `yioOlgJGzYynrgJO1hlGB8` | 7 UoM logo lockups (horizontal and vertical, housed and unhoused, on light and on dark), Material-style icon set, image placeholders. |
| Utility | `9fimAaMtZvT7aWkCnbw0tY` | Documentation scaffolding: `page/header`, `page/nested`, `page/statusTag`, `Section title`, `Screen info`, `Note` (New, Question, Changed, Accessibility, To do, Dev note, Blank), `Changelog` + `Changelog/Item`, `Cover` (Default, Library, FigJam), `.base/Status`, `.base/Cover status`, `table/*` (badge, token, text_link, data_cell, heading_cell, column), `Pointer`, `Flow/Curved`, `Flow/Linear`, cursors, `.base/link`. |

## 2. Foundation: tokens

### Colour primitives: adopt (no visual change)
50 of the CCS file's 60 colour primitives are **exactly** the same hex as a Foundation primitive
(neutral 100 to 1000, navy = `brand` 100 to 1200, cyan = `blue` 100 to 900, sage 100 to 500, `blue` = `interactive`
500 to 900, green 100, plus white and black). The CCS file is already a copy of the library palette under different names.

CCS-only primitives with no library match (keep local, the apps use them): `navy/750` #404b74, `slate-teal/500` #4f7385
(saved bar), `cyan/150` #d1f1fb, `cyan/250` #a3e4f7, `sage/150` #eaefe9, `slate/600` #5b6070 (muted text),
`stone/300` #cfcac0 (**field border**), `red/300` #f4868d, and the magenta pair (docs annotation only).

### Dimensions and spacing: adopt (no visual change)
The library scale is `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144, 160`. Every CCS spacing value
(4, 8, 12, 16, 24, 32, 40, 48, 64, 96) and icon size (16, 20, 24) exists in it. CCS-only values: 36
(`space/block-sm`), 240 (`size/banner-image-height`), 320 (sidebar), radius 6 and pill. The library has 12-column grid
tokens (`columns 12`, `gutter 24`, `margin 32`) that match the 1440 layouts.

### Semantic colours: alias selectively (light mode)
These CCS tokens have the same value as a library semantic token and can alias it:

| CCS token | Library token |
|---|---|
| `text/primary` #222 | `text/primary` |
| `text/secondary` #414141 | `text/secondary` |
| `text/brand` #000f46 | `text/brand` |
| `text/link` #003f8b / `text/link-hover` #004ead | `link/text-default` / `link/text-hover` |
| `text/error`, `border/error` | `text/error`, `stroke/error` |
| `surface/subtle` #f4f4f4 | `background/secondary` |
| `surface/success` / `surface/warning` | `background/success` / `background/warning` |
| `border/panel` #dddfe7 / `border/strong` #b5baca | `stroke/weaker` / `stroke/weak` |
| `focus/ring` #0d6cdd | `focus/focus` |
| `action/primary` (+hover, +active) | `button/fill-primary-default` (+hover, +down) |
| `action/secondary` (+hover, +active) | `button/fill-secondary-default` (+hover, +down) |
| `action/disabled` | `button/fill-disabled`, `input/fill-disabled` |
| `surface/brand` #000f46 (page header band) | `background/primary-inverse` family (same hex) |

Inverse mode does **not** map one to one: the library encodes inverse as separate `-inverse` tokens, CCS uses a variable
mode, and some values differ (for example `text/link` inverse #81daf5 equals the library's *hover*-inverse, not its
default-inverse). Alias light mode only, and verify each inverse value before aliasing it.
No library equivalent: `border/field`, `surface/saved-bar`, `text/muted`, the `docs/*` tokens.

### Typography: **do not rebind**, the scales differ
| Role | Library | CCS file |
|---|---|---|
| Body default | 18 | 16 (`Body/Default`) |
| Body lead | 24 | 18 (`Body/Large`) |
| Title 1 / 2 / 3 / 4 | 48 / 40 / 32 / 24 | Display 48, H1 36, H2 30, H3 24 |
| Button, link, input value | 18 | 16 (`Body/Strong`) |
| Tag, overline | 14 | 12 |

The apps' own tokens decide this. The page banner title is 48 (matches both), but body copy elsewhere should be
checked against the CSS before any text style moves. Type is therefore a reference, not an adoption.

## 3. Component Library: verdicts

Legend: **Use** = replace or base the CCS component on the library one. **Add** = the apps have the pattern, the CCS file
does not, take it from the library. **Reference** = keep the CCS version, borrow ideas. **Skip** = adopting would drift.

| Library component | CCS equivalent | Evidence | Verdict |
|---|---|---|---|
| Input, Text input, Select, Search bar, Text area, Dropdown menu | Input, Select, Search bar | Library fields have a **navy 1px border**, 18px values and the hint **above** the field. The apps use the stone `#cfcac0` border, 16px and helper text below. The search row in the apps has a scope select and a 56px submit. | **Skip** (drift) |
| Checkbox, Radio (+groups) | Checkbox and switch, Facet filter rows | Library: navy box, "Input label" 18px. Apps: facet rows with counts, Blacklight markup. | **Skip** |
| Tag | Tag | Library tag is navy filled, uppercase 14px, with Dismissable and Selected states. Apps use sage tags. | **Skip**; borrow the Dismissable and Selected state model for the applied-filter tags |
| Link | Link, Arrow link | Same Source Sans, underlined bold. Library label is 18px, CCS 16px. | **Reference** until the CSS link size is checked |
| Button, Button group | Button | Same radius 0 and cyan primary. Library label 18px semibold, CCS 16px. Static campaign button is 18px. Library has Tertiary (+inverse); CCS has Outline. | **Reference**; confirm Rails button font size first |
| Breadcrumbs 🚧 | Breadcrumb bar | Strip colour #00354c is identical and is the token the CSS uses (`--uom-ds-color-background-tertiary-inverse`). Library height 40, CSS `min-height: 44`; no saved bar; no mobile back link. | **Reference** (CCS version is closer to the app) |
| Footer | Footer (Sections) | Same bands (navy 1100, 800, 1200 in `site_footer.css`), same content. Differences: contact block and legal bar layout; library container 1288 vs CCS 1200. | **Reference**; keep CCS, re-check when the library changes |
| Pathfinder | none | `PathfinderItemComponent` in Rails and `.pathfinder` in the static CSS are modelled on this template ("Matrix Pathfinder"). | **Add** (check the white vs dark variant against the CSS first) |
| Notification bar 🚧 | none | Rails renders alerts (`spelling_correction`, advanced search form, unavailable record). Library has Info, Error, Warning, Success, Dismissable. | **Add** after matching against the Bootstrap-UoM alert styles |
| Accordion | Facet filter (custom) | Rails facet fields use an accordion. Library accordion is a plain item list with states. | **Reference**; no change to the facet filter |
| Content and media 🚧, Content block 🚧 | Content section | Same job. Library has more breakpoints and backgrounds but is work in progress. | **Reference** |
| Card image / icon / no media 🚧 | Collection card, Result card | App cards have no category tag and use a different border. | **Reference** |
| Link list, Quick links, Stats and rankings, CTA footer, Radio group | none | No usage found in either app. | **Skip** (not needed) |
| Tooltip 🚧 | none | Rails has a tooltip controller for the view-type buttons; the library page is work in progress. | **Wait** |

## 4. Asset Library
- **Logos: Use.** Seven official lockups. The CCS Footer and Site header should use `UoM_Logo_Horiz_Unhoused_onDark` /
  `UoM_Logo_Vert_Unhoused_onDark` as instances, not a redrawn or image-filled logo. The artwork in the CCS footer looks
  identical; confirm the vector before swapping.
- **Icons: Reference.** The library icons are a Material-style set (`arrow_forward`, `home`, `save`). The apps load
  their own SVGs (`home.svg`, `chevron-right.svg`, `arrow-right.svg`). Swapping would change stroke weight and shape.
- **Images: Use `aspect-ratio`** (already adopted on Collection card, Result card, Content section and the Split banner).

## 5. Utility Library (documentation only, no app impact)
Zero drift risk because it never ships. Candidates for the doc layer:

| Utility item | Use |
|---|---|
| `Cover` (Default, Library, FigJam) | Replace the custom Cover page. |
| `Changelog` + `Changelog/Item`, `.base/Change type` | **Add**: the CCS file has no changelog. |
| `Note` types (Accessibility, To do, Dev note, Question, Changed) | Use alongside `Doc / Callout` for dev notes and to-dos. |
| `.base/Status`, `page/statusTag`, `.base/Cover status`, `table/badge` | Status vocabulary for component pages. |
| `table/token`, `table/data_cell` | Reference for `Doc / Token spec row`. |
| `Pointer`, `Flow/*` | Annotation arrows for anatomy and user flows. |
| `page/header`, `page/nested`, `Section title` | **Reference only**: the CCS doc kit (Header, Section, Stage) was designed for this file and already follows the UoM brand header. |

## 6. Recommended order (lowest risk first)
1. **Alias CCS colour primitives and spacing to the Foundation variables** (50 colour primitives, all spacing). No visual change; names stay, values come from the library. Verify with a pixel-diff of the seven Sections pages.
2. **Alias the matching light-mode semantic colours** from the table in section 2. Leave Inverse mode alone until each value is checked.
3. **Adopt the Asset Library logos** in Footer and Site header.
4. **Add Pathfinder and Notification bar** as library instances once compared with `.pathfinder` and the Bootstrap-UoM alert CSS.
5. **Doc layer:** Cover, Changelog, Note types from the Utility Library.
6. **Check the type and button/link sizes in the app CSS** (16 vs 18) before changing any CCS text style.

## 7. Risks to manage
- Remote library components update when the library publishes. Pin by aliasing variables (values only) rather than instancing whole components, except logos and `aspect-ratio`.
- Six Component Library pages are marked work in progress; do not build on them yet.
- The library is a general UoM system, the apps are a specific product. Where they disagree the apps win (field border, tag colour, search row, footer layout).

## 8. Outcome of the same-day pass

Done in the CCS Figma file (every variable change was checked by comparing all 256 resolved colour and number values
before and after, with automatic rollback; zero differences):

| Item | Result |
|---|---|
| Colour primitives | 43 now alias Foundation primitives (`neutral`, `brand`, `blue`, `sage`, `interactive`, `green`, `yellow`, `red`, `white/100`, `black/100`). |
| Spacing, size, stroke, radius primitives | 21 now alias Foundation dimensions (`spacing/*`, `size/*`, `stroke/*`, `radius/*`). |
| Semantic colours (Default mode only) | 20 alias Foundation semantic tokens (table in section 2). `text/primary` differs from the library by 0.0009 of one channel (same 8-bit colour). Inverse mode left on CCS primitives. |
| Footer logo | The flattened SVG copy is replaced by the Asset Library `UoM_Logo_Vert_UnhousedAlt_onDark` component. Footer height unchanged (749). |
| Changelog | New `Changelog` page from the Utility Library (detached copy, nine entries), with Dev note and To do Notes. |
| Pathfinder item | New component (Default, Alt, Inverse, Inverse alt) built from the CSS, with a documentation page. Added `Heading/H3, Tone=Link` to the Text set. |

Verdict changes after reading the app CSS:

- **Notification bar: Skip.** The apps do not use it: the spelling-correction alert is Bootstrap `alert-info` (cyan tint, 16px padding), the advanced-search errors are a white box with a 2px `#db1927` border, and the unavailable page is plain text. The library bar (pink fill, 1px red border) would drift. Build a CCS Alert from the app styles instead (open task).
- **Pathfinder: Add, but not the library one.** The library Pathfinder is a dark band holding up to four cards. The apps render single tiles on white or light grey, so the CCS tile follows the CSS.
- **Button label size: no change.** Large CTAs (campaign banner, `.ct-button`, pagination Previous and Next) are 18px; Save, advanced search and Bootstrap buttons are 16px. The CCS Button (16px) matches the Rails controls.
- **Link: no change.** Rails body links are 16px underlined, arrow links are 18px semibold.
- **Tag: no change.** CCS `Label/Tag` already matches the code (14px, 600, uppercase, 0.08em). Fill is `#d9e3d8` against the code's `#dde5d6` (a 4-step difference).
- **Accordion: Reference.** The facet accordion (Bootstrap) and the FAQ `details.ccs-acc` use their own styling.
- **CTA footer: Reference.** The nearest match is `.cta-band` on the Help pages.

Open: an Alert component, the Rails footer-contact and legal-bar layout against the library footer, and aliasing Inverse-mode
semantic colours (each needs a value check).
