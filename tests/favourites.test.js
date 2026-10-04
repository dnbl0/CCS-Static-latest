// Favourites and personal lists (CCS-70, guest model: kept in this browser).
// Part 1: store unit tests in plain node (public/favourites.js with an injected storage).
// Part 2: browser flow (playwright-core + Chromium; skipped when unavailable): save from a record page, the header badge,
// the Lists page (rename, move, remove, delete, empty state), persistence on reload, hearts on search results, an advisory
// notice kept on the Lists page, and corrupt/blocked storage.
const http = require('http');
const { PUBLIC, fail, ok, finish, fs, path } = require('./lib');
const F = require('../public/favourites.js');

const eq = (a, b, msg) => { if (JSON.stringify(a) === JSON.stringify(b)) ok(msg); else fail(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const mem = (init) => { const d = init ? { [F.KEY]: init } : {}; return { d, getItem: k => (k in d ? d[k] : null), setItem: (k, v) => { d[k] = String(v); } }; };

(async () => {
  /* ---- part 1: store ------------------------------------------------------------------------------ */
  const st = mem(), s = F.createStore(st);
  eq(s.lists(), [], 'no lists before the first save');
  eq(s.count(), 0, 'badge count starts at 0');
  s.add(s.DEFAULT_ID, 12);
  eq(s.lists().map(l => [l.id, l.name, l.items]), [['default', 'My favourites', [12]]], 'first save creates the default list "My favourites"');
  s.add(s.DEFAULT_ID, '12'); eq(s.getList('default').items, [12], 'saving the same record twice keeps one entry');
  eq(s.add('default', 'abc'), false, 'invalid ids are rejected');
  eq(s.add('nope', 5), false, 'unknown lists are rejected');
  const proj = s.createList('  Thesis   research  ');
  eq(proj.name, 'Thesis research', 'list names are trimmed and whitespace collapsed');
  eq(s.createList('   '), null, 'blank list names are rejected');
  eq(s.createList('thesis research').name, 'thesis research (2)', 'duplicate names get a number');
  s.add(proj.id, 12); s.add(proj.id, 30);
  eq(s.count(), 2, 'count is distinct records across lists (12 is in two lists)');
  eq(s.listIdsFor(12).sort(), ['default', proj.id].sort(), 'listIdsFor lists every list a record is in');
  eq(s.has(30) && !s.has(99), true, 'has() reports saved records');
  eq(s.renameList(proj.id, 'Thesis'), 'Thesis', 'rename works');
  eq(s.renameList(proj.id, ''), null, 'rename to blank is rejected');
  eq(s.move(proj.id, 'default', 30), true, 'move between lists');
  eq([s.getList('default').items, s.getList(proj.id).items], [[12, 30], [12]], 'move removes from the source and adds to the target');
  eq(s.move(proj.id, 'default', 99), false, 'move of an item not in the source list does nothing');
  s.setMembership(proj.id, 12, false); eq(s.getList(proj.id).items, [], 'setMembership(false) removes');
  eq(s.deleteList('default'), false, 'the default list cannot be deleted');
  eq(s.deleteList(proj.id), true, 'other lists can be deleted');
  eq(s.getList(proj.id), null, 'deleted list is gone');
  const raw = JSON.parse(st.d[F.KEY]);
  eq([raw.v, raw.lists.length], [1, 2], 'stored shape is versioned {v, lists}');
  const again = F.createStore(st);
  eq(again.getList('default').items, [12, 30], 'a new store reads the saved lists back');
  let ticks = 0; again.onChange(() => ticks++); again.add('default', 7); eq(ticks, 1, 'onChange fires once per change');
  eq(F.createStore(mem('{not json')).lists(), [], 'corrupt storage falls back to empty');
  eq(F.createStore(mem(JSON.stringify({ v: 1, lists: [{ id: 'a', name: 'A', items: [1, 1, 'x', -3, 2] }, { id: 'a', name: 'dup' }, null] }))).lists().map(l => l.items), [[1, 2]], 'invalid and duplicate entries are cleaned on load');
  const blocked = F.createStore({ getItem() { throw new Error('blocked'); }, setItem() { throw new Error('full'); } });
  blocked.add('default', 3); eq([blocked.has(3), blocked.isPersisted()], [true, false], 'blocked storage keeps working in memory and reports it');

  /* ---- part 2: browser ---------------------------------------------------------------------------- */
  let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { console.log('SKIP favourites browser checks: playwright-core is not installed'); return finish('favourites'); }
  const cands = [process.env.PLAYWRIGHT_CHROMIUM_PATH]; try { cands.push(chromium.executablePath()); } catch (e) { /* none */ }
  const home = process.env.HOME || '';
  for (const base of [path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright')]) {
    if (!fs.existsSync(base)) continue;
    for (const d of fs.readdirSync(base).filter(n => /^chromium-\d+/.test(n))) for (const sub of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux/chrome', 'chrome-linux64/chrome']) cands.push(path.join(base, d, sub));
  }
  const exe = cands.filter(Boolean).find(x => fs.existsSync(x));
  if (!exe) { console.log('SKIP favourites browser checks: no Chromium found'); return finish('favourites'); }

  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
  const srv = await new Promise(res => { const sv = http.createServer((req, rsp) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(PUBLIC, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
    if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('not found'); }
    rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
  }).listen(0, () => res(sv)); });
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: exe });
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('ccs-cultural-ack', '1'); } catch (e) { /* none */ } });
  const open = async url => { const pg = await ctx.newPage(); pg.on('pageerror', e => errors.push(url + ': ' + e.message)); await pg.goto(base + url, { waitUntil: 'load' }); await pg.waitForTimeout(600); return pg; };
  const badge = pg => pg.getAttribute('[data-fav-count]', 'data-count');

  try {
    // record 12 carries a deceased-persons advisory
    const rec = await open('/collections/record.html?id=12');
    const heart = rec.locator('.fav-heart--labelled');
    eq([await heart.getAttribute('aria-pressed'), await badge(rec)], ['false', '0'], 'record page: heart starts unpressed, badge empty');
    eq(await heart.getAttribute('aria-label'), 'Add to list: Dimalan Leaves', 'record page: heart label names the record');
    await heart.click(); await rec.waitForTimeout(200);
    eq([await heart.getAttribute('aria-pressed'), await badge(rec)], ['true', '1'], 'one tap saves to the default list and updates the badge');
    eq(await rec.locator('.fav-dialog:not([hidden]) .fav-check__name').allTextContents(), ['My favourites'], 'the dialog opens listing "My favourites"');
    eq(await rec.locator('.fav-dialog__panel').evaluate(el => el.contains(document.activeElement)), true, 'focus moves into the dialog');
    await rec.fill('#fav-dialog-name', 'Thesis'); await rec.keyboard.press('Enter'); await rec.waitForTimeout(200);
    eq(await rec.locator('.fav-check__name').allTextContents(), ['My favourites', 'Thesis'], 'creating a list in the dialog adds it');
    eq(await rec.locator('.fav-check input:checked').count(), 2, 'the record is saved to the new list as well');
    await rec.keyboard.press('Escape'); await rec.waitForTimeout(150);
    eq(await rec.locator('.fav-dialog:not([hidden])').count(), 0, 'Escape closes the dialog');
    eq(await heart.evaluate(el => el === document.activeElement), true, 'focus returns to the heart');
    await rec.close();

    // header badge on another page + persistence on reload
    const home1 = await open('/collections/index.html');
    await home1.waitForFunction(() => document.querySelector('[data-fav-count]').getAttribute('data-count') !== '0', null, { timeout: 5000 }).catch(() => {});
    eq(await badge(home1), '1', 'header badge shows the count on other pages and after reload');
    await home1.close();

    // hearts on search results
    const res = await open('/search/search-results.html?q=skull');
    const cards = await res.locator('.fav-heart--card:visible').count();
    if (cards >= 5) ok(`search results: ${cards} result cards have a heart`); else fail(`search results: expected hearts on result cards, found ${cards}`);
    await res.locator('.fav-heart--card').nth(1).click(); await res.waitForTimeout(150); await res.keyboard.press('Escape');
    eq([await res.locator('.fav-heart--card[aria-pressed="true"]').count(), await badge(res)], [1, '2'], 'saving from a result card toggles that card and the badge');
    await res.close();

    // record 1 carries a language advisory: save it too so the Lists page has a record with a notice
    const adv = await open('/collections/record.html?id=1');
    await adv.locator('.fav-heart--labelled').click(); await adv.waitForTimeout(150); await adv.keyboard.press('Escape'); await adv.close();

    // Lists page
    const lp = await open('/lists');
    eq(await lp.locator('.lists-list__title').evaluateAll(els => els.map(e => e.childNodes[0].textContent.trim())), ['My favourites', 'Thesis'], 'Lists page shows both lists');
    eq(await lp.locator('.lists-list').first().locator('.lists-item').count(), 3, 'the default list shows its three saved records');
    eq((await lp.locator('.lists-item__advisory').first().textContent()).includes('Language'), true, 'a record with a cultural advisory keeps its notice on the Lists page');
    // rename
    await lp.locator('[data-act="rename"][data-list="default"]').click();
    await lp.fill('#rn-default', 'Reading list'); await lp.keyboard.press('Enter'); await lp.waitForTimeout(150);
    eq(await lp.locator('#h-default').evaluate(e => e.childNodes[0].textContent.trim()), 'Reading list', 'rename a list');
    // move
    const firstItem = lp.locator('.lists-list').first().locator('.lists-item').first();
    const movedTitle = await firstItem.locator('.lists-item__title').textContent();
    await firstItem.locator('.lists-select').selectOption({ label: 'Thesis' }); await firstItem.locator('[data-act="move"]').click(); await lp.waitForTimeout(150);
    eq(await lp.locator('.lists-list').first().locator('.lists-item').count(), 2, 'move takes the record out of the source list');
    eq((await lp.locator('.lists-list').nth(1).locator('.lists-item__title').allTextContents()).includes(movedTitle), true, 'and into the target list');
    eq(await lp.locator('#lists-status').textContent(), 'Moved to Thesis', 'moves are announced');
    // remove until the list is empty
    while (await lp.locator('.lists-list').first().locator('[data-act="remove"]').count()) { await lp.locator('.lists-list').first().locator('[data-act="remove"]').first().click(); await lp.waitForTimeout(80); }
    eq(await lp.locator('.lists-list').first().locator('.lists-empty--list').count(), 1, 'an emptied list shows its own empty state');
    // delete (two steps, no browser dialog)
    await lp.locator('[data-act="delete"][data-list]').click(); await lp.locator('[data-act="delete-yes"]').click(); await lp.waitForTimeout(150);
    eq(await lp.locator('.lists-list').count(), 1, 'deleting a list removes it');
    eq(await lp.locator('[data-act="delete"][data-list="default"]').count(), 0, 'the default list offers no delete');
    // empty state: remove everything
    while (await lp.locator('[data-act="remove"]').count()) { await lp.locator('[data-act="remove"]').first().click(); await lp.waitForTimeout(80); }
    eq(await lp.locator('.lists-item').count(), 0, 'all records removed');
    await lp.close();

    // a fresh browser context shows the page empty state with links
    const ctx2 = await browser.newContext({ viewport: { width: 378, height: 800 } });
    const e2 = await ctx2.newPage(); e2.on('pageerror', e => errors.push('lists(empty): ' + e.message));
    await e2.goto(base + '/lists', { waitUntil: 'load' }); await e2.waitForTimeout(400);
    eq([await e2.locator('.lists-empty__title').textContent(), await e2.locator('.lists-empty__link').count()], ['You have not saved anything yet', 2], 'empty state explains how to save and links to search and browse');
    eq(await e2.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'Lists page does not scroll sideways at 378px');
    // corrupt storage must not break the page
    await e2.evaluate(() => localStorage.setItem('ccs-favourites', '{broken'));
    await e2.reload({ waitUntil: 'load' }); await e2.waitForTimeout(300);
    eq(await e2.locator('.lists-empty__title').count(), 1, 'corrupt storage shows the empty state instead of failing');
    await ctx2.close();
  } catch (e) { fail('favourites browser flow: ' + (e.stack || e)); }

  eq(errors, [], 'no page errors');
  await browser.close(); srv.close();
  finish('favourites');
})().catch(e => { fail(e.stack || e); finish('favourites'); });
