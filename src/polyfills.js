import 'es6-promise/auto';

if (typeof window.fetch !== 'function') {
  import('whatwg-fetch').then(() => console.log('polyfilled fetch'));
}
