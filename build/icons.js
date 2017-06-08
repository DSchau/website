const sharp = require('sharp');
const path = require('path');
const mkdir = require('mkdirp');
const del = require('del');

const src = path.resolve('./src/assets/icons');
const dest = path.resolve('./dist/assets/icons');

const sizes = [512, 384, 256, 192];

const outputFile = ({ file, extension, size }) => {
  const fileName = `${size}x${size}.${extension}`;

  return sharp(file).resize(size).toFile(path.join(dest, fileName));
};

del(`${dest}/**/*`)
  .then(() => {
    return new Promise((resolve, reject) => {
      return mkdir(dest, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  })
  .then(() => {
    const file = path.join(src, 'icon.png');
    return Promise.all(
      sizes.map(size => {
        return outputFile({
          file,
          extension: 'png',
          size
        });
      })
    );
  })
  .then(() => {
    console.log('All icons written successfully');
  });
