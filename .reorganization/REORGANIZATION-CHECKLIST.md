# Reorganization Implementation Checklist

**Project**: Cultural Collections Search (CCS)  
**Status**: Ready for Implementation  
**Timeline**: 5 weeks  
**Last Updated**: 2026-09-29

---

## Phase 1: Planning & Validation (Week 1)

### Planning
- [ ] Review REORGANIZATION-PLAN.md
- [ ] Team meeting to discuss plan
- [ ] Assign responsibilities
- [ ] Create implementation branch: `git checkout -b reorganization`
- [ ] Backup current state: `git tag backup-before-reorganization`

### Validation
- [ ] Create file mapping spreadsheet
- [ ] Validate all files are accounted for
- [ ] Identify any special cases
- [ ] Document external dependencies
- [ ] Check for hardcoded paths

### Communication
- [ ] Notify development team
- [ ] Update project roadmap
- [ ] Schedule daily standup during migration
- [ ] Create status tracking document

**Deliverables**:
- [ ] Approved plan document
- [ ] Team sign-off
- [ ] Backup tag created
- [ ] Implementation branch ready

---

## Phase 2: Directory Structure Setup (Week 2)

### Create Directory Structure
```bash
# Execute this script
mkdir -p public/pages
mkdir -p public/assets/images/{cc,tiles,flags,logo}
mkdir -p public/assets/data/metadata
mkdir -p public/assets/documents
mkdir -p public/styles/vendor
mkdir -p src/js/{modules,utils,vendor}
mkdir -p src/css/{components}
mkdir -p src/templates/layouts
mkdir -p docs/guides
mkdir -p config
mkdir -p scripts
mkdir -p tests
```

### Create Essential Files
- [ ] Create public/index.html (placeholder)
- [ ] Create public/.htaccess (redirects)
- [ ] Create config/redirects.json
- [ ] Create .editorconfig
- [ ] Create .env.example
- [ ] Create LICENSE (MIT)

### Verify Structure
- [ ] Run structure verification script
- [ ] Check all directories created
- [ ] Verify directory permissions
- [ ] Test write access to all directories

**Deliverables**:
- [ ] Complete directory structure
- [ ] Core configuration files
- [ ] Structure verification pass

---

## Phase 3: File Migration (Week 3)

### HTML Files Migration
- [ ] Copy index.html → public/index.html
- [ ] Copy Contact Us.dc.html → public/pages/contact.html
- [ ] Copy Collection Record.dc.html → public/pages/record.html
- [ ] Copy Collection Search v3.dc.html → public/pages/search.html
- [ ] Copy Browse Collections.dc.html → public/pages/browse.html
- [ ] Copy Collection Landing.dc.html → public/pages/collection.html
- [ ] Copy Help and Support.dc.html → public/pages/help.html
- [ ] Copy CCS Home page.dc.html → public/pages/home-legacy.html

### JavaScript Files Migration
- [ ] Copy support.js → src/js/utils/helpers.js
- [ ] Copy image-slot.js → src/js/utils/image-handler.js
- [ ] Copy collection-data.js → public/assets/data/collections.js
- [ ] Update all script references in HTML files

### CSS Files Migration
- [ ] Copy components/fig-tokens.css → public/styles/variables.css
- [ ] Copy components/fig-assets.css → public/styles/components.css
- [ ] Copy components/fig-typography.css → public/styles/typography.css (optional)
- [ ] Update all style references in HTML files
- [ ] Move Bootstrap CSS to public/styles/vendor/

### Asset Files Migration
- [ ] Copy all images/ → public/assets/images/
- [ ] Organize images by type (cc/, tiles/, flags/, logo/)
- [ ] Copy assets/Collections\ images/ → public/assets/images/collections/
- [ ] Copy data files → public/assets/data/
- [ ] Copy documentation → public/assets/documents/

### Documentation Migration
- [ ] Move README.md → docs/README.md
- [ ] Move design.md → docs/design-system.md
- [ ] Move BOOTSTRAP-DEPENDENCIES.md → docs/
- [ ] Move jira-mvp-mapping.md → docs/
- [ ] Move REORGANIZATION-PLAN.md → docs/
- [ ] Move verify-bootstrap.sh → scripts/
- [ ] Create docs/CONTRIBUTING.md
- [ ] Create docs/DEPLOYMENT.md

### Verification
- [ ] Check all files copied (not moved yet)
- [ ] Verify file counts match old structure
- [ ] Check file sizes are preserved
- [ ] Verify permissions are correct
- [ ] Run file integrity checks

