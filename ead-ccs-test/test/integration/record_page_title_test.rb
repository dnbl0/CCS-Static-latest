require "test_helper"

# CCS stakeholder feedback: the title was shown five times before the record itself. Now the breadcrumb ends in the
# record's identifier, the title is the summary's h1 (and again in the details list), and the Copyright card has no
# caption until the site offers downloads.
class RecordPageTitleTest < ActionDispatch::IntegrationTest
  # The record page reads the Solr core at SOLR_URL. The "rails" CI job has no Solr, so the test skips itself when it
  # cannot be reached.
  def needs_solr
    Blacklight.default_index.connection.get("select", params: { q: "*:*", rows: 0 })
  rescue StandardError
    skip "needs the Solr core at SOLR_URL"
  end

  test "a record page shows its title once as the h1, its identifier in the breadcrumb, and no caption" do
    needs_solr
    get "/catalog", params: { q: "skull", any_assets: "1", format: :json }
    id = JSON.parse(response.body)["data"].first["id"]
    get "/catalog/#{id}"

    assert_response :success
    title = css_select("h1.record-summary__title").first&.text&.strip
    assert title.present?
    assert_select "h1", count: 1
    assert_select ".record-banner", count: 0
    assert_select ".breadcrumb-bar__trail [aria-current=page]" do |current|
      assert_not_equal title, current.text.strip
    end
    assert_select ".record-copyright dt", text: "Caption", count: 0
  end
end
