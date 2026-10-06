import { Controller } from "@hotwired/stimulus"

// The results sidebar as an off-canvas drawer below 992px (from 992px it is an ordinary column and this
// does nothing). Opening locks page scroll, shows a scrim, moves focus into the drawer and keeps Tab
// inside it; Escape, the Close button or the scrim close it and focus returns to the Filters button.
const MOBILE = "(max-width: 991.98px)"
const FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])"

export default class extends Controller {
  static targets = ["close"]

  connect() {
    this.sidebar = this.element.closest("#sidebar")
    this.query = window.matchMedia(MOBILE)
    this.onWidthChange = () => { if (!this.query.matches) this.close({ restoreFocus: false }) }
    this.query.addEventListener("change", this.onWidthChange)
    this.onKeydown = (event) => this.trapFocus(event)
    this.backdrop = document.createElement("div")
    this.backdrop.className = "filter-backdrop"
    this.backdrop.addEventListener("click", () => this.close())
    document.body.appendChild(this.backdrop)
  }

  disconnect() {
    this.query.removeEventListener("change", this.onWidthChange)
    this.backdrop.remove()
    document.body.classList.remove("filter-drawer-open")
  }

  open(event) {
    if (!this.query.matches || this.isOpen) return
    this.opener = event.detail?.opener || document.activeElement
    this.sidebar.classList.add("is-open")
    this.backdrop.classList.add("is-open")
    document.body.classList.add("filter-drawer-open")
    this.sidebar.setAttribute("role", "dialog")
    this.sidebar.setAttribute("aria-modal", "true")
    this.sidebar.setAttribute("aria-labelledby", "filter-drawer-title")
    this.element.addEventListener("keydown", this.onKeydown)
    this.closeTarget.focus()
  }

  close({ restoreFocus = true } = {}) {
    if (!this.isOpen) return
    this.sidebar.classList.remove("is-open")
    this.backdrop.classList.remove("is-open")
    document.body.classList.remove("filter-drawer-open")
    this.sidebar.removeAttribute("role")
    this.sidebar.removeAttribute("aria-modal")
    this.sidebar.removeAttribute("aria-labelledby")
    this.element.removeEventListener("keydown", this.onKeydown)
    if (restoreFocus) this.opener?.focus()
  }

  escape() {
    this.close()
  }

  get isOpen() {
    return this.sidebar?.classList.contains("is-open")
  }

  trapFocus(event) {
    if (event.key !== "Tab") return
    const focusable = [...this.sidebar.querySelectorAll(FOCUSABLE)].filter((element) => element.offsetParent !== null)
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
