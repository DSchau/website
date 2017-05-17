const spies = {
  constructor: jest.fn(),
  destroy: jest.fn()
}

export function destroy(...args) {
  spies.destroy(...args);
}

export default function autosize(...args) {
  spies.constructor(...args);
}

autosize.destroy = destroy;

export { spies };
