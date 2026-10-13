# frozen_string_literal: true

# Blacklight::DocumentComponent with the title, viewer and details set apart with Bootstrap's vertical stack, and the
# details in two cards side by side as the site's record page has them: "Object details" and "Copyright" (the caption,
# credit line, copyright, licence, advisory and terms of use). Blacklight's metadata slot holds the first card; the second
# is drawn by the template. Both are the same StockObjectDetailsComponent, with the fields they are given.
class StockDocumentComponent < Blacklight::DocumentComponent
  COPYRIGHT_FIELDS = %w[caption credit_line_tsim rights_ssim licence_type_ssim gap_28_derived gap_29_derived gap_30_derived].freeze

  attr_reader :copyright_fields

  def before_render
    @copyright_fields, details = presenter.field_presenters.partition { |field| COPYRIGHT_FIELDS.include?(field.key) }
    with_metadata(fields: details, show: @show) unless metadata
    super
  end
end
