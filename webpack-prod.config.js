var commonConfig = require('./webpack-common.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
  entry: [
  // our entry file
  './app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[chunkhash].js'
  },
  devtool:'source-map',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:5000/'
    }
  },
  module: {
    loaders: commonConfig.loaders
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  commonConfig.indexPagePlugin
  ],
};