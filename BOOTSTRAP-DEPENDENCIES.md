# Bootstrap Dependencies Documentation

**Project**: Cultural Collections Search (CCS)  
**Bootstrap Version**: 5.3.3 (from the official npm package, built locally)  
**Official Repository**: https://github.com/twbs/bootstrap  
**Last updated**: 2026-10-01

---

## Overview

CCS uses **Bootstrap 5.3.3** for the grid, utilities and some base component styles, themed to the UoM Gen 3 design system. Since the migration to a local build (PR #29), the CSS is **no longer loaded from a CDN**: it is compiled from the `bootstrap` npm package with a custom Sass theme and committed to the repo.

| Item | Where |
|---|---|
| Sass theme source | `src/scss/custom-bootstrap.scss` (sharp corners, no shadows, UoM colours and fonts, `$enable-rounded: false`, `$enable-shadows: false`) |
| Compiled CSS (committed) | `public/styles/vendor/bootstrap-uom.min.css` |
| Dev dependencies | `bootstrap@^5.3.3`, `sass@^1.105.1` (`package.json`) |
| Version check | `verify-bootstrap.sh` (constant `OFFICIAL_VERSION="5.3.3"`) |

The compiled file is committed (and explicitly un-ignored in `.gitignore`) because the Vercel deployment has no build step.

---

## Build

```bash
npm ci
npm run build:css       # compressed -> public/styles/vendor/bootstrap-uom.min.css
npm run build:css:dev   # unminified -> public/styles/vendor/bootstrap-uom.css
npm run watch:css       # rebuild the unminified file on change
```

`npm test` runs `build:css` first, so a Sass error fails CI. After changing `custom-bootstrap.scss`, rebuild and commit the regenerated `bootstrap-uom.min.css`.

---

## Where Bootstrap is loaded

| Page(s) | CSS | JavaScript |
|---|---|---|
| All pages under `public/` (including `search.html`) | `styles/vendor/bootstrap-uom.min.css` (relative path; `../` in subfolders) | - |
| `public/index.html` only | as above | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js` with `integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"` and `crossorigin="anonymous"` |

The other pages implement their own interactions (dialogs, filters, media viewer) in page scripts and do not load Bootstrap's JavaScript.

### Lesson learned (2026-09-29)

An earlier version of the pages carried fabricated SRI hashes on the CDN tags, which made browsers silently refuse Bootstrap's CSS/JS. If a CDN tag with `integrity=` is ever added again, copy the hash from the official Bootstrap release page or compute it with `openssl dgst -sha384 -binary <file> | openssl base64 -A`; never type one by hand.

---

## Verification script

`verify-bootstrap.sh` (run by `npm run verify:bootstrap` and `npm test`) scans every `public/**/*.html` that mentions "bootstrap":

- If the page links `bootstrap-uom*.css`, it passes when `public/styles/vendor/bootstrap-uom.min.css` exists.
- Otherwise it expects a jsDelivr URL pinned to `5.3.3` with an `integrity` attribute, for both the CSS and the JS bundle.
- It checks only that an `integrity` attribute is present, **not** that the hash is correct.

Exit code is non-zero if any issue is found.

---

## Dependency analysis

| Feature | Notes |
|---|---|
| Grid, spacing and display utilities | Core layout on several pages |
| Typography, colours | Base styles overridden by the UoM theme and by the tokens in `styles/tokens.css` |
| Buttons, forms, cards | Used in places, restyled to Gen 3 (square corners, no shadows) |
| Bootstrap JS (modals, dropdowns, carousel...) | Not relied on; only `index.html` loads the bundle |

Not Bootstrap: the media viewer, record request dialog, search/facet logic (page scripts), the DC template runtime (`public/support.js`), and the design tokens (`public/styles/tokens.css`).

**Class collisions**: Bootstrap's `!important` utilities (for example `.bg-secondary`) override custom classes with the same name. Pick distinct class names for custom components.

---

## Resources

- Bootstrap docs: https://getbootstrap.com/docs/5.3/
- Sass customisation: https://getbootstrap.com/docs/5.3/customize/sass/
- Releases: https://github.com/twbs/bootstrap/releases/tag/v5.3.3
- Licence: MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
- Related CCS docs: `README.md`, `design.md`

---

## Version History

| Version | Date | Bootstrap | Changes |
|---|---|---|---|
| 2.0 | 2026-10-01 | 5.3.3 | Rewritten for the local Sass build; removed stale CDN/version-matrix content |
| 1.0 | 2026-09-29 | 5.3.3 | Initial documentation (CDN-based) |


## Purged build

`npm run build:css` compiles `src/scss/custom-bootstrap.scss` and then runs `scripts/purge-css.js`, which drops rules for classes that are not used in any `public/**/*.html` or `public/**/*.js` file (words ending in `-` in scripts keep every class with that prefix; `:root`, tag and attribute rules are always kept). Bootstrap JavaScript components are not used, so no classes are added at runtime. If a Bootstrap class is added to a page, rebuild and commit `public/styles/vendor/bootstrap-uom.min.css`.
