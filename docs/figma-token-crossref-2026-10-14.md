# Figma variables vs code tokens (2026-10-14)

Method: every Figma variable (219, six collections) was resolved per mode and compared with the Rails token CSS
(`ead-ccs-test/app/assets/stylesheets/tokens/primitives.css` + `semantic.css`, 132 `--ccs-*` tokens, `var()` chains
resolved to literals). Match = the variable's WEB code syntax names a declared CSS variable and the resolved values are
equal (colours to the 8-bit channel, numbers to the px). A second, value-only pass compared colours with the static
site's `public/styles/tokens/tokens.css` (583 custom-property declarations, 574 documented tokens in three tiers, 112 unique colours).

## Result by collection

| Collection | Variables | Same name and value | Raw value only (no CSS variable) | Figma only | Name not declared in Rails |
|---|---|---|---|---|---|
| Primitives | 117 | 92 | 15 | 10 | 0 |
| Color (semantic) | 46 | 38 | 2 | 5 | 1 |
| Spacing | 27 | 12 | 6 | 8 | 1 |
| Radius | 7 | 7 | 0 | 0 | 0 |
| Typography | 18 | 18 | 0 | 0 | 0 |
| Border | 4 | 0 | 4 | 0 | 0 |
| **Total** | **219** | **167** | **27** | **23** | **2** |

Code only (declared in CSS, no Figma variable): `--ccs-shadow-sm|md|lg|xl` (Figma holds shadows as 5 effect styles
`Elevation/*` plus alpha colour primitives).

## Differences worth knowing

- **Value-equal, unit differs:** `duration/fast|base|slow` are 150/200/300 in Figma, `0.15s|0.2s|0.3s` in CSS (same time).
- **Raw value only:** the code syntax is a literal, not `var(--x)`: `text/muted` `#5b6070`, `border/field` `#cfcac0`,
  `color/slate/600`, `color/stone/300`, `color/red/300`, three shadow alphas, `border-width/1|2|4`, `size/icon/*`,
  `size/sidebar`, `size/control-height(-sm)`, all four `Border` variables. Developers must type the value or add a token.
- **Name not in Rails:** `border/neutral-mid` -> `--col-border-neutral-mid` and `size/sidebar-width` -> `--sidebar-width`
  exist only in the static site's CSS.
- **Figma only:** the `docs/*` variables (doc scaffolding), half-step spacing (`space/0-5|1-5|3-5|6-5`), `space/9|10`,
  `size/240`, `color/magenta/*`, `color/stone/250`, the banner spacing tokens.
- **Inverse mode is design-only:** 27 of 46 colour roles differ in the Inverse mode; the Rails CSS has no inverse theme,
  so inverse bands hard-code or compose their own colours.
- **Static site is a different namespace:** unprefixed names (`--color-text-brand`, `--space-8`, `--palette-*`), 574
  tokens in three tiers. By value, 51 of 61 Figma primitive colours and 39 of 46 semantic colours also exist there. The
  ones that do not: `red/600 #db1927` (the static site uses `#d32f2f`, `#b42318`, `#b3261e` for errors, so the error
  colour is **not the same** in the two apps), `cyan/500`, `sage/500` (the active states), the alpha colours.
  `--palette-cyan-400` is `#46c8f0` on the static site and `#47c8f0` in Figma and Rails.

## Plan for the Figma page "Foundations: Token collections"

Research: Carbon (Token / Role / Value, grouped by UI element, component tokens "only for their own component"),
Atlassian (foundation.property.modifier names, "choose by meaning, not value", separate searchable list), Primer
(Sample / CSS variable / Output value, copy control, foundational vs pattern tiers), and this repo's
`docs/design-tokens/README.md` (three tiers, the "who may reference whom" rules).

Table design rules applied: one row per collection, identity first then meaning then how to reference then trust
signal; group rows for the three tiers; code names as mono chips with a real example; one fact per cell; status as
icon + word, never colour alone; counts right-aligned in tabular figures; 44px minimum row; source file named.

Page structure (Doc kit, 1344 wide): Header; 01 How to choose a token (3 principles); 02 Collections (the table, full
width); 03 Names (Figma to CSS mapping table); 04 Figma and code parity (counts table + the differences list); 05 Where
tokens live; Related; Feedback.

## Update: per-token frames (2026-10-14, later)

The Figma page "Foundations: Token collections" now has one frame per collection (`Tokens / Primitives`, `Color`,
`Spacing`, `Radius`, `Typography`, `Border`, `Text styles`, `Elevation`) listing every token with its live sample, Figma
name, CSS name, Default and Inverse value, parity status and note.

Counts changed after the first cross-reference because the doc work added `docs/*` variables to the Spacing collection
(now 39 variables) and because `border/neutral-mid` now gives a raw value. Current totals: 231 variables, 167 same name
and value, 28 raw value, 14 Figma only, 21 docs only (`docs/*`), 1 name not in Rails (`size/sidebar-width`).
Per collection: Primitives 92 same / 15 raw / 10 Figma only; Color 38 same / 3 raw / 5 docs only; Spacing 12 same /
6 raw / 4 Figma only / 1 not in Rails / 16 docs only; Radius 7 same; Typography 18 same; Border 4 raw. Elevation: 4 of 5
effect styles match `--ccs-shadow-sm|md|lg|xl` by offset, blur and colour (`Elevation/Dropdown` has no CSS token).
