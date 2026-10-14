import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// The mosaic of a record's media (NexusCcs::DigitalAssetsMosaicComponent): a tile or button opens the gallery window, with the gallery
// (controllers/media_viewer_controller.js, unchanged) showing the item that was chosen. The gallery's own thumbnails are what choose: the one at
// the position given is clicked once the window is open. Without JavaScript the tiles do nothing, and the gallery is still on the page.
export default class extends Controller {
  static targets = [ "modal" ]

  open({ params: { index } }) {
    const modal = bootstrap.Modal.getOrCreateInstance(this.modalTarget)
    const choose = () => this.modalTarget.querySelectorAll(".digital-assets__other")[index]?.click()
    if (this.modalTarget.classList.contains("show")) return choose()
    this.modalTarget.addEventListener("shown.bs.modal", choose, { once: true })
    modal.show()
  }
}
