require "test_helper"

class PathfinderItemComponentTest < ViewComponent::TestCase
  test "a tile with a summary has an h3 title and the summary, all inside the one link" do
    render_inline(NexusCcs::PathfinderItemComponent.new(href: "/help", title: "Help and support", summary: "Searching and using."))

    assert_selector "li.pathfinder__item > a.pathfinder__link[href='/help'] .pathfinder__content .pathfinder__icon + .pathfinder__text > h3.pathfinder__title", text: "Help and support"
    assert_selector ".pathfinder__text > p.pathfinder__summary", text: "Searching and using."
  end

  test "a title-only tile uses a span, not a heading" do
    render_inline(NexusCcs::PathfinderItemComponent.new(href: "/help", title: "Help"))

    assert_selector ".pathfinder__text > span.pathfinder__title", text: "Help"
    assert_no_selector "h3"
    assert_no_selector ".pathfinder__summary"
  end

  test "the old tile classes are gone" do
    render_inline(NexusCcs::PathfinderItemComponent.new(href: "/help", title: "Help", summary: "x"))

    assert_no_selector "[class*=pathfinder-alt]"
  end

  test "colours are set outright in every state: white then grey tiles, the title and arrow darken on hover and the summary stays dark" do
    css = Rails.root.join("app/assets/stylesheets/components/pathfinder.css").read
    states = %w[.pathfinder__link .pathfinder__link:visited .pathfinder__link:hover .pathfinder__link:focus .pathfinder__link:active]
    block = css[/(\.pathfinder__link,.*?\{.*?\})/m]

    states.each { |state| assert_includes block, state }
    assert_match(/color: var\(--pathfinder-link\);/, block)
    hover = css[/\.pathfinder__link:hover,\s*\.pathfinder__link:focus-visible \{.*?\}/m]
    assert_includes hover, "--pathfinder-link: var(--ccs-text-link-hover);"
    assert_no_match(/background/, hover)
    assert_match(/\.pathfinder__summary \{[^}]*color: var\(--ccs-text-primary\);/m, css)
    assert_match(/\.pathfinder__item:nth-child\(even\) \{\s*background: var\(--ccs-surface-subtle\);/, css)
  end
end
