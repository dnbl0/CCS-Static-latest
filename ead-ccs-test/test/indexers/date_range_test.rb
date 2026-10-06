require "test_helper"

class DateRangeTest < ActiveSupport::TestCase
  test "explicit years: plain, negative, BC, full dates, junk" do
    assert_equal 1918, Collections::DateRange.explicit_year("1918")
    assert_equal(-586, Collections::DateRange.explicit_year("-586"))
    assert_equal(-1000, Collections::DateRange.explicit_year("BC -1000"))
    assert_equal(-3300, Collections::DateRange.explicit_year("BC 3300"))
    assert_equal 1925, Collections::DateRange.explicit_year("12/09/1925")
    assert_nil Collections::DateRange.explicit_year("[not dated]")
    assert_nil Collections::DateRange.explicit_year("")
    assert_nil Collections::DateRange.explicit_year(nil)
  end
end
