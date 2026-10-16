require "application_system_test_case"

class HelpJumpNavTest < ApplicationSystemTestCase
  test "the jump navigation marks the section being read as the reader scrolls" do
    visit help_path
    assert_selector "a.jump-nav__link[aria-current=location]", text: "Frequently Asked Questions"

    page.execute_script("document.getElementById('copyright').scrollIntoView()")
    assert_selector "a.jump-nav__link.is-current[aria-current=location]", text: "Copyright and Terms of Use"
    assert_selector "a.jump-nav__link[aria-current=location]", count: 1

    page.execute_script("window.scrollTo(0, document.documentElement.scrollHeight)")
    assert_selector "a.jump-nav__link.is-current", text: "Access and Information"
  end
end
