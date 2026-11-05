require "test_helper"

class DigitalMediaTest < ActiveSupport::TestCase
  MEDIA = Collections::DigitalMedia.new("X.1" => [ { "kind" => "video", "file" => "a b.mp4", "type" => "video/mp4", "label" => "Film" } ])

  test "a record whose accession has media gains the media fields and format" do
    document = MEDIA.attach("accession_number_ssim" => [ "X.1" ], "digital_asset_format_ssim" => [ "Image" ])

    assert_equal [ "video|video/mp4|/digital-assets/media/a%20b.mp4|Film" ], document["digital_media_ssim"]
    assert_equal [ "Image", "Video" ], document["digital_asset_format_ssim"]
    assert_equal true, document["has_digital_asset_bsi"]
  end

  test "entries parse back" do
    assert_equal({ kind: "video", type: "video/mp4", url: "/u", label: "Film" }, Collections::DigitalMedia.parse("video|video/mp4|/u|Film"))
  end

  CAPTIONED = Collections::DigitalMedia.new("X.2" => [
    { "kind" => "video", "file" => "film.mp4", "type" => "video/mp4", "label" => "Film",
      "captions" => { "file" => "film en.vtt", "lang" => "en" }, "transcript" => "film transcript.pdf" }
  ])

  test "captions and a transcript are stored beside the file, served from the same place" do
    entry = CAPTIONED.attach("accession_number_ssim" => [ "X.2" ])["digital_media_ssim"].first

    assert_equal "video|video/mp4|/digital-assets/media/film.mp4|Film|/digital-assets/media/film%20en.vtt|en|/digital-assets/media/film%20transcript.pdf", entry
  end

  test "captions and a transcript parse back, and are absent when a file has none" do
    parsed = Collections::DigitalMedia.parse("video|video/mp4|/u|Film|/c.vtt|en|/t.pdf")
    assert_equal({ kind: "video", type: "video/mp4", url: "/u", label: "Film", captions: { url: "/c.vtt", lang: "en" }, transcript: "/t.pdf" }, parsed)
    assert_equal [ :kind, :type, :url, :label ], Collections::DigitalMedia.parse("video|video/mp4|/u|Film").keys
  end

  test "a record without media is unchanged" do
    document = { "accession_number_ssim" => [ "Y" ] }
    assert_equal document, MEDIA.attach(document)
  end
end
