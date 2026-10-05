// Finds a Chromium for playwright-core: PLAYWRIGHT_CHROMIUM_PATH, playwright's own path, or the cached "Chrome for Testing".
const fs = require('fs'), path = require('path');

function findChromium() {
  let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { return { chromium: null, exe: null }; }
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH]; try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) {
      for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
    }
  }
  return { chromium, exe: cands.filter(Boolean).find(x => fs.existsSync(x)) || null };
}
module.exports = { findChromium };
