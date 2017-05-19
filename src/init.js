import particles from './particles';
import smoothScroll from './smooth-scroll';
import typed from './typed';
import autosize from './autosize';
import modernizr from './modernizr';

import handleForm from './form';
import log from './log';

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
    particles: particles('header'),
    scroll: smoothScroll(),
    type: typed(),
    form: handleForm(),
    autosize: autosize(['message'])
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
