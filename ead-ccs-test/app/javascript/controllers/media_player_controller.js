import { Controller } from "@hotwired/stimulus"

// Upgrades a record's audio or video from the browser's own controls to Video.js 10's player (Compat skin, vendored in
// public/vendor/videojs and served from this site, never a CDN).
//
// The markup carries `controls`, so the media plays natively until the player has loaded and if it never does (offline,
// blocked script, an old browser). Only once the player's element is defined is `controls` removed: left on, the native
// controls draw over the player's. The script is loaded here, by a dynamic import, so only pages with audio or video
// download it, and each kind loads only its own bundle.
const BUNDLES = { video: "/vendor/videojs/video-compat.js", audio: "/vendor/videojs/audio-compat.js" }
const SKINS = { video: "video-compat-skin", audio: "audio-compat-skin" }

export default class extends Controller {
  static values = { kind: String }

  async connect() {
    const kind = this.kindValue
    if (!BUNDLES[kind]) return

    try {
      await import(BUNDLES[kind])
      await customElements.whenDefined(SKINS[kind])
    } catch (_) {
      return // the native controls stay
    }

    this.element.querySelector(`${kind}[controls]`)?.removeAttribute("controls")
    this.element.classList.add("is-enhanced")
  }
}
