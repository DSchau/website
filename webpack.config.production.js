const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

const path = require('path');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: true,
    sourceMap: true
  }
};

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: ['autosize', 'ityped', 'particles.js', 'supports-webp']
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [cssLoader]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [cssLoader, 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules
        .map(m => path.relative(m.context || __dirname, m.request))
        .join('_');
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'style.[hash].css'
    }),
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      }
    }),
    new NameAllModulesPlugin()
  ]
};
