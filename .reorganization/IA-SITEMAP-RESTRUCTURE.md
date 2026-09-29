# IA & Sitemap Restructure Plan

**Status**: Planning  
**Date**: 2026-09-29  
**Objective**: Reorganize CCS website with clean semantic URLs and official UoM footer

## Current State

### Root HTML Files
```
- index.html (Home)
- CCS Home page.dc.html (Duplicate home)
- Collection Search v3.dc.html (Advanced search)
- Browse Collections.dc.html (Browse all collections)
- Collection Landing.dc.html (Collection template)
- Collection Record.dc.html (Record detail + media viewer)
- Help and Support.dc.html (Help page)
- Contact Us.dc.html (Contact page)
```

## Target Structure

```
public/
├── index.html                          # Home /
├── search.html                         # /search (keyword search)
├── search/
│   └── advanced.html                   # /search/advanced
├── collections/
│   ├── index.html                      # /collections (browse all)
│   ├── grainger-museum.html            # /collections/grainger-museum
│   ├── harry-brookes-allen.html        # /collections/harry-brookes-allen-museum
│   ├── henry-forman-atkinson.html      # /collections/henry-forman-atkinson-dental-museum
│   ├── medical-history.html            # /collections/medical-history-museum
│   ├── university-art.html             # /collections/university-art-collection
│   └── record.html                     # /collections/record (collection item detail)
├── help/
│   ├── index.html                      # /help
│   └── faqs.html                       # /help/faqs
├── contact.html                        # /contact
└── [other pages & assets]
```

## File Migration Mapping

| Current File | New Location | New Name | URL |
|---|---|---|---|
| index.html | public/index.html | index.html | / |
| CCS Home page.dc.html | [Archive] | - | [Redirect to /] |
| Collection Search v3.dc.html | public/search/advanced.html | advanced.html | /search/advanced |
| Browse Collections.dc.html | public/collections/index.html | index.html | /collections |
| Collection Landing.dc.html | public/collections/{name}.html | [6 files] | /collections/{name} |
| Collection Record.dc.html | public/collections/record.html | record.html | /collections/record |
| Help and Support.dc.html | public/help/index.html | index.html | /help |
| Contact Us.dc.html | public/contact.html | contact.html | /contact |

## Collection Pages to Create

From provided IA, create 6 collection-specific pages:
1. **Grainger Museum** → `/collections/grainger-museum.html`
2. **Harry Brookes Allen Museum** → `/collections/harry-brookes-allen-museum.html`
3. **Henry Forman Atkinson Dental Museum** → `/collections/henry-forman-atkinson-dental-museum.html`
4. **Medical History Museum** → `/collections/medical-history-museum.html`
5. **University Art Collection** → `/collections/university-art-collection.html`
6. (Plus any others from current data)

Each will be based on `Collection Landing.dc.html` template with collection-specific metadata.

## Footer Implementation

### UoM Footer Structure
```html
<footer class="site-footer">
  <!-- Acknowledgement of Country -->
  <div class="footer-acknowledgement">
    <p>The University of Melbourne acknowledges the Wurundjeri people of the Kulin nation as the traditional owners and custodians of the lands on which our campuses stand.</p>
  </div>
  
  <!-- Main Navigation -->
  <nav class="footer-nav" aria-label="Footer Navigation">
    <div class="footer-col">
      <h3>About us</h3>
      <ul>
        <li><a href="https://www.unimelb.edu.au/about">About us</a></li>
        <li><a href="https://www.unimelb.edu.au/careers">Careers at Melbourne</a></li>
        <li><a href="https://www.unimelb.edu.au/safety">Safety and respect</a></li>
        <li><a href="https://www.unimelb.edu.au/newsroom">Newsroom</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Support</h3>
      <ul>
        <li><a href="https://www.unimelb.edu.au/contact">Contact</a></li>
        <li><a href="https://www.unimelb.edu.au/campus-locations">Campus locations</a></li>
        <li><a href="https://www.unimelb.edu.au/emergency">Emergency</a></li>
      </ul>
    </div>
  </nav>
  
  <!-- Secondary Navigation -->
  <div class="footer-secondary">
    <ul>
      <li><a href="https://www.unimelb.edu.au/terms-and-privacy">Terms and privacy</a></li>
      <li><a href="https://www.unimelb.edu.au/privacy">Privacy</a></li>
      <li><a href="https://www.unimelb.edu.au/accessibility">Accessibility</a></li>
    </ul>
  </div>
  
  <!-- Copyright -->
  <div class="footer-copyright">
    <p>&copy; 2026 The University of Melbourne. All rights reserved.</p>
  </div>
</footer>
```

