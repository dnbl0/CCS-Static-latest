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
    viewer.addHandler("page", (event) => mark(event.page))
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

addEventListener("load", wireThumbnails)
addEventListener("turbo:load", wireThumbnails)
addEventListener("turbo:frame-load", wireThumbnails)
