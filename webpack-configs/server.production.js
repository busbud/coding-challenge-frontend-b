const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = ({ mode, forceWatch = false }) => ({
  entry: {
    server: {
      import: './src/server/index.ts',
    },
  },
  output: {
    path: path.resolve(__dirname, '../build'),
  },
  plugins: forceWatch === true ? [new NodemonPlugin()] : [],
});
