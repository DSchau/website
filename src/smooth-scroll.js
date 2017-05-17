import { polyfill } from 'smoothscroll-polyfill';

export default () => {
  polyfill();

  let listeners = Array.prototype.slice.call(document.querySelectorAll('[data-scroll]'))
    .filter(el => {
      const href = el.getAttribute('href');
      return href && href.indexOf('#') === 0;
    })  
    .map(el => {
      const href = el.getAttribute('href');
      const clickHandler = () => {
        document.getElementById(href.replace('#', '')).scrollIntoView({
          behavior: 'smooth'
        });
      };

      el.addEventListener('click', clickHandler);
      return {
        element: el,
        callback: clickHandler
      };
    });
  
  return () => {
    listeners
      .splice(0)
      .forEach(({ element, callback }) => {
        element.removeEventListener('click', callback);
      });
  };
}
