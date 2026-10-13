// Three things the OpenSeadragon viewer of the record page (blacklight-gallery's template, started by openseadragon-rails)
// does not do. Runs after openseadragon-rails has started the viewers (same load events, imported after it).
//
// 1. The "1 of 10" in the toolbar is drawn by the template and nothing updates it when the viewer changes page
//    (previous, next, a thumbnail, full page and back): keep it in step with OpenSeadragon's own "page" event.
// 2. In full page OpenSeadragon puts the toolbar above the viewer, then sets the viewer to 100% of the window anyway,
//    so the bottom of the image is cut off by the toolbar's height: size the viewer to what is left.
// 3. The thumbnail strip along the bottom is drawn over the image, so the foot of every image sits behind it: tell
//    OpenSeadragon's viewport to leave the strip's height clear.
function fixViewers() {
  document.querySelectorAll("picture.openseadragon-viewer").forEach((picture) => {
    const viewer = picture.osdViewer
    if (!viewer || picture.dataset.viewerFixes) return
    picture.dataset.viewerFixes = "true"

    const prefix = JSON.parse(picture.dataset.openseadragon || "{}").nextButton?.replace(/-next$/, "")
    const counter = prefix && document.getElementById(`${prefix}-page`)
    if (counter) viewer.addHandler("page", (event) => { counter.textContent = event.page + 1 })

    const leaveStripClear = () => {
      const strip = picture.querySelector(".referencestrip")
      if (!strip || strip.offsetHeight >= strip.offsetWidth) return // none, or the vertical one down the side
      viewer.viewport.setMargins({ bottom: strip.offsetHeight })
      viewer.viewport.goHome(true)
    }
    viewer.addHandler("open", leaveStripClear)
    viewer.addHandler("resize", leaveStripClear)

    viewer.addHandler("full-page", (event) => {
      const toolbar = prefix && document.getElementById(`${prefix}-toolbar`)
      // after OpenSeadragon's own resize, which sets 100% once the event has been raised
      if (event.fullPage && toolbar) setTimeout(() => { picture.style.height = `calc(100vh - ${toolbar.offsetHeight}px)`; viewer.forceResize() }, 100)
    })
  })
}

addEventListener("load", fixViewers)
addEventListener("turbo:load", fixViewers)
addEventListener("turbo:frame-load", fixViewers)
