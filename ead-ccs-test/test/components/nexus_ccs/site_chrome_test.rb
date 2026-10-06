require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

class SiteChromeTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers
  include Capybara::Minitest::Assertions

  def page
    Capybara::Node::Simple.new(rendered_content)
  end

  def render_header(url: "/catalog?q=skull", action: "index")
    with_controller_class(CatalogController) do
      with_request_url(url) do
        vc_test_controller.action_name = action
        render_inline(NexusCcs::HeaderComponent.new(blacklight_config: CatalogController.blacklight_config))
      end
    end
  end

  def with_static_site(url)
    original = Rails.configuration.x.ccs.static_site_url
    Rails.configuration.x.ccs.static_site_url = url
    yield
  ensure
    Rails.configuration.x.ccs.static_site_url = original
  end

  test "header has the audience links, search toggle and a collections menu that filters by facet" do
    with_static_site(nil) { render_header }

    assert_selector "header.site-header"
    assert_selector ".site-header__utility a", count: NexusCcs::SiteNavigation::AUDIENCE.size
    assert_selector "button.site-header__search-toggle[aria-label='Open search']"
    assert_selector "#site-nav-collections a[href*='collection_ssim']", count: NexusCcs::SiteNavigation::COLLECTIONS.size
    assert_selector "#search-overlay form[role=search]"
    assert_selector "#site-nav form[role=search]"
  end

  test "header leaves out Help and Contact until the static site URL is configured" do
    with_static_site(nil) { render_header }
    assert_no_selector "#site-nav-help"
    assert_no_link "Contact", href: %r{/contact\.html}

    with_static_site("http://static.test/") { render_header }
    assert_selector "#site-nav-help a[href='http://static.test/help?topic=faq']"
    assert_link "Contact", href: "http://static.test/contact.html"
  end

  test "header menu controls are wired to the site-header Stimulus controller" do
    with_static_site("http://static.test") { render_header }

    assert_selector "header[data-controller='site-header']"
    assert_selector "button.site-nav__trigger[aria-expanded='false'][data-action='site-header#toggleSection']", count: 2
    assert_selector "button.site-header__menu[aria-controls='site-nav'][aria-expanded='false']"
    assert_selector "#site-nav-collections button.site-nav__back"
  end

  test "search results show the breadcrumb and a banner with the search form" do
    render_header

    assert_selector "nav.breadcrumb-bar[aria-label=Breadcrumb] li[aria-current=page]", text: "Search results"
    assert_selector "section.search-banner .search-banner__title", text: "Search the Collection"
    assert_selector "section.search-banner form.search-banner__form"
    assert_no_selector "h1" # the banner title is not a heading: pages render their own h1
    assert_no_selector "nav.topbar" # Blacklight's own top navbar is replaced
  end

  test "the home page has no breadcrumb" do
    render_header(url: "/")
    assert_no_selector "nav.breadcrumb-bar"
  end

  test "breadcrumb links every item but the last" do
    render_inline(NexusCcs::BreadcrumbComponent.new(items: [ [ "Search results", "/catalog" ], [ "A skull", nil ] ]))

    assert_selector "a[href='/catalog']", text: "Search results"
    assert_selector "li[aria-current=page]", text: "A skull"
    assert_no_selector "li[aria-current=page] a"
  end

  test "breadcrumb renders nothing without items" do
    render_inline(NexusCcs::BreadcrumbComponent.new(items: []))
    assert_no_selector "nav"
  end

  test "footer has the acknowledgement, links, social icons and identifiers" do
    render_inline(NexusCcs::SiteFooterComponent.new)

    assert_selector "footer.site-footer h2", text: "Acknowledgement of Country"
    assert_selector ".site-footer__links a", count: NexusCcs::SiteNavigation::FOOTER_ABOUT.size
    assert_selector ".site-footer__social a[aria-label]", count: NexusCcs::SiteNavigation::FOOTER_SOCIAL.size
    assert_selector ".site-footer__identifiers", text: "CRICOS: 00116K"
  end

  test "the search overlay lists the visitor's recent searches (CCS-143)" do
    recent = Search.create!(query_params: { q: "harp" })
    other = Search.create!(query_params: { q: "someone elses" })

    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=skull") do
        vc_test_request.session[:history] = [ recent.id ]
        render_inline(NexusCcs::SearchOverlayComponent.new)
      end
    end

    assert_selector "nav.search-overlay__recent[aria-label='Recent searches'] a", text: "harp"
    assert_no_selector ".search-overlay__recent", text: other.query_params["q"]
  end

  test "the search overlay has no recent searches list when there is no history" do
    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=skull") { render_inline(NexusCcs::SearchOverlayComponent.new) }
    end

    assert_no_selector ".search-overlay__recent"
    assert_selector "#search-overlay-input[maxlength='255']"
  end
end
