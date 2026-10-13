# frozen_string_literal: true

# Blacklight::DocumentComponent laid out as Europeana's item page is: under the full-width viewer (the embed component
# sends that to the layout) a centred column with the title, who provides the item, four Bootstrap tabs ("Good to know",
# "Object details", "Copyright", "Permalink") and the collections it belongs to. The fields are Blacklight's field
# presenters, split here. The title (the heading) is not repeated in the tabs.
class StockDocumentComponent < Blacklight::DocumentComponent
  GOOD_TO_KNOW = %w[creator_display_ssim production_date_ssim production_place_ssim object_type_ssim collection_ssim].freeze
  # The sheet's copyright fields: caption, credit line, copyright, licence, advisory, terms of use and producer
  COPYRIGHT_FIELDS = %w[caption credit_line_tsim rights_ssim licence_type_ssim gap_28_derived gap_29_derived gap_30_derived].freeze
  TITLE = "title_tsim"

  attr_reader :good_to_know_fields, :object_fields, :copyright_fields

  def before_render
    fields = presenter.field_presenters.reject { |field| field.key == TITLE }
    @copyright_fields, @object_fields = fields.partition { |field| COPYRIGHT_FIELDS.include?(field.key) }
    @good_to_know_fields = object_fields.select { |field| GOOD_TO_KNOW.include?(field.key) }
    super
  end

  # The record's persistent link: its page in the site's own catalog.
  def permalink = helpers.solr_document_url(document)

  def accession_number = document.first("accession_number_ssim").presence

  # The collection(s) the record belongs to, as links to the real catalog's filter.
  def collections
    Array(document["collection_ssim"]).compact_blank
  end

  def named_collections
    Array(document["named_collection_ssim"]).compact_blank
  end

  def collection_path(field, value) = helpers.search_action_path(f: { field => [ value ] })
end
