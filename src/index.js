import 'minireset.css';
import './assets/web-font/css/dschau-webfont.css';
import './critical.scss';
import './index.scss';

import init from './init';

if (process.env.NODE_ENV !== 'production') {
  require('../public/index.pug');
}

init();
