// scripts/lib/catalog-export.js turns the Solr documents of the Rails index into the compact records the static
// catalogue (public/catalog/catalog-data.json) loads: noise dropped, multi-valued fields always arrays.
const { ROOT, fail, ok, finish, path } = require('./lib');
const { slim, detailOf, toDataFiles } = require(path.join(ROOT, 'scripts', 'lib', 'catalog-export.js'));
const { detailBucket } = require(path.join(ROOT, 'public', 'catalog', 'catalog-search.js'));

function check(name, cond, detail) { cond ? ok(name) : fail(name + (detail ? ' -> ' + detail : '')); }

const solr = {
  _version_: 1880705803682316288, timestamp: '2026-11-02T00:53:41.675Z', score: 1.0,
  id: 'emu-401120', title_si: 'Kangaroo-pouch tone-tool', title_tsim: ['Kangaroo-pouch tone-tool'],
  creator_ssim: 'Grainger, Percy Aldridge', creator_tsim: ['Grainger, Percy Aldridge'],
  collection_ssim: ['Grainger Museum Collection'], date_start_isi: 1952, has_digital_asset_bsi: true,
  digital_asset_paths_ssim: ['/digital-assets/thumbs/gm00_0216_1.jpg'], thumbnail_path_ssi: '/digital-assets/thumbs/gm00_0216_1.jpg',
  subject_ssim: ['Experimental music'], subject_tsim: ['Experimental music'], creator_birth_ssi: '8 July 1882', format: ['Object'],
  description_tsim: ['A long description of the tone-tool.'], source_reference_tsim: ['[00.0216] tone tool'], source_system_ssi: 'emu', source_identifier_ssi: '401120'
};
const s = slim(solr);
check('the search-only duplicates and Solr internals are dropped', !('_version_' in s) && !('timestamp' in s) && !('score' in s) && !('title_tsim' in s) && !('creator_tsim' in s) && !('subject_tsim' in s), Object.keys(s).join());
check('multi-valued fields are always arrays', Array.isArray(s.creator_ssim) && s.creator_ssim[0] === 'Grainger, Percy Aldridge' && Array.isArray(detailOf(solr).format));
check('single-valued fields stay as they are', s.id === 'emu-401120' && s.title_si === 'Kangaroo-pouch tone-tool' && s.date_start_isi === 1952 && s.thumbnail_path_ssi === '/digital-assets/thumbs/gm00_0216_1.jpg');
check('the digital asset flag is kept as a boolean', s.has_digital_asset_bsi === true);

check('long record-page text is kept out of the list record', !('description_tsim' in s) && !('source_reference_tsim' in s), Object.keys(s).join());
check('it goes to the detail record instead', detailOf(solr).description_tsim[0] === 'A long description of the tone-tool.' && detailOf(solr).source_reference_tsim[0] === '[00.0216] tone tool');
check('source system and identifier are kept in the detail (the id already carries them)', detailOf(solr).source_system_ssi === 'emu' && !('source_system_ssi' in s));

const files = toDataFiles([solr, { id: 'vernon-X1', title_si: 'B' }, { id: 'aaa', title_si: 'A', description_tsim: ['dd'] }]);
const main = JSON.parse(files.main);
check('the main file lists records in id order, with a count', main.count === 3 && main.records.map(r => r.id).join() === 'aaa,emu-401120,vernon-X1', files.main.slice(0, 120));
const buckets = Object.keys(files.details);
check('detail records are grouped into buckets named by the record id', buckets.length >= 1 && buckets.every(b => /^\d+$/.test(b)) && JSON.parse(files.details[detailBucket('aaa')])['aaa'].description_tsim[0] === 'dd');
check('a record with no long text has no detail entry', !JSON.parse(files.details[detailBucket('vernon-X1')] || '{}')['vernon-X1']);

const text = JSON.parse(files.text);
check('long text goes to a search-text file, keyed by record id, as lower-case words without repeats', text.aaa === 'dd' && !('vernon-X1' in text), JSON.stringify(text));
check('the search text of a record joins its long fields', text['emu-401120'].split(' ').includes('tone-tool') && text['emu-401120'].split(' ').includes('long') && text['emu-401120'].split(' ').filter(w => w === 'tone-tool').length === 1, text['emu-401120']);

finish('catalog-export');
