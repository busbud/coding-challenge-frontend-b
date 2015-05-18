var commonConfig = require('./webpack-common.config.js');

module.exports = {
  entry: [
  // setup the hot mobule loading
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  // our entry file
  './app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[chunkhash].js'
  },
  devtool: 'eval',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:5000/'
    }
  },
  module: {
    loaders: commonConfig.loaders
  },
  plugins: [
    commonConfig.indexPagePlugin
  ],
};