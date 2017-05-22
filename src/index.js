import 'normalize.css';
import './index.scss';
import './assets/web-font/css/dschau-webfont.css';

import init from './init';

if (process.env.NODE_ENV !== 'production') {
  require('../public/index.pug');
}

init();
