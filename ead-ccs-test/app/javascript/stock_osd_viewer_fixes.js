// Four things the OpenSeadragon viewer of the record page (blacklight-gallery's template, started by openseadragon-rails)
// does not do. Runs after openseadragon-rails has started the viewers (same load events, imported after it).
//
// 1. The "1 of 10" in the toolbar is drawn by the template and nothing updates it when the viewer changes page
//    (previous, next, a thumbnail, full page and back): keep it in step with OpenSeadragon's own "page" event.
// 2. In full page OpenSeadragon puts the toolbar above the viewer, then sets the viewer to 100% of the window anyway,
//    so the bottom of the image is cut off by the toolbar's height: size the viewer to what is left.
// 3. The thumbnail strip along the bottom is drawn over the image, so the foot of every image sits behind it: tell
//    OpenSeadragon's viewport to leave the strip's height clear.
// 4. OpenSeadragon makes every thumbnail's box as wide as the viewer is wide, in proportion (about 2.2 times as wide as tall
//    in a wide viewer), so each thumbnail floats in a box far wider than itself and the gaps between them are large:
//    make the boxes a little wider than they are tall.
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
    const tightenStrip = () => {
      const strip = viewer.referenceStrip
      if (!strip || strip.scroll !== "horizontal" || strip.tightened) return
      strip.tightened = true
      const width = Math.round(strip.panelHeight * 1.2)
      strip.panelWidth = width
      // a box is panelWidth + 4 wide, which is how OpenSeadragon turns a click on the strip into a page number
      strip.panels.forEach((panel) => { panel.style.width = `${width + 4}px` })
      strip.element.style.width = `${(width + 4) * strip.panels.length}px`
      // each thumbnail is a small viewer of its own, fitted to its old box (or still opening, so fitted when it has): fit it to the new one
      Object.values(strip.miniViewers).forEach((mini) => {
        mini.forceResize()
        if (mini.world.getItemCount() > 0) { mini.viewport.goHome(true); mini.forceRedraw() }
        else mini.addHandler("open", () => { mini.viewport.goHome(true); mini.forceRedraw() })
      })
      strip.setFocus(viewer.currentPage())
    }
    // OpenSeadragon resizes and re-fits things as the page settles (and when the window changes size); fit the thumbnails again then
    const refitThumbnails = () => {
      const strip = viewer.referenceStrip
      if (!strip || !strip.tightened) return
      Object.values(strip.miniViewers).forEach((mini) => mini.viewport.goHome(true))
    }
    // the thumbnails open one after another over the first moments, so fit them again as they do
    viewer.addHandler("open", () => [ 300, 800, 1500, 3000, 6000 ].forEach((delay) => setTimeout(refitThumbnails, delay)))
    viewer.addHandler("resize", () => setTimeout(refitThumbnails, 100))
    viewer.addHandler("open", tightenStrip)
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
