const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => ({
  entry: {
    app: {
      import: './src/client/index.tsx',
      dependOn: 'vendors',
      filename: 'js/[name]-[fullhash].js',
    },
    vendors: {
      import: './src/client/dependencies.ts',
      filename: 'js/[name]-[fullhash].js',
    },
  },
  output: {
    path: path.resolve(__dirname, '../build/public'),
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, './index-template.html'),
    }),
  ],
});
