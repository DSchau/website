import { init, destroy } from 'ityped';

export default function header() {
  const el = document.querySelector('.code-example');
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
}

// export function recentWorks(works = [
//   ['a native Android and iOS application', 'PeopleNet, Inc.'],
//   ['a component library written in AngularJS', 'Union Pacific'],
//   ['a native survey application', 'Union Pacific'],
//   ['web components written in PolymerJS', 'PeopleNet, Inc.'],
//   ['backend services written in NodeJS', 'PeopleNet, Inc.'],
//   ['charts written in d3.js', 'PeopleNet, Inc.'],
//   ['and many, many more projects', 'customers the world over']
// ]) {
//   const container = document.querySelector('#recent-work .examples');

//   const examples = Array.prototype.slice.call(container.querySelectorAll('.example'));

//   let index = 0;

//   const interval = setInterval(() => {
//     if (!works[index]) {
//       return clearInterval(interval);
//     }

//     const work = works[index];

//     examples
//       .forEach((el, elIndex) => {
//         if (elIndex !== 0) {
//           el.innerHTML = '';
//         }
//         setTimeout(() => el.innerHTML = work[elIndex], elIndex * 500);
//       });

//     index += 1;
//   }, 5000);

//   return () => { };
// }
