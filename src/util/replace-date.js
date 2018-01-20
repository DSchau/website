import { numToRoman } from './num-to-roman';

export const replaceDate = () => {
  const roman = numToRoman();

  document.getElementById('year').innerHTML = roman;
};
