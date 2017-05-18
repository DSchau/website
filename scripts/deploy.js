#!/usr/bin/env node
const PromiseFtp = require('promise-ftp');
const config = require('config');
const path = require('path');
const readdir = require('recursive-readdir');

const client = new PromiseFtp();

const exit = () => process.exit(0);
const fail = err => {
  console.error(err);
  process.exit(1);
};

const localPath = config.get('local');
const remotePath = config.get('remote');

client
  .connect(config.get('ftp'))
  .then(connected => {
    return readdir(path.resolve(localPath)).then(files => {
      return files.map(file => file.split(path.join(localPath, '/')).pop());
    });
  })
  .then(files => {
    const folders = files
      .filter(file => file.indexOf('/') > -1)
      .map(folder => path.join(remotePath, folder.split('/').shift()));

    return client
      .mkdir(remotePath, true)
      .catch(() => true)
      .then(() => {
        return Promise.all(
          folders.map(folder => client.mkdir(folder, true).catch(() => true))
        );
      })
      .then(() => files);
  })
  .then(files => {
    return Promise.all(
      files.map(file => {
        return client.put(
          path.resolve(path.join(localPath, file)),
          path.join(remotePath, file)
        );
      })
    );
  })
  .then(exit)
  .catch(fail);
