const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'eval',

  devServer: {
    hot: true,
    historyApiFallback: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
