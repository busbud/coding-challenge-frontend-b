const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const _ = require('lodash');
const commonPaths = require('./config.path');

// Use .env file to set environment variables
const env = dotenv.config().parsed;

let envKeys = _.reduce(
  env,
  (result, value, key) => {
    result[`process.env.${key}`] = JSON.stringify(value);
    return result;
  },
  {},
);

envKeys = {
  ...envKeys,
  'process.env.NODE_ENV': process.env.NODE_ENV
    ? JSON.stringify(process.env.NODE_ENV)
    : JSON.stringify('development'),
};

// List of webpack plugins
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: commonPaths.templatePath,
});

const webpackPlugins = new webpack.DefinePlugin(envKeys);

const webpackHotModulePlugin = new webpack.HotModuleReplacementPlugin();

const plugins = [htmlWebpackPlugin, webpackPlugins, webpackHotModulePlugin];

module.exports = plugins;