**Deliverables**:
- [ ] All files migrated to new locations
- [ ] File integrity verified
- [ ] Original files still in place (not deleted)

---

## Phase 4: Reference Updates (Week 4)

### Update HTML Internal Links
- [ ] Update header navigation links
- [ ] Update footer navigation links
- [ ] Update page-to-page links
- [ ] Update search result links
- [ ] Update breadcrumb links
- [ ] Update all href attributes

### Update Script References
- [ ] Update <script src="..."> tags in all HTML files
- [ ] Verify script paths point to new locations
- [ ] Check script loading order
- [ ] Verify no path errors in console

### Update Style References
- [ ] Update <link rel="stylesheet"> tags
- [ ] Verify Bootstrap CSS still loads
- [ ] Verify all CSS files included
- [ ] Check for CSS loading errors

### Update Data References
- [ ] Update collection-data.js paths
- [ ] Update any AJAX/fetch calls
- [ ] Verify data loads correctly
- [ ] Check browser console for errors

### Create Redirect Configuration
- [ ] Populate config/redirects.json
- [ ] Create public/.htaccess redirects
- [ ] Create alternative redirects (for different servers)
- [ ] Document redirect strategy

### Update Build Scripts (if applicable)
- [ ] Update build.sh paths
- [ ] Update deploy.sh paths
- [ ] Update test.sh paths
- [ ] Update CI/CD pipeline paths

### Testing After Updates
- [ ] Load each page in browser
- [ ] Check browser console for errors
- [ ] Verify all styles load correctly
- [ ] Verify all scripts load correctly
- [ ] Test all interactive features

**Deliverables**:
- [ ] All internal references updated
- [ ] Redirect configuration complete
- [ ] No console errors on any page
- [ ] All functionality works as before

---

## Phase 5: Comprehensive Testing (Week 4, continued)

### Functionality Testing
- [ ] Test homepage loads correctly
- [ ] Test navigation between pages
- [ ] Test search functionality
- [ ] Test media viewer (Collection Record page)
- [ ] Test keyboard shortcuts (I, F, arrows, ?)
- [ ] Test fullscreen on media viewer
- [ ] Test forms (contact, search)
- [ ] Test access request modal
- [ ] Test all buttons and links

### Responsive Design Testing
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1200px width)
- [ ] Test on large screens (1600px width)
- [ ] Verify no horizontal scrolling
- [ ] Verify images scale properly
- [ ] Test touch targets on mobile
- [ ] Test navbar collapse/expand

### Accessibility Testing
- [ ] Test keyboard navigation (Tab through page)
- [ ] Verify focus indicators visible
- [ ] Test screen reader (if available)
- [ ] Verify ARIA labels correct
- [ ] Check color contrast
- [ ] Verify heading hierarchy
- [ ] Test form label associations
- [ ] Check alt text on images

### Cross-Browser Testing
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile browsers
- [ ] Check console for errors
- [ ] Verify rendering consistent

### Old URL Redirect Testing
- [ ] Test old Contact Us URL
- [ ] Test old Collection Record URL
- [ ] Test old Search URL
- [ ] Test old Browse URL
- [ ] Test old Help URL
- [ ] Verify 301 redirects working
- [ ] Check redirect chains
- [ ] Verify no redirect loops

### Performance Testing
- [ ] Measure page load time
- [ ] Check CSS file sizes
- [ ] Check JavaScript file sizes
- [ ] Verify no unused resources loaded
- [ ] Check for HTTP errors
- [ ] Verify CDN caching working
- [ ] Run Lighthouse audit
- [ ] Compare before/after metrics

### Broken Links Testing
- [ ] Run automated link checker
- [ ] Manually verify key links
- [ ] Check internal navigation
- [ ] Check external links
- [ ] Verify no 404 errors
- [ ] Check for mixed HTTP/HTTPS

**Deliverables**:
- [ ] All tests passing
- [ ] No critical issues found
- [ ] Performance maintained
- [ ] Accessibility verified
- [ ] Test report generated

---

## Phase 6: Cleanup & Documentation (Week 5)

### Delete Old Files
- [ ] Backup old structure to archive
- [ ] Delete old HTML files from root
- [ ] Delete old JavaScript files from root
- [ ] Delete old components/ directory (if empty)
- [ ] Verify nothing needed remains
- [ ] Clean up git history (optional)

