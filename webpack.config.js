var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var values = require('postcss-modules-values');

// this works well for development, but I should have a prod config, and my webpack-dev-server infers with my nodejs server.
// I should be using webpack to run that as well...

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: './index.html',
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },
  postcss: [
    values
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}
