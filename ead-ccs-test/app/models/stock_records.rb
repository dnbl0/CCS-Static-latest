# frozen_string_literal: true

# The records the new record pages (/stock/:id and /branded-stock/:id) are shown for: two, one with several images and one with a
# single image, for comparing the new page against the site's own record page (/catalog/:id). Any other id has no page there (the routes'
# constraint): a 404. Rails.configuration.x.stock_record_ids replaces the list (the tests use it).
module StockRecords
  IDS = %w[emu-9044 vernon-MHM00394].freeze

  # An unset config.x setting is not nil in Rails but an empty options object, so only a list replaces IDS.
  def self.ids
    override = Rails.configuration.x.stock_record_ids
    override.is_a?(Array) ? override : IDS
  end

  def self.include?(id) = ids.include?(id.to_s)
end
