require "test_helper"

class DigitalAssetsTest < ActiveSupport::TestCase
  ASSETS = Collections::DigitalAssets.new("MHM2017.28" => [ "MHM2017.28.jpg" ], "1973.0755" => [ "1973_0755_B~PF.jpg", "1973_0755_C~PF.jpg" ])

  test "a record whose accession number has images gains the digital asset fields" do
    document = ASSETS.attach("id" => "vernon-MHM2017.28", "accession_number_ssim" => [ "MHM2017.28" ])

    assert_equal "/digital-assets/thumbs/mhm2017_28.jpg", document["thumbnail_path_ssi"]
    assert_equal [ "/digital-assets/thumbs/mhm2017_28.jpg" ], document["digital_asset_paths_ssim"]
    assert_equal [ "/digital-assets/large/mhm2017_28.jpg" ], document["digital_asset_large_paths_ssim"]
    assert_equal true, document["has_digital_asset_bsi"]
  end

  test "the first image is the thumbnail and all images are listed" do
    document = ASSETS.attach("accession_number_ssim" => [ "1973.0755" ])

    assert_equal "/digital-assets/thumbs/1973_0755_b_pf.jpg", document["thumbnail_path_ssi"]
    assert_equal 2, document["digital_asset_paths_ssim"].size
  end

  test "a record without images is left unchanged" do
    document = { "id" => "emu-1", "accession_number_ssim" => [ "X.1" ] }

    assert_equal document, ASSETS.attach(document)
    assert_equal({ "id" => "emu-2" }, ASSETS.attach("id" => "emu-2"))
  end

  test "thumbnail names are URL-safe" do
    assert_equal "2001_0008_b_web.jpg", Collections::DigitalAssets.thumbnail_name("2001_0008 B web.jpg")
    assert_equal "nyarrin-nyarrin_patrick_mung_mung_cropped.jpg", Collections::DigitalAssets.thumbnail_name("Nyarrin-Nyarrin Patrick Mung Mung cropped.jpg")
  end

  test "every image listed in config/digital_assets.yml has a thumbnail in public" do
    YAML.safe_load_file(Rails.root.join(Collections::DigitalAssets::CONFIG)).each_value do |files|
      files.each do |file|
        thumb = Rails.root.join("public/digital-assets/thumbs", Collections::DigitalAssets.thumbnail_name(file))
        assert thumb.exist?, "missing thumbnail for #{file}: run bin/rails digital_assets:thumbnails"
        assert Rails.root.join("public/digital-assets/large", Collections::DigitalAssets.thumbnail_name(file)).exist?, "missing large image for #{file}"
      end
    end
  end
end
