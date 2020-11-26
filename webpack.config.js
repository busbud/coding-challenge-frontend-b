const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge').default;
const modeConfig = (mode) =>
  require(`./webpack-configs/client.${mode}.js`)(mode);

module.exports = ({ mode = 'development' } = {}) => {
  return webpackMerge(
    {
      mode,
      plugins: [new webpack.ProgressPlugin()],
      module: {
        rules: [
          {
            test: /\.(t|j)sx?$/,
            loader: 'babel-loader',
            exclude: /node_modules\//,
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
        plugins: [new TsconfigPathsPlugin()],
      },
      performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
    },
    modeConfig(mode),
  );
};
