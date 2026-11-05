require "test_helper"

# A record page's title: the summary's h1 is the page's one real heading (the title band under the breadcrumb repeats it for
# sighted visitors and is hidden from assistive technology), the breadcrumb ends in the title cut to 50 characters (the span's title
# attribute holds the whole title), and the Copyright card has no caption until the site offers downloads.
class RecordPageTitleTest < ActionDispatch::IntegrationTest
  # The record page reads the Solr core at SOLR_URL. The "rails" CI job has no Solr, so the test skips itself when it
  # cannot be reached.
  def needs_solr
    Blacklight.default_index.connection.get("select", params: { q: "*:*", rows: 0 })
  rescue StandardError
    skip "needs the Solr core at SOLR_URL"
  end

  test "a record page has one h1, the title band, the title in the breadcrumb (cut with the whole title in its title attribute when long), and no caption" do
    needs_solr
    get "/catalog", params: { q: "skull", any_assets: "1", format: :json }
    id = JSON.parse(response.body)["data"].first["id"]
    get "/catalog/#{id}"

    assert_response :success
    title = css_select("h1.record-summary__title").first&.text&.strip
    assert title.present?
    assert_select "h1", count: 1
    assert_select "section.record-banner[aria-hidden=true] .record-banner__inner p.record-banner__title", text: title # the title band: the whole title, hidden from assistive technology (the h1 is the real one)
    assert_select ".breadcrumb-bar__trail [aria-current=page] span" do |spans|
      shown = spans.first.text.strip
      assert_operator shown.length, :<=, 50
      if title.length > 50
        assert shown.end_with?("…"), "a long title is cut and ends in an ellipsis: #{shown.inspect}"
        assert title.start_with?(shown.delete_suffix("…")), "the cut is the start of the title"
        assert_equal title, spans.first["title"]
      else
        assert_equal title, shown
        assert_nil spans.first["title"]
      end
    end
    assert_select ".record-copyright dt", text: "Caption", count: 0
  end
end
