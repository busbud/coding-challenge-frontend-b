const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build')
}


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
  plugins: [HtmlWebpackPluginConfig]
}