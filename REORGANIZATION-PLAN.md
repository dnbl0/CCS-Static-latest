# Codebase Reorganization Plan

**Project**: Cultural Collections Search (CCS)  
**Current Status**: Mixed naming conventions, non-standard extensions  
**Objective**: Reorganize to follow industry best practices  
**Timeline**: Phased migration with backward compatibility  
**Date**: 2026-09-29

---

## Executive Summary

The current CCS codebase has grown organically with mixed naming conventions, non-standard file extensions (.dc.html), and less-than-optimal directory organization. This plan outlines a comprehensive reorganization following web development best practices while maintaining functionality and backward compatibility.

### Key Goals
- ✅ Use semantic folder structure
- ✅ Follow consistent naming conventions (kebab-case)
- ✅ Use standard file extensions (.html, .css, .js)
- ✅ Separate concerns by feature/page
- ✅ Improve discoverability and maintainability
- ✅ Support multiple deployment scenarios
- ✅ Maintain SEO and existing URLs
- ✅ Enable easier onboarding for new developers

---

## Current State Analysis

### Directory Structure (Current)
```
CCS-Static/
├── *.html                  # Root-level HTML pages
├── *.dc.html              # Non-standard extension
├── *.js                   # Root-level scripts
├── components/            # Design system CSS files
├── images/                # Image assets
├── assets/                # Documentation & data
├── .github/workflows/     # GitHub Actions
├── .gitignore
├── README.md
├── BOOTSTRAP-DEPENDENCIES.md
├── design.md
├── jira-mvp-mapping.md
└── verify-bootstrap.sh
```

### Issues Identified

#### 1. Naming Conventions
- ❌ Filenames with spaces ("Contact Us.dc.html")
- ❌ Mixed case ("CCS Home page.dc.html")
- ❌ Non-standard extensions (.dc.html)
- ❌ Inconsistent prefixes ("v3" in "Collection Search v3.dc.html")

**Impact**: Harder to script, version control, and reference in documentation

#### 2. File Organization
- ❌ All HTML files at root level
- ❌ No clear separation by feature/page
- ❌ Utility scripts at root (support.js, image-slot.js)
- ❌ No clear public/src distinction

**Impact**: Difficult to find related files, harder to scale

#### 3. Missing Organization
- ❌ No pages/ or views/ directory
- ❌ No utils/ or lib/ directory for scripts
- ❌ No configuration directory
- ❌ Images organized by type (cc/, etc.) but top-level scattered
- ❌ No data/ directory for collection-data.js

**Impact**: Harder to understand project structure at first glance

#### 4. Documentation
- ✅ README.md exists
- ⚠️ Multiple root-level .md files
- ❌ No docs/ directory
- ❌ No ARCHITECTURE.md or structure guide

**Impact**: Documentation not clearly organized

---

## Proposed New Structure

### Phase 1: Semantic Directory Organization (Recommended)

