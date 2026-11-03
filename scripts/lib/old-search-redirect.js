// On the GitHub Pages build the old prototype search page (/search/search-results.html) forwards to the catalogue
// (/catalog/), the static copy of the Rails app's /catalog page. The old page's parameters become the Rails ones:
// q stays q, collection becomes f[collection_ssim][]; the others (the prototype's own filters, api mode) are dropped.
// translate() is written so its source can be pasted into the stub page: it uses nothing outside itself.
function translate(search) {
  const from = new URLSearchParams(search);
  const to = new URLSearchParams();
  if (from.get('q')) to.set('q', from.get('q'));
  for (const c of from.getAll('collection')) to.append('f[collection_ssim][]', c);
  const s = to.toString();
  return s ? '?' + s : '';
}

// The stub page: a meta refresh for browsers without JavaScript, the script for the parameters.
function stubHtml(catalogUrl) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Redirecting</title><meta http-equiv="refresh" content="0; url=${catalogUrl}"><link rel="canonical" href="${catalogUrl}"><script>
${translate.toString()}
location.replace(${JSON.stringify(catalogUrl)} + translate(location.search));
</script></head><body><a href="${catalogUrl}">Continue to search</a></body></html>
`;
}

module.exports = { translate, stubHtml };
