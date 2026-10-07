// ESLint for the static site's own scripts, tests and page scripts. support.js (the generated template runtime),
// image-slot.js, vendored and built files are not ours to lint.
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/**', 'dist/**', 'ead-ccs-test/**', 'public/support.js', 'public/image-slot.js', 'public/assets/**', 'assets/**', 'public/styles/vendor/**', 'public/vendor/**'] },
  js.configs.recommended,
  { files: ['api/**/*.js', 'eslint.config.js'], languageOptions: { sourceType: 'commonjs', globals: { ...globals.node } } },
  // scripts that drive Playwright pass functions to page.evaluate, which run in the page
  { files: ['scripts/**/*.js'], languageOptions: { sourceType: 'commonjs', globals: { ...globals.node, ...globals.browser } } },
  // Tests run Playwright: the functions given to page.evaluate run in the page, so they see browser globals and the
  // helpers the tests inject with addInitScript.
  { files: ['tests/**/*.js'], languageOptions: { sourceType: 'commonjs', globals: { ...globals.node, ...globals.browser, state: 'readonly', log: 'readonly', barA: 'readonly', CCSSearchBar: 'readonly', axe: 'readonly', CCS: 'readonly', barB: 'readonly' } } },
  { files: ['public/**/*.js'], languageOptions: { sourceType: 'script', globals: { ...globals.browser, module: 'writable', global: 'readonly', CCSSearchBar: 'readonly' } } },
  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Findings to clean up over time (see docs/code-quality-plan.md); they do not fail the build yet
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
      'no-useless-escape': 'warn'
    }
  }
];
