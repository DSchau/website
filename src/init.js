import particles from './particles';
import smoothScroll from './smooth-scroll';
import typed from './typed';
import autosize from './autosize';
import modernizr from './modernizr';

import handleForm from './form';
import log from './log';

export default function init() {
  if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install();
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
