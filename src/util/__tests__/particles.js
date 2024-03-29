jest.mock('@dschau/particles.js');

import particles from '../particles';
import particlesJS from '@dschau/particles.js';

describe('particles', () => {
  it('exports a function', () => {
    expect(typeof particles).toBe('function');
  });

  it('calls particlesJS constructor on function call', () => {
    const selector = 'selector';
    particles(selector);

    expect(particlesJS.spies.constructor).toBeCalledWith(
      selector,
      expect.any(Object)
    );
  });

  it('calls destroy on returned function invocation', () => {
    const destroy = particles();

    destroy();

    expect(particlesJS.spies.destroy).toBeCalled();
  });
});
