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
  static targets = [ "state" ]

  // States of the stage (see digital_assets.css): "loading" only if the file is slow to start (no flicker for a quick one),
  // and an error that says what happened and what to do: the file is always a link away, and a dropped connection can be retried.
  static ERRORS = {
    2: { title: "The connection was interrupted", message: "Check your connection, then try again, or download the file below.", retry: true },
    3: { title: "This file could not be played", message: "It may be damaged. You can download it below.", retry: false },
    4: { title: "This file can't be played here", message: "It may be missing, or your browser may not support its format. You can download it below.", retry: false }
  }

  async connect() {
    const kind = this.kindValue
    if (!BUNDLES[kind]) return
    this.watch(kind)

    try {
      await import(BUNDLES[kind])
      await customElements.whenDefined(SKINS[kind])
    } catch (_) {
      return // the native controls stay
    }

    this.element.querySelector(`${kind}[controls]`)?.removeAttribute("controls")
    this.element.classList.add("is-enhanced")
  }

  disconnect() {
    clearTimeout(this.slowTimer)
  }

  get media() {
    return this.element.querySelector(this.kindValue)
  }

  watch(kind) {
    const media = this.media
    if (!media || !this.hasStateTarget) return
    const ready = () => this.clear()
    media.addEventListener("loadedmetadata", ready)
    media.addEventListener("canplay", ready)
    media.addEventListener("error", () => this.fail(media))
    media.addEventListener("loadstart", () => this.startWaiting(kind))
    if (media.error) this.fail(media) // failed before this controller connected
    else if (media.readyState < 1) this.startWaiting(kind)
  }

  startWaiting(kind) {
    clearTimeout(this.slowTimer)
    this.slowTimer = setTimeout(() => {
      if (this.media.readyState < 1 && !this.media.error) this.show("loading", `Loading ${kind}…`, "", false)
    }, 600)
  }

  fail(media) {
    clearTimeout(this.slowTimer)
    const error = this.constructor.ERRORS[media.error?.code] || this.constructor.ERRORS[4]
    this.show("error", error.title, error.message, error.retry)
  }

  show(state, title, message, retry) {
    const box = this.stateTarget
    box.dataset.state = state
    box.setAttribute("role", state === "error" ? "alert" : "status")
    box.querySelector("[data-state-part=title]").textContent = title
    box.querySelector("[data-state-part=message]").textContent = message
    box.querySelector("button").hidden = !retry
    box.hidden = false
    this.element.classList.toggle("has-error", state === "error")
  }

  clear() {
    clearTimeout(this.slowTimer)
    this.stateTarget.hidden = true
    this.element.classList.remove("has-error")
  }

  retry() {
    this.clear()
    this.media.load()
  }
}
