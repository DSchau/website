const spies = {
  constructor: jest.fn(),
  destroy: jest.fn()
};

const particlesJS = function(...args) {
  spies.constructor(...args);
};

particlesJS.spies = spies;

particlesJS.destroy = function(...args) {
  spies.destroy(...args);
};

export default particlesJS;
