const sharp = require('sharp');
const path = require('path');
const mkdir = require('mkdirp');
const glob = require('glob');
const del = require('del');

const src = path.join(__dirname, '..', 'src/assets/images');
const dest = path.resolve(__dirname, '..', 'static/images');

const getFiles = src => {
  return new Promise((resolve, reject) => {
    glob(path.join(src, '*.{jpg,jpeg,gif,png}'), (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
};

const outputFile = (
  file,
  extension,
  size = 900,
  launch = false,
  quality = 60
) => {
  const name = file.split(src).pop().split('.').shift();
  const fileName = `${name.replace(new RegExp('-' + size), '')}${launch ? '-launch' : ''}.${extension}`;
  let stream = sharp(file).resize(launch ? 50 : size);

  if (launch) {
    stream = stream.blur(1);
  }

  return stream[extension]({ quality }).toFile(path.join(dest, fileName));
};

async function images() {
  try {
    await del(`${dest}/**/*`)
      .then(() => getFiles(src))
      .then(files => {
        return new Promise((resolve, reject) => {
          return mkdir(dest, err => {
            if (err) {
              reject(err);
            }
            resolve(files);
          });
        });
      })
      .then(files => {
        return Promise.all(
          files.map(file => {
            const size = parseInt(file.match(/-(\d+)/).pop());
            return Promise.all([
              outputFile(file, 'jpeg', size),
              outputFile(file, 'jpeg', size, true),
              outputFile(file, 'webp', size)
            ]);
          })
        );
      });
  } catch (e) {
    console.error(e.stack);
    console.error(e);
  }
}

images().then(() => {
  console.log('All images written successfully');
});
