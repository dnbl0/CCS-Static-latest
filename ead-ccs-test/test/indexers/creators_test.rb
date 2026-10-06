require "test_helper"

class CreatorsTest < ActiveSupport::TestCase
  test "display follows the Field labels sheet: name, life dates, role" do
    names = [ "John Bates & Co Ltd.", "Grainger, Percy Aldridge" ]
    display = Collections::Creators.display(names, [ "maker", "creator" ], [ nil, "8 July 1882" ], [ nil, "20 February 1961" ])

    assert_equal [ "John Bates & Co Ltd. Maker", "Grainger, Percy Aldridge (8 July 1882 – 20 February 1961) Creator" ], display
  end

  test "only a birth or only a death date" do
    assert_equal [ "A (b. 1900)" ], Collections::Creators.display([ "A" ], [], [ "1900" ], [])
    assert_equal [ "A (d. 1950)" ], Collections::Creators.display([ "A" ], [], [], [ "1950" ])
  end

  test "a column that is not one entry per creator is ignored rather than mismatched" do
    assert_equal [ "A", "B" ], Collections::Creators.display([ "A", "B" ], [ "maker" ], [ "1900" ], [])
  end

  test "years are the four-digit years in the entries" do
    assert_equal [ 1882, 1961 ], Collections::Creators.years([ nil, "8 July 1882", "c. 1961" ])
    assert_empty Collections::Creators.years([ nil, "unknown" ])
  end

  test "Row#positional keeps empty entries so columns line up by position" do
    row = Collections::Row.new([ "\\,8 July 1882" ], { "b" => [ 0 ] }, "emu")
    assert_equal [ nil, "8 July 1882" ], row.positional("b", "\\,")
  end

  test "licence type is the bracketed licence at the start of a rights note" do
    source = Collections::EmuSource.new("unused")
    types = source.send(:licence_types, [ "[Copyright - Current] Alsop, Edith", "[Copyright - Current] Other", "thought to belong to X" ])
    assert_equal [ "Copyright - Current" ], types
  end
end
