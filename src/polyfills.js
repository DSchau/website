import 'es6-promise/auto';

let polyfills = [];

const hasIntersectionObserver = () => {
  if (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    return true;
  }
  return false;
};

if (typeof window.fetch !== 'function') {
  polyfills.push(import('whatwg-fetch'));
}

if (!hasIntersectionObserver()) {
  polyfills.push(import('intersection-observer'));
}

export default Promise.all(polyfills);
