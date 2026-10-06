# test/system/acknowledgement_of_country_test.rb
require "application_system_test_case"

class AcknowledgementOfCountryTest < ApplicationSystemTestCase
  test "shows once per session and dismisses on continue" do
    visit root_path
    assert_selector "#acknowledgement-of-country[open]"

    click_on "Continue"
    assert_no_selector "#acknowledgement-of-country[open]"

    visit root_path
    assert_no_selector "#acknowledgement-of-country[open]"
  end

  test "is not shown on search results" do
    visit search_catalog_path(q: "melbourne")
    assert_no_selector "#acknowledgement-of-country"
  end
end