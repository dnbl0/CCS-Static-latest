# frozen_string_literal: true

# Blacklight::DocumentComponent laid out as Europeana's item page is: under the full-width viewer (the embed component
# sends that to the layout) a centred column with the title, who provides the item, two tabs of fields ("Good to know",
# then "All metadata") and the collections it belongs to. The fields are Blacklight's field presenters, split here; the
# tabs are Bootstrap's. The title (the heading) is not repeated in the tabs.
class StockDocumentComponent < Blacklight::DocumentComponent
  GOOD_TO_KNOW = %w[creator_display_ssim production_date_ssim production_place_ssim object_type_ssim collection_ssim].freeze
  TITLE = "title_tsim"

  attr_reader :good_to_know_fields, :all_fields

  def before_render
    @all_fields = presenter.field_presenters.reject { |field| field.key == TITLE }
    @good_to_know_fields = all_fields.select { |field| GOOD_TO_KNOW.include?(field.key) }
    super
  end

  # The collection(s) the record belongs to, as links to the real catalog's filter.
  def collections
    Array(document["collection_ssim"]).compact_blank
  end

  def named_collections
    Array(document["named_collection_ssim"]).compact_blank
  end

  def collection_path(field, value) = helpers.search_action_path(f: { field => [ value ] })
end
