import log from '../src/util/log';

describe('logging', () => {
  let impl;
  beforeEach(() => {
    impl = global.console;

    global.console = {
      log: jest.fn()
    };
  });

  afterEach(() => {
    global.console = impl;
  });

  it('logs when environment matches NODE_ENV', () => {
    log('test');

    expect(global.console.log).toBeCalled();
  });

  it('does not log when environment does not match', () => {
    log('lol this will not match');

    expect(global.console.log).not.toBeCalled();
  });
});
