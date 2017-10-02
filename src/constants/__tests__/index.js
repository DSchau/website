import * as CONSTANTS from '../';

test('it matches snapshot', () => {
  expect(Object.keys(CONSTANTS)).toMatchSnapshot();
});
