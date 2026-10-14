import { Controller } from "@hotwired/stimulus"
import OpenSeadragon from "openseadragon"

// A record's media: the "Media metadata" panel (opened by the info button, closed by its own button or Esc, with
// focus going to the panel's close button and back to the info button), full screen for the band, and the
// thumbnails swapping the large image. Without JavaScript the panel stays closed, the thumbnails are links to
// the full-size images, and the full screen button never appears.
//
// The panel is always rendered (never [hidden]/display:none): it is an absolutely positioned child of the
// stage's flex layout, and toggling a flex child's display briefly counted it back into the stage's
// justify-content centring, jolting the large image. Opening and closing it only ever toggles the "is-open"
// class (transform/visibility, both paint-only) and aria-hidden, which never touches that layout.
export default class extends Controller {
  static targets = [ "stage", "main", "viewer", "media", "panel", "infoButton", "fullscreenButton" ]

  connect() {
    this.onKey = (event) => { if (event.key === "Escape" && this.isOpen) this.closePanel() }
    this.onFullscreen = () => this.syncFullscreen()
    this.element.addEventListener("keydown", this.onKey)
    document.addEventListener("fullscreenchange", this.onFullscreen)
    if (this.hasFullscreenButtonTarget && document.fullscreenEnabled) this.fullscreenButtonTarget.hidden = false
    // the stage shows one item at a time: the first (the images' viewer if there are images). Without JavaScript they all show.
    this.mediaTargets.forEach((figure, index) => { figure.hidden = this.hasMainTarget || index > 0 })
    this.refitWhenResized()
  }

  // The viewer's size changes with the window, the breakpoints and the screen's height (the band's height follows it): OpenSeadragon is told, and
  // the image is fitted to the new size again (there is no zoom, so it is always the whole image). The viewer is started by openseadragon-rails
  // after the page loads, so it is waited for.
  refitWhenResized() {
    if (!this.hasViewerTarget) return
    let attempts = 0
    const watch = () => {
      const viewer = this.viewerTarget.osdViewer
      if (!viewer) { if (attempts++ < 50) this.waiting = setTimeout(watch, 100); return }
      this.viewerTarget.style.removeProperty("height") // openseadragon-rails writes the height it measured at start as inline pixels, which ignores the CSS from then on
      this.resizeObserver = new ResizeObserver(() => {
        if (this.viewerTarget.hidden || !this.viewerTarget.offsetWidth) return
        // given the new size here rather than left to OpenSeadragon's own watcher, which does not always see the change (the container's
        // percentage height follows the picture's, which the stylesheet now sets)
        viewer.viewport.resize(new OpenSeadragon.Point(this.viewerTarget.clientWidth, this.viewerTarget.clientHeight), false)
        viewer.viewport.goHome(true)
        viewer.forceRedraw()
      })
      this.resizeObserver.observe(this.viewerTarget)
    }
    watch()
  }

  disconnect() {
    clearTimeout(this.waiting)
    this.resizeObserver?.disconnect()
    this.element.removeEventListener("keydown", this.onKey)
    document.removeEventListener("fullscreenchange", this.onFullscreen)
  }

  get isOpen() {
    return this.hasPanelTarget && this.panelTarget.classList.contains("is-open")
  }

  togglePanel() {
    this.isOpen ? this.closePanel() : this.openPanel()
  }

  openPanel() {
    this.panelTarget.classList.add("is-open")
    this.panelTarget.removeAttribute("aria-hidden")
    this.infoButtonTarget.setAttribute("aria-expanded", "true")
    this.panelTarget.querySelector("button")?.focus()
  }

  closePanel() {
    this.panelTarget.classList.remove("is-open")
    this.panelTarget.setAttribute("aria-hidden", "true")
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
    if (this.hasViewerTarget) this.viewerTarget.osdViewer?.forceResize()
    if (this.hasFullscreenButtonTarget) {
      this.fullscreenButtonTarget.setAttribute("aria-label", on ? "Exit full screen" : "Full screen")
      this.fullscreenButtonTarget.title = on ? "Exit full screen" : "Full screen"
    }
  }

  // a thumbnail shows its item in the stage: an image in the OpenSeadragon viewer, an audio, video or PDF file in its own player
  // (a modified click still opens the file in a new tab)
  show(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return
    const link = event.currentTarget
    const isImage = link.dataset.mediaViewerKind === "image"
    const viewer = this.hasViewerTarget && this.viewerTarget.osdViewer
    if (isImage && !viewer) return // viewer not started: the link opens the full-size image
    event.preventDefault()

    this.element.querySelectorAll("audio, video").forEach((player) => player.pause())
    if (this.hasMainTarget) this.mainTarget.hidden = !isImage
    this.mediaTargets.forEach((figure) => { figure.hidden = isImage || figure.id !== link.dataset.mediaViewerMedia })

    if (isImage) {
      viewer.goToPage(Number(link.dataset.mediaViewerPage))
      this.viewerTarget.setAttribute("aria-label", link.dataset.mediaViewerAlt)
      viewer.forceResize() // it was not displayed while a file was on show
    }
    this.element.querySelectorAll(".digital-assets__other").forEach((other) => {
      const current = other === link
      other.classList.toggle("border-info", current)
      other.classList.toggle("border-transparent", !current)
      current ? other.setAttribute("aria-current", "true") : other.removeAttribute("aria-current")
    })
  }
}