```
CCS-Static/
├── public/                          # Deployable files
│   ├── index.html                  # Home page (entry point)
│   ├── pages/                      # Page templates
│   │   ├── browse.html             # Browse collections
│   │   ├── collection.html         # Collection detail
│   │   ├── contact.html            # Contact us
│   │   ├── help.html               # Help & support
│   │   ├── home-legacy.html        # Legacy home
│   │   ├── record.html             # Record/item detail (media viewer)
│   │   └── search.html             # Search interface
│   ├── assets/                     # Static assets
│   │   ├── images/                 # Collection/UI images
│   │   │   ├── cc/                 # Creative Commons icons
│   │   │   ├── tiles/              # Collection tiles
│   │   │   ├── flags/              # Aboriginal/Torres Strait flags
│   │   │   └── logo/               # UoM logo files
│   │   ├── data/                   # Collection data
│   │   │   ├── collection-data.json
│   │   │   ├── metadata/
│   │   │   └── inventory.xlsx
│   │   └── documents/              # Help & documentation
│   └── styles/                     # Stylesheets
│       ├── main.css                # Main styles
│       ├── variables.css           # CSS variables
│       ├── components.css          # Component styles
│       └── vendor/                 # Third-party CSS
│           └── bootstrap.css
├── src/                            # Source files
│   ├── js/                         # JavaScript
│   │   ├── main.js                 # Entry point
│   │   ├── modules/
│   │   │   ├── media-viewer.js
│   │   │   ├── search.js
│   │   │   ├── navigation.js
│   │   │   └── keyboard-shortcuts.js
│   │   ├── utils/
│   │   │   ├── image-handler.js    # Was: image-slot.js
│   │   │   └── helpers.js          # Was: support.js
│   │   └── vendor/
│   │       └── bootstrap.js
│   ├── css/                        # CSS source (if preprocessing)
│   │   ├── main.scss
│   │   ├── variables.scss
│   │   └── components/
│   └── templates/                  # Template files
│       └── layouts/
├── docs/                           # Documentation
│   ├── README.md                   # Project overview
│   ├── ARCHITECTURE.md             # System architecture
│   ├── REORGANIZATION-PLAN.md      # This file
│   ├── BOOTSTRAP-DEPENDENCIES.md   # Bootstrap info
│   ├── design-system.md            # Design tokens/system
│   ├── jira-mvp-mapping.md         # MVP requirements
│   ├── CONTRIBUTING.md             # Developer guidelines
│   ├── DEPLOYMENT.md               # Deployment guide
│   └── guides/
│       ├── setup.md                # Development setup
│       ├── workflow.md             # Development workflow
│       └── testing.md              # Testing guide
├── config/                         # Configuration
│   ├── redirects.json              # URL redirects (for backward compat)
│   ├── headers.json                # HTTP headers
│   └── routes.json                 # Route configuration
├── .github/
│   ├── workflows/
│   │   └── auto-merge.yml
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE/
│   └── CODE_OF_CONDUCT.md
├── scripts/                        # Build & automation scripts
│   ├── build.sh                    # Build script
│   ├── deploy.sh                   # Deployment script
│   ├── test.sh                     # Testing script
│   ├── verify-bootstrap.sh         # Bootstrap verification
│   └── check-links.sh              # Link checker
├── tests/                          # Tests
│   ├── accessibility.test.js
│   ├── responsive.test.js
│   └── performance.test.js
├── .gitignore
├── .editorconfig                   # Editor configuration
├── package.json                    # Node.js dependencies (if needed)
├── LICENSE                         # MIT License
└── .env.example                    # Environment variables template
```

### Phase 2: Module-Based Organization (Alternative)

```
CCS-Static/
├── public/                         # Deployable files
├── src/
│   ├── modules/
│   │   ├── home/
│   │   │   ├── index.html
│   │   │   ├── home.css
│   │   │   └── home.js
│   │   ├── search/
│   │   │   ├── index.html
│   │   │   ├── search.css
│   │   │   └── search.js
│   │   ├── browse/
│   │   │   ├── index.html
│   │   │   ├── browse.css
│   │   │   └── browse.js
│   │   ├── record/
│   │   │   ├── index.html
│   │   │   ├── record.css
│   │   │   ├── media-viewer.js
│   │   │   └── keyboard-shortcuts.js
│   │   ├── collection/
│   │   │   ├── index.html
│   │   │   └── collection.css
│   │   ├── help/
│   │   │   ├── index.html
│   │   │   └── help.css
│   │   ├── contact/
│   │   │   ├── index.html
│   │   │   └── contact.css
│   │   ├── shared/
│   │   │   ├── header.html
│   │   │   ├── footer.html
│   │   │   ├── nav.css
│   │   │   └── footer.css
│   │   └── components/
│   │       ├── card.css
│   │       ├── button.css
│   │       ├── form.css
│   │       └── modal.css
│   └── assets/
│       ├── images/
│       ├── fonts/
│       └── data/
├── docs/
├── tests/
└── config/
```

### Comparison: Phase 1 vs Phase 2

| Aspect | Phase 1 (Type-Based) | Phase 2 (Module-Based) |
|--------|-------------------|-------------------|
| Organization | By file type | By feature/page |
| Scalability | Good for libraries | Better for apps |
| Discoverability | Need to know structure | Files for feature together |
| Sharing | Easy to reuse | Encapsulated features |
| Best for | Small-medium projects | Medium-large projects |

**Recommendation**: Phase 1 for CCS (clean, understandable, maintainable)

