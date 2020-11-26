const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = () => ({
  entry: './src/server/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [new NodemonPlugin()],
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**'],
  },
});
