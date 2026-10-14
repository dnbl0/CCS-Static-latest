# frozen_string_literal: true

# The record's details under an "Object details" heading, as a Bootstrap bordered table that scrolls sideways on narrow
# screens (table-responsive). Blacklight's record page has no table of its own (its details are a dl), so this is a
# custom component; the field components, labels, values and blacklight-<field> classes are still Blacklight's, and
# each row is a StockObjectDetailsRowComponent.
class StockObjectDetailsComponent < Blacklight::DocumentMetadataComponent
  def initialize(**args)
    super(classes: %w[table table-bordered document-metadata mb-0], field_layout: StockObjectDetailsRowComponent, **args)
  end
end
