const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonPaths = require("./config.path");

const webpackPlugins = [
  new HtmlWebpackPlugin({
    template: commonPaths.templatePath
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": process.env.NODE_ENV
      ? JSON.stringify(process.env.NODE_ENV)
      : JSON.stringify("development")
  })
];

webpackPlugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackPlugins;
