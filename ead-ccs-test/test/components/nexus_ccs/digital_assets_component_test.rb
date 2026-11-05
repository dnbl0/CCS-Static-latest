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

  def media(*entries)
    { "title_tsim" => [ "Cary Pocket microscope" ], "digital_media_ssim" => entries }
  end

  test "a video plays in the accessible player, named for its label, with its file a link away" do
    render_for(media("video|video/mp4|/m/film.mp4|McCoy Society expedition film"))

    assert_selector "figure.digital-assets__media[data-controller~=media-player] video-compat-skin video[src='/m/film.mp4'][preload=metadata][aria-label='McCoy Society expedition film']"
    assert_no_selector "video[autoplay]"
    # native controls until the player script upgrades the element (and if it never loads); the script removes them
    assert_selector "video[controls]"
    assert_selector "a[href='/m/film.mp4'][download]", text: "Download McCoy Society expedition film"
  end

  test "audio plays in the audio player and gets the same download link" do
    render_for(media("audio|audio/mpeg|/m/talk.mp3|Burnett Cross interview, 17 min 15 sec"))

    assert_selector "figure.digital-assets__media[data-controller~=media-player] audio-compat-skin audio[src='/m/talk.mp3'][preload=metadata][aria-label='Burnett Cross interview, 17 min 15 sec']"
    assert_selector "audio[controls]"
    assert_selector "a[href='/m/talk.mp3'][download]", text: "Download Burnett Cross interview"
  end

  test "captions are a track of the video, on by default, and the transcript is a link beside the download" do
    render_for(media("video|video/mp4|/m/film.mp4|Film|/m/film.vtt|en|/m/film.pdf"))

    assert_selector "video track[kind=captions][src='/m/film.vtt'][srclang=en][label=English][default]"
    assert_selector "a[href='/m/film.pdf']", text: "Transcript of Film"
  end

  test "audio has no tracks, but its transcript is the text alternative" do
    render_for(media("audio|audio/mpeg|/m/talk.mp3|Interview|||/m/talk.pdf"))

    assert_no_selector "track"
    assert_selector "a[href='/m/talk.pdf']", text: "Transcript of Interview"
  end

  test "media without captions or a transcript shows neither, and claims nothing about them" do
    render_for(media("video|video/mp4|/m/film.mp4|Film"))

    assert_no_selector "track"
    assert_no_text "Transcript"
    assert_no_text "Captions"
  end

  test "a record without assets renders nothing" do
    render_for("title_tsim" => [ "No images here" ])
    assert_no_selector ".digital-assets"
  end

  test "the show page's embed component wraps it with the record summary" do
    assert_equal NexusCcs::RecordEmbedComponent, CatalogController.blacklight_config.view_config(:show).document_embed_component
  end

  test "every player and the large image carry a hidden state area for loading and errors, with a retry" do
    render_for(assets(1).merge("digital_media_ssim" => [ "video|video/mp4|/m/film.mp4|Film", "audio|audio/mpeg|/m/talk.mp3|Talk" ]))

    assert_selector "figure.digital-assets__main .digital-assets__state[hidden][role=status][data-media-viewer-target=state] button[data-action='media-viewer#retry']", visible: :all
    assert_selector "img.digital-assets__image[data-action~='error->media-viewer#imageFailed']"
    assert_selector "figure.digital-assets__media .digital-assets__state[hidden][data-media-player-target=state] button[data-action='media-player#retry']", count: 2, visible: :all
  end

  test "the test records give every mix of audio, video and images" do
    media = Collections::DigitalMedia.default
    images = YAML.safe_load_file(Rails.root.join("config/digital_assets.yml"))
    kinds = ->(accession) { Array(YAML.safe_load_file(Rails.root.join("config/digital_media.yml"))[accession]).map { |f| f["kind"] }.sort }

    assert_equal %w[audio video], kinds.("MHM03589")
    assert images["MHM03589"].size > 1
    assert_equal %w[audio], kinds.("MHM00048")
    assert images["MHM00048"].any?
    assert_equal %w[video], kinds.("1973.0755.000.A.000.L")
    assert images["1973.0755.000.A.000.L"].any?
    assert_equal %w[audio video], kinds.("MHM00033")
    assert_nil images["MHM00033"]
    assert media
  end
end
