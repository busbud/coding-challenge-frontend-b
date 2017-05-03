var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

var isProduction = (
  process.env.NODE_ENV === 'production' ||
  process.env.npm_lifecyle_event === 'production' )

var PATHS = {
  app: [path.resolve(__dirname, 'app'), "webpack-hot-middleware/client"],
  build: path.resolve(__dirname, 'build')
}

var productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /\node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, productionPlugin, new webpack.HotModuleReplacementPlugin()]
}


