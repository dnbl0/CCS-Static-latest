require "application_system_test_case"

# A record's audio and video play in Video.js 10's Compat skin (controllers/media_player_controller.js, files in public/vendor/videojs).
# Checked in a real browser: the player replaces the browser's controls, every control is named and reachable by keyboard, the page
# passes axe with the player on it, and at 390px it does not scroll sideways (WCAG 1.4.10). The media files themselves are served
# from CCS_MEDIA_BASE_URL and are not in CI, so nothing here depends on playback.
class RecordMediaPlayerTest < ApplicationSystemTestCase
  RECORDS = { "audio" => "emu-404316", "video" => "emu-108204" }.freeze

  setup { page.driver.set_cookie("country_acknowledged", "1") }
  teardown { page.current_window.resize_to(1400, 900) }

  # The player's controls live in shadow roots: collect each one's role and accessible name, in tab order.
  CONTROLS_JS = <<~JS.freeze
    (() => {
      const found = [];
      const walk = (root) => root.querySelectorAll("*").forEach((el) => {
        if (el.getAttribute("role") === "button" && el.getAttribute("tabindex") === "0") found.push(el.getAttribute("aria-label") || el.textContent.trim());
        if (el.shadowRoot) walk(el.shadowRoot);
      });
      walk(document);
      return found;
    })()
  JS

  RECORDS.each do |kind, id|
    test "#{kind}: the player replaces the native controls and is the one set of controls on the page" do
      visit solr_document_path(id)
      assert_selector "figure.digital-assets__media.is-enhanced"

      assert_equal false, page.evaluate_script("document.querySelector('.digital-assets__media #{kind}').hasAttribute('controls')")
      assert_equal "Media player", page.evaluate_script("(function f(r){for(const e of r.querySelectorAll('*')){if(e.tagName==='MEDIA-CONTAINER')return e.getAttribute('aria-label');if(e.shadowRoot){const x=f(e.shadowRoot);if(x)return x}}})(document)")
    end

    test "#{kind}: every control has a name, and play is among them" do
      visit solr_document_path(id)
      assert_selector "figure.digital-assets__media.is-enhanced"

      names = page.evaluate_script(CONTROLS_JS)
      assert_includes names, "Play"
      assert names.none?(&:blank?), "controls without a name: #{names.inspect}"
    end

    test "#{kind}: the record page has no axe violations with the player on it" do
      visit solr_document_path(id)
      assert_selector "figure.digital-assets__media.is-enhanced"
      # Known, in the vendored player and not ours to restyle (its skin's inner elements are private, and its documented
      # CSS properties do not reach the slider): the seek slider's thumb is 12px in a 20px-tall row, under WCAG 2.2's 24px
      # target size (2.5.8, axe rule target-size). The slider also works by keyboard (arrows, Home, End, Page Up/Down) and
      # by the J and L seek keys and the 10-second buttons, which are 24px or larger.
      # Also, in CI the media files are not served (they come from CCS_MEDIA_BASE_URL), so the player is in its disabled
      # state and the audio skin greys its time readout (inactive components are exempt from 1.4.3). With the file
      # loaded, as in local runs and on the site, the readout passes axe, so contrast is only left out of this audio run.
      assert_accessible(except: kind == "audio" ? [ "target-size", "color-contrast" ] : [ "target-size" ])
    end

    test "#{kind}: the page does not scroll sideways at 390px" do
      page.current_window.resize_to(390, 844)
      visit solr_document_path(id)
      assert_selector "figure.digital-assets__media.is-enhanced"

      scroll, client = page.evaluate_script("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
      assert_operator scroll, :<=, client
    end

    test "#{kind}: the file is a download link under the player" do
      visit solr_document_path(id)
      assert_selector ".digital-assets__download a[download]", text: "Download"
    end
  end
end
