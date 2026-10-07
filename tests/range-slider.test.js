// The results page's range slider (public/search/range-slider.js): the pure parts that decide what the visitor sees -
// the track's year <-> position map (two-part when the years go back before 1000), the bins and bar heights.
// They are the prototype's RangeHistogram rules (ead-ccs-test/app/models/range_histogram.rb), so they must agree.
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const R = require(path.join(PUBLIC, 'search', 'range-slider.js'));

const eq = (a, b, msg) => { if (JSON.stringify(a) !== JSON.stringify(b)) fail(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

// a track of recent years only is linear
eq(R.trackYear(0, 1900, 2000), 1900, 'linear start');
eq(R.trackYear(500, 1900, 2000), 1950, 'linear middle');
eq(R.trackYear(1000, 1900, 2000), 2000, 'linear end');
eq(R.trackPosition(1950, 1900, 2000), 500, 'linear position');

// with years before the knee the first quarter covers them and the rest is the knee to the latest year
eq(R.trackYear(0, -3000, 2025), -3000, 'two-part start');
eq(R.trackYear(R.STEPS * R.OLD_SHARE, -3000, 2025), R.KNEE, 'two-part knee');
eq(R.trackYear(1000, -3000, 2025), 2025, 'two-part end');
eq(R.trackPosition(R.KNEE, -3000, 2025), R.STEPS * R.OLD_SHARE, 'two-part knee position');
for (const y of [-3000, -1000, 0, 999, 1000, 1500, 1888, 2025]) {
  const back = R.trackYear(R.trackPosition(y, -3000, 2025), -3000, 2025);
  // the track has 1000 steps, so a year comes back to within one step of it (about 5 years in the recent part)
  if (Math.abs(back - y) > 6 && y < R.KNEE ? Math.abs(back - y) > 13 : Math.abs(back - y) > 1) fail(`year ${y} round-trips to ${back}`);
}
eq(R.trackPosition(1500, 2000, 2000), 0, 'a single-year domain has one position');

// bins cover lo..hi without gaps or overlaps, whatever the count
for (const [lo, hi, n] of [[-3000, 2025, 29], [1700, 2030, 23], [1471, 1997, 40], [-250000, 2025, 60]]) {
  const e = R.edges(lo, hi, n);
  eq(e.length, n, `edges count ${lo}..${hi}`);
  eq(e[0][0], lo, `first edge ${lo}..${hi}`);
  eq(e[n - 1][1], hi, `last edge ${lo}..${hi}`);
  e.forEach((p, i) => { if (i && p[0] !== e[i - 1][1] + 1) fail(`bins ${lo}..${hi} leave a gap or overlap at ${i}: ${JSON.stringify([e[i - 1], p])}`); });
}

// histogram: every year lands in the bin whose edges contain it, none is lost
const years = [1888, 1889, 1900, 1900, 1952, 1952, 1952, 1999, 2010, -400, 600];
const h = R.histogram(years, -400, 2010, 29);
eq(h.reduce((n, b) => n + b.count, 0), years.length, 'every year is counted once');
years.forEach(y => { const b = h.find(x => y >= x.from && y <= x.to); if (!b || !b.count) fail(`${y} is in no counted bin`); });
eq(R.histogram([5, 3000], 100, 2000, 24).reduce((n, b) => n + b.count, 0), 0, 'years outside the domain are left out');

// bar heights: square root scale, the tallest taken as the 95th percentile of the non-empty bins, empty bins 0
const hs = R.barHeights([0, 1, 4, 9, 0]);
eq(hs[0], 0, 'an empty bin has no height'); eq(hs[3], 1, 'the tallest bar is full height'); eq(Math.round(hs[2] * 100), 67, 'sqrt scale: 4 of 9 is 2/3');
const capped = R.barHeights([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1000]);
if (capped[19] !== 1 || capped[0] !== 1) fail('one huge bin must not flatten the rest: the 95th percentile of 19 ones and a 1000 is 1');
eq(R.barHeights([0, 0]), [0, 0], 'no data, no bars');

// the number of bars follows the width: 7.8px bars with 2px gaps, between 20 and 60
eq(R.barCount(287), 29, '287px panel'); eq(R.barCount(488), 50, 'the design width (50 bars across 488px)');
eq(R.barCount(100), 20, 'at least 20'); eq(R.barCount(2000), 60, 'at most 60'); eq(R.barCount(0), 29, 'unmeasured: the sidebar width');

// labels and typed years
eq(R.format(1952), '1952', 'format'); eq(R.format(-400), '400 BCE', 'format BCE');
eq(R.parseYear(' 1950 '), 1950, 'parse'); eq(R.parseYear('-400'), -400, 'parse BCE'); eq(R.parseYear(''), null, 'empty is an open end');
if (!Number.isNaN(R.parseYear('19x0'))) fail('junk is not a year');

// the page wires it up: the script and stylesheet are linked, the facet panels have a host each
const page = fs.readFileSync(path.join(PUBLIC, 'search', 'search-results.html'), 'utf8');
if (!/<script src="\/search\/range-slider\.js"><\/script>/.test(page)) fail('search-results.html does not load /search/range-slider.js');
if (!/href="\/styles\/components\/range-slider\.css"/.test(page)) fail('search-results.html does not link range-slider.css');
if (!/data-range-key="\{\{ sec\.key \}\}"/.test(page)) fail('the facet panels have no range host (data-range-key)');
ok('range slider: track map, bins, bar heights and bar count agree with the Blacklight prototype');
finish('range-slider');
