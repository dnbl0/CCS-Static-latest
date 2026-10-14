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
    assert_selector "figure.digital-assets__main picture.digital-assets__viewer[role=img][aria-label='Cary Pocket microscope']"
    assert_selector "picture.digital-assets__viewer source[src='/digital-assets/large/a1.jpg']", count: 1, visible: :all
    assert_no_selector ".digital-assets__others"
  end

  test "several assets: one gallery viewer holds them all and a thumbnail for each shows its image" do
    render_for(assets(3))

    assert_selector "h2", text: "Digital assets"
    assert_selector "picture.digital-assets__viewer[aria-label='Cary Pocket microscope, image 1 of 3']"
    assert_selector "picture.digital-assets__viewer source", count: 3, visible: :all
    assert_selector ".digital-assets__others li", count: 3
    assert_selector "a.digital-assets__other[aria-current=true][href='/digital-assets/large/a1.jpg']"
    assert_selector "a.digital-assets__other[href='/digital-assets/large/a2.jpg'][target=_blank][rel=noopener][data-media-viewer-page='1'] img[src='/digital-assets/thumbs/a2.jpg']"
    assert_selector "a img[alt='Cary Pocket microscope, image 3 of 3 (opens full size in a new tab)']"
  end

  MEDIA = [ "video|video/mp4|/m/interview.mp4|Interview", "audio|audio/mpeg|/m/oral.mp3|Oral history", "pdf|application/pdf|/m/catalogue.pdf|Catalogue entry" ].freeze

  test "audio, video and PDF files are gallery items: a player each in the stage and a thumbnail tile each, after the images" do
    render_for(assets(2).merge("digital_media_ssim" => MEDIA))

    assert_selector "figure#digital-assets-media-0 video[controls][aria-label=Interview] source[src='/m/interview.mp4']", visible: :all
    assert_selector "figure#digital-assets-media-1 audio[controls][aria-label='Oral history']", visible: :all
    assert_selector "figure#digital-assets-media-2 object[type='application/pdf'][data='/m/catalogue.pdf'] a[href='/m/catalogue.pdf']", visible: :all
    assert_selector ".digital-assets__others li", count: 5
    tiles = page.all("a.digital-assets__other[data-media-viewer-media]")
    assert_equal %w[digital-assets-media-0 digital-assets-media-1 digital-assets-media-2], tiles.map { |tile| tile["data-media-viewer-media"] }
    assert_equal %w[video audio pdf], tiles.map { |tile| tile["data-media-viewer-kind"] }
    assert_includes tiles.first.text(:all), "Video: Interview (opens in a new tab)"
    assert_selector "a.digital-assets__other[aria-current=true]", count: 1
  end

  test "a record with only files has no image viewer and the first file on show" do
    render_for("title_tsim" => [ "Recording" ], "digital_media_ssim" => MEDIA.drop(1))

    assert_no_selector "picture.digital-assets__viewer", visible: :all
    assert_selector "audio", visible: :all
    assert_selector ".digital-assets__others li", count: 2
    assert_selector "a.digital-assets__other[aria-current=true][data-media-viewer-kind=audio]"
  end

  test "a single file is on its own, with no thumbnails" do
    render_for("title_tsim" => [ "Recording" ], "digital_media_ssim" => MEDIA.take(1))

    assert_selector "video", visible: :all
    assert_no_selector ".digital-assets__others"
  end

  def render_mosaic(fields)
    render_inline(NexusCcs::DigitalAssetsComponent.new(presenter: Presenter.new(SolrDocument.new(fields)), layout: "mosaic"))
  end

  test "the mosaic: the first image large, four tiles beside it, a Show all button and a button for each kind, and the whole gallery in a window" do
    render_mosaic(assets(3).merge("digital_media_ssim" => MEDIA))

    assert_selector "section.digital-assets-mosaic h2.visually-hidden", text: "Digital assets"
    assert_selector ".digital-assets-mosaic__tile", count: 5
    assert_selector "button.digital-assets-mosaic__tile[aria-label='Open Cary Pocket microscope, image 1 of 3'][data-mosaic-index-param='0']"
    assert_selector "button.digital-assets-mosaic__tile[aria-label='Open Video: Interview'][data-mosaic-index-param='3']"
    assert_selector "button[data-action='mosaic#open']", text: "Show all 6"
    assert_equal [ "Photos 3", "Video 1", "Audio 1", "PDF 1" ], page.all("nav[aria-label='Digital assets by type'] button").map { |b| b.text.squish }
    assert_selector "aside.modal#digital-assets-gallery .modal-dialog.modal-fullscreen section.digital-assets picture.digital-assets__viewer", visible: :all
  end

  # Collection images are never cropped: whatever their shape they show whole, on white, inside a 1px light gray stroke
  test "images are never cropped: tiles and thumbnails contain the image on white with a light gray stroke" do
    render_mosaic(assets(3))
    assert_selector "button.digital-assets-mosaic__tile.bg-white.border.border-light-subtle img.object-fit-contain", count: 3
    assert_no_selector ".object-fit-cover"

    render_for(assets(3))
    assert_selector "a.digital-assets__other img.digital-assets__thumbnail.object-fit-contain.bg-white.border.border-light-subtle", count: 3
    assert_no_selector ".object-fit-cover"
  end

  # Blacklight's layout sets Bootstrap's theme from the computer's, but the site's own styling is light only: the gallery is pinned to light
  test "the band and the mosaic are pinned to Bootstrap's light theme" do
    render_for(assets(2))
    assert_selector "section.digital-assets[data-bs-theme=light]"

    render_mosaic(assets(2))
    assert_selector "section.digital-assets-mosaic[data-bs-theme=light]"
    assert_selector "#digital-assets-gallery section.digital-assets[data-bs-theme=light]", visible: :all
  end

  test "the mosaic is rows of tiles: one row for one or two items, two rows for more, up to five tiles" do
    { 1 => [ 1 ], 2 => [ 2 ], 3 => [ 1, 2 ], 4 => [ 2, 2 ], 8 => [ 2, 3 ] }.each do |count, rows|
      render_mosaic(assets(count))
      assert_equal rows, page.all(".digital-assets-mosaic__row", visible: :all).map { |row| row.all(".digital-assets-mosaic__tile", visible: :all).size }, "#{count} images"
    end

    render_mosaic(assets(8))
    assert_selector "button", text: "Show all 8"
  end

  test "each tile has the shape of its asset: a --ratio for the stylesheet and the script to size it by, and only the first tile shows on a phone" do
    render_mosaic(assets(3).merge("digital_media_ssim" => MEDIA.take(1)))

    tiles = page.all(".digital-assets-mosaic__tile", visible: :all)
    assert_equal 4, tiles.size
    assert tiles.all? { |tile| tile["style"].match?(/--ratio: [\d.]+/) && tile["data-mosaic-target"] == "tile" }
    assert_match(/--ratio: 1\.7778/, tiles.last["style"]) # a video: 16:9
    assert_equal [ false, true, true, true ], tiles.map { |tile| tile[:class].include?("d-none d-lg-block") }
    assert_selector ".digital-assets-mosaic__row.d-none.d-lg-flex", visible: :all, count: 1
  end

  def render_split(fields)
    render_inline(NexusCcs::DigitalAssetsComponent.new(presenter: Presenter.new(SolrDocument.new(fields)), layout: "split"))
  end

  test "the split layout: the title and details in a third on the left, one large item and a row of up to three on the right, +N for the rest" do
    render_split(assets(8).merge("creator_display_ssim" => [ "Judy Mengil (b.1954)" ], "object_type_ssim" => [ "Painting" ], "collection_ssim" => [ "Grainger Museum" ],
                                 "production_date_ssim" => [ "2016" ], "licence_type_ssim" => [ "Copyright - Current" ]))

    assert_selector "section.digital-assets-mosaic--split .row > article.col-lg-4 p.h2", text: "Cary Pocket microscope"
    assert_selector "article.col-lg-4", text: "Painting • Grainger Museum"
    assert_selector "article.col-lg-4", text: "Judy Mengil (b.1954) · 2016"
    assert_selector "article.col-lg-4", text: "Copyright - Current"
    assert_selector "article.col-lg-4 button", text: "View all 8 digital assets"
    assert_selector ".row > .col-lg-8 .digital-assets-mosaic__grid"
    assert_equal [ 1, 3 ], page.all(".digital-assets-mosaic__row", visible: :all).map { |row| row.all(".digital-assets-mosaic__tile", visible: :all).size }
    assert_selector ".digital-assets-mosaic__tile", text: "+4", visible: :all, count: 1
    assert_selector "button.digital-assets-mosaic__tile[aria-label^='+4 more: Open']", visible: :all, count: 1
    assert_selector "#digital-assets-gallery section.digital-assets", visible: :all
  end

  test "the split layout with four or fewer items has no +N, and the mosaic never has one" do
    render_split(assets(4))
    assert_no_selector ".digital-assets-mosaic__tile", text: "+", visible: :all

    render_mosaic(assets(8))
    assert_no_selector ".digital-assets-mosaic__tile", text: "+", visible: :all
  end

  test "the stage is the layout unless the mosaic is asked for" do
    render_for(assets(2))
    assert_no_selector ".digital-assets-mosaic"
    assert_selector "section.digital-assets"
  end

  test "a record without assets renders nothing" do
    render_for("title_tsim" => [ "No images here" ])
    assert_no_selector ".digital-assets"
  end

  test "the show page's embed component wraps it with the record summary" do
    assert_equal NexusCcs::RecordEmbedComponent, CatalogController.blacklight_config.view_config(:show).document_embed_component
  end
end
