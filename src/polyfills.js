import 'es6-promise/auto';

if ( !window.fetch || typeof window.fetch !== 'function' ) {
  import('whatwg-fetch')
    .then(() => console.log('polyfilled fetch'));
}
