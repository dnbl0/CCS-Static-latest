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

    # Menu label, the value of the collection_ssim facet, then the slug of its landing page.
    COLLECTIONS = [
      [ "Medical History Museum", "Medical History Museum", "medical-history-museum" ],
      [ "Henry Forman Atkinson Dental Museum", "Henry Forman Atkinson Dental Museum", "henry-forman-atkinson-dental-museum" ],
      [ "Harry Brookes Allen Museum", "Harry Brookes Allen Museum of Anatomy and Pathology", "harry-brookes-allen-museum" ],
      [ "University Art Collection", "University Art Collection", "university-art-collection" ],
      [ "Grainger Museum Collection", "Grainger Museum Collection", "grainger-museum" ]
    ].freeze

    # The facet value of a collection landing page, by slug.
    def self.facet_value(slug)
      COLLECTIONS.find { |_label, _value, collection_slug| collection_slug == slug }&.second
    end

    # Route helper names for the help topics (PagesController::HELP_TOPICS), the help home and contact page.
    HELP_HOME_LABEL = "Help and support"
    CONTACT_LABEL = "Contact"

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
  end
end
