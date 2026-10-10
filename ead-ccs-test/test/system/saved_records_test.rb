require "application_system_test_case"

# Saving records through Blacklight's bookmark toggle, in a real browser, with no login.
class SavedRecordsTest < ApplicationSystemTestCase
  setup do
    page.driver.set_cookie("country_acknowledged", "1")
  end

  def bar = find(".saved-bar__text")

  test "Save becomes Saved without a reload, the header count follows, and the list page shows the record" do
    visit search_catalog_path(q: "skull", view: "list")
    assert_selector ".saved-bar--empty"
    assert_text "0 saved records"
    page.execute_script("window.sameDocument = true")

    card = first(".result-card")
    title = card.find(".document-title-heading a").text
    within(card) do
      assert_selector ".toggle-bookmark-label", text: /\ASave\s+record: #{Regexp.escape(title)}\z/
      find(".toggle-bookmark-label").click
      assert_selector ".toggle-bookmark-label.checked", text: /\ASaved\s+record: #{Regexp.escape(title)}\z/
    end

    assert_selector ".saved-bar:not(.saved-bar--empty)"
    assert_equal "1 saved record", bar.text
    assert page.evaluate_script("window.sameDocument"), "the page reloaded"

    # the second card makes it plural
    all(".result-card")[1].find(".toggle-bookmark-label").click
    assert_text "2 saved records"

    click_link "2 saved records"
    assert_current_path "/bookmarks"
    assert_selector "h1", text: "Saved records"
    assert_selector ".saved-main .result-card", count: 2
    assert_selector ".saved-toolbar__count", text: "2 saved records"

    # toggling again on the list removes it from the saved list and the count follows
    first(".saved-main .toggle-bookmark-label").click
    assert_text "1 saved record"
    visit bookmarks_path
    assert_selector ".saved-main .result-card", count: 1
  end

  test "the record page control is a real checkbox that takes keyboard focus, and the count survives navigation" do
    visit search_catalog_path(q: "skull", view: "list")
    visit first(".result-card .document-title-heading a")[:href]

    checkbox = find(".record-summary__save .save-control__input", visible: :all)
    checkbox.execute_script("this.focus()")
    assert page.evaluate_script("document.activeElement.matches('.record-summary__save input[type=checkbox]')")
    assert_selector ".record-summary__save .toggle-bookmark-label:has(:focus-visible)"

    find(".record-summary__save .toggle-bookmark-label").click
    assert_selector ".record-summary__save .toggle-bookmark-label.checked", text: "Saved"
    assert_text "1 saved record"

    visit root_path
    assert_text "1 saved record"
    assert_selector ".saved-bar:not(.saved-bar--empty)"
  end

  test "the saved list and the bar have no accessibility violations" do
    visit search_catalog_path(q: "skull", view: "list")
    first(".result-card .toggle-bookmark-label").click
    assert_text "1 saved record"
    assert_accessible

    visit bookmarks_path
    assert_selector ".saved-main .result-card"
    assert_accessible
  end
end
