# Design tokens

All design tokens live in one file, `public/styles/tokens/tokens.css`, linked right after Bootstrap on every page. It has three tiers. (Component CSS lives in `public/styles/components/`, page CSS in `public/styles/pages/`; see design.md.)

| Tier | What it holds | May reference | Count |
|---|---|---|---|
| 1. Primitives | Raw values: the palette (every colour the app uses), the Figma colour scale, type families / sizes / weights / line heights, the spacing scale, radii, elevation (shadow values), z-index values, durations, container widths | nothing (literal values) | 236 |
| 2. Semantic | Purpose-named roles: colour roles (`--color-text-*`, `--color-bg-*`, `--color-border-*`), the legacy `--col-*` roles, Figma roles (`--text-primary`, `--background-*`, `--input-*`, `--stroke-*`), type roles (`--font-body`, `--font-size-body`, `--font-weight-semibold`, `--line-height-normal`), spacing (`--space-8`), shape (`--radius-pill`), elevation (`--shadow-md`), layers (`--z-1000`), motion (`--duration-fast`), layout (`--layout-content`) | primitives only | 214 |
| 3. Component | One family per component, named `--<family>-<semantic role>`, for example `--searchbar-bg-surface`, `--nav-text-inverse`, `--record-border-subtle` | semantic tokens only | 124 |

Families: `searchbar`, `nav` (header, drawer, search overlay), `licence`, `banner`, `breadcrumbs`, `filters` (Advanced Filters), `results`, `record`, `home`, `content` (Matrix content templates, help, contact, collection pages).

Before this change there were about 1,370 custom properties across six `:root` blocks in five files, of which only 105 were used anywhere. The rest was an unmodified Figma export and the University of Melbourne Gen 3 header token set. Both exports are archived unchanged here for reference and are not linked by any page:

- `figma-variables-export.css` (the old `components/fig-tokens.css`)
- `uom-header-tokens-export.css` (the two `:root` blocks of the old `styles/header.css`)

## Naming

- **Primitives**: palette colours are `--palette-<family>-<lightness>` (families: white, black, grey, stone, navy, slate, blue, cyan, sage, lime, amber, red; a translucent colour adds `-aNN`, the alpha in percent). Scales are `--font-size-scale-16`, `--space-scale-8`, `--radius-scale-pill`, `--z-scale-1000`, `--duration-scale-fast`, `--size-1224`. The Figma names that existing code still uses (`--brand-1100`, `--blue-400`, `--sage-400`, `--neutral-1000`, `--interactive-600`, `--white-100`) and the UoM names (`--col-heritage-100`, `--uom-ds-*`) are kept verbatim in this tier.
- **Semantic**: curated roles first (`--color-text-brand`, `--color-bg-surface`, `--color-border-default`, `--color-bg-action-hover`), then any other colour the app uses as `--color-<text|bg|border>-<family>-<lightness>` so no literal is left without a name. The legacy `--col-*` roles are kept because many rules use them.
- **Component**: `--<family>-<semantic role without the color- prefix>`. A component token is created only for roles that component actually uses, so each family's list is the complete set for that component.

## Rules

1. A stylesheet uses its own component tokens inside its component, semantic tokens elsewhere, and does not use primitives directly. The exception is a short list of **off-scale** sizes (font sizes 11, 13, 15, 17, 19, 22, 26, 28, 34 and 40px, and a few spacings) that exist only as scale primitives; they need a design decision before they get a semantic role.
2. A component token references a semantic token; a semantic token references a primitive; only primitives hold literal values.
3. No `:root` blocks or `<style>` blocks outside `tokens.css`. The only exception is `:root { tab-size: 4; -webkit-text-size-adjust: 100% }` in `header.css`, which is not a token.
4. Do not change a token's value as part of a refactor. Run the style diff (see `docs/css-refactor.md`); it must say `RESULT: IDENTICAL`.

## How to add or change a token

1. Pick the tier. A new raw value goes in tier 1 (reuse an existing palette entry or scale step if the value is already there). A new role goes in tier 2 and points at a primitive. A new per-component role goes in tier 3 and points at a semantic token.
2. Use it from the stylesheet: `color: var(--searchbar-text-muted)`. Do not copy the value.
3. Take a snapshot before and after (`npm run style:snapshot -- baseline`, `npm run style:snapshot -- after`) and run `npm run style:diff -- baseline after --tokens`. A new token is "added" and does not fail the diff; a changed used token does.
4. To change a colour everywhere, change the primitive. To change it for one component, point that component token at another semantic token.

## Token conflicts (decisions for the design team)

The old cascade gave a few tokens different values on different pages. The token layer reproduces today's rendering exactly, so these are recorded rather than resolved. Say which value should win and the override can be deleted.

| # | Token | Where it differs | Today (kept) | Note |
|---|---|---|---|---|
| 1 | `--col-text-primary` | Home page vs every other page | **Resolved**: `#1b1f2a` everywhere | The home page used to resolve navy by load-order accident; unified when the stylesheets were consolidated. The home search bar text is now the same colour as every other search bar. |
| 2 | `--col-bg-primary` | Home page vs every other page | **Resolved**: one definition | Same colour; the page-scoped override block is gone. |
| 3 | `--col-advisory-text`, `--col-bg-accent-soft`, `--col-border-neutral`, `--col-border-neutral-mid`, `--col-border-neutral-soft` | Defined only on the home, record, results, help, collections index and collection landing pages | Now defined on every page with the same value | The pages that lacked them (advanced search, contact, Indigenous data, Lists) have no element that uses them, so nothing changes. Allow-listed in `scripts/style-diff.allow.json` |
| 4 | `--ff`, `--fs`, `--fw`, `--lh`, `--ls`, `--col-bg-accent` (Figma blue-dark value) and the rest of the old `data-mode="wireframe"` block | Defined only inside `:root[data-mode="wireframe"]` and `:root[data-theme="dark"], .dark`, selectors no page ever matches | Dropped | Every consumer already used the `var()` fallback. The dark and wireframe themes are in the archived export if they are ever wanted |
| 5 | Palette near-duplicates | About 15 greys, stones and slates that differ by 1 to 3 lightness points (for example `#ecebe7`, `#ebe8e2`, `#ece9e3`, `#e9e7e2`) | Kept as separate tokens | Merging them would change pixels. A design pass could collapse them to a handful of surface and border colours; the diff tool will show exactly what moves |
| 6 | Legacy hex vs `rgb()` spellings of the same colour | `--brand-1100` is `rgb(0,15,70)`, `--col-bg-primary` is `#000f46`, `--col-heritage-100` is `rgb(0 15 70)` | All kept | Same colour, three spellings, from three sources (Figma, the page tables, the UoM header) |

## Not done

- The remaining hard-coded values: gradients, `calc()` expressions, multi-value `transition` easings, font-family stacks that differ in quoting (changing the text changes the computed value), and one-off lengths (widths, offsets) are left as they are. Colours, font sizes, weights, radii, line heights, z-indexes, shadows, durations and the 2 to 48px spacing steps were migrated wherever the value is exactly equal.
- Off-scale sizes (rule 1) and the near-duplicate palette entries (conflict 5) are design decisions.

## Enforcement

`public/styles/tokens/tokens.css` is the source of truth. There is no Figma export or sync any more: the token JSON files and `build-figma-tokens.js` were removed.

Enforced by `tests/tokens.test.js` (runs in `npm test`): semantic tokens may only alias primitives, component tokens may only alias semantic tokens, no upper-tier token holds a raw value, every `var(--token)` in the site resolves.
