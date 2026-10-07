require "test_helper"

class HelpTopicTest < ActiveSupport::TestCase
  test "the topics are listed in the order of the help pages" do
    assert_equal %w[faq search-tips indigenous copyright access privacy], HelpTopic.all.map(&:key)
  end

  test "the indigenous topic is not shown at /help?topic= (it has its own page)" do
    assert_nil HelpTopic.find_shown("indigenous")
    assert_nil HelpTopic.find_shown("nope")
    assert_nil HelpTopic.find_shown(nil)
    assert_equal "Privacy", HelpTopic.find_shown("privacy").title
  end

  test "every shown topic has a partial and every topic an icon" do
    HelpTopic.all.reject(&:indigenous?).each do |topic|
      assert Rails.root.join("app/views/pages/help/_#{topic.key.tr("-", "_")}.html.erb").exist?, "no partial for #{topic.key}"
    end
    HelpTopic.all.each { |topic| assert Rails.root.join("app/assets/images/site/#{topic.icon}.svg").exist?, "no icon for #{topic.key}" }
  end
end
