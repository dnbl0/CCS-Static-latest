// scripts/dev-server.js serves a real file before it applies a rewrite, as the production host does: the catalogue's data
// files (/catalog/catalog-data.json) must not be taken for the old record API (/catalog/:id.json).
const { ROOT, fail, ok, finish, path } = require('./lib');
const http = require('http');
const { createServer } = require(path.join(ROOT, 'scripts', 'dev-server.js'));

const get = (port, url) => new Promise((resolve, reject) => http.get({ port, path: url }, res => {
  let n = 0; res.on('data', c => { n += c.length; }); res.on('end', () => resolve({ status: res.statusCode, type: res.headers['content-type'], bytes: n }));
}).on('error', reject));

(async () => {
  const server = createServer();
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  try {
    const data = await get(port, '/catalog/catalog-data.json');
    data.status === 200 && data.bytes > 1e6 ? ok('/catalog/catalog-data.json is served as the file it is') : fail(`/catalog/catalog-data.json answered ${data.status} (${data.bytes} bytes)`);
    const api = await get(port, '/catalog/does-not-exist-xyz.json');
    api.status !== 404 || api.type === 'application/json' ? ok('a .json path with no file still goes to the record API rewrite') : fail('the record API rewrite no longer applies to missing files');
  } finally { server.close(); }
  finish('dev-server-static-first');
})().catch(e => { console.error(e); process.exit(1); });
