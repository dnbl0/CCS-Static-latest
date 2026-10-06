require "test_helper"

class TextTest < ActiveSupport::TestCase
  test "repairs double-encoded UTF-8" do
    {
      "InrÅ\u008D" => "Inrō",             # ō: the control character U+008D is undefined in Windows-1252
      "cafÃ©" => "café",              # é
      "Â© University" => "© University", # ©
      "itâ€™s" => "it’s",        # ’
      "â€œquotedâ€\u009D" => "“quoted”", # “quoted” (a control character at the end)
      "10Â°" => "10°"                 # °
    }.each { |broken, fixed| assert_equal fixed, Collections::Text.repair_mojibake(broken) }
  end

  test "leaves correct text alone" do
    [ "Inrō", "café", "naïve", "© 2020", "plain", "café©", "Ångström", "", "資料" ].each do |text|
      assert_equal text, Collections::Text.repair_mojibake(text), text.inspect
    end
  end

  test "clean strips, repairs and returns nil for blanks" do
    assert_equal "Inrō", Collections::Text.clean("  InrÅ\u008D ")
    assert_nil Collections::Text.clean("   ")
    assert_nil Collections::Text.clean(nil)
  end
end
