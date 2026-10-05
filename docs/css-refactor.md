> **Historical log.** This records the step-by-step consolidation on the former `refactor/css-consolidation` integration branch. The current stylesheet layout is `styles/tokens/`, `base.css`, `components/`, `pages/` (see design.md, "CSS Files Location"), and tokens now live in `public/styles/tokens/tokens.css`. The `style:snapshot` / `style:diff` tooling described here is current.

# CSS refactor safety net: computed-style snapshots

The stylesheets are being consolidated (one token layer, no duplicate base files, one load order). The rule for that work is **no visible change**. Reading diffs of CSS cannot prove that, so every refactor step is checked by comparing what the browser actually computes before and after.

- `scripts/style-snapshot.js` loads every page in a real Chromium and records, for every rendered element and its `::before` / `::after` / `::placeholder`, the computed value of every rendering-relevant CSS property plus its bounding box, and the resolved custom properties on `:root` and `<body>`.
- `scripts/style-diff.js` compares two snapshots and fails on any difference.

## Use

```bash
npm run style:snapshot -- baseline      # on main, before you change anything (about 90 s)
# ... edit CSS / HTML link tags ...
npm run style:snapshot -- after         # about 90 s
npm run style:diff -- baseline after    # exit 0 = identical, 1 = differences, 2 = usage error
```

Snapshots live in `.style-snapshots/<label>/` (git-ignored, about 4 MB each). Take the `baseline` on a clean checkout of the branch you are starting from and keep it for the whole refactor.

Useful options:

| Option | Meaning |
| --- | --- |
| `style:snapshot -- <label> --pages=index,record` | only these pages (names are the keys of `PAGES` in `scripts/style-snapshot.js`) |
| `--states=default,filters-modal` | only these states |
| `--viewports=378` | only one viewport (`1280` or `378`) |
| `--concurrency=N` | parallel browser contexts (default 6) |
| `style:diff -- a b --partial` | compare only the snapshots that exist in `b` (use after a filtered snapshot) |
| `--tokens` | custom properties: ignore unused ones (added, removed or changed), fail if a **used** one changes or disappears. Use this for the dead-token clean-up, where removing unused tokens is the point |
| `--verbose` / `--limit=N` | list every affected element / show more kinds of change per page |
| `--tolerance=px` | numeric tolerance, default 0.25px (see Determinism) |
| `--allow=file` | allow-list, default `scripts/style-diff.allow.json` |

### What is captured

102 snapshots: 15 pages x 2 viewports (1280x900 and 378x800) x the states that apply to the page.

- Pages: home, search results (`?q=skull`), advanced search, collections index, the 5 collection landing pages, record (`?id=1`), help, Indigenous data, contact, lists. `search.html` is only a redirect shim and is not captured.
- States: `default`; `ack-modal` (cultural acknowledgement not yet dismissed; every other state dismisses it through `localStorage`); `seeded` (Lists page with saved items); `mobile-menu` and `mobile-menu-drilled` (378px); `desktop-dropdown` and `header-search-overlay` (1280px); `scope-menu` (collections menu in the search bar); `sticky-bar` (results page scrolled); `filters-modal` (all sections expanded); `fav-dialog` ("Save to list" dialog).
- To cover a new page or state, add it to `PAGES` / `STATES` in `scripts/style-snapshot.js` and take a new baseline.

Not captured: `:hover` / `:focus-visible` styles (the mouse is parked at the top-left corner), animations and transitions (they are disabled), elements with `display: none`, and anything rendered only after the states above.

## Reading a report

```
index @1280 [default]: 26 difference(s)
  ~ box (x,y,w,h): 526.69,0,709.31,44 -> 525.69,0,709.31,44   x2
      div.ccs-nav__main:2 > div.ccs-nav__top:1 > nav.home-university-melbourne:1
  - 1 element(s) removed e.g. ...
```

