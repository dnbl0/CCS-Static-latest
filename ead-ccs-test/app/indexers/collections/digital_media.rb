require "yaml"

module Collections
  # Attaches audio, video and PDF files (config/digital_media.yml) to a document by accession number.
  # Each is stored as "kind|type|url|label" in digital_media_ssim; the format shows in the Format facet.
  class DigitalMedia
    CONFIG = "config/digital_media.yml".freeze
    FORMATS = { "audio" => "Audio", "video" => "Video", "pdf" => "PDF" }.freeze

    def self.default
      @default ||= new(YAML.safe_load_file(Rails.root.join(CONFIG)) || {})
    end

    def self.base_url
      ENV.fetch("CCS_MEDIA_BASE_URL", "/digital-assets/media").chomp("/")
    end

    # -> { kind:, type:, url:, label: }
    def self.parse(entry)
      kind, type, url, label = entry.split("|", 4)
      { kind: kind, type: type, url: url, label: label }
    end

    def initialize(files_by_accession)
      @files_by_accession = files_by_accession
    end

    def attach(document)
      files = Array(document["accession_number_ssim"]).filter_map { |accession| @files_by_accession[accession] }.first
      return document if files.blank?

      formats = files.map { |f| FORMATS.fetch(f["kind"]) }
      document.merge(
        "digital_media_ssim" => files.map { |f| [ f["kind"], f["type"], "#{self.class.base_url}/#{ERB::Util.url_encode(f["file"])}", f["label"] ].join("|") },
        "has_digital_asset_bsi" => true,
        "digital_asset_format_ssim" => (Array(document["digital_asset_format_ssim"]) + formats).uniq
      )
    end
  end
end
