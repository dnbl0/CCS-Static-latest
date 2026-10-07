require "test_helper"
require "capybara/cuprite"

# System tests drive a real headless Chrome over the DevTools protocol (Cuprite). Set BROWSER_PATH to use a Chrome or
# Chromium that is not on the PATH. They search the Solr core at SOLR_URL, which must hold the indexed records
# (see docs/solr-dev.md).
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :cuprite, screen_size: [ 1440, 900 ], options: { browser_options: { "no-sandbox" => nil }, process_timeout: 30, timeout: 15 }
end
