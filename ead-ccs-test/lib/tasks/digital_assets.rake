namespace :digital_assets do
  desc "Make the web thumbnails listed in config/digital_assets.yml (SOURCE_DIR holds the originals; needs vipsthumbnail)"
  task thumbnails: :environment do
    source_dir = Pathname(ENV.fetch("SOURCE_DIR") { Rails.root.join("../public/assets/images/collections") })
    target_dir = Rails.root.join("public/digital-assets/thumbs")
    FileUtils.mkdir_p(target_dir)

    made = 0
    YAML.safe_load_file(Rails.root.join(Collections::DigitalAssets::CONFIG)).each_value do |files|
      files.each do |file|
        source = source_dir.join(file)
        abort "missing original: #{source}" unless source.exist?

        target = target_dir.join(Collections::DigitalAssets.thumbnail_name(file))
        system("vipsthumbnail", source.to_s, "--size", "800x800", "-o", "#{target}[Q=82,strip]", exception: true)
        made += 1
      end
    end
    puts "Made #{made} thumbnails in #{target_dir}"
  end
end
