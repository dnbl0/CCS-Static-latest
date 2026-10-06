# frozen_string_literal: true

module NexusCcs
  # Link data for the site header and footer, kept out of the templates.
  module SiteNavigation
    Link = Data.define(:label, :href)

    # University-wide audience links (header utility bar and mobile drawer).
    AUDIENCE = [
      Link.new("Study", "https://study.unimelb.edu.au"),
      Link.new("Students", "https://students.unimelb.edu.au"),
      Link.new("Research", "https://research.unimelb.edu.au"),
      Link.new("Library", "https://library.unimelb.edu.au"),
      Link.new("Staff", "https://staff.unimelb.edu.au"),
      Link.new("Alumni", "https://www.unimelb.edu.au/alumni"),
      Link.new("Giving", "https://giving.unimelb.edu.au"),
      Link.new("About", "https://about.unimelb.edu.au"),
      Link.new("Contact", "https://www.unimelb.edu.au/contact")
    ].freeze

    # Menu label, then the value of the collection_ssim facet it filters on.
    COLLECTIONS = [
      [ "Medical History Museum", "Medical History Museum" ],
      [ "Henry Forman Atkinson Dental Museum", "Henry Forman Atkinson Dental Museum" ],
      [ "Harry Brookes Allen Museum", "Harry Brookes Allen Museum of Anatomy and Pathology" ],
      [ "University Art Collection", "University Art Collection" ],
      [ "Grainger Museum Collection", "Grainger Museum Collection" ]
    ].freeze

    # Paths on the static CCS site, which still hosts the help and contact pages.
    HELP = [
      Link.new("Frequently Asked Questions", "/help?topic=faq"),
      Link.new("Search tips", "/help?topic=search-tips"),
      Link.new("Copyright and terms of use", "/help?topic=copyright"),
      Link.new("Access and information", "/help?topic=access"),
      Link.new("Privacy", "/help?topic=privacy"),
      Link.new("Indigenous cultural data and access", "/help/indigenous-data.html")
    ].freeze
    HELP_HOME = Link.new("Help and support", "/help/index.html")
    CONTACT = Link.new("Contact", "/contact.html")

    FOOTER_ABOUT = [
      Link.new("About us", "https://about.unimelb.edu.au/"),
      Link.new("Careers at Melbourne", "https://about.unimelb.edu.au/careers"),
      Link.new("Safety and respect", "https://www.unimelb.edu.au/respect"),
      Link.new("Newsroom", "https://www.unimelb.edu.au/newsroom"),
      Link.new("Contact", "https://www.unimelb.edu.au/contact"),
      Link.new("Campus locations", "https://about.unimelb.edu.au/priorities-and-partnerships/campus-development/campus-locations")
    ].freeze

    # Label, URL, icon file under app/assets/images/site.
    FOOTER_SOCIAL = [
      [ "Facebook", "https://www.facebook.com/unimelb", "site/social-facebook.svg" ],
      [ "LinkedIn", "https://www.linkedin.com/school/university-of-melbourne", "site/social-linkedin.svg" ],
      [ "Instagram", "https://www.instagram.com/unimelb", "site/social-instagram.svg" ],
      [ "X (Twitter)", "https://x.com/unimelb", "site/social-x.svg" ]
    ].freeze

    FOOTER_LEGAL = [
      Link.new("Emergency", "https://safety.unimelb.edu.au/emergency"),
      Link.new("Terms and privacy", "https://www.unimelb.edu.au/legal"),
      Link.new("Accessibility", "https://www.unimelb.edu.au/accessibility"),
      Link.new("Privacy", "https://about.unimelb.edu.au/strategy/governance/compliance-obligations/privacy")
    ].freeze

    # Label, value.
    FOOTER_IDENTIFIERS = [
      [ "The University of Melbourne (Australian University):", "PRV12150" ],
      [ "CRICOS:", "00116K" ],
      [ "ABN:", "84 002 705 224" ]
    ].freeze

    # Help and contact live on the static site; they only appear when its URL is configured.
    def self.static_site_url
      Rails.configuration.x.ccs.static_site_url.presence&.chomp("/")
    end

    def self.static_url(path)
      "#{static_site_url}#{path}"
    end
  end
end
