import { init, destroy } from 'ityped';

export default () => {
  const el = document.getElementById('example');
  init(el, {
    strings: [
      'web apps',
      'native apps',
      'backend services',
      'interactive experiences',
      'robust, performant apps',
      '(you get the idea)'
    ],
    backDelay: 3000,
    onFinished() {
      document.querySelector('.ityped-cursor').remove();
    }
  });

  return () => destroy(el);
};
