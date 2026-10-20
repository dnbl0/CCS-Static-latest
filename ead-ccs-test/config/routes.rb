# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  concern :range_searchable, BlacklightRangeLimit::Routes::RangeSearchable.new
  mount Blacklight::Engine => "/"
  root to: "pages#home"
  concern :searchable, Blacklight::Routes::Searchable.new
  concern :exportable, Blacklight::Routes::Exportable.new

  # scope constraint to address Rails default :id segment stopping at dots in ids
  scope constraints: { id: %r{[^/]+} } do
    resource :catalog, only: [], as: "catalog", path: "/catalog", controller: "catalog" do
      concerns :searchable
      concerns :range_searchable
    end
    resources :solr_documents, only: [ :show ], path: "/catalog", controller: "catalog" do
      concerns :exportable
    end
    # The saved list and its Save / Remove requests are a 404 while config.x.saved_records is off (config/application.rb)
    constraints(->(_request) { Rails.configuration.x.saved_records }) do
      resources :bookmarks, only: [ :index, :update, :create, :destroy ] do
        concerns :exportable
        collection do
          delete "clear"
        end
      end
    end
  end

  # The new record page, for the records in StockRecords only (any other id is a 404): Blacklight out of the box (StockCatalogController),
  # and the same page in the UoM header, breadcrumb and footer (BrandedStockCatalogController). The site's own record page, /catalog/:id,
  # is unchanged.
  constraints(->(request) { StockRecords.include?(request.path_parameters[:id]) }) do
    scope constraints: { id: %r{[^/]+} } do
      resources :stock_documents, only: [ :show ], path: "/stock", controller: "stock_catalog" do
        concerns :exportable
      end

      resources :branded_stock_documents, only: [ :show ], path: "/branded-stock", controller: "branded_stock_catalog" do
        concerns :exportable
      end
    end
  end

  get "collections", to: "pages#collections", as: :collections
  # The collection landing pages are gone: their old addresses go to the results filtered to that collection.
  get "collections/:slug", to: redirect(status: 301) { |params, _request|
    "/catalog?#{{ f: { collection_ssim: [ NexusCcs::SiteNavigation.facet_value(params[:slug]) ] }, search_field: "all_fields" }.to_query}"
  }, constraints: ->(request) { NexusCcs::SiteNavigation.facet_value(request.path_parameters[:slug]) }
  get "help", to: "pages#help", as: :help
  # Search tips, Indigenous cultural data and Contact are no longer pages of their own: Indigenous data and Contact
  # are sections of Help, and the old addresses go there.
  get "help/search-tips", to: redirect("/help", status: 301)
  get "help/indigenous-data", to: redirect("/help#indigenous", status: 301)
  get "contact", to: redirect("/help#contact-us", status: 301)
  get "about", to: "pages#about", as: :about

  # What the visitor sees for an error: Rails sends the failed request to /<status> (config.exceptions_app)
  %w[400 404 406 422 500].each { |code| match code, to: "errors#show", via: :all, defaults: { code: code }, as: "error_#{code}" }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
