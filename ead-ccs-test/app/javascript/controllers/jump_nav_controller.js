import { Controller } from "@hotwired/stimulus"

// The Help page's jump navigation, "current section" highlight, as on the University's jump nav: the link for the
// section being read is marked (is-current, aria-current="location") and moves as the reader scrolls. Same behaviour
// as the static site's help/jump-nav.js.
export default class extends Controller {
  static targets = [ "link" ]

  // A section counts as being read once its heading is this far from the top of the window
  static values = { offset: { type: Number, default: 120 } }

  connect() {
    this.queued = false
    this.schedule = this.schedule.bind(this)
    window.addEventListener("scroll", this.schedule, { passive: true })
    window.addEventListener("resize", this.schedule)
    window.addEventListener("hashchange", this.schedule)
    this.schedule()
  }

  disconnect() {
    window.removeEventListener("scroll", this.schedule)
    window.removeEventListener("resize", this.schedule)
    window.removeEventListener("hashchange", this.schedule)
  }

  schedule() {
    if (this.queued) return
    this.queued = true
    window.requestAnimationFrame(() => {
      this.queued = false
      this.update()
    })
  }

  update() {
    const links = this.linkTargets
    if (!links.length) return

    let current = null
    links.forEach((link) => {
      const target = document.getElementById((link.getAttribute("href") || "").replace(/^#/, ""))
      if (target && target.getBoundingClientRect().top <= this.offsetValue) current = link
    })
    // At the very bottom the last section may be too short to reach the line: mark it once the page cannot scroll further
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = links[links.length - 1]
    current ||= links[0]

    links.forEach((link) => {
      const on = link === current
      link.classList.toggle("is-current", on)
      if (on) link.setAttribute("aria-current", "location")
      else link.removeAttribute("aria-current")
    })
  }
}
