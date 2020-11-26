const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => ({
  entry: './src/client/index.tsx',
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, './index-template.html'),
    }),
  ],
  devtool: 'inline-cheap-source-map',
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**'],
  },
});
