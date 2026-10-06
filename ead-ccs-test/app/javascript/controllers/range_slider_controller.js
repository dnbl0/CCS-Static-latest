import { Controller } from "@hotwired/stimulus"

// A two-handle slider over the range limit plugin's Begin / End fields, as on the static search page. The
// fields stay (typing a year still works, and so does the form without JavaScript); the handles move them and
// they move the handles. Applying is still the form's "Apply limit" button.
//
// Years run from before the common era to now, but nearly every record is recent, so the track is in two
// parts when the data goes back past the knee: the first quarter covers everything before it, the rest
// covers the knee to the latest year. With no old dates it is a plain linear track.
const STEPS = 1000
const KNEE = 1000
const OLD_SHARE = 0.25

export default class extends Controller {
  static values = { min: Number, max: Number }

  connect() {
    this.begin = this.element.querySelector("input.range_begin")
    this.end = this.element.querySelector("input.range_end")
    if (!this.begin || !this.end || !(this.maxValue > this.minValue)) return

    this.render()
    this.fromHandle.addEventListener("input", () => this.fromSlider())
    this.toHandle.addEventListener("input", () => this.fromSlider())
    this.begin.addEventListener("input", () => this.fromFields())
    this.end.addEventListener("input", () => this.fromFields())
    this.fromFields()
  }

  render() {
    const track = document.createElement("div")
    track.className = "range-slider"
    track.innerHTML = `
      <div class="range-slider__rail"><div class="range-slider__fill"></div></div>
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Earliest year">
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Latest year">
      <div class="range-slider__ends"><span>${this.format(this.minValue)}</span><span>${this.format(this.maxValue)}</span></div>`
    this.element.querySelector("form.range_limit_form")?.before(track)
    this.fill = track.querySelector(".range-slider__fill")
    ;[this.fromHandle, this.toHandle] = track.querySelectorAll("input")
  }

  fromSlider() {
    let from = Number(this.fromHandle.value), to = Number(this.toHandle.value)
    if (from > to) { if (document.activeElement === this.fromHandle) from = to; else to = from }
    this.begin.value = this.year(from)
    this.end.value = this.year(to)
    this.paint(from, to)
  }

  fromFields() {
    const from = this.position(this.begin.value === "" ? this.minValue : Number(this.begin.value))
    const to = this.position(this.end.value === "" ? this.maxValue : Number(this.end.value))
    this.fromHandle.value = Math.min(from, to)
    this.toHandle.value = Math.max(from, to)
    this.paint(Number(this.fromHandle.value), Number(this.toHandle.value))
  }

  paint(from, to) {
    this.fill.style.insetInlineStart = `${from / STEPS * 100}%`
    this.fill.style.insetInlineEnd = `${100 - to / STEPS * 100}%`
    this.fromHandle.setAttribute("aria-valuetext", this.format(this.year(from)))
    this.toHandle.setAttribute("aria-valuetext", this.format(this.year(to)))
  }

  get twoPart() { return this.minValue < KNEE && this.maxValue > KNEE }

  // handle position (0..STEPS) to year, and back
  year(position) {
    const t = position / STEPS
    if (!this.twoPart) return Math.round(this.minValue + t * (this.maxValue - this.minValue))
    return t < OLD_SHARE
      ? Math.round(this.minValue + (t / OLD_SHARE) * (KNEE - this.minValue))
      : Math.round(KNEE + ((t - OLD_SHARE) / (1 - OLD_SHARE)) * (this.maxValue - KNEE))
  }

  position(year) {
    const y = Math.min(Math.max(year, this.minValue), this.maxValue)
    if (!this.twoPart) return Math.round((y - this.minValue) / (this.maxValue - this.minValue) * STEPS)
    return Math.round((y < KNEE
      ? (y - this.minValue) / (KNEE - this.minValue) * OLD_SHARE
      : OLD_SHARE + (y - KNEE) / (this.maxValue - KNEE) * (1 - OLD_SHARE)) * STEPS)
  }

  format(year) {
    return year < 0 ? `${Math.abs(year)} BCE` : String(year)
  }
}