Each block is one page @ viewport [state]. Lines starting `~` are changes grouped by property and old -> new value with the number of elements affected and two example paths (the path is the last three steps of `tag.classes:nth-of-type` from `<html>`). `+` / `-` are elements that appeared or disappeared. `box` is a moved or resized element. `custom property` lines show a changed `--token` (marked `(used)` when a stylesheet, inline style or script references it with `var()`).

The final line says `RESULT: IDENTICAL` or `RESULT: DIFFERENT` and the process exits 0 or 1.

### Allow-list

If a difference is intended (for example a token deliberately changed to its Figma value), add an entry to `scripts/style-diff.allow.json` with a `reason`; the diff then reports it as "allowed" instead of failing. Fields (all optional except `reason`; `page`, `state`, `path`, `property` are anchored regular expressions): `page`, `viewport`, `state`, `type` (`changed`, `added`, `removed`, `box`, `var`), `path`, `property`, `from`, `to`. Keep the list empty unless a reviewer agreed to the change.

## Determinism

Two baselines of the same commit diff as empty (checked repeatedly, and by `tests/style-diff.test.js`). Things that had to be masked, and why:

- The clock is frozen (`Date`) and `Math.random` is seeded; animations, transitions, the caret and smooth scrolling are switched off; fonts and images are awaited; the locale and time zone are fixed.
- The local server port is random, so `http://127.0.0.1:<port>` is normalised out of `url(...)` values.
- **Sub-pixel text measurement** differs by up to about 0.2px between runs (text widths such as `69.7969px` vs `69.8125px`). Numbers that differ by no more than the tolerance (0.25px) are treated as equal; anything else in the value must match exactly. A real layout change of 0.3px or more is reported.
- `--header-total-height` is set at run time by a script in `record.html` that races the template render (96, 110 or 212px depending on timing), so it is left out of the custom-property comparison.

## Cost

A full snapshot takes about 80-95 s on a laptop (6 parallel contexts). `tests/style-diff.test.js` (in `npm test`, about 9 s) checks the diff engine and snapshots one page twice; it is skipped without Chromium.

## Where component CSS lives

`public/components/fig-tokens.css` holds Figma variables only (`:root` custom properties). Rules for shared components are one concern per file in `public/styles/components/`:

| File | Contents |
|---|---|
| `breadcrumbs.css` | `.page-breadcrumbs` / local history, including the rule that long labels wrap |
| `focus.css` | global `:focus-visible` ring (WCAG 2.4.7) and the header search placeholder contrast (WCAG 1.4.3) |
| `page-banner.css` | `.page-banner` title and description |
| `licence-badge.css` | `<ccs-licence>` badge and tooltip |
| `search-bar.css` | the shared search bar (`search-bar.js`): scope menu, suggestions, recent searches, chip |
| `collection-hero.css` | `.campaign-banner-split` collection landing hero |

Rules for adding to this directory:

- **Load order is part of the cascade.** Every page that links `fig-tokens.css` links these six files immediately after it, in the order above (this is the order the rules had inside the old file, so no specificity or source-order outcome changed). Add a new component file at the end of that run on every page, and in `tests/search-bar.test.js`'s harness page if the component needs it.
- **No tokens in component files and no component rules in the token file.** Page-specific rules stay in `styles/pages/`; the header stays in `styles/header.css`.
- **Prove it.** Take `npm run style:snapshot -- baseline` before moving CSS and `npm run style:snapshot -- after` afterwards; `npm run style:diff -- baseline after` must say `RESULT: IDENTICAL`.
- The six files are linked on pages that do not use every component (for example the help page has no licence badge). Dropping a file from a page is a separate change that has to pass the diff.

## Base elements and skip link: one copy

Every page used to carry its own near-copy of the base rules (`body`, `a`, `*` box-sizing) and of the skip-link rules, named `pages/<page>.base-elements.css` and `pages/<page>.skip-link.css`. They are now two shared files:

| File | Contents |
|---|---|
| `styles/shared/base-elements.css` | `body`, `*`, `button,input,select` font, `.sr-live`, default link style (underlined), Bootstrap overrides (`.btn`, `.btn-primary`, `.card`, `.fw-serif`), the University-links hover colour, and the plain-link variants below |
| `styles/shared/skip-link.css` | `.skip-link` and the mobile breadcrumb switch |

