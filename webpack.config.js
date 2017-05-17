const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const assign = require('webpack-config-assign');

const path = require('path');

const getConfig = (env) => {
  try {
    return require(`./webpack.config.${env}`);
  } catch (e) {
    return {};
  }
};

module.exports = function config({ environment = 'production' } = {}) {
  return assign({
    entry: {
      bundle: path.join(__dirname, 'src/index'),
      polyfills: path.join(__dirname, 'src/polyfills')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.pug|jade$/,
          use: ['pug-loader']
        },
        {
          test: /\.jpe?g|png|gif$/,
          use: 'url-loader?limit=10000'
        },
        {
          test: /\.woff2?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot$/,
          use: 'file-loader'
        },
        {
          test: /\.svg$/,
          use: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunksSortMode(a, b) {
          const order = ['vendor', 'polyfills', 'bundle'];
          return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
        },
        inject: 'body',
        template: 'public/index.pug'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || environment)
      })
    ],
    stats: {
      children: false
    }
  }, getConfig(environment));
};
