var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssModuleLoader = require('./webpack/css-module-loader');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

var isProduction = (
  process.env.NODE_ENV === 'production' ||
  process.env.npm_lifecyle_event === 'production' )

var PATHS = {
  app: ["babel-polyfill", path.resolve(__dirname, 'app')],
  build: path.resolve(__dirname, 'build')
}

isProduction || PATHS.app.push("webpack-hot-middleware/client")

var productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

console.log(isProduction)

const base = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /\node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: cssModuleLoader(isProduction) },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader?name=[name].[ext]&outputPath=img/'],
        exclude: [/fonts/]
      }
    ]
  },
}

const devConfig = {
  devtool: 'cheap-module-inline-source-map',
  plugins: [
    HtmlWebpackPluginConfig,
    productionPlugin,
    new webpack.HotModuleReplacementPlugin()
  ]
}

const prodConfig= {
  plugins: [
    new ExtractTextPlugin('css/application.css'),
    HtmlWebpackPluginConfig,
    productionPlugin
  ]
}

module.exports = Object.assign({}, base, isProduction ? prodConfig : devConfig)

