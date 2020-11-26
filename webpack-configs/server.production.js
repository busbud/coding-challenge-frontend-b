const path = require('path');

module.exports = () => ({
  entry: {
    server: {
      import: './src/server/index.ts',
    },
  },
  output: {
    path: path.resolve(__dirname, '../build'),
  },
});
