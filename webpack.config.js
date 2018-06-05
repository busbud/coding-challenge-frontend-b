const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const INDEX_PAGE_PATH = path.resolve(__dirname, 'public', 'index.html');
const FAVICON_PATH = path.resolve(__dirname, 'public', 'favicon.ico');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    favicon: FAVICON_PATH,
    template: INDEX_PAGE_PATH,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
];

const styleLoader = isProd
  ? 'style-loader'
  : MiniCssExtractPlugin.loader;

module.exports = {
  mode: 'development',

  devtool: isProd
    ? 'hidden-source-map'
    : 'cheap-module-source-map',

  entry: [
    `${APP_DIR}/index.jsx`,
  ],

  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            resets: ['es2015', 'react', 'stage-2'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: styleLoader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },

  plugins,

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss'],
  },
};
