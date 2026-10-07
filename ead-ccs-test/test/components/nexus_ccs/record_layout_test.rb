require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

class RecordLayoutTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers
  include Capybara::Minitest::Assertions

  def page = Capybara::Node::Simple.new(rendered_content)

  def presenter(fields)
    document = SolrDocument.new({ "id" => "emu-1" }.merge(fields))
    Blacklight::DocumentPresenter.new(document, nil, CatalogController.blacklight_config)
  end

  def component(fields)
    NexusCcs::RecordDocumentComponent.new(document: presenter(fields), id: "document", component: :div, show: true)
  end

  FIELDS = {
    "title_tsim" => [ "Kangaroo-pouch tone-tool" ], "object_type_ssim" => [ "tone tool" ], "production_date_ssim" => [ "1952" ],
    "creator_ssim" => [ "Grainger, Percy Aldridge" ], "material_ssim" => [ "Paper" ], "collection_ssim" => [ "Grainger Museum Collection" ],
    "rights_ssim" => [ "© Grainger, Percy Aldridge" ], "credit_line_tsim" => [ "Grainger Museum Collection, University of Melbourne." ],
    "format" => [ "Object" ]
  }.freeze

  test "the summary is the title, the creator and date, and tags" do
    c = component(FIELDS)

    assert_equal "Grainger, Percy Aldridge · 1952", c.byline
    assert_equal [ "Object", "Grainger Museum Collection" ], c.tags
    assert_equal "Kangaroo-pouch tone-tool", c.heading
  end

  test "the details list is Title first, the record's own id (UoM ID, copyable) just before the collection" do
    labels = component(FIELDS).rows.map(&:label)

    assert_equal "Title", labels.first
    assert_equal "UoM ID", labels[labels.index("Collection") - 1]
    assert component(FIELDS).rows.find { |row| row.label == "UoM ID" }.copy
  end

  test "the rights fields are in the Copyright card, not in the details list" do
    c = component(FIELDS)
    fields = c.rows.map(&:field)

    assert_not_includes fields, "rights_ssim"
    assert_not_includes fields, "credit_line_tsim"
    assert c.copyright_card?
    assert_equal "Kangaroo-pouch tone-tool. 1952. Grainger, Percy Aldridge. Paper. © Grainger, Percy Aldridge. Grainger Museum Collection.", c.caption
  end

  test "a record with no rights fields has no Copyright card" do
    c = component("title_tsim" => [ "Untitled" ])

    assert_not c.copyright_card?
    assert_nil c.byline
    assert_empty c.tags
  end

  test "the document component for a record is registered with Blacklight" do
    assert_equal NexusCcs::RecordDocumentComponent, CatalogController.blacklight_config.view_config(:show).document_component
  end

  test "the clipboard controller copies text from an input or a data-copy element and keeps a button's icon" do
    js = Rails.root.join("app/javascript/controllers/clipboard_controller.js").read
    assert_includes js, "source.value ?? source.dataset.copy"
    assert_includes js, 'static targets = ["source", "button", "status", "label"]'
  end
end
