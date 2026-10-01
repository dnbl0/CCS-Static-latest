/**
 * Test Suite for BlacklightAdapter
 */
const assert = require('assert');
const ad = require('../public/blacklight-adapter.js');

console.log('🧪 Running BlacklightAdapter test suite...');

// Test 1: Default mode
assert.strictEqual(ad.getMode(), 'mock', 'Default mode should be mock');
assert.strictEqual(ad.isLive(), false, 'isLive() should be false by default');

// Test 2: Parameter building
const params = ad.toBlacklightParams({
  q: 'botany',
  collection: ['University Art Collection'],
  type: ['Artwork'],
  sort: 'new',
  yFrom: 1900,
  yTo: 1950
}, 3, 20);

assert.strictEqual(params.get('q'), 'botany');
assert.strictEqual(params.get('format'), 'json');
assert.strictEqual(params.get('page'), '3');
assert.strictEqual(params.get('per_page'), '20');
assert.strictEqual(params.get('range[pub_date_isim][begin]'), '1900');
assert.strictEqual(params.get('range[pub_date_isim][end]'), '1950');
assert.strictEqual(params.get('sort'), 'pub_date_isim desc, title_ssort asc');

// Test 3: Document transformation
const doc = {
  id: 'doc-123',
  title_tsim: ['Flora of Victoria'],
  collection_name_ssim: ['University Art Collection'],
  format_ssim: ['Painting'],
  creator_tsim: ['Ferdinand von Mueller'],
  pub_date_isim: [1885],
  licence_ssim: 'Public Domain',
  thumbnail_url_ssim: 'https://example.com/image.jpg'
};

const transformed = ad.transformDocument(doc);
assert.strictEqual(transformed.id, 'doc-123');
assert.strictEqual(transformed.title, 'Flora of Victoria');
assert.strictEqual(transformed.collection, 'University Art Collection');
assert.strictEqual(transformed.objectType, 'Painting');
assert.strictEqual(transformed.creator, 'Ferdinand von Mueller');
assert.strictEqual(transformed.dateStart, 1885);
assert.strictEqual(transformed.licence, 'Public Domain');
assert.strictEqual(transformed.img, 'https://example.com/image.jpg');

console.log('✅ All BlacklightAdapter tests passed successfully!');
