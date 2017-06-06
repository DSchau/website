import 'es6-promise/auto';
import 'intersection-observer';

if (typeof window.fetch !== 'function') {
  import('unfetch/polyfill').then(() => console.log('polyfilled fetch'));
}
