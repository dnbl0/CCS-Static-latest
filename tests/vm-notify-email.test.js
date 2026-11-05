// infra/azure/vm/notify-email.py sends the VM's alert emails through Azure Communication Services Email. The request has to be signed
// (HMAC-SHA256 over the method, path, date, host and body hash, keyed with the resource's access key). This test runs the script's
// --print-signature mode with fixed inputs and compares with a signature worked out here with Node's own crypto, written from
// Microsoft's documented format, so the two implementations check each other.
const { ROOT, fail, ok, finish, path } = require('./lib');
const { execFileSync, spawnSync } = require('child_process');
const crypto = require('crypto');

const script = path.join(ROOT, 'infra', 'azure', 'vm', 'notify-email.py');
const py = spawnSync('python3', ['--version']);
if (py.error || py.status !== 0) { console.log('no python3 here: skipped'); process.exit(0); }

const key = Buffer.from('a-test-access-key-not-a-real-one').toString('base64');
const payload = JSON.stringify({ senderAddress: 'DoNotReply@example.azurecomm.net', recipients: { to: [{ address: 'someone@example.org' }] }, content: { subject: 'S', plainText: 'B' } });
const date = 'Thu, 05 Nov 2026 01:23:45 GMT';
const host = 'ccs-comms.australia.communication.azure.com';
const pathAndQuery = '/emails:send?api-version=2023-03-31';

const contentHash = crypto.createHash('sha256').update(payload).digest('base64');
const stringToSign = `POST\n${pathAndQuery}\n${date};${host};${contentHash}`;
const expected = crypto.createHmac('sha256', Buffer.from(key, 'base64')).update(stringToSign).digest('base64');

const out = JSON.parse(execFileSync('python3', [script, '--print-signature'], {
  input: JSON.stringify({ key, payload, date, host, path: pathAndQuery }), encoding: 'utf8'
}));
out.signature === expected ? ok('the HMAC signature matches the independent calculation') : fail(`signature ${out.signature} != expected ${expected}`);
out.contentHash === contentHash ? ok('the body hash matches') : fail(`body hash ${out.contentHash} != ${contentHash}`);
out.authorization === `HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${expected}` ? ok('the Authorization header has the documented shape') : fail('Authorization header differs: ' + out.authorization);
finish('vm-notify-email');
