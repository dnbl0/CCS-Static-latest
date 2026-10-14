# frozen_string_literal: true

# The record's fields as a Bootstrap table laid out as the site's own record page lays out its Object details: the label
# in bold on the left, the value beside it, only a thin rule between rows, scrolling sideways on narrow screens
# (table-responsive). Blacklight's record page has no table of its own (its details are a dl), so this is a custom
# component; the field components, labels, values and blacklight-<field> classes are still Blacklight's, and each row
# is a StockObjectDetailsRowComponent.
class StockObjectDetailsComponent < Blacklight::DocumentMetadataComponent
  def initialize(**args)
    super(classes: %w[table table-borderless document-metadata mb-0], field_layout: StockObjectDetailsRowComponent, **args)
  end
end
