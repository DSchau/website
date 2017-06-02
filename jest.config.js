module.exports = {
  moduleNameMapper: {
    '\\.(json)$': '<rootDir>/__mocks__/json-mock.js',
    '^static$': '<rootDir>/static'
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-transform.js'
  }
};
