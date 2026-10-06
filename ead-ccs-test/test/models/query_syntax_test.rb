# frozen_string_literal: true

require "test_helper"

class QuerySyntaxTest < ActiveSupport::TestCase
  test "detects uppercase operators" do
    assert QuerySyntax.explicit?("anatomy AND botany")
    assert QuerySyntax.explicit?("anatomy OR botany")
    assert QuerySyntax.explicit?("anatomy NOT botany")
  end

  test "detects include and exclude prefixes" do
    assert QuerySyntax.explicit?("+anatomy botany")
    assert QuerySyntax.explicit?("anatomy -botany")
    assert QuerySyntax.explicit?("-botany")
  end

  test "detects a fielded term" do
    assert QuerySyntax.explicit?("title_tsim:anatomy")
  end

  # Every one of these is a plausible query against this collection, and none of
  # them should switch the search into boolean mode.
  test "leaves ordinary prose alone" do
    refute QuerySyntax.explicit?("anatomy and botany")
    refute QuerySyntax.explicit?("ANDaman Islands")
    refute QuerySyntax.explicit?("Ballarat ORmond")
    refute QuerySyntax.explicit?("Notes on human tissue")
  end

  # Parentheses on their own are not a signal: this collection is full of
  # parenthetical qualifiers, and grouping without an operator does nothing.
  test "leaves parenthetical qualifiers alone" do
    refute QuerySyntax.explicit?("Basket (coiled)")
    refute QuerySyntax.explicit?("Smith (1890-1950)")
    refute QuerySyntax.explicit?("(anatomy)")
  end

  test "ignores operators inside a quoted phrase" do
    refute QuerySyntax.explicit?('"Fire AND Water" basket')
  end

  test "tolerates a missing query" do
    refute QuerySyntax.explicit?(nil)
    refute QuerySyntax.explicit?("")
  end
end
