// scripts/lib/old-search-redirect.js: on the GitHub Pages build the old prototype search page forwards to the catalogue
// (/catalog/), turning its parameters into the Rails ones. Expected values are written by hand.
const { ROOT, fail, ok, finish, path } = require('./lib');
const { translate } = require(path.join(ROOT, 'scripts', 'lib', 'old-search-redirect.js'));

const cases = [
  ['', ''],
  ['?q=violin', '?q=violin'],
  ['?collection=Grainger%20Museum%20Collection', '?f%5Bcollection_ssim%5D%5B%5D=Grainger+Museum+Collection'],
  ['?q=map&collection=Medical%20History%20Museum', '?q=map&f%5Bcollection_ssim%5D%5B%5D=Medical+History+Museum'],
  ['?collection=A&collection=B', '?f%5Bcollection_ssim%5D%5B%5D=A&f%5Bcollection_ssim%5D%5B%5D=B'],
  ['?api=mock&q=x&unknown=1', '?q=x']
];
for (const [input, want] of cases) {
  const got = translate(input);
  got === want ? ok(`"${input}" -> "${want}"`) : fail(`"${input}" gave "${got}", wanted "${want}"`);
}
finish('old-search-redirect');
