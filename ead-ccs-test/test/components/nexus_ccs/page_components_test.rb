require "test_helper"

class PageComponentsTest < ViewComponent::TestCase
  test "the breadcrumb links every item but the last, and has no separate mobile breadcrumb" do
    render_inline(NexusCcs::PageBreadcrumbsComponent.new(trail: [ [ "Help and support", "/help" ], [ "Privacy", nil ] ]))

    assert_selector "nav.page-breadcrumbs[aria-label=Breadcrumb] ol.page-local-history li", count: 3
    assert_selector "li[aria-current=page] .page-local-history__item-text", text: "Privacy"
    assert_selector "li a[href='/help'][title='Help and support']"
    assert_no_selector ".bc-mobile"
    assert_selector "nav.page-breadcrumbs ol", count: 1
  end

  test "the banner has the page heading and its description" do
    render_inline(NexusCcs::PageBannerComponent.new(title: "Browse collections", description: "Five collections."))

    assert_selector "section.page-banner h1.page-banner__heading", text: "Browse collections"
    assert_selector "p.page-banner__desc", text: "Five collections."
  end

  test "a pathfinder card opens an external page in a new tab and says so" do
    render_inline(NexusCcs::PathfinderItemComponent.new(href: "https://example.org", title: "Museum website", summary: "Hours.", external: true))

    assert_selector "li.pathfinder__item a.pathfinder__link[target=_blank][rel=noopener][href='https://example.org']"
    assert_selector ".pathfinder__title .sr-only", text: "(opens in a new tab)"
  end

  test "an internal pathfinder card has no new tab and the search card has its own class" do
    render_inline(NexusCcs::PathfinderItemComponent.new(href: "/catalog", title: "Search", summary: "All.", search: true))

    assert_selector "li.pathfinder__item.ct-listing__item--search a.pathfinder__link[href='/catalog']:not([target])"
    assert_no_selector ".sr-only"
  end
end
