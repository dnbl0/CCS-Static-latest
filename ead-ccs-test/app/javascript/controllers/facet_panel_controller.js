import { Controller } from "@hotwired/stimulus"

// The values in an open filter panel, as on the static search page: a "Search ..." box above the list that narrows
// it as you type, only the first few values shown (six, twelve for short-value filters), and a "Show all 20" /
// "Show fewer" link under them. Without JavaScript every value is listed, as Blacklight renders them.
export default class extends Controller {
  static values = { limit: { type: Number, default: 6 }, search: { type: Boolean, default: true }, label: String }

  connect() {
    this.list = this.element.querySelector("ul.facet-values")
    if (!this.list) return

    this.items = [...this.list.querySelectorAll(":scope > li")]
    this.expanded = false
    if (this.searchValue && this.items.length > 1) this.addSearch()
    if (this.items.length > this.limitValue) this.addToggle()
    this.update()
  }

  addSearch() {
    this.input = document.createElement("input")
    this.input.type = "search"
    this.input.className = "facet-panel__search"
    this.input.placeholder = this.labelValue
    this.input.setAttribute("aria-label", this.labelValue)
    this.input.addEventListener("input", () => this.update())
    this.list.before(this.input)
  }

  addToggle() {
    this.toggle = document.createElement("button")
    this.toggle.type = "button"
    this.toggle.className = "facet-panel__more"
    this.toggle.addEventListener("click", () => {
      this.expanded = !this.expanded
      this.update()
    })
    this.list.after(this.toggle)
  }

  update() {
    const query = (this.input?.value || "").trim().toLowerCase()
    const matches = this.items.filter((item) => item.textContent.toLowerCase().includes(query))
    // Searching looks through every value; otherwise only the first few until "Show all"
    const shown = query || this.expanded ? matches : matches.slice(0, this.limitValue)

    this.items.forEach((item) => { item.hidden = !shown.includes(item) })

    if (this.toggle) {
      this.toggle.hidden = Boolean(query) || matches.length <= this.limitValue
      this.toggle.textContent = this.expanded ? "Show fewer" : `Show all ${matches.length}`
      this.toggle.setAttribute("aria-expanded", String(this.expanded))
    }
  }
}
