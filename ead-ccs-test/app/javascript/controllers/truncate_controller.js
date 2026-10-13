import { Controller } from "@hotwired/stimulus"

// A long text value (the record's Description) collapsed to a character limit, with a Show more/Show
// less button that expands and collapses it. Without JavaScript the full text just shows, untruncated.
export default class extends Controller {
  static targets = [ "text", "toggle" ]
  static values = { limit: { type: Number, default: 220 } }

  connect() {
    this.full = this.textTarget.textContent.trim()
    this.short = this.truncate(this.full)
    if (this.short === this.full) return

    this.expanded = false
    this.render()
    this.toggleTarget.hidden = false
  }

  toggle() {
    this.expanded = !this.expanded
    this.render()
  }

  render() {
    this.textTarget.textContent = this.expanded ? this.full : this.short
    this.toggleTarget.textContent = this.expanded ? "Show less" : "Show more"
    this.toggleTarget.setAttribute("aria-expanded", this.expanded)
  }

  truncate(text) {
    if (text.length <= this.limitValue) return text

    const cut = text.slice(0, this.limitValue)
    const lastSpace = cut.lastIndexOf(" ")
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
  }
}
