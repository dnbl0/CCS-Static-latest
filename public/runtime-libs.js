// Points the page runtime (support.js) at local copies of React, ReactDOM and Babel instead of unpkg.com, so the pages
// work offline, without a third-party request, and in the browser tests. Load this before support.js.
// The files in vendor/runtime are the exact builds support.js names (and pins by hash); tests/runtime-libs.test.js checks it.
(function () {
  var base = document.currentScript.src;
  var local = function (file) { return new URL('vendor/runtime/' + file, base).href; };
  window.__resources = Object.assign(window.__resources || {}, {
    'https://unpkg.com/react@18.3.1/umd/react.production.min.js': local('react.production.min.js'),
    'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': local('react-dom.production.min.js'),
    'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js': local('babel.min.js')
  });
})();