### Update Documentation
- [ ] Update README.md (in docs/)
- [ ] Create ARCHITECTURE.md
- [ ] Create CONTRIBUTING.md
- [ ] Create setup guide (docs/guides/setup.md)
- [ ] Create workflow guide (docs/guides/workflow.md)
- [ ] Update GitHub wiki (if exists)
- [ ] Create CHANGELOG entry
- [ ] Document any breaking changes

### Update Configuration Files
- [ ] Update .gitignore if needed
- [ ] Update .editorconfig
- [ ] Create .env.example with new paths
- [ ] Update package.json scripts (if applicable)
- [ ] Update any deployment config

### Create Migration Guide
- [ ] Document what changed
- [ ] Create file mapping reference
- [ ] Document how to find files
- [ ] Provide troubleshooting guide
- [ ] Create FAQ for developers

### Team Communication
- [ ] Send migration summary to team
- [ ] Update project roadmap
- [ ] Update onboarding docs
- [ ] Create quick reference card
- [ ] Schedule knowledge transfer session

### Git & Version Control
- [ ] Create meaningful commit messages
- [ ] Organize commits by phase
- [ ] Create merge commit with summary
- [ ] Tag release version: `git tag v2.0-reorganized`
- [ ] Push all changes to remote

### Final Verification
- [ ] Run all tests one final time
- [ ] Verify production deployment scenario
- [ ] Check GitHub Actions if used
- [ ] Verify backup tags created
- [ ] Confirm no uncommitted changes

**Deliverables**:
- [ ] Old files deleted
- [ ] Documentation complete
- [ ] Configuration files updated
- [ ] Team trained on new structure
- [ ] Release tagged and pushed

---

## Post-Migration Tasks (Week 6+)

### Monitor & Fix Issues
- [ ] Watch for error reports
- [ ] Check logs for issues
- [ ] Monitor user feedback
- [ ] Fix any broken functionality
- [ ] Address team concerns

### Performance Optimization
- [ ] Analyze performance metrics
- [ ] Optimize critical paths
- [ ] Minimize CSS/JavaScript
- [ ] Optimize images
- [ ] Consider CDN caching

### Future Improvements
- [ ] Plan next iteration
- [ ] Consider build tooling
- [ ] Plan testing framework
- [ ] Plan CI/CD improvements
- [ ] Schedule code review

---

## Quick Reference

### Important Commands
```bash
# Create backup
git tag backup-before-reorganization

# Create branch
git checkout -b reorganization

# Create directories
bash scripts/create-structure.sh

# Verify migration
bash scripts/verify-migration.sh

# Check links
bash scripts/check-links.sh

# Run tests
bash scripts/test.sh

# Merge when ready
git checkout main
git merge reorganization
git push origin main
```

### Key Files & Locations
| Task | Location |
|------|----------|
| Plan | docs/REORGANIZATION-PLAN.md |
| Checklist | docs/REORGANIZATION-CHECKLIST.md |
| Structure | See REORGANIZATION-PLAN.md |
| File Mapping | REORGANIZATION-PLAN.md Appendix |
| Redirects | config/redirects.json |
| Architecture | docs/ARCHITECTURE.md |

---

## Success Metrics

- [ ] All files migrated successfully
- [ ] 0 critical issues
- [ ] All tests passing
- [ ] Performance maintained or improved
- [ ] Team can navigate structure easily
- [ ] Documentation complete
- [ ] No user-facing changes needed
- [ ] SEO metrics stable

---

## Team Assignments

| Phase | Task | Assigned To | Status |
|-------|------|-------------|--------|
| 1 | Planning | @lead-dev | ⬜ |
| 2 | Directory Setup | @dev-1 | ⬜ |
| 3 | File Migration | @dev-2 | ⬜ |
| 4 | Reference Updates | @dev-1,@dev-2 | ⬜ |
| 5 | Testing | @qa-team | ⬜ |
| 6 | Documentation | @tech-writer | ⬜ |

---

## Risk Log

| Risk | Likelihood | Impact | Mitigation | Status |
|------|-----------|--------|-----------|--------|
| Broken links | Medium | High | Redirect config, test plan | 🟢 |
| Lost files | Low | Critical | Git backup, file audit | 🟢 |
| Script errors | Medium | High | Reference update checklist | 🟢 |
| SEO impact | Low | Medium | 301 redirects | 🟢 |
| Team confusion | Medium | Medium | Clear documentation | 🟢 |

---

## Sign-Off

- [ ] Product Owner Approval
- [ ] Development Lead Approval
- [ ] QA Lead Approval
- [ ] DevOps Approval

---

**Last Updated**: 2026-09-29  
**Status**: Ready for Implementation  
**Document Owner**: Development Team

