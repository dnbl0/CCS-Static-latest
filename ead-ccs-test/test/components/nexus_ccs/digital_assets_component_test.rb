require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

# The media band after the CCS UI "Record" (Figma 429:36672): the record's title, byline and tags on the left; with digital assets, the viewer on the
# right. Three states: no assets (the title alone), one asset (no thumbnails, no previous and next), several assets.
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

  MEDIA = [ "video|video/mp4|/m/interview.mp4|Interview", "audio|audio/mpeg|/m/oral.mp3|Oral history", "pdf|application/pdf|/m/catalogue.pdf|Catalogue entry" ].freeze

  DETAILS = { "creator_ssim" => [ "Judy Mengil" ], "production_date_ssim" => [ "2016" ], "format" => [ "Object" ], "collection_ssim" => [ "Grainger Museum" ] }.freeze

  test "the band has the title as the page's one h1, then the byline and the tags as links to their filters" do
    render_for(assets(1).merge(DETAILS))

    assert_selector "section.digital-assets[aria-labelledby=record-title] article h1#record-title", text: "Cary Pocket microscope", exact_text: true
    assert_selector "article p.digital-assets__byline", text: "Judy Mengil · 2016"
    assert_selector "article ul[aria-label=Tags] li a.record-tag", count: 2
    assert_selector "a.record-tag[href*='f%5Bformat%5D%5B%5D=Object']", text: "Object"
    assert_selector "a.record-tag[href*='f%5Bcollection_ssim%5D%5B%5D=Grainger+Museum']", text: "Grainger Museum"
  end

  test "no asset: the band is the title alone, with no viewer, thumbnails, buttons or panel" do
    render_for("title_tsim" => [ "No images here" ])

    assert_selector "section.digital-assets h1", text: "No images here"
    assert_no_selector ".digital-assets__viewer-column"
    assert_no_selector "picture, button, nav, aside, .digital-assets__others", visible: :all
  end

  test "one asset: the viewer and its buttons, with no thumbnails and no previous and next" do
    render_for(assets(1))

    assert_selector "section.digital-assets h2.visually-hidden", text: "Digital asset", exact_text: true
    assert_selector ".digital-assets__display figure.digital-assets__main picture.digital-assets__viewer[role=img][aria-label='Cary Pocket microscope']"
    assert_selector "picture.digital-assets__viewer source[src='/digital-assets/large/a1.jpg']", count: 1, visible: :all
    assert_selector "button[aria-label='Full screen'][hidden]", visible: :all
    assert_no_selector ".digital-assets__others"
    assert_no_selector "button[aria-label=Previous], button[aria-label=Next]"
  end

  test "several assets: one viewer holds them all, a thumbnail for each, and previous (disabled on the first) and next" do
    render_for(assets(3))

    assert_selector "h2", text: "Digital assets"
    assert_selector "picture.digital-assets__viewer[aria-label='Cary Pocket microscope, image 1 of 3']"
    assert_selector "picture.digital-assets__viewer source", count: 3, visible: :all
    assert_selector "nav[aria-label='Digital assets'] .digital-assets__others li", count: 3
    assert_selector "a.digital-assets__other[aria-current=true][href='/digital-assets/large/a1.jpg'].border-white"
    assert_selector "a.digital-assets__other[href='/digital-assets/large/a2.jpg'][target=_blank][rel=noopener][data-media-viewer-page='1'].border-transparent img[src='/digital-assets/thumbs/a2.jpg']"
    assert_selector "a img[alt='Cary Pocket microscope, image 3 of 3 (opens full size in a new tab)']"
    assert_selector "button[aria-label=Previous][disabled][data-action='media-viewer#previous']"
    assert_selector "button[aria-label=Next][data-action='media-viewer#next']:not([disabled])"
  end

  test "audio, video and PDF files are items: a player each in the viewer's box and a thumbnail tile each, after the images" do
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

  # Collection images are never cropped: a thumbnail is its image's shape, whole, on white inside a 1px light gray stroke
  test "thumbnails contain the image on white with a light gray stroke, never cropped" do
    render_for(assets(3))

    assert_selector "a.digital-assets__other img.digital-assets__thumbnail.bg-white.border.border-light-subtle", count: 3
    assert_no_selector ".object-fit-cover"
  end

  # Blacklight's layout sets Bootstrap's theme from the computer's, but the site's own styling is light only: the band is pinned to light
  test "the band is pinned to Bootstrap's light theme" do
    render_for(assets(2))
    assert_selector "section.digital-assets[data-bs-theme=light]"
  end

  test "the band is Bootstrap's classes and semantic elements" do
    render_for(assets(3).merge(DETAILS))

    assert_selector "section.digital-assets article"
    assert_selector "section.digital-assets section nav ul li"
    assert_selector "figure.digital-assets__main"
    assert_selector "aside#media-metadata", visible: :all
  end

  test "the show page's band is the layout: there is no choice of layout" do
    assert_not_respond_to NexusCcs::DigitalAssetsComponent.new(presenter: Presenter.new(SolrDocument.new({}))), :layout
  end
end
