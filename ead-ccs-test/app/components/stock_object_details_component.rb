# frozen_string_literal: true

# The record's details list (Blacklight::DocumentMetadataComponent, unchanged) under an "Object details" heading, with
# the rows ruled and padded as a table: Bootstrap utility classes handed to Blacklight's own field layout.
class StockObjectDetailsComponent < Blacklight::DocumentMetadataComponent
  # One row per label and value, the label column and the value column ruled on top; a field's further values sit
  # under the first without a rule of their own.
  class FieldLayout < Blacklight::MetadataFieldLayoutComponent
    def initialize(field:, **)
      super(field: field, label_class: "col-md-3 fw-semibold border-top py-2 pe-md-3 mb-0",
        value_class: "col-md-9 border-top py-2 mb-0", offset_class: "offset-md-3 border-top-0 pt-0")
    end
  end

  def initialize(**args)
    super(classes: %w[document-metadata dl-invert row gx-0 border-bottom mb-0], field_layout: FieldLayout, **args)
  end
end
