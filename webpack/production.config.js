const merge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map'
})
