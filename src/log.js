export default function consoleLog(env = 'production') {
  if ( process.env.NODE_ENV === env ) {
    const styles = [
      'background: linear-gradient(to top, #FF6138, #bf492a)',
      'color: white',
      'font-size: 16px',
      'line-height: 40px',
      'height: 40px',
      'display: block',
      'padding: 4px 8px'
    ].join(';');

    console.log('%c Oh shit waddup! Feel free to e-mail me at dustinschau@gmail.com', styles);
  }
}