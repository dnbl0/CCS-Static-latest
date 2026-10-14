# frozen_string_literal: true

# StockCatalogController's record page (Blacklight's own page body) in the University of Melbourne header,
# breadcrumb, footer and stylesheet (/branded-stock/:id). Only the frame changes: the record is still stock.
class BrandedStockCatalogController < StockCatalogController
  layout "branded_stock"

  configure_blacklight do |config|
    config.header_component = NexusCcs::StockHeaderComponent
  end
end