---

## File Naming Convention

### Standards to Adopt

#### HTML Files
```
Current          →  New
index.html       →  index.html              (unchanged)
Contact Us.dc.html  →  contact.html        (kebab-case, standard extension)
Collection Record.dc.html  →  record.html
Collection Search v3.dc.html  →  search.html
Collection Landing.dc.html  →  collection.html
Browse Collections.dc.html  →  browse.html
Help and Support.dc.html  →  help.html
CCS Home page.dc.html  →  home-legacy.html
```

#### JavaScript Files
```
Current          →  New
support.js       →  utils/helpers.js
image-slot.js    →  utils/image-handler.js
collection-data.js  →  data/collections.js
```

#### CSS Files
```
Current              →  New
components/fig-tokens.css  →  styles/variables.css
components/fig-assets.css  →  styles/components.css
components/fig-typography.css  →  styles/typography.css (optional)
```

### Naming Conventions

#### General Rules
- ✅ Use **kebab-case** for all files: `contact-form.html`, `media-viewer.js`
- ✅ Use **standard extensions**: `.html`, `.css`, `.js` (not `.dc.html`)
- ✅ **No spaces** in filenames
- ✅ **Descriptive names** that indicate purpose
- ✅ **Avoid version numbers** in filenames (use git tags instead)
- ✅ **Use singular/plural appropriately**: `styles/` (directory), `image.js` (file)

#### Specific Naming
- **Pages**: `page-name.html` (e.g., `search.html`, `browse.html`)
- **Modules**: `module-name.js` (e.g., `media-viewer.js`, `search-filter.js`)
- **Utilities**: `utility-name.js` (e.g., `image-handler.js`, `keyboard-shortcuts.js`)
- **Styles**: `component-name.css` (e.g., `card.css`, `button.css`)
- **Data**: `data-type.json` (e.g., `collections.json`, `categories.json`)
- **Templates**: `_component-name.html` (e.g., `_header.html`, `_footer.html`)

---

## Migration Strategy

### Phase 1: Planning & Validation (Week 1)
- [ ] Create new directory structure
- [ ] Map old files to new locations
- [ ] Create redirects configuration
- [ ] Validate all files will be preserved
- [ ] Communicate plan to team

### Phase 2: File Reorganization (Week 2)
- [ ] Create public/ directory structure
- [ ] Create src/ directory structure
- [ ] Create docs/ directory
- [ ] Create scripts/ directory
- [ ] Move HTML files to public/pages/
- [ ] Move JavaScript to src/js/
- [ ] Move CSS to public/styles/ or src/css/
- [ ] Move images to public/assets/images/
- [ ] Move data files to public/assets/data/
- [ ] Move documentation to docs/

### Phase 3: Configuration & Redirects (Week 3)
- [ ] Update internal links in HTML files
- [ ] Update script/style references
- [ ] Create config/redirects.json
- [ ] Update .htaccess or server config
- [ ] Test all old URLs still work

### Phase 4: Testing & Verification (Week 4)
- [ ] Test all pages load correctly
- [ ] Test media viewer functionality
- [ ] Test search functionality
- [ ] Test responsive design
- [ ] Test keyboard shortcuts
- [ ] Verify all internal links work
- [ ] Check console for errors
- [ ] Validate accessibility

### Phase 5: Documentation & Release (Week 5)
- [ ] Update README with new structure
- [ ] Create ARCHITECTURE.md
- [ ] Update CONTRIBUTING.md
- [ ] Create developer setup guide
- [ ] Document any breaking changes
- [ ] Update GitHub wiki if exists
- [ ] Release with changelog
- [ ] Announce to team

---

## Backward Compatibility Strategy

### URL Redirects (via config/redirects.json)
```json
{
  "redirects": [
    {
      "from": "/Contact Us.dc.html",
      "to": "/pages/contact.html",
      "permanent": true
    },
    {
      "from": "/Collection Record.dc.html",
      "to": "/pages/record.html",
      "permanent": true
    },
    {
      "from": "/Collection Search v3.dc.html",
      "to": "/pages/search.html",
      "permanent": true
    },
    {
      "from": "/Browse Collections.dc.html",
      "to": "/pages/browse.html",
      "permanent": true
    },
    {
      "from": "/Collection Landing.dc.html",
      "to": "/pages/collection.html",
      "permanent": true
    },
    {
      "from": "/Help and Support.dc.html",
      "to": "/pages/help.html",
      "permanent": true
    },
    {
      "from": "/CCS Home page.dc.html",
      "to": "/pages/home-legacy.html",
      "permanent": true
    }
  ]
}
```

