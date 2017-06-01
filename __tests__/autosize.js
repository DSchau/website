jest.mock('autosize');
import autosize from '../src/util/autosize';

import autosizeMock, { spies } from 'autosize';

describe('autosize', () => {
  let getElementByIdImpl;
  beforeEach(() => {
    getElementByIdImpl = global.document.getElementById;
    global.document.getElementById = id => id;
  });

  afterEach(() => {
    global.document.getElementById = getElementByIdImpl;
  });

  it('exports a function', () => {
    expect(typeof autosize).toBe('function');
  });

  it('calls autosize on each passed in element', () => {
    const fields = ['hello', 'sup', 'noob'];
    autosize(fields);

    expect(spies.constructor.mock.calls).toEqual(fields.map(field => [field]));
  });

  it('calls destroy when returned function is invoked', () => {
    const destroy = autosize(['sup']);

    destroy();

    expect(spies.destroy).toBeCalledWith('sup');
  });
});
