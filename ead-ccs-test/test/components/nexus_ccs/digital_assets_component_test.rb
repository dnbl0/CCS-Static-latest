require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

class DigitalAssetsComponentTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers
  include Capybara::Minitest::Assertions

  Presenter = Struct.new(:document)

  def page = Capybara::Node::Simple.new(rendered_content)

  def render_for(fields)
    render_inline(NexusCcs::DigitalAssetsComponent.new(presenter: Presenter.new(SolrDocument.new(fields))))
  end

  def assets(count)
    names = (1..count).map { |n| "a#{n}.jpg" }
    {
      "title_tsim" => [ "Cary Pocket microscope" ],
      "digital_asset_paths_ssim" => names.map { |n| "/digital-assets/thumbs/#{n}" },
      "digital_asset_large_paths_ssim" => names.map { |n| "/digital-assets/large/#{n}" }
    }
  end

  test "a single asset is one large image named for the record" do
    render_for(assets(1))

    assert_selector "section.digital-assets h2.visually-hidden", text: "Digital asset", exact_text: true
    assert_selector "figure.digital-assets__main img[src='/digital-assets/large/a1.jpg'][alt='Cary Pocket microscope']"
    assert_no_selector ".digital-assets__others"
  end

  test "several assets: the first is large and the rest are thumbnails that open the large image" do
    render_for(assets(3))

    assert_selector "h2", text: "Digital assets"
    assert_selector "figure img[alt='Cary Pocket microscope, image 1 of 3']"
    assert_selector ".digital-assets__others li", count: 2
    assert_selector "a.digital-assets__other[href='/digital-assets/large/a2.jpg'][target=_blank][rel=noopener] img[src='/digital-assets/thumbs/a2.jpg']"
    assert_selector "a img[alt='Cary Pocket microscope, image 3 of 3 (opens full size in a new tab)']"
  end

  test "a record without assets renders nothing" do
    render_for("title_tsim" => [ "No images here" ])
    assert_no_selector ".digital-assets"
  end

  test "the show page's embed component wraps it with the record summary" do
    assert_equal NexusCcs::RecordEmbedComponent, CatalogController.blacklight_config.view_config(:show).document_embed_component
  end
end
