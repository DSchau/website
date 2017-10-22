import {
  lazyLoad,
  particles,
  smoothScroll,
  typed,
  autosize,
  webFonts,
  handleForm,
  logToConsole,
  romanize
} from './util';

export default function init() {
  if (process.env.NODE_ENV === 'production') {
    const runtime = require('offline-plugin/runtime');

    runtime.install({
      onUpdateReady() {
        runtime.applyUpdate();
      },
      onUpdated() {
        const reload = () => window.location.reload();
        document.documentElement.classList.add('has-alert');
        const reloadButton = document.querySelector('#alert button');
        reloadButton.addEventListener('click', reload);

        const countEl = reloadButton.querySelector('.count');

        setInterval(() => {
          const count = parseInt(countEl.innerHTML, 10);
          const reduced = count - 1;
          if (reduced === 0) {
            reload();
          } else {
            countEl.innerHTML = reduced;
          }
        }, 1000);
      }
    });
  }

  const destroyable = {
    particles: particles('particles'),
    scroll: smoothScroll(),
    typed: typed(),
    form: handleForm(),
    autosize: autosize(['message']),
    lazy: lazyLoad()
  };

  logToConsole();
  webFonts();

  document.getElementById('year').innerHTML = romanize(
    new Date().getFullYear()
  );

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
