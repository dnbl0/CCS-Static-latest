require "test_helper"

class PagesTest < ActionDispatch::IntegrationTest
  test "browse collections lists the five collections alphabetically and the help links" do
    get "/collections"

    assert_response :success
    assert_select "body.page-collections-browse h1", "Browse collections"
    assert_select ".ccs-section--cards .ccs-card", count: 5
    assert_select ".ccs-card__link[href=?]", "/collections/grainger-museum"
    assert_select ".ccs-card__title" do |titles|
      names = titles.map { |title| title.text.strip }
      assert_equal names.sort, names
    end
    assert_select ".ct-listing__list--text", count: 0
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
    assert_select ".ccs-help--topics .ccs-help__item", count: HelpTopic.all.size
  end

  test "each help topic has a page with the topics side nav" do
    HelpTopic.all.reject { |topic| topic.key == "indigenous" }.each do |topic|
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
    assert_select "body.page-contact h1", "Contact collections team"
    assert_select "body.page-contact .side-nav__link", minimum: 4
    assert_select "body.page-contact .help-layout__content li a[href^=mailto], body.page-contact .help-layout__content li a[target=_blank]", minimum: 5
  end

  test "the about page links to the collections and sits in the header" do
    get "/about"

    assert_response :success
    assert_select "body.page-about .ccs-section--cards .ccs-card", count: 5
    assert_select "#site-nav-help ~ ul a[href='/about'], .site-nav a[href='/about']", minimum: 1
  end

  test "the site header links to the pages" do
    get "/contact"

    assert_select "#site-nav-collections li a[href^='/collections/']", count: 5
    assert_select "#site-nav-help a[href='/help?topic=faq']"
    assert_select "a.site-header__title[href='/']"
  end

  test "every content page has one main landmark for the skip link, and the collection banner is a named region" do
    paths = [ "/", "/collections", "/collections/grainger-museum", "/help", "/help?topic=faq", "/help/indigenous-data", "/contact" ]

    paths.each do |path|
      get path

      assert_response :success, path
      assert_select "a.skip-link[href='#main-content']", count: 1
      assert_select "main#main-content", count: 1
    end

    get "/collections/grainger-museum"
    assert_select "section.campaign-banner-split[aria-labelledby=collection-heading] h1#collection-heading"
    assert_select "header.campaign-banner-split", count: 0
  end

  test "the Acknowledgement of Country advisory is body text colour, not the pale secondary colour" do
    get "/"

    assert_select "#country-acknowledgement p.text-body-secondary"
    assert_select "#country-acknowledgement .text-secondary", count: 0
  end
end
