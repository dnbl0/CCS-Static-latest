# Directory Structure & File Reference Guide

**Quick Reference for Developers**  
**Use this guide to find files in the reorganized codebase**

---

## Current Structure (Post-Reorganization)

```
CCS-Static/
├── public/                     # 🌐 Deployed files
├── src/                        # 💻 Source code
├── docs/                       # 📚 Documentation
├── config/                     # ⚙️ Configuration
├── scripts/                    # 🔧 Automation scripts
└── tests/                      # ✅ Test files
```

---

## File Locations & Paths

### 🏠 Pages (HTML)

| Page Name | Location | Purpose |
|-----------|----------|---------|
| **Home** | `public/index.html` | Landing page, featured collections |
| **Search** | `public/pages/search.html` | Advanced search interface |
| **Browse** | `public/pages/browse.html` | Collection browsing interface |
| **Record** | `public/pages/record.html` | Item detail page with media viewer |
| **Collection** | `public/pages/collection.html` | Collection detail page |
| **Help** | `public/pages/help.html` | Help & FAQ documentation |
| **Contact** | `public/pages/contact.html` | Contact form & information |
| **Home Legacy** | `public/pages/home-legacy.html` | Old home page (archive) |

**Quick Path**: `public/pages/*.html`

---

### 🎨 Stylesheets (CSS)

| Style | Location | Purpose |
|-------|----------|---------|
| **Variables** | `public/styles/variables.css` | CSS custom properties, color tokens |
| **Components** | `public/styles/components.css` | Component styles (cards, buttons, etc.) |
| **Typography** | `public/styles/typography.css` | Font sizes, weights, line heights |
| **Bootstrap** | `public/styles/vendor/bootstrap.min.css` | Bootstrap 5.3.3 framework |

**Quick Path**: `public/styles/*.css`  
**Link in HTML**: `<link rel="stylesheet" href="/public/styles/main.css">`

---

### ⚙️ JavaScript

#### Modules (Feature-Specific)
| Module | Location | Purpose |
|--------|----------|---------|
| **Media Viewer** | `src/js/modules/media-viewer.js` | Media viewing functionality |
| **Search Filter** | `src/js/modules/search-filter.js` | Search filtering logic |
| **Navigation** | `src/js/modules/navigation.js` | Navigation & menu handling |
| **Keyboard Shortcuts** | `src/js/modules/keyboard-shortcuts.js` | Keyboard event handling |
| **Access Request** | `src/js/modules/access-request.js` | Access request modal |

**Quick Path**: `src/js/modules/*.js`

#### Utilities (Helper Functions)
| Utility | Location | Purpose |
|---------|----------|---------|
| **Helpers** | `src/js/utils/helpers.js` | General utility functions (was: support.js) |
| **Image Handler** | `src/js/utils/image-handler.js` | Image processing (was: image-slot.js) |

**Quick Path**: `src/js/utils/*.js`

#### Vendor (Third-Party)
| Library | Location |
|---------|----------|
| **Bootstrap JS** | `src/js/vendor/bootstrap.min.js` |

**Quick Path**: `src/js/vendor/*.js`

**Link in HTML**: `<script src="/src/js/modules/media-viewer.js"></script>`

---

### 📁 Assets

#### Images
```
public/assets/images/
├── cc/                        # Creative Commons license icons
├── tiles/                     # Collection tile images
├── flags/                     # Aboriginal/Torres Strait flags
├── logo/                      # UoM logo files
└── collections/               # Collection-specific images
```

**Quick Path**: `/public/assets/images/[type]/[filename].jpg`

#### Data
```
public/assets/data/
├── collections.json           # Collection metadata (was: collection-data.js)
├── metadata/                  # Additional metadata files
└── inventory.xlsx            # Data inventory spreadsheet
```

**Quick Path**: `/public/assets/data/[file]`

#### Documents
```
public/assets/documents/
├── help-content.md           # Help page content
├── search-tips.md            # Search tips documentation
└── faq.md                    # Frequently asked questions
```

**Quick Path**: `/public/assets/documents/[file]`

---

### 📚 Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **README** | `docs/README.md` | Project overview |
| **Architecture** | `docs/ARCHITECTURE.md` | System architecture |
| **Design System** | `docs/design-system.md` | Design tokens & patterns (was: design.md) |
| **Bootstrap** | `docs/BOOTSTRAP-DEPENDENCIES.md` | Bootstrap strategy |
| **MVP Mapping** | `docs/jira-mvp-mapping.md` | Requirements mapping |
| **Reorganization** | `docs/REORGANIZATION-PLAN.md` | This reorganization |
| **Contributing** | `docs/CONTRIBUTING.md` | Development guidelines |
| **Deployment** | `docs/DEPLOYMENT.md` | Deployment procedures |

