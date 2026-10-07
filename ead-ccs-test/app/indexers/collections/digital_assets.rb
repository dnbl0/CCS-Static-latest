require "yaml"

module Collections
  # Attaches digital-asset fields to a document when its accession number has images listed in
  # config/digital_assets.yml. Each image has an 800 px thumbnail (list, mosaic) and a
  # 1600 px large version (record page) under public/digital-assets.
  class DigitalAssets
    THUMBNAILS = "/digital-assets/thumbs".freeze
    LARGE = "/digital-assets/large".freeze
    # Every file in config/digital_assets.yml is a still image; audio, video and PDF are not indexed yet.
    FORMAT = "Image".freeze
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

      names = files.map { |file| self.class.thumbnail_name(file) }
      thumbnails = names.map { |name| "#{THUMBNAILS}/#{name}" }
      document.merge(
        "thumbnail_path_ssi" => thumbnails.first,
        "digital_asset_paths_ssim" => thumbnails,
        "digital_asset_large_paths_ssim" => names.map { |name| "#{LARGE}/#{name}" },
        "has_digital_asset_bsi" => true,
        "digital_asset_format_ssim" => [ FORMAT ]
      )
    end
  end
end
