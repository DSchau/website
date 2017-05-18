const glob = require('glob');
const gm = require('gm').subClass({ imageMagick: true });
const path = require('path');

const src = path.resolve('./src/images');
const dest = path.resolve('./static/images');

const getFiles = () => {
  return new Promise((resolve, reject) => {
    glob(path.join(src, '*.{jpg,jpeg,gif,png}'), (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
};

const outputFile = (file, extension, size = 900, quality = 75) => {
  const name = file.split(src).pop().split('.').shift();
  const fileName = `${name}.${extension}`;
  return new Promise((resolve, reject) => {
    return gm(file)
      .quality(quality)
      .resize(size, size)
      .write(path.join(dest, fileName), err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
  });
};

getFiles()
  .then(files => {
    return Promise.all(
      files.map(file => {
        return Promise.all([
          outputFile(file, 'jpeg'),
          outputFile(file, 'webp')
        ]);
      })
    );
  })
  .then(() => {
    console.log('All files written successfully');
  });
