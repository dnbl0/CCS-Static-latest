require "rsolr"

module Collections
  # Streams documents from one or more Sources into Solr.
  class Indexer
    BATCH_SIZE = 500

    attr_reader :solr_url, :batch_size, :logger

    def initialize(solr_url: self.class.default_solr_url, batch_size: BATCH_SIZE, logger: nil)
      @solr_url = solr_url
      @batch_size = batch_size
      @logger = logger || Logger.new($stdout)
    end

    # Reading SOLR_URL the same way as config/blacklight.yml
    def self.default_solr_url
      ENV.fetch("SOLR_URL") { "http://127.0.0.1:8983/solr/blacklight-core" }
    end

    def solr
      @solr ||= RSolr.connect(url: solr_url)
    end

    def document_count
      solr.get("select", params: { q: "*:*", rows: 0 })["response"]["numFound"]
    end

    def clear
      solr.delete_by_query("*:*")
      solr.commit
    end

    def index(sources)
      seen = {}
      collisions = 0
      batch = []
      total = 0

      Array(sources).each do |source|
        logger.info("indexing #{source.name} from #{source.path}")

        source.each_document do |document|
          id = document["id"]

          # Prevent id collision
          if seen.key?(id)
            collisions += 1
            logger.warn("duplicate id #{id} (also in #{seen[id]})")
          end
          seen[id] = source.name

          batch << document
          next if batch.size < batch_size

          total += flush(batch)
          logger.info("  #{total} documents")
        end
      end

      total += flush(batch)
      solr.commit

      logger.info("committed #{total} documents to #{solr_url}")
      logger.warn("#{collisions} duplicate ids -- indexed fewer documents than rows") if collisions.positive?

      { indexed: total, duplicate_ids: collisions }
    end

    private

    def flush(batch)
      return 0 if batch.empty?

      count = batch.size
      solr.add(batch)
      batch.clear
      count
    end
  end
end
