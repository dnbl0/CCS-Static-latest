# frozen_string_literal: true

# Blacklight's own field layout (Blacklight::MetadataFieldLayoutComponent, unchanged) with Bootstrap utility classes
# through the class parameters it provides: a rule and vertical padding under each label and value (mb-0 cancels Bootstrap reboot's dd margin so the rules line up), so the details
# read as a table of rows. Used by StockCatalogController's record page only.
class StockMetadataFieldLayoutComponent < Blacklight::MetadataFieldLayoutComponent
  def initialize(field:, **)
    super(field: field, label_class: "col-md-3 py-2 border-bottom", value_class: "col-md-9 py-2 mb-0 border-bottom", offset_class: "offset-md-3")
  end
end
