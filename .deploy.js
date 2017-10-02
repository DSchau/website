module.exports = {
  ftp: {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD
  },
  paths: {
    localPath: 'public',
    remotePath: ''
  }
};
