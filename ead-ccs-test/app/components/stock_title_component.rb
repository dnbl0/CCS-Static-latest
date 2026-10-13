# frozen_string_literal: true

# Blacklight::DocumentTitleComponent with the record's title as a plain left-aligned heading (no margins of its own;
# the page's stack spaces it). Blacklight's own show view passes classes: '' to the title, so the class is set here.
class StockTitleComponent < Blacklight::DocumentTitleComponent
  def initialize(*args, classes: nil, **kwargs)
    super(*args, classes: "m-0", **kwargs)
  end
end