### .htaccess Configuration
```apache
# Enable mod_rewrite
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect old .dc.html files to new locations
  RewriteRule ^Contact\ Us\.dc\.html$ pages/contact.html [R=301,L]
  RewriteRule ^Collection\ Record\.dc\.html$ pages/record.html [R=301,L]
  RewriteRule ^Collection\ Search\ v3\.dc\.html$ pages/search.html [R=301,L]
  RewriteRule ^Browse\ Collections\.dc\.html$ pages/browse.html [R=301,L]
  RewriteRule ^Collection\ Landing\.dc\.html$ pages/collection.html [R=301,L]
  RewriteRule ^Help\ and\ Support\.dc\.html$ pages/help.html [R=301,L]
  RewriteRule ^CCS\ Home\ page\.dc\.html$ pages/home-legacy.html [R=301,L]
</IfModule>
```

### Implementation Options

**Option A: Server-Level Redirects** (Recommended)
- Apache .htaccess or nginx.conf
- Permanent redirects (301)
- SEO-friendly
- No impact on page load time

**Option B: HTML Meta Refresh** (Fallback)
```html
<!-- Old file: Contact Us.dc.html -->
<meta http-equiv="refresh" content="0;url=/pages/contact.html">
```

**Option C: JavaScript Redirects** (Last Resort)
```javascript
// In old file
if (window.location.pathname === '/Contact Us.dc.html') {
  window.location.href = '/pages/contact.html';
}
```

---

## Updated Internal References

### HTML Links Update
```html
<!-- Before -->
<a href="Contact Us.dc.html">Contact</a>
<a href="Collection Record.dc.html?id=123">View Record</a>

<!-- After -->
<a href="/pages/contact.html">Contact</a>
<a href="/pages/record.html?id=123">View Record</a>
```

### Script References Update
```html
<!-- Before -->
<script src="image-slot.js"></script>
<script src="support.js"></script>

<!-- After -->
<script src="/src/js/utils/image-handler.js"></script>
<script src="/src/js/utils/helpers.js"></script>
```

### Style References Update
```html
<!-- Before -->
<link rel="stylesheet" href="components/fig-tokens.css">
<link rel="stylesheet" href="components/fig-assets.css">

<!-- After -->
<link rel="stylesheet" href="/public/styles/variables.css">
<link rel="stylesheet" href="/public/styles/components.css">
```

---

## Implementation Roadmap

### Week 1: Setup
```bash
# Create new directory structure
mkdir -p public/pages public/assets/{images,data,documents} public/styles
mkdir -p src/js/{modules,utils,vendor} src/css src/templates
mkdir -p docs config scripts tests
```

### Week 2: File Migration
```bash
# Move HTML files
mv index.html public/
mv "Contact Us.dc.html" public/pages/contact.html
mv "Collection Record.dc.html" public/pages/record.html
# ... etc

# Move JavaScript
mv support.js src/js/utils/helpers.js
mv image-slot.js src/js/utils/image-handler.js
mv collection-data.js public/assets/data/collections.js

# Move CSS
mv components/fig-tokens.css public/styles/variables.css
mv components/fig-assets.css public/styles/components.css
```

### Week 3: Configuration
```bash
# Create configuration files
cat > config/redirects.json << 'EOF'
{ "redirects": [...] }
EOF

# Create .htaccess for redirects
cat > public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
...
EOF
```

### Week 4: Testing
```bash
# Run automated tests
bash scripts/test.sh

# Manual verification
# - Test all pages
# - Test media viewer
# - Test search
# - Test responsive
# - Test accessibility
```

### Week 5: Documentation & Release
```bash
# Update documentation
git add -A
git commit -m "refactor: reorganize codebase to follow best practices"
git push origin main
```

---

## File Structure Details

### public/ Directory
**Purpose**: Deployable files (what gets served to users)

