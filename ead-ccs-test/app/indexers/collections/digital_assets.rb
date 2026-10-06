require "yaml"

module Collections
  # Attaches digital-asset fields to a document when its accession number has images listed in
  # config/digital_assets.yml. Images are thumbnails under public/digital-assets/thumbs.
  class DigitalAssets
    URL_PREFIX = "/digital-assets/thumbs".freeze
    CONFIG = "config/digital_assets.yml".freeze

    # "2001_0008 B web.jpg" and "1973_0755_B~PF.jpg" become URL-safe, lowercase .jpg names.
    def self.thumbnail_name(file)
      "#{File.basename(file, ".*").parameterize(separator: "_")}.jpg"
    end

    def self.default
      @default ||= new(YAML.safe_load_file(Rails.root.join(CONFIG)) || {})
    end

    def initialize(files_by_accession)
      @files_by_accession = files_by_accession
    end

    def attach(document)
      files = Array(document["accession_number_ssim"]).filter_map { |accession| @files_by_accession[accession] }.first
      return document if files.blank?

      paths = files.map { |file| "#{URL_PREFIX}/#{self.class.thumbnail_name(file)}" }
      document.merge(
        "thumbnail_path_ssi" => paths.first,
        "digital_asset_paths_ssim" => paths,
        "has_digital_asset_bsi" => true
      )
    end
  end
end
