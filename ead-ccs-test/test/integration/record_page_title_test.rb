require "test_helper"

# CCS stakeholder feedback: the title was shown five times before the record itself. Now the title is the summary's h1
# (and again in the details list), the breadcrumb ends in the title cut to 60 characters (the span's title attribute
# holds the whole title), and the Copyright card has no caption until the site offers downloads.
class RecordPageTitleTest < ActionDispatch::IntegrationTest
  # The record page reads the Solr core at SOLR_URL. The "rails" CI job has no Solr, so the test skips itself when it
  # cannot be reached.
  def needs_solr
    Blacklight.default_index.connection.get("select", params: { q: "*:*", rows: 0 })
  rescue StandardError
    skip "needs the Solr core at SOLR_URL"
  end

  test "a record page shows its title as the h1, a title that fits in the breadcrumb (cut, with the whole title in its title attribute, when long), and no caption" do
    needs_solr
    get "/catalog", params: { q: "skull", any_assets: "1", format: :json }
    id = JSON.parse(response.body)["data"].first["id"]
    get "/catalog/#{id}"

    assert_response :success
    title = css_select("h1.record-summary__title").first&.text&.strip
    assert title.present?
    assert_select "h1", count: 1
    assert_select ".record-banner", count: 0
    assert_select ".breadcrumb-bar__trail [aria-current=page] span" do |spans|
      shown = spans.first.text.strip
      assert_operator shown.length, :<=, 60
      if title.length > 60
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
