require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

# The advanced search form submits only Blacklight's own parameters: clause[i][field|op|query], f_inclusive, f_all,
# range and sort. See NexusCcs::AdvancedSearchFormComponent and controllers/advanced_search_controller.js.
class AdvancedSearchFormTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers
  include Capybara::Minitest::Assertions

  def page = Capybara::Node::Simple.new(rendered_content)

  def config = CatalogController.blacklight_config

  def response_with(facets)
    docs = { "response" => { "docs" => [], "numFound" => 0 }, "facet_counts" => { "facet_fields" => facets } }
    Blacklight::Solr::Response.new(docs, {}, blacklight_config: config)
  end

  def render_form(url, facets: { "collection_ssim" => [ "Grainger Museum Collection", 5, "Medical History Museum", 3 ] }, modal: false)
    with_controller_class(CatalogController) do
      with_request_url(url) do
        render_inline(NexusCcs::AdvancedSearchFormComponent.new(url: "/catalog", classes: [ "advanced" ], params: Rack::Utils.parse_nested_query(URI(url).query.to_s).with_indifferent_access,
                                                                 response: response_with(facets), modal: modal))
      end
    end
  end

  test "every select in the form is turned into the site's field dropdown (the filter rail's box), the form's own parameters unchanged" do
    render_form("/catalog/advanced")

    %w[clause[0][field] clause[0][op] sort].each do |name|
      assert_selector "[data-controller='select-dropdown'][data-select-dropdown-variant-value='field'] select[name='#{name}']"
    end
    assert_selector "[data-controller='select-dropdown'][data-select-dropdown-variant-value='field'] select#adv-add-filter", visible: :all
    assert_selector "[data-controller='select-dropdown'][data-select-dropdown-variant-value='field'] select#adv-mode-collection_ssim", visible: :all
  end

  test "a search field for the description, with the others, is offered in every row" do
    render_form("/catalog/advanced")

    assert_selector "select[name='clause[0][field]'] option[value=description]"
    assert_selector "select[name='clause[0][field]'] option[value=all_fields]"
    assert_selector "select[name='clause[0][op]'] option[value=must]", text: "Contains all (AND)"
    assert_selector "select[name='clause[0][op]'] option[value=should]", text: "Contains any (OR)"
    assert_selector "select[name='clause[0][op]'] option[value=must_not]", text: "Does not contain (NOT)"
    assert_selector "input[name='clause[0][query]']"
  end

  test "one empty row to start, with a template for more and the limit of eight" do
    render_form("/catalog/advanced")

    assert_selector "fieldset.advanced-row", count: 1
    assert_equal "8", page.find("form")["data-advanced-search-max-rows-value"]
    assert_includes rendered_content, "clause[__INDEX__][query]"
  end

  test "the rows are the current clauses, with their match types" do
    render_form("/catalog/advanced?clause[0][field]=title&clause[0][op]=must_not&clause[0][query]=portrait&clause[1][field]=creator&clause[1][op]=should&clause[1][query]=smith")

    assert_selector "fieldset.advanced-row", count: 2
    assert_selector "select[name='clause[0][op]'] option[selected][value=must_not]"
    assert_selector "input[name='clause[0][query]'][value=portrait]"
    assert_selector "select[name='clause[1][field]'] option[selected][value=creator]"
    assert_selector "select[name='clause[1][op]'] option[selected][value=should]"
  end

  test "the current query is the first row when there are no clauses" do
    render_form("/catalog/advanced?q=art")

    assert_selector "input[name='clause[0][query]'][value=art]"
    assert_selector "select[name='clause[0][field]'] option[selected][value=all_fields]"
  end

  test "a filter's values are f_inclusive checkboxes, or f_all when it includes all" do
    render_form("/catalog/advanced")
    assert_selector "input[type=checkbox][name='f_inclusive[collection_ssim][]'][value='Grainger Museum Collection']", visible: :all

    render_form("/catalog/advanced?f_all[collection_ssim][]=Medical+History+Museum")
    assert_selector "input[type=checkbox][name='f_all[collection_ssim][]'][value='Medical History Museum'][checked]", visible: :all
    assert_selector "select[data-action='advanced-search#changeMode'] option[selected][value=all]", visible: :all
  end

  test "the date ranges and the sort are prefilled" do
    render_form("/catalog/advanced?range[date_start_isi][begin]=1900&range[date_start_isi][end]=1950&sort=date-desc")

    assert_selector "input[name='range[date_start_isi][begin]'][value='1900']"
    assert_selector "input[name='range[date_start_isi][end]'][value='1950']"
    assert_selector "select[name=sort] option[selected][value=date-desc]"
  end

  test "the form is a GET to the results page, with an error summary and Start over" do
    render_form("/catalog/advanced")

    assert_selector "form[action='/catalog'][method=get]"
    assert_selector ".advanced-form__errors[role=alert]", visible: :all
    assert_link "Start over"
    assert_selector "input[type=submit][value=Search]"
  end

  test "in the flyout the form has the modal class" do
    render_form("/catalog/advanced", modal: true)

    assert_selector "form.advanced-form--modal"
  end

  test "a failed check moves focus to the error summary, which is a focusable alert" do
    js = Rails.root.join("app/javascript/controllers/advanced_search_controller.js").read
    assert_includes js, 'this.errorsTarget.setAttribute("tabindex", "-1")'
    assert_includes js, "this.errorsTarget.focus()"
    assert_includes Rails.root.join("app/assets/stylesheets/components/advanced_search.css").read, ".advanced-form__errors:focus-visible"
  end
end
