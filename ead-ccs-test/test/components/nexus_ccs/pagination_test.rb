require "test_helper"

class PaginationTest < ViewComponent::TestCase
  def render_pager(page:, total: 500, per: 40)
    response = Blacklight::Solr::Response.new({ "response" => { "numFound" => total, "start" => (page - 1) * per, "docs" => [] } }, { rows: per, start: (page - 1) * per })
    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=art&page=#{page}") do
        render_inline(Blacklight::Response::PaginationComponent.new(response: response, window: 2, outer_window: 1))
      end
    end
  end

  test "a middle page has Previous and Next buttons, the current page marked, and gaps" do
    render_pager(page: 5)

    assert_selector "a.pagination__button[rel=prev][aria-label='Previous page']", text: "Previous"
    assert_selector "a.pagination__button[rel=next][aria-label='Next page']", text: "Next"
    assert_selector "li.page-item.active a.page-link[aria-current=page]", text: "5"
    assert_selector "li.page-item.disabled span.page-link", text: "…"
    assert_selector "a.page-link", text: "13"
  end

  test "the first page has no Previous button and the last has no Next" do
    render_pager(page: 1)
    assert_no_selector "a[rel=prev].pagination__button"
    assert_selector "a[rel=next].pagination__button"

    render_pager(page: 13)
    assert_selector "a[rel=prev].pagination__button"
    assert_no_selector "a[rel=next].pagination__button"
  end

  test "the buttons carry their arrow icons, hidden from assistive technology" do
    render_pager(page: 5)
    assert_selector "a[rel=prev] img[alt='']"
    assert_selector "a[rel=next] img[alt='']"
  end

  test "the pager styles are in their own stylesheet, imported once" do
    css = Rails.root.join("app/assets/stylesheets")
    assert_includes css.join("application.css").read, 'components/pagination.css'
    assert_no_match(/\.paginate-section/, css.join("components/results_toolbar.css").read)
    assert_includes css.join("components/pagination.css").read, "@media (max-width: 575.98px)"
  end
end
