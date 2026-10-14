import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// The mosaic of a record's media (NexusCcs::DigitalAssetsMosaicComponent): a tile or button opens the gallery window, with the gallery
// (controllers/media_viewer_controller.js, unchanged) showing the item that was chosen. The gallery's own thumbnails are what choose: the one at
// the position given is clicked once the window is open. Without JavaScript the tiles do nothing, and the gallery is still on the page.
export default class extends Controller {
  static targets = [ "modal", "grid", "row", "tile" ]

  // Each image tile takes the shape of its image once it is known: --ratio is its width over its height. The grid's width is capped so that all its
  // rows fit the height the stylesheet allows: a row is as tall as its width over the sum of its tiles' ratios, so the rows together are as tall
  // as the width times the sum, over the rows, of one over their sum (--mosaic-inverse); on a phone only the first tile shows (--mosaic-inverse-first).
  connect() {
    this.tileTargets.forEach((tile) => {
      const image = tile.querySelector("img")
      if (!image) return
      const measure = () => {
        if (!image.naturalWidth || !image.naturalHeight) return
        tile.style.setProperty("--ratio", image.naturalWidth / image.naturalHeight)
        this.layout()
      }
      image.complete ? measure() : image.addEventListener("load", measure, { once: true })
    })
    this.layout()
  }

  ratio(tile) {
    return parseFloat(tile.style.getPropertyValue("--ratio")) || 4 / 3
  }

  layout() {
    const sums = this.rowTargets.map((row) => [ ...row.querySelectorAll("[data-mosaic-target=tile]") ].reduce((sum, tile) => sum + this.ratio(tile), 0))
    this.gridTarget.style.setProperty("--mosaic-inverse", sums.reduce((total, sum) => total + 1 / sum, 0))
    this.gridTarget.style.setProperty("--mosaic-inverse-first", 1 / this.ratio(this.tileTargets[0]))
  }

  open({ params: { index } }) {
    const modal = bootstrap.Modal.getOrCreateInstance(this.modalTarget)
    const choose = () => this.modalTarget.querySelectorAll(".digital-assets__other")[index]?.click()
    if (this.modalTarget.classList.contains("show")) return choose()
    this.modalTarget.addEventListener("shown.bs.modal", choose, { once: true })
    modal.show()
  }
}
