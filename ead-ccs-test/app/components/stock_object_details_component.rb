# frozen_string_literal: true

# The record's fields as a Bootstrap table: one row per field, the label on the left and the value on the right, a thin
# rule between rows, scrolling sideways on narrow screens (table-responsive). Blacklight's record page has no table of
# its own (its details are a dl), so this is a custom component; the field components, labels, values and
# blacklight-<field> classes are still Blacklight's, and each row is a StockObjectDetailsRowComponent.
class StockObjectDetailsComponent < Blacklight::DocumentMetadataComponent
  def initialize(**args)
    super(classes: %w[table document-metadata mb-0], field_layout: StockObjectDetailsRowComponent, **args)
  end
end
