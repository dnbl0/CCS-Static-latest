# CCS Design System vs IBM Carbon: parity audit (2026-10-13)

Phase 1 (read only). Nothing in the Figma file was changed. File: `LiHK4sj5u56DOM5kiVFX2E`.

## What "Carbon" is, in two parts

1. **Carbon's Figma file** (`F4n54VUztRcE9e6rv68DLc`) is a pure component library. Pages: About, Utilities, Button, Notification. The Button page is one dense variant matrix (Primary, Secondary, Tertiary, Ghost, Danger x 7 sizes x with/without icon x Default, Hover, Active, Focus, Disabled, Skeleton). It has no prose documentation.
2. **Carbon's documentation** lives on carbondesignsystem.com. Each component has four tabs: Guidelines, Specifications, Code, Accessibility. The site groups everything as Building blocks (Foundations, Components, Patterns, Data visualization) and Building experiences (Discover, Learn, Try, Buy, Onboard, Use, Get help, Expand, End use).

So "as good as Carbon" means two different bars: a complete component library in Figma, and a component documentation set shaped like the website.

## Carbon component page, section by section

| Tab | Sections |
|---|---|
| Guidelines | Status, last updated, tags; Live demo; Overview (when to use, when not to use, variants table); Formatting (anatomy, sizes table, emphasis, alignment, groups); Content (label, alignment, i18n/RTL, overflow); Universal behaviours (focus, states, interactions, loading); one section per variant with product examples and do/don't; Modifiers (icons, icon-only, tooltips); Related; References; Feedback |
| Specifications | Colour token tables per variant and per state; Typography table; Structure (padding, spacing, icon gaps, focus ring) with measured diagrams; Size table (24 to 80px) |
| Code | Live demo, framework selector, props, usage |
| Accessibility | What the system provides (keyboard, behaviour); Design recommendations; Development considerations; Testing status table |

## CCS Button page today (`7:122`), same lens

| Carbon element | CCS | Gap |
|---|---|---|
| Status, last updated, tags | none | add to `Doc / Header` Meta slot |
| Overview: when to use / not to use | none | missing |
| Variants table (purpose per variant) | Variant specimens only, no purpose column | missing |
| Anatomy | present, numbered parts | keep |
| Size table | none (two sizes in specimens) | missing |
| Emphasis / group / alignment guidance | one rule on group size | thin |
| Content (labels, RTL, overflow) | one rule on labels | thin |
| Loading / behaviours | none | missing |
| Per-variant guidance with product examples | none | missing; product examples would come from the real CCS pages |
| Icon modifiers | specimens only, no rules | thin |
| Specifications: colour tables per state | Design tokens table (good), but not per state | partial |
| Specifications: structure diagram with measurements | none | missing (largest visual gap) |
| Accessibility: provides / design / development / testing | Table plus 4 items plus 2 rules | partial; no testing status |
| Tabs (Guidelines / Specifications / Code / Accessibility) | single long scroll | restructure to four tab pages or four anchored bands |
| Related, References, Feedback | Related and Feedback present; References missing | add References |

## Inventory state of the doc layer

- Page `Button` still uses the old doc parts (`Section header`, `Item`, `Row`, `Rule`), not the Doc kit. The pilot on the kit (`271:2373`) no longer exists. The kit (`268:1752`) has 26 masters. A "Pilot pages (draft)" section (`280:3069`) holds two frames.
- 22 component, foundation and section pages are not on the kit. Page Banner is the only one fully rebuilt.
- Four "Patterns" pages and Home Dialog work belong to cloud session `Figma doc components skill [a155f5]`. Do not write to `312:43437`, `320:43554`, `312:43128`, `312:43146` without telling Dean.

## Constraint: no drift from the apps

The apps use only `.btn-primary`, `.btn-secondary`, `.btn-outline-*`. Carbon-style Tertiary, Ghost, Danger and 7 sizes would be components the product does not render. Rule: **document and complete what the apps use; add a variant only when the apps need it** (for example Danger once a destructive action exists). Parity is therefore mostly a documentation exercise, plus a few specification diagrams.

## Proposed order of work

1. Define the CCS component page template (tabs: Guidelines, Specifications, Code, Accessibility) as kit parts: `Doc / Overview` (when to use / not to use, variants table), `Doc / Spec figure` (measured structure diagram with 16px-style callouts), `Doc / Token table by state`, `Doc / Accessibility status`, `Doc / References`, and a status line in `Doc / Header`.
2. Rebuild **Button** end to end on the kit as the reference page (Carbon-depth), then screenshot against Carbon's Guidelines and Specifications tabs.
3. Migrate the other 13 component pages in order of use: Link, Input, Select, Checkbox and switch, Tag, Search bar, Facet filter, Result card, Pagination, Breadcrumb, Save control, Collection card, Rich text.
4. Foundations pages (Colour, Typography, Spacing, Elevation, Icon) to the Carbon "Foundations" pattern: overview, usage, specification, accessibility.
5. Add a **Building experiences** page set, CCS version: journeys instead of IBM's product lifecycle (Discover a collection, Search, Refine, View a record, Save and cite, Get help), each linking to the patterns and templates used. This reuses the `Patterns:` pages owned by the cloud session, so coordinate before starting.
6. Library completeness: align Button size scale and token table with the code; add Skeleton/loading state only if the apps ship one.

Exit check for each page: layout QA clean, zero unbound values, screenshots beside Carbon's equivalent.
