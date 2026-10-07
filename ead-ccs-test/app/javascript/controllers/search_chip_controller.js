import { Controller } from "@hotwired/stimulus"

// The banner's search bar shows the search being looked at as a chip ("ART x"), as the static search page's bar
// does, and the box beside it is free for a new search ("Search for something else"). Removing the chip, by
// clicking it or by pressing Backspace in the empty box, drops the query from the search (the filters stay) and
// puts the cursor in the box. Blacklight's own <input name="q"> stays the form's field: without JavaScript there
// is no chip and the box keeps the query.
//
// Attached by NexusCcs::SearchBannerComponent (the values only when there is a query):
//   data-search-chip-query-value="art"  data-search-chip-clear-url-value="/?f[...]=..."
const FOCUS_KEY = "searchChip:focus"

export default class extends Controller {
  static values = { query: String, clearUrl: String }

  connect() {
    this.input = this.element.querySelector("input[name='q']")
    this.group = this.element.querySelector(".input-group")
    this.field = this.element.querySelector(".search-autocomplete-wrapper")
    if (!this.input) return
    this.focusAfterClear()
    if (!this.group || !this.queryValue) return

    this.placeholder = this.input.getAttribute("placeholder")
    this.chip = this.buildChip()
    this.group.insertBefore(this.chip, this.field || this.input)
    this.element.classList.add("has-chip")
    if (this.input.value === this.queryValue) this.input.value = ""
    this.input.setAttribute("placeholder", "Search for something else")

    this.onKeydown = (event) => { if (event.key === "Backspace" && this.input.value === "") this.clear() }
    this.onSubmit = (event) => { if (this.input.value.trim() === "") event.preventDefault() }
    this.input.addEventListener("keydown", this.onKeydown)
    this.input.form.addEventListener("submit", this.onSubmit)
  }

  // After a chip was cleared the new page puts the cursor in the box
  focusAfterClear() {
    if (!sessionStorage.getItem(FOCUS_KEY)) return

    sessionStorage.removeItem(FOCUS_KEY)
    // after Turbo has finished rendering and settled focus
    setTimeout(() => this.input.focus(), 0)
  }

  disconnect() {
    this.chip?.remove()
    this.element.classList.remove("has-chip")
    if (this.input) {
      this.input.removeEventListener("keydown", this.onKeydown)
      this.input.form?.removeEventListener("submit", this.onSubmit)
      if (this.placeholder !== null) this.input.setAttribute("placeholder", this.placeholder)
    }
  }

  buildChip() {
    const chip = document.createElement("button")
    chip.type = "button"
    chip.className = "search-chip"
    chip.setAttribute("aria-label", `Clear search “${this.queryValue}”`)
    chip.innerHTML = '<span class="search-chip__text"></span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" aria-hidden="true" focusable="false"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>'
    chip.querySelector(".search-chip__text").textContent = this.queryValue
    chip.addEventListener("click", () => this.clear())
    return chip
  }

  // The search without its query; the page that loads puts the cursor in the box
  clear() {
    sessionStorage.setItem(FOCUS_KEY, "1")
    window.Turbo ? window.Turbo.visit(this.clearUrlValue) : (window.location.href = this.clearUrlValue)
  }
}
