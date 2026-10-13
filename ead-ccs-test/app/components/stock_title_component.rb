# frozen_string_literal: true

# Blacklight::DocumentTitleComponent with the record's title in a navy band, white and centred, as the site's record page
# has it. Blacklight's own show view passes classes: '' to the title, so the h1's white text is set here.
class StockTitleComponent < Blacklight::DocumentTitleComponent
  def initialize(*args, classes: nil, **kwargs)
    super(*args, classes: "text-white m-0", **kwargs)
  end
end
