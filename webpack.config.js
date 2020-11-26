require('dotenv/config');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge').default;
const modeConfig = ({ mode, entry, forceWatch }) =>
  require(`./webpack-configs/${entry}.${mode}.js`)({ mode, forceWatch });

const defaultSettings = {
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
};

module.exports = ({
  mode = 'production',
  entry = 'client-server',
  forceWatch = false,
} = {}) => {
  forceWatch = Boolean(forceWatch);
  const result = [];
  if (entry === 'client' || entry === 'client-server') {
    result.push(
      webpackMerge(
        {
          mode,
          ...defaultSettings,
          performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
          },
        },
        modeConfig({ mode, entry: 'client', forceWatch }),
      ),
    );
  }
  if (entry === 'server' || entry === 'client-server') {
    result.push(
      webpackMerge(
        {
          mode,
          target: 'node',
          ...defaultSettings,
        },
        modeConfig({ mode, entry: 'server', forceWatch }),
      ),
    );
  }

  return result;
};
