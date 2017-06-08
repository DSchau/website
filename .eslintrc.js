module.exports = {
  env: {
    browser: true
  },
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  plugins: ['import'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': 'off',
    'global-require': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['static']
      }
    ],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ]
  },
  settings: {
    'import/resolver': 'webpack'
  }
};
