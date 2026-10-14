# frozen_string_literal: true

# One row of the Object details table: Blacklight::MetadataFieldLayoutComponent's slots (label and values, and the
# blacklight-<field> class hooks), drawn as a table row instead of a dt and dd. The row template is this component's own.
class StockObjectDetailsRowComponent < Blacklight::MetadataFieldLayoutComponent
  # value_tag nil: the values come back as they are, not each wrapped in the dd and grid-column classes the list layout gives them.
  def initialize(field:, **)
    super(field: field, value_tag: nil)
  end
end
