require "application_system_test_case"

class AcknowledgementOfCountryTest < ApplicationSystemTestCase
  test "shows once per day on the home page and dismisses on continue" do
    visit root_path
    assert_selector "#country-acknowledgement[open]"

    click_on "Continue"
    assert_no_selector "#country-acknowledgement[open]"

    visit root_path
    assert_no_selector "#country-acknowledgement[open]"
  end

  test "is not shown on search results" do
    visit search_catalog_path(q: "melbourne")
    assert_no_selector "#country-acknowledgement"
  end
end
