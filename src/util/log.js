/*
 * https://stackoverflow.com/a/30638226
 **/
export function detectDevtools(callback) {
  const el = document.createElement('div');
  Object.defineProperty(el, 'id', {
    get: callback
  });

  console.log('%c Oh shit waddup!', el);
}

export function logMessage() {
  const styles = [
    'background: linear-gradient(to top, #FF6138, #bf492a)',
    'color: white',
    'font-size: 16px',
    'line-height: 40px',
    'height: 40px',
    'display: block',
    'padding: 4px 8px'
  ].join(';');

  console.log(`%cFeel free to e-mail me at dustinschau@gmail.com`, styles);
}

export function logToConsole(env = 'production') {
  if (process.env.NODE_ENV === env) {
    detectDevtools(logMessage);
  }
}