```
public/
├── index.html                  # Entry point
├── pages/                      # Individual page templates
│   ├── browse.html
│   ├── collection.html
│   ├── contact.html
│   ├── help.html
│   ├── home-legacy.html
│   ├── record.html             # Media viewer page
│   └── search.html
├── assets/                     # Static resources
│   ├── images/
│   │   ├── cc/                 # Creative Commons licenses
│   │   ├── tiles/              # Collection tile images
│   │   ├── flags/              # Aboriginal/Torres Strait flags
│   │   ├── logo/               # UoM logos
│   │   └── [all other images]
│   ├── data/
│   │   ├── collections.json    # Collection metadata
│   │   ├── metadata/           # Collection metadata files
│   │   └── inventory.xlsx      # Data inventory
│   └── documents/              # Help documentation
├── styles/                     # CSS (compiled or final)
│   ├── main.css                # Main stylesheet
│   ├── variables.css           # CSS custom properties
│   ├── components.css          # Component styles
│   ├── typography.css          # Typography styles
│   └── vendor/
│       └── bootstrap.min.css   # Bootstrap CSS
└── .htaccess                   # Apache configuration (redirects, headers)
```

### src/ Directory
**Purpose**: Source files (for development, optional build step)

```
src/
├── js/                         # JavaScript source
│   ├── main.js                 # Entry point
│   ├── modules/
│   │   ├── media-viewer.js
│   │   ├── search-filter.js
│   │   ├── navigation.js
│   │   ├── keyboard-shortcuts.js
│   │   └── access-request.js
│   ├── utils/
│   │   ├── helpers.js          # Was: support.js
│   │   └── image-handler.js    # Was: image-slot.js
│   └── vendor/
│       └── bootstrap.min.js    # Bootstrap JS Bundle
├── css/                        # CSS source (if using preprocessor)
│   ├── main.css
│   ├── variables.css
│   ├── components.css
│   └── components/
│       ├── card.css
│       ├── button.css
│       ├── form.css
│       └── modal.css
└── templates/                  # Reusable HTML templates
    └── layouts/
        ├── header.html
        └── footer.html
```

### docs/ Directory
**Purpose**: Project documentation

```
docs/
├── README.md                   # Project overview (moved from root)
├── ARCHITECTURE.md             # System architecture & design
├── BOOTSTRAP-DEPENDENCIES.md   # Bootstrap usage & strategy
├── design-system.md            # Design tokens & patterns (was: design.md)
├── jira-mvp-mapping.md         # MVP requirements (moved)
├── CONTRIBUTING.md             # Developer guidelines
├── DEPLOYMENT.md               # Deployment procedures
├── API.md                      # API documentation
├── guides/
│   ├── setup.md                # Development setup guide
│   ├── workflow.md             # Development workflow
│   ├── testing.md              # Testing guide
│   ├── debugging.md            # Debugging guide
│   └── accessibility.md        # Accessibility guidelines
└── examples/
    └── [code examples]
```

### config/ Directory
**Purpose**: Configuration files

```
config/
├── redirects.json              # URL redirects (old → new)
├── headers.json                # HTTP headers
├── routes.json                 # Route configuration
├── environment.json            # Environment variables
└── build.config.js             # Build configuration (if using build tool)
```

### scripts/ Directory
**Purpose**: Automation scripts

```
scripts/
├── build.sh                    # Build script
├── deploy.sh                   # Deployment script
├── test.sh                     # Run tests
├── verify-bootstrap.sh         # Bootstrap verification (moved)
├── check-links.sh              # Check for broken links
└── lint.sh                     # Code linting (future)
```

---

## Best Practices Applied

### 1. Semantic Structure
- ✅ Clear separation of concerns (pages, styles, scripts)
- ✅ Organized by logical grouping
- ✅ Easy to find related files

### 2. Naming Conventions
- ✅ Consistent kebab-case for all files
- ✅ Descriptive names indicating purpose
- ✅ No spaces or special characters
- ✅ Standard extensions only

### 3. Scalability
- ✅ Easy to add new pages/features
- ✅ Modular JavaScript structure
- ✅ Component-based CSS organization
- ✅ Separate assets by type

