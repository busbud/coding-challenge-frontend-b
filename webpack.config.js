const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge').default;
const modeConfig = (mode) =>
  require(`./webpack-configs/client.${mode}.js`)(mode);

module.exports = ({ mode = 'development' } = {}) => {
  return webpackMerge(
    {
      mode,
      plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
          hash: true,
          template: path.resolve('./webpack-configs/index-template.html'),
        }),
        new webpack.ProgressPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.(t|j)sx?$/,
            loader: 'babel-loader',
            exclude: /node_modules\//,
          },
        ],
      },
      resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },
    },
    modeConfig(mode),
  );
};
