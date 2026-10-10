import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// Turns a native <select> into the site's dropdown (the look of the sort and per-page buttons: a navy outlined
// box, a chevron cell, a menu beneath), so the browser's own menu is not used. The <select> stays in the page,
// hidden, and is still what the form submits, so the form works without JavaScript and the value is the same.
// Attach to an element containing the select; `data-select-dropdown-selector-value` picks it (default "select").
// `data-select-dropdown-variant-value="field"` gives it the look of the filter rail's boxes (a 48px box with a
// quiet outline and a chevron inside it) for use in forms, such as the advanced search flyout; its menu is
// positioned against the window so a scrolling panel around it cannot clip it.
export default class extends Controller {
  static values = { selector: { type: String, default: "select" }, variant: { type: String, default: "" } }

  connect() {
    this.select = this.element.querySelector(this.selectorValue)
    if (!this.select || this.group) return

    const label = this.element.querySelector(`label[for="${this.select.id}"]`)?.textContent.trim() || this.select.title
    this.group = document.createElement("div")
    this.group.className = "btn-group ccs-select"
    if (this.variantValue) this.group.classList.add(`ccs-select--${this.variantValue}`)

    this.toggle = document.createElement("button")
    this.toggle.type = "button"
    this.toggle.className = "btn dropdown-toggle"
    this.toggle.setAttribute("data-bs-toggle", "dropdown")
    this.toggle.setAttribute("aria-expanded", "false")
    this.toggle.setAttribute("aria-haspopup", "listbox")
    this.toggle.title = label || ""

    this.menu = document.createElement("div")
    this.menu.className = "dropdown-menu"
    this.menu.setAttribute("role", "listbox")
    if (label) this.menu.setAttribute("aria-label", label)

    this.items = [...this.select.options].map((option) => {
      const item = document.createElement("button")
      item.type = "button"
      item.className = "dropdown-item"
      item.setAttribute("role", "option")
      item.dataset.value = option.value
      item.textContent = option.textContent.trim()
      item.addEventListener("click", () => this.choose(option.value))
      this.menu.append(item)
      return item
    })

    this.group.append(this.toggle, this.menu)
    this.select.before(this.group)
    if (this.variantValue === "field") {
      bootstrap.Dropdown.getOrCreateInstance(this.toggle, { popperConfig: (config) => ({ ...config, strategy: "fixed" }) })
    }
    // Other scripts add and remove options (a filter already shown is hidden from the "Add filter" menu) and reset the
    // value, so the menu is brought up to date each time it opens
    this.toggle.addEventListener("show.bs.dropdown", () => this.refresh())
    this.select.hidden = true
    this.select.setAttribute("aria-hidden", "true")
    this.select.tabIndex = -1
    this.sync()
  }

  disconnect() {
    if (!this.group) return
    bootstrap.Dropdown.getInstance(this.toggle)?.dispose()
    this.group.remove()
    this.group = null
    if (this.select) { this.select.hidden = false; this.select.removeAttribute("aria-hidden"); this.select.tabIndex = 0 }
  }

  choose(value) {
    this.select.value = value
    this.select.dispatchEvent(new Event("change", { bubbles: true }))
    this.sync()
    // a change handler may put the value back (the "Add filter" menu returns to its placeholder)
    requestAnimationFrame(() => this.sync())
    this.toggle.focus()
  }

  // follow the <select>: options other scripts have hidden or disabled, and its current value
  refresh() {
    // a window-positioned menu has no box to be 100% of: it is as wide as the button
    if (this.variantValue === "field") this.menu.style.setProperty("--bs-dropdown-min-width", `${this.toggle.offsetWidth}px`)
    this.items.forEach((item) => {
      const option = [...this.select.options].find((candidate) => candidate.value === item.dataset.value)
      item.hidden = Boolean(option?.hidden)
      item.disabled = Boolean(option?.disabled)
    })
    this.sync()
  }

  // the button shows the chosen option; the menu marks it
  sync() {
    const chosen = this.select.selectedOptions[0]
    this.toggle.textContent = chosen ? chosen.textContent.trim() : ""
    this.items.forEach((item) => {
      const on = item.dataset.value === this.select.value
      item.classList.toggle("active", on)
      item.setAttribute("aria-selected", String(on))
    })
  }
}