### 4. Maintainability
- ✅ Clear file organization
- ✅ Easy to locate specific features
- ✅ Reduced cognitive load
- ✅ Better for onboarding

### 5. Deployment
- ✅ Clear public/ directory for production
- ✅ Source files in src/ for development
- ✅ Configuration separate from code
- ✅ Easy to automate deployment

### 6. Documentation
- ✅ docs/ directory for all documentation
- ✅ Architecture clearly defined
- ✅ Contributing guidelines present
- ✅ Setup guide for new developers

### 7. Version Control
- ✅ Meaningful file names for git diff
- ✅ Clear commit messages
- ✅ No spaces causing issues
- ✅ Standard extensions recognized by tools

---

## Risk Assessment & Mitigation

### Risk 1: Broken Links
**Severity**: High  
**Mitigation**:
- ✅ Implement server-side redirects (.htaccess)
- ✅ Test all old URLs
- ✅ Create link checker script
- ✅ Update internal links carefully

### Risk 2: Lost Files
**Severity**: Critical  
**Mitigation**:
- ✅ Create full backup before migration
- ✅ Use git for version control
- ✅ Verify all files are accounted for
- ✅ Double-check file mappings

### Risk 3: Broken Functionality
**Severity**: High  
**Mitigation**:
- ✅ Update all script/style references
- ✅ Test media viewer thoroughly
- ✅ Test search functionality
- ✅ Test keyboard shortcuts
- ✅ Test responsive design

### Risk 4: SEO Impact
**Severity**: Medium  
**Mitigation**:
- ✅ Use permanent (301) redirects
- ✅ Update sitemap.xml
- ✅ Update robots.txt if needed
- ✅ Monitor search console

### Risk 5: Third-Party Links
**Severity**: Low  
**Mitigation**:
- ✅ Maintain old URLs via redirects
- ✅ Provide redirect information to external sites
- ✅ Monitor for broken external links

---

## Testing Strategy

### Pre-Migration Testing
```bash
# Backup current state
git checkout -b reorganization-backup

# Create new structure
git checkout -b reorganization

# Run tests
bash scripts/test.sh
```

### Post-Migration Testing
- [ ] All pages load correctly
- [ ] Media viewer works (I key, F key, arrow keys)
- [ ] Search functionality works
- [ ] Forms submit correctly
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Responsive design at all breakpoints
- [ ] No console errors
- [ ] No broken internal links
- [ ] Old URLs redirect correctly

### Automated Verification
```bash
# Check for broken links
bash scripts/check-links.sh

# Verify all files are accounted for
bash scripts/verify-migration.sh

# Run accessibility checks
bash scripts/a11y-check.sh

# Run responsive design tests
bash scripts/responsive-test.sh
```

---

## Tools & Automation

### Build Tools (Optional)
If adding a build step in the future:
```json
{
  "name": "ccs-static",
  "version": "1.0.0",
  "scripts": {
    "build": "bash scripts/build.sh",
    "test": "bash scripts/test.sh",
    "deploy": "bash scripts/deploy.sh",
    "lint": "bash scripts/lint.sh"
  },
  "devDependencies": {
    "live-server": "^1.2.1"
  }
}
```

### Local Development
```bash
# Install dependencies (optional)
npm install

# Run local server
npx live-server public/

# Or use Python
cd public && python -m http.server 8000
```

---

## Post-Migration Improvements

### Immediate (Week 6)
- [ ] Update GitHub Pages if used
- [ ] Update CI/CD pipelines
- [ ] Update deployment scripts
- [ ] Update team documentation

### Short-term (Month 2)
- [ ] Add build script for optimization
- [ ] Add automated link checking
- [ ] Add performance monitoring
- [ ] Consider adding TypeScript

### Medium-term (Month 3-6)
- [ ] Add unit testing framework
- [ ] Add E2E testing
- [ ] Add CSS preprocessor (Sass)
- [ ] Add module bundler (Webpack)

### Long-term (Future)
- [ ] Consider static site generator
- [ ] Consider headless CMS integration
- [ ] Consider progressive web app features
- [ ] Consider backend API integration

---

## Communication Plan

### To Development Team
- Share this plan
- Explain rationale
- Discuss timeline
- Address concerns
- Assign responsibilities

