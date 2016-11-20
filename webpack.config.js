var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var values = require('postcss-modules-values');
var path = require('path');

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: './index.html',
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),                // output path
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules=true',
      include: /flexboxgrid/
    },
    {
      test: /\.css$/,
      loader: 'style!css!postcss',
      include: path.join(__dirname, 'node_modules'),
      exclude: /flexboxgrid/
    },
    { test: /\.png$/, loader: "url-loader?limit=100000" },
    { test: /\.jpg$/, loader: "file-loader" },
    {
      test: /\.html$/,
      loader: "file?name=[name].[ext]",
    },
  ],
  },
  plugins: [
  new ExtractTextPlugin('example.css', { allChunks: true }),  // compiled css (single file only)
  // new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(),
  // new webpack.DefinePlugin({
  //   'process.env.NODE_ENV': JSON.stringify('development')
  // })
]

}
