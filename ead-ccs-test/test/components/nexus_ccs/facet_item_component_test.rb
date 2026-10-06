require "test_helper"

class FacetItemComponentTest < ActiveSupport::TestCase
  test "a ticked value is the link that removes it, with no separate x" do
    source = Rails.root.join("app/components/nexus_ccs/facet_item_component.rb").read
    assert_includes source, 'role: "checkbox"'
    assert_includes source, 'checked: "true"'
    assert_includes source, "Remove filter"
    assert_no_match(/SelectedValueComponent/, source)
  end

  test "every list filter uses it; range filters keep the plugin's row, which is hidden" do
    config = CatalogController.blacklight_config
    list = config.facet_fields.values.reject { |f| f.range }
    assert list.all? { |f| f.item_component == NexusCcs::FacetItemComponent }, list.reject { |f| f.item_component == NexusCcs::FacetItemComponent }.map(&:key).inspect
    css = Rails.root.join("app/assets/stylesheets/components/filter_rail.css").read
    assert_includes css, ".range_limit .current {\n  display: none;"
    assert_includes Rails.root.join("app/javascript/controllers/range_slider_controller.js").read, "range-clear"
  end
end
