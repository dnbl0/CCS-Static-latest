require "test_helper"

class PagesTest < ActionDispatch::IntegrationTest
  test "browse collections lists the five collections, their sub-collections and the help links" do
    get "/collections"

    assert_response :success
    assert_select "body.page-collections-browse h1", "Browse collections"
    assert_select ".ct-listing__list--image > li:not(.ct-listing__item--search)", count: 5
    assert_select ".ct-listing__list--image a[href=?]", "/collections/grainger-museum"
    assert_select ".ct-listing__list--text > li", count: YAML.load_file(Rails.root.join("config/pages.yml")).dig("browse", "sub_collections").size
    assert_select "nav.page-breadcrumbs li[aria-current=page]", "Browse collections"
  end

  test "each collection has a landing page that searches its records" do
    YAML.load_file(Rails.root.join("config/pages.yml")).fetch("collections").each do |slug, collection|
      get "/collections/#{slug}"

      assert_response :success
      assert_select "body.page-collection-landing h1", collection["name"]
      facet_value = NexusCcs::SiteNavigation.facet_value(slug)
      assert_select "a.button[href=?]", "/catalog?#{{ f: { collection_ssim: [ facet_value ] } }.to_query}"
      assert_select ".def-table__row", count: collection["details"].size
    end
  end

  test "an unknown collection is not found" do
    get "/collections/unknown"

    assert_response :not_found
  end

  test "the help index lists every topic" do
    get "/help"

    assert_response :success
    assert_select "body.page-help h1", "Help and support"
    assert_select ".ccs-help--topics .ccs-help__item", count: PagesController::HELP_TOPICS.size
  end

  test "each help topic has a page with the topics side nav" do
    PagesController::HELP_TOPICS.reject { |topic| topic.key == "indigenous" }.each do |topic|
      get "/help", params: { topic: topic.key }

      assert_response :success
      assert_select "h1", topic.title
      assert_select ".side-nav a[aria-current=page]", topic.title
    end
  end

  test "the indigenous cultural data topic has its own page" do
    get "/help", params: { topic: "indigenous" }
    assert_redirected_to "/help/indigenous-data"

    get "/help/indigenous-data"
    assert_response :success
    assert_select "body.page-indigenous-data h1", "Indigenous Cultural Data and Access"
    assert_select ".side-nav a[aria-current=page]", "Indigenous Cultural Data and Access"
  end

  test "the contact page lists the collection contacts" do
    get "/contact"

    assert_response :success
    assert_select "body.page-contact .contact-cards__item", minimum: 5
  end

  test "the site header links to the pages" do
    get "/contact"

    assert_select "#site-nav-collections li a[href^='/collections/']", count: 5
    assert_select "#site-nav-help a[href='/help?topic=faq']"
    assert_select "a.site-header__title[href='/']"
  end
end
