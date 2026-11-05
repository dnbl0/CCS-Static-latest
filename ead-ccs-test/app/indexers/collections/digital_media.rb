require "yaml"

module Collections
  # Attaches audio, video and PDF files (config/digital_media.yml) to a document by accession number.
  # Each is stored as "kind|type|url|label[|captions url|captions language|transcript url]" in digital_media_ssim; the
  # format shows in the Format facet. Captions (WebVTT) and a transcript are optional, named in the YAML beside the file:
  #   captions: { file: "x.vtt", lang: "en" }
  #   transcript: "x.pdf"
  class DigitalMedia
    CONFIG = "config/digital_media.yml".freeze
    FORMATS = { "audio" => "Audio", "video" => "Video", "pdf" => "PDF" }.freeze

    def self.default
      @default ||= new(YAML.safe_load_file(Rails.root.join(CONFIG)) || {})
    end

    def self.base_url
      ENV.fetch("CCS_MEDIA_BASE_URL", "/digital-assets/media").chomp("/")
    end

    # -> { kind:, type:, url:, label: } plus captions: { url:, lang: } and transcript: url when the file has them
    def self.parse(entry)
      kind, type, url, label, captions_url, lang, transcript = entry.split("|", 7)
      parsed = { kind: kind, type: type, url: url, label: label }
      parsed[:captions] = { url: captions_url, lang: lang } if captions_url.present?
      parsed[:transcript] = transcript if transcript.present?
      parsed
    end

    def self.url_for(file) = "#{base_url}/#{ERB::Util.url_encode(file)}"

    def initialize(files_by_accession)
      @files_by_accession = files_by_accession
    end

    def attach(document)
      files = Array(document["accession_number_ssim"]).filter_map { |accession| @files_by_accession[accession] }.first
      return document if files.blank?

      formats = files.map { |f| FORMATS.fetch(f["kind"]) }
      document.merge(
        "digital_media_ssim" => files.map { |f| entry(f) },
        "has_digital_asset_bsi" => true,
        "digital_asset_format_ssim" => (Array(document["digital_asset_format_ssim"]) + formats).uniq
      )
    end

    private

    def entry(file)
      fields = [ file["kind"], file["type"], self.class.url_for(file["file"]), file["label"] ]
      captions, transcript = file["captions"], file["transcript"]
      fields += [ (self.class.url_for(captions["file"]) if captions), captions&.fetch("lang", "en"), (self.class.url_for(transcript) if transcript) ] if captions || transcript
      fields.join("|")
    end
  end
end
