require "application_system_test_case"

# The main journeys through a real browser, against the Solr core at SOLR_URL (see application_system_test_case.rb)
class SearchJourneysTest < ApplicationSystemTestCase
  setup do
    # The Acknowledgement of Country dialog would sit over the home page; it is covered by its own test
    page.driver.set_cookie("country_acknowledged", "1")
  end

  test "searching from the home page lists the matching records as a mosaic" do
    visit root_path
    within(".ccs-hero__search") do
      fill_in "q", with: "skull"
      click_button "Search"
    end

    assert_current_path(%r{\A/catalog\?.*q=skull})
    assert_selector ".result-card", minimum: 12
    assert_selector ".documents-masonry"
  end

  test "the view buttons switch between the mosaic and the list" do
    visit search_catalog_path(q: "skull")
    assert_selector ".documents-masonry"

    find("a.view-type-list").click
    assert_no_selector ".documents-masonry"
    assert_selector ".documents-list .result-card, .result-card", minimum: 1
    assert_current_path(%r{view=list})
  end

  test "choosing a filter narrows the results and shows what was chosen" do
    visit search_catalog_path(q: "skull")
    everything = find(".search-banner__desc").text

    visit search_catalog_path(q: "skull", f: { collection_ssim: [ "Medical History Museum" ] })

    assert_selector ".result-card", minimum: 1
    assert_text "Medical History Museum"
    assert_not_equal everything, find(".search-banner__desc").text, "the result count changes"
  end

  test "opening a result shows the record and its breadcrumb leads back to the results" do
    visit search_catalog_path(q: "skull")
    title = first(".result-card .document-title-heading a").text
    first(".result-card .document-title-heading a").click

    assert_current_path(%r{\A/catalog/.+})
    assert_selector "h1", text: title.split.first
    assert_selector "nav.breadcrumb-bar li[aria-current=page]"

    click_link "Search results"
    assert_current_path(%r{\A/catalog\?})
    assert_selector ".result-card", minimum: 1
  end

  test "the advanced search link loads the form into a panel without leaving the results" do
    visit search_catalog_path(q: "skull")
    click_link "Advanced search"

    # The panel's own visibility depends on its slide-in, so look at the DOM: the form is in the flyout dialog
    using_wait_time(10) do
      assert_selector "dialog#blacklight-modal.advanced-flyout form", visible: :all
      assert_equal "Advanced search", find("dialog#blacklight-modal h1.modal-title", visible: :all).text(:all)
    end
    assert_current_path(%r{\A/catalog\?.*q=skull})
    assert_selector ".result-card", minimum: 1
  end

  test "on a phone the menu opens and its Help section shows the help pages" do
    page.driver.resize(390, 800)
    visit root_path

    assert_no_selector "#site-nav", visible: true
    find("button.site-header__menu").click
    assert_selector "#site-nav", visible: true

    find("button.site-nav__trigger[aria-controls=site-nav-help]").click
    assert_selector "#site-nav-help a", text: "Frequently Asked Questions", visible: true
  end
end
