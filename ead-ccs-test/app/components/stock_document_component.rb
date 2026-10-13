# frozen_string_literal: true

# Blacklight::DocumentComponent laid out as Europeana's item page is: a centred column with blacklight-gallery's viewer,
# the title, who provides the item and three Bootstrap tabs ("Object details", "Copyright", "Permalink"). The fields are
# Blacklight's field presenters, split here. The title (the heading) is not repeated in the tabs.
class StockDocumentComponent < Blacklight::DocumentComponent
  # The sheet's copyright fields: caption, credit line, copyright, licence, advisory, terms of use and producer
  COPYRIGHT_FIELDS = %w[caption credit_line_tsim rights_ssim licence_type_ssim gap_28_derived gap_29_derived gap_30_derived].freeze
  TITLE = "title_tsim"

  attr_reader :object_fields, :copyright_fields

  def before_render
    fields = presenter.field_presenters.reject { |field| field.key == TITLE }
    @copyright_fields, @object_fields = fields.partition { |field| COPYRIGHT_FIELDS.include?(field.key) }
    super
  end

  # The record's persistent link: its page in the site's own catalog.
  def permalink = helpers.solr_document_url(document)

  def accession_number = document.first("accession_number_ssim").presence

  # The collection(s) the record belongs to, as links to the real catalog's filter.
  def collections
    Array(document["collection_ssim"]).compact_blank
  end

  # The licence the record carries (the sheet's Licence Type), for the badge under the viewer; none when it has none.
  def rights_text
    Array(presenter.field_presenters.find { |field| field.key == "licence_type_ssim" }&.render).join("; ").presence
  end

  def collection_path(field, value) = helpers.search_action_path(f: { field => [ value ] })
end
