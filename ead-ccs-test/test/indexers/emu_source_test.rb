require "test_helper"
require "tmpdir"

class EmuSourceTest < ActiveSupport::TestCase
  # Real rows from data/emu.csv: the contrabass sarrusophone (00.0070) and its case (00.0071), the Quinn life study
  # (0000.013) and a musical glass (00.0130). In the export's accession column the first two read 0.007 and 0.0071 and
  # the last two both read 0.013.
  IRNS = %w[400329 400330 106217 400416].freeze

  setup do
    lines = File.readlines(Rails.root.join("data/emu.csv"), encoding: "bom|utf-8")
    rows = lines.drop(1).select { |line| IRNS.include?(line.split(",", 3)[1]) }
    @dir = Dir.mktmpdir
    path = File.join(@dir, "emu.csv")
    File.write(path, "\uFEFF" + lines.first + rows.join)
    @documents = Collections::EmuSource.new(path).each_document.index_by { |document| document["source_identifier_ssi"] }
  end

  teardown { FileUtils.remove_entry(@dir) }

  test "the UoM ID names the EMu system (emu-umc-<IRN>); the record id stays emu-<IRN>" do
    assert_equal "emu-umc-400329", @documents["400329"]["uom_id_ssi"]
    assert_equal "emu-400329", @documents["400329"]["id"]
  end

  test "accession numbers keep their zeros, as in the Summary Data" do
    assert_equal [ "00.0070" ], @documents["400329"]["accession_number_ssim"]
    assert_equal [ "00.0071" ], @documents["400330"]["accession_number_ssim"]
    assert_equal [ "0000.013" ], @documents["106217"]["accession_number_ssim"]
    assert_equal [ "00.0130" ], @documents["400416"]["accession_number_ssim"]
  end

  test "images go to their own record only: the instrument, not its case; the life study, not the musical glass" do
    assert_equal %w[gmc_00_0071_2_pf.jpg gmc_00_0071_1_pf.jpg],
                 @documents["400329"]["digital_asset_paths_ssim"].map { |path| File.basename(path) }
    assert_nil @documents["400330"]["digital_asset_paths_ssim"]
    assert @documents["106217"]["has_digital_asset_bsi"]
    assert_nil @documents["400416"]["digital_asset_paths_ssim"]
  end
end
