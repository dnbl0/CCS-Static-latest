import { Controller } from "@hotwired/stimulus"

// The sticky search bar: shown while the page's banner is scrolled out of view above the window, hidden while the
// banner (or the space above it) is on screen. Pages without a banner show it after `fallback` pixels instead.
export default class extends Controller {
  static values = { banner: String, fallback: { type: Number, default: 320 } }

  connect() {
    this.bannerElement = document.querySelector(this.bannerValue)

    if (this.bannerElement && "IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(([entry]) => {
        // Past it: not on screen and its bottom edge is above the top of the window (not merely further down)
        this.toggle(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0)
      })
      this.observer.observe(this.bannerElement)
    } else {
      this.onScroll = () => this.toggle(window.scrollY > this.fallbackValue)
      window.addEventListener("scroll", this.onScroll, { passive: true })
      this.onScroll()
    }
  }

  disconnect() {
    this.observer?.disconnect()
    if (this.onScroll) window.removeEventListener("scroll", this.onScroll)
  }

  toggle(show) {
    this.element.classList.toggle("is-visible", show)
    this.element.inert = !show
    this.element.setAttribute("aria-hidden", String(!show))
  }
}
