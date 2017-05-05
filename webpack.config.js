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
  app: [path.resolve(__dirname, 'app')],
  build: path.resolve(__dirname, 'build')
}

isProduction || PATHS.app.push("webpack-hot-middleware/client")

var productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

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
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' }
    ]
  },
}

const devConfig = {
  target: 'node',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    productionPlugin,
    new webpack.HotModuleReplacementPlugin()
  ]
}

const prodConfig= {
  plugins: [
    HtmlWebpackPluginConfig,
    productionPlugin
  ]
}

module.exports = Object.assign({}, base, isProduction ? prodConfig : devConfig)

