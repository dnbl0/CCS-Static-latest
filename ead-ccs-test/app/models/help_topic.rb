# frozen_string_literal: true

# A topic of the help section: each is a section of the one /help page (/help#<key>), written in
# app/views/pages/help.html.erb.
class HelpTopic < Data.define(:key, :title, :blurb)
  ALL = [
    new("faq", "Frequently Asked Questions", "Answers to common questions about searching and using items from the university's cultural collections."),
    new("indigenous", "Indigenous Cultural Data and Access", "Information on respectful discovery of Aboriginal and Torres Strait Islander cultural heritage and knowledge."),
    new("copyright", "Copyright and Terms of Use", "How a collection item can be used varies depending on the conditions of its copyright license, intellectual property or cultural advice."),
    new("access", "Access and Information", "How to submit a request to access an item or for further information from the Collections team.")
  ].freeze

  def self.all = ALL

  def self.find(key) = ALL.find { |topic| topic.key == key }

  def path(view) = view.help_path(anchor: key)
end
