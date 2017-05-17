const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    vendor: [
      'autosize',
      'ityped',
      'particles.js'
    ]
  },
  output: {
    filename: '[name].[hash].js',
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new ExtractTextPlugin({
      filename: 'style.[hash].css'
    })
  ]
};
