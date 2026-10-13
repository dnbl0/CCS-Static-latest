# frozen_string_literal: true

# A card holding a heading and the fields it is given as a Bootstrap bordered table that scrolls sideways on narrow
# screens (table-responsive); the record page's "Object details" and "Copyright". Blacklight's record page has no table
# of its own (its details are a dl), so this is a custom component; the field components, labels, values and
# blacklight-<field> classes are still Blacklight's, and each row is a StockObjectDetailsRowComponent.
class StockObjectDetailsComponent < Blacklight::DocumentMetadataComponent
  attr_reader :heading

  def initialize(heading: "Object details", **args)
    super(classes: %w[table table-bordered document-metadata mb-0], field_layout: StockObjectDetailsRowComponent, **args)
    @heading = heading
  end

  def heading_id = "#{heading.parameterize}-heading"
end
