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
