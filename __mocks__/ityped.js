export const spies = {
  init: jest.fn(),
  destroy: jest.fn()
};

export function init(...args) {
  spies.init(...args);
}

export function destroy(...args) {
  spies.destroy(...args);
}