**Link variants.** Three link styles existed: underlined (contact, Indigenous data, lists, advanced search, help), plain with navy hover (home, collections index, the five collection landing pages) and plain with blue hover (record, search results). The underlined style is the default; the other two are `:where(.page-x, ...) a` and `a:hover` rules at the end of `base-elements.css`. `:where()` adds no specificity, so each rule still ties with a plain `a` rule and the one that comes later wins, exactly as before. To change a page's link style, add or remove its body class (`page-*`) in the right `:where()` list.

**Load order.** Link `base-elements.css` where the old base file was: last on every page except home, where it sits just before `home.page-styles.css` (home's old rules lived there). The skip-link file is linked first, as before.

Removed: `pages/{collection-landing,collections-browse,help,record,search-results}.base-elements.css` and `pages/{help,home}.skip-link.css`. Page-specific rules that were in them moved to the page's own file: the item media viewer to `pages/record.css`, the date facet and keyframes to `pages/search-results.css`, `html{scroll-behavior}` and the help topics grid to `pages/help.css`. `pages/home.page-styles.css` lost its `body`, `a`, `a:hover` and `.btn` rules (its `:root` block is untouched).

Check: `style:diff` against the pre-change snapshot is `RESULT: IDENTICAL` (102 snapshots), both before and after rebasing onto the component-CSS move.

## Token layer: one file, three tiers (steps 1 and 2)

`public/styles/tokens.css` is now the only place design tokens are defined (primitives, semantic, component; 231 / 213 / 144 custom properties). It replaces `components/fig-tokens.css`, `shared/colour-tokens.css`, `shared/colour-tokens-v2.css`, `pages/record.colour-tokens.css` and the `:root` blocks that sat in `styles/header.css` and `pages/home.page-styles.css`. It is linked right after Bootstrap on every page. Full description, naming, how to add a token and the list of token conflicts are in `docs/design-tokens/README.md`.

What changed, in order:

1. **Dead tokens removed.** 1,367 custom properties were defined; 105 are used (by `var()` in a stylesheet, page or script, directly or through another token). About 2,000 declarations were deleted. The unmodified Figma and UoM header exports are archived under `docs/design-tokens/`.
2. **One token layer.** The remaining tokens were merged into `tokens.css`. Where the old cascade gave a token different values on different pages (the home page), the value is kept with a page-scoped block at the end of the file.
3. **Hard-coded values replaced** by tokens wherever the value is exactly equal: colours (as component tokens inside their component, semantic tokens elsewhere), font sizes, font weights, border radii, line heights, z-indexes, box shadows, transition durations and 2 to 48px spacing.

Result: own CSS (excluding Bootstrap) went from 292,855 to about 231,000 bytes (30 to 27 files); `fig-tokens.css` alone was 73,789 bytes of which about 6,800 bytes remained after the dead tokens were removed.

Proof: `style:diff` before against after is `RESULT: IDENTICAL` across all 102 snapshots (no element, style or box differences). Custom properties differ only where intended and are in `scripts/style-diff.allow.json` with reasons: five properties that were defined only in a never-matching `data-mode="wireframe"` block, and two colour tokens that used to exist on only some pages. Tests (`page-integrity`, `search-bar`) were updated for the new file name and for tokenised values.

**Using `--tokens` for a clean-up like step 1:** the diff tool treats a token as "used" when any stylesheet mentions it with `var()`, including tokens that are themselves dead. Right after a dead-token removal it therefore reports the removed tokens that other dead tokens referenced. Filter those against the live set (anything not reachable from a real consumer) or compare a later snapshot with the one taken right after the removal.

**Baseline caveat:** a few baseline captures of the home page (`index @1280 [scope-menu]`, `[header-search-overlay]`, and once the whole `index` page) were taken with the stylesheets not applied or with a different text wrap under heavy machine load, and showed as differences against unchanged code. Re-taking just those states fixed it. If the diff shows a whole page changing, re-snapshot that page before suspecting the CSS.
