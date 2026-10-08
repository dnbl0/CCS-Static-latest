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

  test "a record without media is unchanged" do
    document = { "accession_number_ssim" => [ "Y" ] }
    assert_equal document, MEDIA.attach(document)
  end
end
