import 'es6-promise/auto';
import 'intersection-observer';

if (typeof window.fetch !== 'function') {
  import('whatwg-fetch').then(() => console.log('polyfilled fetch'));
}