### Footer Styling (UoM Gen 3 Compliant)
- Background: Navy #000f46 (UoM primary color)
- Text: White on dark background
- Links: Sage green #abc1a7 on hover
- Layout: Responsive (1 col mobile, 2-3 cols desktop)
- Typography: Source Sans 3, body text 14-15px

## Implementation Steps

### Phase 1: Create New Directory Structure
- Create `/public/search/` directory
- Create `/public/collections/` directory
- Create `/public/help/` directory

### Phase 2: Create/Rename Files
- Rename `index.html` → keep as `index.html`
- Create `public/search.html` (simple search entry point)
- Move `Collection Search v3.dc.html` → `public/search/advanced.html`
- Move `Browse Collections.dc.html` → `public/collections/index.html`
- Move `Collection Record.dc.html` → `public/collections/record.html`
- Move `Help and Support.dc.html` → `public/help/index.html`
- Move `Contact Us.dc.html` → `public/contact.html`

### Phase 3: Create Collection-Specific Pages
Based on `Collection Landing.dc.html`, create:
- `public/collections/grainger-museum.html`
- `public/collections/harry-brookes-allen-museum.html`
- `public/collections/henry-forman-atkinson-dental-museum.html`
- `public/collections/medical-history-museum.html`
- `public/collections/university-art-collection.html`

### Phase 4: Update All Internal Links
Search and replace in all HTML files:
- Links to "Collection Search v3.dc.html" → "/search/advanced"
- Links to "Browse Collections.dc.html" → "/collections"
- Links to "Help and Support.dc.html" → "/help"
- Links to "Contact Us.dc.html" → "/contact"
- Links to "Collection Landing.dc.html?id=X" → "/collections/{name}"
- Links to "Collection Record.dc.html?id=X" → "/collections/record?id=X"

### Phase 5: Add UoM Footer to All Pages
- Add UoM-compliant footer HTML to all pages
- Add footer CSS (already in components or custom styles)
- Test footer on all pages and breakpoints

### Phase 6: Add URL Rewrites
Create `.htaccess` for clean URL routing:
```apache
# Search routes
RewriteRule ^search/advanced/?$ search/advanced.html [L]
RewriteRule ^search/?$ search.html [L]

# Collections routes
RewriteRule ^collections/(.+)/?$ collections/$1.html [L]
RewriteRule ^collections/?$ collections/index.html [L]

# Help routes
RewriteRule ^help/faqs/?$ help/faqs.html [L]
RewriteRule ^help/?$ help/index.html [L]

# Contact route
RewriteRule ^contact/?$ contact.html [L]
```

### Phase 7: Test & Validation
- [ ] All pages load without errors
- [ ] Internal links work correctly
- [ ] External UoM links are valid
- [ ] Footer displays correctly on all pages
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Navigation hierarchy is correct
- [ ] SEO meta tags updated if needed

## Files to Remove/Archive
- `CCS Home page.dc.html` → Archive (duplicate of index.html)
- Old `.dc.html` files at root (after migration to `/public`)

## Backward Compatibility
Old URLs will redirect to new URLs:
- `Collection Search v3.dc.html` → `/search/advanced`
- `Browse Collections.dc.html` → `/collections`
- `Help and Support.dc.html` → `/help`
- `Contact Us.dc.html` → `/contact`

## Success Criteria
✅ All URLs are clean and semantic  
✅ Collection-specific pages are discoverable  
✅ UoM footer is present and consistent  
✅ All links (internal and external) work  
✅ Design system compliance maintained  
✅ Accessibility standards met  
✅ Responsive design intact  
