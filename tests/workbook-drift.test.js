// The committed data model must be what the workbook says. data-model/*.json (static site) and ead-ccs-test/config/data_model/*.json
// (Rails) are extracted from "CCS Field labels and filters.xlsx"; if someone edits the workbook (or a JSON file by hand) without
// re-running the extractors, this fails. It compares the sequence numbers and names of every field and filter, read straight
// from the workbook (tests/workbook-names.py, standard library only), and checks the two JSON copies are the same.
const { ROOT, fail, ok, finish, fs, path } = require('./lib');
const { execFileSync } = require('child_process');

const J = (...p) => JSON.parse(fs.readFileSync(path.join(ROOT, ...p), 'utf8'));
let sheet;
try {
  sheet = JSON.parse(execFileSync('python3', ['-I', path.join(__dirname, 'workbook-names.py'), path.join(ROOT, 'CCS Field labels and filters.xlsx')], { encoding: 'utf8' }));
} catch (e) {
  fail('could not read CCS Field labels and filters.xlsx with python3: ' + (e.stderr || e.message).toString().trim().split('\n').pop());
  finish('workbook-drift');
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const fields = J('data-model', 'field-labels.json').map(f => [f.seq, f.label]);
const filters = J('data-model', 'filters.json').map(f => [f.seq, f.name]);
if (same(fields, sheet.fields)) ok(`${fields.length} field labels match the workbook's FINAL SEQUENCE ORDER`);
else fail(`data-model/field-labels.json differs from the workbook; re-run scripts/extract-data-model.py\n  workbook: ${JSON.stringify(sheet.fields)}\n  json:     ${JSON.stringify(fields)}`);
if (same(filters, sheet.filters)) ok(`${filters.length} filters match the workbook`);
else fail(`data-model/filters.json differs from the workbook; re-run scripts/extract-data-model.py\n  workbook: ${JSON.stringify(sheet.filters)}\n  json:     ${JSON.stringify(filters)}`);

for (const [a, b] of [['field-labels.json', 'field_labels.json'], ['filters.json', 'filters.json']]) {
  if (same(J('data-model', a), J('ead-ccs-test', 'config', 'data_model', b))) ok(`the Rails copy of ${a} is the static site's`);
  else fail(`ead-ccs-test/config/data_model/${b} differs from data-model/${a}; re-run both extractors`);
}
finish('workbook-drift');
