const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const INDEX_PAGE_PATH = path.resolve(__dirname, 'public', 'index.html');
const FAVICON_PATH = path.resolve(__dirname, 'public', 'favicon.ico');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new Dotenv(),
  new HtmlWebpackPlugin({
    inject: true,
    favicon: FAVICON_PATH,
    template: INDEX_PAGE_PATH,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
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
    filename: '[name].[hash].js',
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
            presets: ['es2015', 'react', 'stage-2'],
          },
        },
      },
      {
        test: /\.scss|.css$/,
        use: [{
          loader: styleLoader,
        }, {
          loader: 'css-loader',
          options: {
            includePaths: [path.resolve(__dirname, 'node_modules')],
          },
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },

  plugins,

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss'],
  },
};
