import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// Turns a native <select> into the site's dropdown (the look of the sort and per-page buttons: a navy outlined
// box, a chevron cell, a menu beneath), so the browser's own menu is not used. The <select> stays in the page,
// hidden, and is still what the form submits, so the form works without JavaScript and the value is the same.
// Attach to an element containing the select; `data-select-dropdown-selector-value` picks it (default "select").
export default class extends Controller {
  static values = { selector: { type: String, default: "select" } }

  connect() {
    this.select = this.element.querySelector(this.selectorValue)
    if (!this.select || this.group) return

    const label = this.element.querySelector(`label[for="${this.select.id}"]`)?.textContent.trim() || this.select.title
    this.group = document.createElement("div")
    this.group.className = "btn-group ccs-select"

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
    this.toggle.focus()
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
