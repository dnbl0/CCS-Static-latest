# frozen_string_literal: true

# A topic of the help section. The "indigenous" topic has its own page; the others are /help?topic=<key> and render the
# partial app/views/pages/help/_<key>.html.erb.
class HelpTopic < Data.define(:key, :title, :blurb, :icon)
  ALL = [
    new("faq", "Frequently Asked Questions", "Answers to common questions about searching and using items from the university's cultural collections.", "help-faq"),
    new("search-tips", "Search Tips", "These tips help you to easily find information, images, audio, and video held in the university's cultural collections.", "help-search-tips"),
    new("indigenous", "Indigenous Cultural Data and Access", "Information on respectful discovery of Aboriginal and Torres Strait Islander cultural heritage and knowledge.", "help-indigenous"),
    new("copyright", "Copyright and Terms of Use", "How a collection item can be used varies depending on the conditions of its copyright license, intellectual property or cultural advice.", "help-rights"),
    new("access", "Access and Information", "How to submit a request to access an item or for further information from the Collections team.", "help-access"),
    new("privacy", "Privacy", "How the University respects the privacy of protecting and managing personal information.", "help-privacy")
  ].freeze

  def self.all = ALL

  def self.find(key) = ALL.find { |topic| topic.key == key }

  # The topic shown at /help?topic=<key>; nil for no topic, an unknown one and the indigenous page's own topic
  def self.find_shown(key) = find(key).then { |topic| topic unless topic&.indigenous? }

  def indigenous? = key == "indigenous"

  def path(view) = indigenous? ? view.indigenous_data_path : view.help_path(topic: key)

  def partial = "pages/help/#{key.tr("-", "_")}"
end
