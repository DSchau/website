jest.mock('ityped');

import typed from '../src/typed';
import * as itypedMock from 'ityped';

describe('typed', () => {
  it('exports a function', () => {
    expect(typeof typed).toBe('function');
  });

  it('calls constructor on init', () => {
    typed();

    expect(itypedMock.spies.init).toBeCalled();
  });

  it('calls destroy on function invocation', () => {
    const destroy = typed();

    destroy();

    expect(itypedMock.spies.destroy).toBeCalled();
  });
});
