export const intToRoman = (num = new Date().getFullYear()) => {
  const romans = [
    'I',
    'IV',
    'V',
    'IX',
    'X',
    'XL',
    'L',
    'XC',
    'C',
    'CD',
    'D',
    'CM',
    'M'
  ];
  const nums = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

  let roman = '';

  for (let i = nums.length - 1; i >= 0; i--) {
    while (num >= nums[i]) {
      num -= nums[i];
      roman += romans[i];
    }
  }

  return roman;
};
