import { Controller } from "@hotwired/stimulus"

// A record's media: the "Media metadata" panel (opened by the info button, closed by its own button or Esc, with
// focus going to the panel's close button and back to the info button), full screen for the band, and the
// thumbnails swapping the large image. Without JavaScript the panel stays closed, the thumbnails are links to
// the full-size images, and the full screen button never appears.
export default class extends Controller {
  static targets = [ "stage", "image", "panel", "infoButton", "fullscreenButton" ]

  connect() {
    this.onKey = (event) => { if (event.key === "Escape" && this.hasPanelTarget && !this.panelTarget.hidden) this.closePanel() }
    this.onFullscreen = () => this.syncFullscreen()
    this.element.addEventListener("keydown", this.onKey)
    document.addEventListener("fullscreenchange", this.onFullscreen)
    if (this.hasFullscreenButtonTarget && document.fullscreenEnabled) this.fullscreenButtonTarget.hidden = false
  }

  disconnect() {
    this.element.removeEventListener("keydown", this.onKey)
    document.removeEventListener("fullscreenchange", this.onFullscreen)
  }

  togglePanel() {
    this.panelTarget.hidden ? this.openPanel() : this.closePanel()
  }

  openPanel() {
    this.panelTarget.hidden = false
    this.infoButtonTarget.setAttribute("aria-expanded", "true")
    this.panelTarget.querySelector("button")?.focus()
  }

  closePanel() {
    this.panelTarget.hidden = true
    this.infoButtonTarget.setAttribute("aria-expanded", "false")
    this.infoButtonTarget.focus()
  }

  async toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await this.element.requestFullscreen()
    } catch (_) { /* refused: the button does nothing */ }
  }

  syncFullscreen() {
    const on = document.fullscreenElement === this.element
    this.element.classList.toggle("is-fullscreen", on)
    if (this.hasFullscreenButtonTarget) {
      this.fullscreenButtonTarget.setAttribute("aria-label", on ? "Exit full screen" : "Full screen")
      this.fullscreenButtonTarget.title = on ? "Exit full screen" : "Full screen"
    }
  }

  // a thumbnail shows its large image in the band (a modified click still opens it in a new tab)
  show(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return
    event.preventDefault()
    const link = event.currentTarget
    this.imageTarget.src = link.dataset.mediaViewerLarge
    this.imageTarget.alt = link.dataset.mediaViewerAlt
  }
}
