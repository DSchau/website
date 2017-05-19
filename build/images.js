const glob = require('glob');
const sharp = require('sharp');
const path = require('path');

const src = path.resolve('./src/assets/images');
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

const outputFile = (file, extension, size = 900, quality = 60) => {
  const name = file.split(src).pop().split('.').shift();
  const fileName = `${name}.${extension}`;
  const stream = sharp(file).resize(size);

  return stream[extension]({ quality }).toFile(path.join(dest, fileName));
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
