const cheerio = require('cheerio');
const fs = require('mz/fs');
const path = require('path');

const file = path.resolve('dist/index.html');

fs
  .readFile(file, 'utf8')
  .then(html => {
    const $ = cheerio.load(html);

    const style = $('link[rel="stylesheet"]');

    $(style.toString()).insertBefore($('script').first());

    style.remove();

    return fs.writeFile(file, $.html(), 'utf8');
  })
  .then(() => process.exit())
  .catch(e => console.warn(e));
