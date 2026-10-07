# frozen_string_literal: true

module NexusCcs
  # "View full record" action in the record sidebar.
  # Trigger and dialog are rendered by the same component so the pair can't drift apart.
  #
  # Registered as a Blacklight document action in CatalogController, so it gets built with
  # the same keyword arguments passed to Blacklight::Document::ActionComponent.
  class ViewFullRecordComponent < Blacklight::Component
    # TODO: replace with the indexed field once the source URL reaches Solr,
    PLACEHOLDER_URL = "https://collections.mdhs.unimelb.edu.au/objects/104/microscope-lamp"

    # The `if:` guard in CatalogController looks for this so the action button
    # drops out of the list when there's no URL.
    def self.url_for(_document)
      PLACEHOLDER_URL
    end

    def initialize(document:, action: nil, **)
      @document = document
      @action = action
    end

    attr_reader :document

    # Blacklight::Document::ActionsComponent tags each <li> with the action's key,
    # so every component registered as a document action has to answer it.
    delegate :key, to: :@action

    def url
      self.class.url_for(document)
    end

    # The dialog shows the host, not the full URL as the collection URLs get very large
    def host
      URI.parse(url).host.presence || url
    rescue URI::InvalidURIError
      url
    end

    def source_name
      Array(document["collection_ssim"]).first.presence ||
        t("nexus_ccs.view_full_record.default_source")
    end

    def dialog_title_id
      "leaving-site-title-#{document.id.to_s.parameterize}"
    end
  end
end
