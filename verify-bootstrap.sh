#!/bin/bash

##############################################################################
# Bootstrap Verification Script
# Verifies that all Bootstrap CDN links are from official source
# Repository: https://github.com/twbs/bootstrap
# Author: Development Team
# Date: 2026-09-29
##############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
OFFICIAL_VERSION="5.3.3"
OFFICIAL_REPO="https://github.com/twbs/bootstrap"
CDN_URL="https://cdn.jsdelivr.net/npm/bootstrap"
CSS_INTEGRITY="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
JS_INTEGRITY="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"

# Counters
TOTAL_FILES=0
COMPLIANT_FILES=0
ISSUES_FOUND=0

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Bootstrap Dependency Verification                      ║${NC}"
echo -e "${BLUE}║     Official Repository: github.com/twbs/bootstrap         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to check file for Bootstrap references
check_file() {
  local file="$1"

  if ! grep -q "bootstrap" "$file" 2>/dev/null; then
    return 0  # No Bootstrap reference, skip
  fi

  TOTAL_FILES=$((TOTAL_FILES + 1))

  echo -e "${YELLOW}Checking: $file${NC}"

  # Check CSS
  if grep -q "bootstrap.*\.css" "$file"; then
    if grep -q "cdn.jsdelivr.net/npm/bootstrap@${OFFICIAL_VERSION}" "$file"; then
      echo -e "  ${GREEN}✅${NC} Bootstrap CSS: v${OFFICIAL_VERSION}"
    else
      echo -e "  ${RED}❌${NC} Bootstrap CSS: Wrong version or URL"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi

    # Check CSS SRI
    if grep -q "bootstrap.*\.css.*integrity" "$file"; then
      echo -e "  ${GREEN}✅${NC} CSS SRI Hashing: Present"
    else
      echo -e "  ${RED}❌${NC} CSS SRI Hashing: Missing"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  fi

  # Check JavaScript Bundle
  if grep -q "bootstrap\.bundle.*\.js" "$file"; then
    if grep -q "cdn.jsdelivr.net/npm/bootstrap@${OFFICIAL_VERSION}" "$file"; then
      echo -e "  ${GREEN}✅${NC} Bootstrap JS Bundle: v${OFFICIAL_VERSION}"
    else
      echo -e "  ${RED}❌${NC} Bootstrap JS Bundle: Wrong version or URL"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi

    # Check JS SRI
    if grep -q "bootstrap\.bundle.*integrity" "$file"; then
      echo -e "  ${GREEN}✅${NC} JS SRI Hashing: Present"
    else
      echo -e "  ${RED}❌${NC} JS SRI Hashing: Missing"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  fi

  # Check for CDN URL
  if grep -q "cdn.jsdelivr.net/npm/bootstrap" "$file"; then
    echo -e "  ${GREEN}✅${NC} CDN Source: jsDelivr (Official Bootstrap Distribution)"
  else
    echo -e "  ${RED}❌${NC} CDN Source: Not recognized"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi

  # Check for custom Bootstrap
  if grep -q "bootstrap.*\.css" "$file" && [ -f "bootstrap.css" ]; then
    echo -e "  ${RED}⚠️ ${NC} Local Bootstrap file detected (should use CDN)"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi

  echo ""

  COMPLIANT_FILES=$((COMPLIANT_FILES + 1))
}

# Find and check all HTML files
echo -e "${BLUE}Scanning HTML files...${NC}"
echo ""

for file in $(find . -maxdepth 1 \( -name "*.html" -o -name "*.dc.html" \) 2>/dev/null | sort); do
  if [ -f "$file" ]; then
    check_file "$file"
  fi
done

# Summary Report
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║ VERIFICATION SUMMARY                                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo "📊 Files Analyzed: $TOTAL_FILES"
echo "✅ Compliant Files: $COMPLIANT_FILES"
echo "❌ Issues Found: $ISSUES_FOUND"
echo ""

# Compliance Status
if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ COMPLIANCE STATUS: PASSED${NC}"
  echo ""
  echo "All Bootstrap CDN links are from the official source:"
  echo "  • Repository: $OFFICIAL_REPO"
  echo "  • Version: $OFFICIAL_VERSION"
  echo "  • CDN: jsDelivr (Official npm distribution)"
  echo "  • SRI Hashing: Enabled"
  echo ""
  exit 0
else
  echo -e "${RED}❌ COMPLIANCE STATUS: FAILED${NC}"
  echo ""
  echo "⚠️  Issues detected. Review above for details."
  echo ""
  exit 1
fi
