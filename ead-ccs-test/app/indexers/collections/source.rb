require "csv"

module Collections
  # Base class for a CSV export. Subclasses declare their column names and
  # implement #build_document.
  class Source
    # Both CSV files begin with a UTF-8 byte-order mark.
    ENCODING = "bom|utf-8".freeze

    attr_reader :path

    def initialize(path)
      @path = path
    end

    def name
      self.class.name.demodulize.sub("Source", "").downcase
    end

    def each_document
      return enum_for(:each_document) unless block_given?

      CSV.open(path, encoding: ENCODING) do |csv|
        headers = csv.shift
        raise "#{path} is empty" if headers.nil?

        index = build_index(headers)

        csv.each do |fields|
          next if fields.all? { |f| f.nil? || f.strip.empty? }

          document = build_document(Row.new(fields, index, name))
          yield document if document
        end
      end
    end

    private

    # header name => [column positions]. Headers whitespace-normalised because
    # the EMu export headers whitespace varies.
    def build_index(headers)
      headers.each_with_index.each_with_object({}) do |(name, position), index|
        key = name.to_s.strip.gsub(/\s+/, " ")
        (index[key] ||= []) << position
      end
    end

    # Solr's uniqueKey has to be unique across BOTH CSV exports
    def document_id(local_id)
      "#{name}-#{local_id.to_s.strip.gsub(/[^A-Za-z0-9_.-]+/, '_')}"
    end

    def build_document(_row)
      raise NotImplementedError, "#{self.class} must implement #build_document"
    end

    # Drops empty arrays and nulls.
    def compact_document(document)
      document.each_with_object({}) do |(field, value), result|
        next if value.nil?
        next if value.respond_to?(:empty?) && value.empty?

        result[field] = value.is_a?(Array) ? value.uniq : value
      end
    end
  end
end
