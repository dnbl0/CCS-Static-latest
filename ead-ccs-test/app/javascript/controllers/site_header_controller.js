import { Controller } from "@hotwired/stimulus"

// Site header behaviour: desktop dropdown panels and the mobile drawer. On mobile, opening a
// section "drills in": the section replaces the menu list and the header title takes its name.
export default class extends Controller {
  static targets = ["nav", "menu", "menuLabel", "trigger", "title"]

  openSearch() {
    this.dispatch("open", { prefix: "search-overlay", bubbles: true })
  }

  toggleSection(event) {
    const trigger = event.currentTarget
    const wasOpen = trigger.getAttribute("aria-expanded") === "true"
    this.closeSections(trigger)
    trigger.setAttribute("aria-expanded", wasOpen ? "false" : "true")
    this.syncTitle()
  }

  back(event) {
    const trigger = event.currentTarget.closest(".site-nav__panel")?.previousElementSibling
    if (!trigger) return
    trigger.setAttribute("aria-expanded", "false")
    this.syncTitle()
    trigger.focus()
  }

  toggleMenu() {
    this.setMenu(this.menuTarget.getAttribute("aria-expanded") !== "true")
  }

  escape() {
    const open = this.openTrigger
    if (open) {
      this.closeSections()
      open.focus()
    } else if (this.menuOpen) {
      this.setMenu(false)
      this.menuTarget.focus()
    }
  }

  // A click outside an open dropdown closes it; outside the header it also closes the drawer.
  // A click on the dimmed page behind the drawer lands on the header itself.
  clickAway(event) {
    if (event.target === this.element) return this.setMenu(false)
    if (this.element.contains(event.target)) {
      if (!event.target.closest(".site-nav__panel, .site-nav__trigger, .site-header__menu")) this.closeSections()
      return
    }
    this.closeSections()
    this.setMenu(false)
  }

  // Keyboard users tabbing out of the header close the dropdown.
  focusAway(event) {
    if (!this.element.contains(event.target)) this.closeSections()
  }

  setMenu(open) {
    this.menuTarget.setAttribute("aria-expanded", String(open))
    this.menuLabelTarget.textContent = open ? "Close" : "Menu"
    this.navTarget.classList.toggle("is-open", open)
    if (!open) this.closeSections()
  }

  closeSections(except = null) {
    this.triggerTargets.forEach((trigger) => {
      if (trigger !== except) trigger.setAttribute("aria-expanded", "false")
    })
    this.syncTitle()
  }

  syncTitle() {
    const title = this.titleTarget
    const open = this.openTrigger
    if (open && window.matchMedia("(max-width: 1023px)").matches) {
      if (!title.dataset.homeLabel) title.dataset.homeLabel = title.textContent
      title.textContent = open.textContent.replace(/\s+/g, " ").trim()
    } else if (title.dataset.homeLabel) {
      title.textContent = title.dataset.homeLabel
      delete title.dataset.homeLabel
    }
  }

  get openTrigger() {
    return this.triggerTargets.find((trigger) => trigger.getAttribute("aria-expanded") === "true")
  }

  get menuOpen() {
    return this.menuTarget.getAttribute("aria-expanded") === "true"
  }
}