### To Stakeholders
- Brief overview of benefits
- No impact on functionality
- Improved maintainability
- Better developer experience
- Same user experience

### To Users
- No user-facing changes
- URLs may change (but redirects in place)
- Same functionality
- Better performance (potentially)

---

## Rollback Plan

If critical issues arise:

```bash
# Rollback to previous state
git checkout main~1
git push -f origin main

# OR use backup branch
git checkout reorganization-backup
```

**Key Points**:
- Keep backup branch until fully tested
- Maintain old .dc.html files until confident
- Have redirect fallback in place
- Document any rollback reasons

---

## Success Criteria

✅ **All files accounted for and migrated**  
✅ **All old URLs redirect correctly**  
✅ **All functionality works as before**  
✅ **No console errors or warnings**  
✅ **All tests pass**  
✅ **Team can find files easily**  
✅ **New developers understand structure**  
✅ **Documentation is accurate**  
✅ **Performance maintained or improved**  
✅ **SEO metrics stable**

---

## Example: File Migration

### Example 1: Contact Page
```bash
# Old structure
Contact Us.dc.html
├── Links to: Collection Record.dc.html
├── Includes: support.js
└── Styles: components/fig-*.css

# New structure
public/pages/contact.html
├── Links to: /pages/record.html
├── Includes: /src/js/utils/helpers.js
└── Styles: /public/styles/*.css
```

### Example 2: Media Viewer Page
```bash
# Old structure
Collection Record.dc.html
├── Inline JavaScript for media viewer
├── Includes: image-slot.js
├── Includes: support.js
└── Images: images/*.jpg

# New structure
public/pages/record.html
├── Includes: /src/js/modules/media-viewer.js
├── Includes: /src/js/modules/keyboard-shortcuts.js
├── Includes: /src/js/utils/image-handler.js
└── Images: /public/assets/images/*.jpg
```

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0 | 2026-09-29 | Draft |

---

## Appendix: File Mapping Reference

| Current Name | New Location | Module | Notes |
|--------------|--------------|--------|-------|
| index.html | public/index.html | — | Entry point |
| Contact Us.dc.html | public/pages/contact.html | Pages | Renamed, moved |
| Collection Record.dc.html | public/pages/record.html | Pages | Renamed, moved |
| Collection Search v3.dc.html | public/pages/search.html | Pages | Version removed |
| Browse Collections.dc.html | public/pages/browse.html | Pages | Renamed, moved |
| Collection Landing.dc.html | public/pages/collection.html | Pages | Renamed, moved |
| Help and Support.dc.html | public/pages/help.html | Pages | Renamed, moved |
| CCS Home page.dc.html | public/pages/home-legacy.html | Pages | Legacy version |
| support.js | src/js/utils/helpers.js | Utils | Renamed, moved |
| image-slot.js | src/js/utils/image-handler.js | Utils | Renamed, moved |
| collection-data.js | public/assets/data/collections.js | Data | Moved |
| components/fig-tokens.css | public/styles/variables.css | Styles | Renamed, moved |
| components/fig-assets.css | public/styles/components.css | Styles | Renamed, moved |
| components/fig-typography.css | public/styles/typography.css | Styles | Optional, moved |
| verify-bootstrap.sh | scripts/verify-bootstrap.sh | Scripts | Moved |
| README.md | docs/README.md | Docs | Moved |
| design.md | docs/design-system.md | Docs | Renamed, moved |
| BOOTSTRAP-DEPENDENCIES.md | docs/BOOTSTRAP-DEPENDENCIES.md | Docs | Moved |
| jira-mvp-mapping.md | docs/jira-mvp-mapping.md | Docs | Moved |

---

## Next Steps

1. **Review & Approve**: Get team approval on structure
2. **Create Branch**: `git checkout -b reorganization`
3. **Implement Phase 1**: Create new directories
4. **Implement Phase 2**: Migrate files
5. **Implement Phase 3**: Update references
6. **Implement Phase 4**: Test thoroughly
7. **Implement Phase 5**: Document and release
8. **Monitor**: Track any issues post-migration

---

**Document Owner**: Development Team  
**Last Updated**: 2026-09-29  
**Status**: Ready for Implementation

