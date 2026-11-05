# Video.js 10 (vendored)

`@videojs/cdn@10.3.0` (Apache-2.0, see LICENSE.txt): only the files the Compat-skin video and audio players need
(`video-compat.js`, `audio-compat.js` and what they import; the chunks must stay together, with their hashed names).
Served unchanged from /vendor/videojs/ so the site makes no CDN requests. Source maps are not included.

To update: `npm pack @videojs/cdn@<version>`, unpack, copy the import closure of `video-compat.js` and `audio-compat.js`
into this folder, and bump the version here and in `NexusCcs::MediaPlayer::SCRIPTS`.
