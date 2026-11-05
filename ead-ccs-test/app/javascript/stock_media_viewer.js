import * as bootstrap from "bootstrap"
import { inertOutside, releaseInert } from "modal_lock"

// Bootstrap tooltips (hover and keyboard focus) for the elements with data-tooltip-title: the media toolbar's info and full screen
// buttons and the permalink's copy button. A data attribute of its own, as data-bs-toggle is already taken on the info button (it opens
// the modal). OpenSeadragon gives the buttons it manages a native title ("Toggle full page") which would show as well, so it is removed.
function setUpTooltips() {
  document.querySelectorAll("[data-tooltip-title]").forEach((element) => {
    if (bootstrap.Tooltip.getInstance(element)) return
    element.removeAttribute("title")
    new bootstrap.Tooltip(element, { title: element.dataset.tooltipTitle, placement: "bottom", trigger: "hover focus" })
  })
}

// WCAG 1.4.13: a tooltip can be dismissed without moving the pointer or focus. Bootstrap's do not close on Escape.
addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return
  document.querySelectorAll("[data-tooltip-title]").forEach((element) => bootstrap.Tooltip.getInstance(element)?.hide())
})

// In full screen the full screen button leaves it: say so (its label and tooltip).
function labelFullScreenButton() {
  document.querySelectorAll("picture.openseadragon-viewer").forEach((picture) => {
    const viewer = picture.osdViewer
    if (!viewer || picture.dataset.fullScreenLabel) return
    picture.dataset.fullScreenLabel = "true"
    viewer.addHandler("full-page", (event) => {
      const label = event.fullPage ? "Exit full screen" : "Full screen"
      document.querySelectorAll("[id$=-full-page]").forEach((button) => {
        button.setAttribute("aria-label", label)
        bootstrap.Tooltip.getInstance(button)?.setContent({ ".tooltip-inner": label })
      })
    })
  })
}

// The media band's behaviour that OpenSeadragon does not do itself (it is started by openseadragon-rails; this runs after it,
// on the same load events):
// - each thumbnail goes to its image in the viewer, and the thumbnail of the image on show is marked;
// - in full screen OpenSeadragon puts the toolbar above the viewer then sets the viewer to the whole window, so the foot of the
//   image is cut off by the toolbar's height: the viewer is sized to what is left. The media metadata modal is not on the page
//   in full screen (OpenSeadragon takes everything else off it), so its button is hidden there.
function wireThumbnails() {
  document.querySelectorAll("[data-media-thumbnails]").forEach((nav) => {
    const picture = document.getElementById(nav.dataset.viewer)
    const viewer = picture && picture.osdViewer
    if (!viewer || nav.dataset.wired) return
    nav.dataset.wired = "true"

    const buttons = [...nav.querySelectorAll("button[data-page]")]
    const mark = (page) => buttons.forEach((button, index) => {
      const current = index === page
      button.classList.toggle("border-white", current)
      button.classList.toggle("border-transparent", !current)
      if (current) button.setAttribute("aria-current", "true"); else button.removeAttribute("aria-current")
    })

    buttons.forEach((button) => button.addEventListener("click", () => viewer.goToPage(Number(button.dataset.page))))
    viewer.addHandler("page", (event) => { mark(event.page); picture.setAttribute("aria-label", buttons[event.page].dataset.label) })
    mark(viewer.currentPage())

    const toolbar = document.getElementById(viewer.toolbar?.element?.id || "")
    viewer.addHandler("full-page", (event) => {
      if (!toolbar) return
      toolbar.querySelectorAll("[data-bs-toggle=modal]").forEach((button) => button.classList.toggle("d-none", event.fullPage))
      // after OpenSeadragon's own resize, which sets the height to 100% once the event has been raised
      if (event.fullPage) setTimeout(() => { picture.style.height = `calc(100vh - ${toolbar.offsetHeight}px)`; viewer.forceResize() }, 100)
      else picture.style.height = "616px"
    })
  })
}

const start = () => { wireThumbnails(); labelFullScreenButton(); setUpTooltips() }
addEventListener("load", start)
addEventListener("turbo:load", start)
addEventListener("turbo:frame-load", start)

// The media metadata modal is a Bootstrap modal: it sets aria-modal, which is only a hint to a screen reader, and leaves the page
// behind it reachable. While it is open the rest of the page is made inert, as for the site's other overlays (modal_lock.js).
document.addEventListener("shown.bs.modal", (event) => {
  if (event.target.matches("[id$='-media-metadata']")) inertOutside(event.target, event.target)
})
// Released on hide, not hidden: Bootstrap puts focus back on the button that opened the modal when the fade-out ends, and an inert
// button cannot take focus, so releasing after that left focus on <body>.
document.addEventListener("hide.bs.modal", (event) => {
  if (event.target.matches("[id$='-media-metadata']")) releaseInert(event.target)
})