**Guides**:
- `docs/guides/setup.md` - Development setup
- `docs/guides/workflow.md` - Development workflow
- `docs/guides/testing.md` - Testing guide
- `docs/guides/debugging.md` - Debugging tips
- `docs/guides/accessibility.md` - Accessibility guidelines

**Quick Path**: `docs/*.md`

---

### ⚙️ Configuration

| Config | Location | Purpose |
|--------|----------|---------|
| **Redirects** | `config/redirects.json` | Old → new URL redirects |
| **Headers** | `config/headers.json` | HTTP headers configuration |
| **Routes** | `config/routes.json` | Route definitions |
| **Environment** | `config/environment.json` | Environment variables |

**Quick Path**: `config/*.json`

---

### 🔧 Scripts

| Script | Location | Purpose |
|--------|----------|---------|
| **Build** | `scripts/build.sh` | Build optimized version |
| **Deploy** | `scripts/deploy.sh` | Deploy to production |
| **Test** | `scripts/test.sh` | Run test suite |
| **Bootstrap Verify** | `scripts/verify-bootstrap.sh` | Verify Bootstrap dependencies |
| **Link Check** | `scripts/check-links.sh` | Check for broken links |
| **Lint** | `scripts/lint.sh` | Code linting (future) |

**Quick Path**: `scripts/*.sh`

**Usage**: `bash scripts/[script-name].sh`

---

### ✅ Tests

```
tests/
├── accessibility.test.js      # Accessibility tests
├── responsive.test.js         # Responsive design tests
└── performance.test.js        # Performance tests
```

**Quick Path**: `tests/*.test.js`

---

## Common Tasks & File Locations

### I need to edit a page
**Files to modify**: `public/pages/[page-name].html`

Example:
- Edit search page: `public/pages/search.html`
- Edit record page: `public/pages/record.html`
- Edit home page: `public/index.html`

### I need to change styles
**Files to modify**: `public/styles/*.css`

Example:
- Change color scheme: `public/styles/variables.css`
- Change component styles: `public/styles/components.css`
- Change fonts: `public/styles/typography.css`

### I need to add JavaScript functionality
**Files to create/modify**: `src/js/modules/*.js` or `src/js/utils/*.js`

Example:
- Add new feature: `src/js/modules/feature-name.js`
- Add helper function: `src/js/utils/helpers.js`

### I need to add an image
**Location to place**: `public/assets/images/[type]/`

Example:
- Collection image: `public/assets/images/collections/image.jpg`
- CC license icon: `public/assets/images/cc/by.svg`
- Logo: `public/assets/images/logo/uom-logo.svg`

### I need to update documentation
**Files to modify**: `docs/[document].md` or `docs/guides/[guide].md`

Example:
- Update architecture: `docs/ARCHITECTURE.md`
- Update setup guide: `docs/guides/setup.md`

### I need to verify Bootstrap
**Script to run**: `bash scripts/verify-bootstrap.sh`

### I need to check for broken links
**Script to run**: `bash scripts/check-links.sh`

---

## Naming Convention Quick Reference

### File Naming Rules
- ✅ Use **kebab-case**: `my-file-name.js`
- ✅ Use **lowercase**: `image-handler.js` (not `ImageHandler.js`)
- ✅ Use **standard extensions**: `.html`, `.css`, `.js`
- ✅ Be **descriptive**: `media-viewer.js` (not `mv.js`)
- ❌ Avoid spaces: `my file.js` → `my-file.js`
- ❌ Avoid dots in names: `my.file.js` → `my-file.js`
- ❌ Avoid versions: `search-v3.js` → `search.js`

### Directory Naming Rules
- ✅ Use **lowercase**: `public/pages/`
- ✅ Use **plural for collections**: `images/`, `styles/`, `pages/`
- ✅ Use **singular for modules**: `modules/media-viewer.js`
- ✅ Be **semantic**: Clear what goes inside
- ❌ Avoid abbreviations: `img/` → `images/`
- ❌ Avoid generic names: `stuff/` → `assets/`

---

## Quick Navigation

### By File Type

