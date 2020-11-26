const path = require('path');

module.exports = () => ({
  entry: './src/client/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build/js'),
  },
  devtool: 'inline-cheap-source-map',
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**'],
  },
});
