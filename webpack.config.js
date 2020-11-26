const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge').default;
const modeConfig = (mode, entry) =>
  require(`./webpack-configs/${entry}.${mode}.js`)(mode);

module.exports = ({ mode = 'production', entry = 'client-server' } = {}) => {
  const result = [];
  if (entry === 'client' || entry === 'client-server') {
    result.push(
      webpackMerge(
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
        modeConfig(mode, 'client'),
      ),
    );
  }
  if (entry === 'server' || entry === 'client-server') {
    result.push(
      webpackMerge(
        {
          mode,
          target: 'node',
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
        },
        modeConfig(mode, 'server'),
      ),
    );
  }

  return result;
};