**HTML Files**: `public/pages/` or `public/index.html`  
**CSS Files**: `public/styles/`  
**JavaScript**: `src/js/modules/` (features) or `src/js/utils/` (helpers)  
**Images**: `public/assets/images/`  
**Data**: `public/assets/data/`  
**Docs**: `docs/`  
**Config**: `config/`  
**Scripts**: `scripts/`  
**Tests**: `tests/`

### By Feature

**Media Viewer**: 
- HTML: `public/pages/record.html`
- JS: `src/js/modules/media-viewer.js`, `src/js/modules/keyboard-shortcuts.js`
- CSS: `public/styles/components.css`

**Search**:
- HTML: `public/pages/search.html`
- JS: `src/js/modules/search-filter.js`
- CSS: `public/styles/components.css`

**Navigation**:
- HTML: All pages (shared header/footer)
- JS: `src/js/modules/navigation.js`
- CSS: `public/styles/components.css`

**Images**:
- Collections: `public/assets/images/collections/`
- UI/Icons: `public/assets/images/cc/`, `public/assets/images/flags/`
- Logo: `public/assets/images/logo/`

---

## Path Examples for HTML

### Reference an image:
```html
<img src="/public/assets/images/collections/image.jpg" alt="Collection Image">
```

### Link to another page:
```html
<a href="/public/pages/search.html">Search</a>
<a href="/public/pages/record.html?id=123">View Record</a>
```

### Include CSS:
```html
<link rel="stylesheet" href="/public/styles/variables.css">
<link rel="stylesheet" href="/public/styles/components.css">
```

### Include JavaScript:
```html
<script src="/src/js/utils/helpers.js"></script>
<script src="/src/js/modules/media-viewer.js"></script>
```

---

## Old → New File Mapping

| Old Name | New Location |
|----------|--------------|
| index.html | public/index.html |
| Contact Us.dc.html | public/pages/contact.html |
| Collection Record.dc.html | public/pages/record.html |
| Collection Search v3.dc.html | public/pages/search.html |
| Browse Collections.dc.html | public/pages/browse.html |
| Collection Landing.dc.html | public/pages/collection.html |
| Help and Support.dc.html | public/pages/help.html |
| CCS Home page.dc.html | public/pages/home-legacy.html |
| support.js | src/js/utils/helpers.js |
| image-slot.js | src/js/utils/image-handler.js |
| collection-data.js | public/assets/data/collections.js |
| components/fig-tokens.css | public/styles/variables.css |
| components/fig-assets.css | public/styles/components.css |
| components/fig-typography.css | public/styles/typography.css |
| README.md | docs/README.md |
| design.md | docs/design-system.md |
| BOOTSTRAP-DEPENDENCIES.md | docs/BOOTSTRAP-DEPENDENCIES.md |
| jira-mvp-mapping.md | docs/jira-mvp-mapping.md |
| verify-bootstrap.sh | scripts/verify-bootstrap.sh |

---

## Development Setup

### Get started quickly:
```bash
# 1. Clone repository
git clone https://github.com/dnbl0/CCS-Static-latest.git
cd CCS-Static

# 2. Start local server
cd public && python -m http.server 8000

# 3. Open in browser
open http://localhost:8000

# 4. Edit files in public/ and src/
# Changes appear immediately (refresh browser)
```

### Key scripts:
```bash
# Verify Bootstrap
bash scripts/verify-bootstrap.sh

# Check for broken links
bash scripts/check-links.sh

# Run tests
bash scripts/test.sh
```

---

## Troubleshooting

### Can't find a file?
1. Check `DIRECTORY-REFERENCE.md` (this file)
2. Check `REORGANIZATION-PLAN.md` for file mapping
3. Search by feature: media viewer → `src/js/modules/media-viewer.js`
4. Check old name in mapping table

### Getting 404 errors?
1. Check path is correct (use absolute paths `/public/assets/...`)
2. Verify file exists in new location
3. Check for typos in filename
4. Old URLs should redirect (check config/redirects.json)

### Styles not loading?
1. Check CSS file path is correct
2. Verify file is in `public/styles/`
3. Check Bootstrap CSS loads: `public/styles/vendor/bootstrap.min.css`
4. Clear browser cache

### Scripts not running?
1. Check script path is correct
2. Verify file is in `src/js/`
3. Check script tag has correct `src` attribute
4. Check browser console for errors

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-09-29 | Initial reorganization |

---

**Last Updated**: 2026-09-29  
**For More Info**: See REORGANIZATION-PLAN.md  
**Questions?**: See docs/CONTRIBUTING.md or docs/guides/

