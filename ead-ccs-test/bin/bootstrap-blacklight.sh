#!/usr/bin/env bash
# bin/bootstrap-blacklight.sh
# Run this *inside* the Dev Container to create a clean Blacklight 9 application

set -euo pipefail

APP_DIR="${1:-.}"
TARGET_DIR="$APP_DIR"

if [ -f "$TARGET_DIR/Gemfile" ] && [ -d "$TARGET_DIR/app" ]; then
  echo "Error: An application already appears to exist in $TARGET_DIR"
  echo "If you really want to regenerate, move or remove the existing files first."
  exit 1
fi

bundle config set --local path 'vendor/bundle'

echo "→ Installing Rails"
gem install rails -v "~> 8.1.3" --no-document

echo "→ Generating new Rails + Blacklight 9 application in $TARGET_DIR"

rails new "$TARGET_DIR" \
  --database=postgresql \
  -a propshaft \
  --css bootstrap \
  --skip-docker \
  --skip-action-mailbox \
  --skip-action-text \
  --force

cd "$TARGET_DIR"

echo "→ Adding Blacklight 9"
bundle add blacklight --version "~> 9.0"

echo "→ Running Blacklight installer"
bin/rails generate blacklight:install --devise

bundle install

echo ""
echo "Nexus CCS Blacklight Bootstrap complete."
echo ""
echo "Next steps:"
echo "  1. Review the generated files"
echo "  2. git add -A && git commit -m 'Bootstrap Blacklight 9 application'"
echo "  3. Set DATABASE_URL and SOLR_URL (VPN endpoints)"
echo "  4. bin/rails db:prepare"