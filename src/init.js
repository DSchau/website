import lazyLoad from './util/lazy-load';
import particles from './util/particles';
import smoothScroll from './util/smooth-scroll';
import typed from './util/typed';
import autosize from './util/autosize';
import modernizr from './util/modernizr';

import handleForm from './util/form';
import log from './util/log';

export default function init() {
  if (process.env.NODE_ENV === 'production') {
    const runtime = require('offline-plugin/runtime');

    runtime.install({
      onUpdateReady() {
        runtime.applyUpdate();
      },
      onUpdated() {
        window.location.reload();
      }
    });
  }

  const destroyable = {
    particles: particles('particles'),
    scroll: smoothScroll(),
    type: typed(),
    form: handleForm(),
    autosize: autosize(['message']),
    lazy: lazyLoad()
  };

  modernizr();
  log();

  document.getElementById('year').innerHTML = new Date().getFullYear();

  return {
    destroy(str) {
      const fn = destroyable[str];
      if (typeof fn === 'function') {
        fn();
        destroyable[str] = null;
      }
    },
    destroyAll() {
      Object.keys(destroyable).forEach(key => {
        const fn = destroyable[key];
        if (typeof fn === 'function') {
          fn();
          destroyable[key] = null;
        }
      });
    }
  };
}
