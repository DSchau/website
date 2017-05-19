export function logMessageAndDetectDevtools(callback) {
  const styles = [
    'background: linear-gradient(to top, #FF6138, #bf492a)',
    'color: white',
    'font-size: 16px',
    'line-height: 40px',
    'height: 40px',
    'display: block',
    'padding: 4px 8px'
  ].join(';');

  const element = document.createElement('oh-shit-waddup');
  Object.defineProperty(element, 'id', {
    get() {
      callback();
    }
  });

  console.log('%c Oh shit waddup!', element);

  console.log(`%cFeel free to e-mail me at dustinschau@gmail.com`, styles);
}

export function imageLog(
  src = 'http://files.explosm.net/comics/Rob/office-worker.png'
) {
  const image = new Image();

  image.onload = function() {
    const style = [
      'font-size: 1px;',
      `line-height: ${this.height}px;`,
      `padding: ${this.height * 0.5}px ${this.width * 0.5}px;`,
      `background-size: ${this.width}px ${this.height}px;`,
      `background: url(${src});`
    ].join(' ');

    console.log('%c', style);
  };

  image.src = src;
}

export default function consoleLog(env = 'production') {
  if (process.env.NODE_ENV === env) {
    logMessageAndDetectDevtools(imageLog);
  }
}
