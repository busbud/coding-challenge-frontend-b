const path = require('path');

module.exports = () => ({
  entry: {
    app: {
      import: './src/client/index.tsx',
      dependOn: 'vendors',
      filename: 'js/main-[contenthash].js',
    },
    vendors: {
      import: './src/client/dependencies.ts',
      filename: 'js/vendors-[contenthash].js',
    },
  },
  output: {
    path: path.resolve(__dirname, '../build/js'),
  },
});
