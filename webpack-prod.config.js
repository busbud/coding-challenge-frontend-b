var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
  entry: [
  // our entry file
  './app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[chunkhash].js'
  },
  devtool:'source-map',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:5000/'
    }
  },
  module: {
    loaders: [
    // image loader - https://www.npmjs.com/package/image-webpack-loader
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, 
    // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'],
    }, 
    // styles
    {
      test: /\.[s]?css$/,
      loader: "style!css!autoprefixer-loader?browsers=last 2 version!sass"
    }, 
    // and font files - embed them if possible
    { 
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" 
    }, { 
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff2" 
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" 
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" 
    }
    ]
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
  new HtmlWebpackPlugin({
    title: 'webpack starter template 123',
    filename: 'index.html',
    template: './app/index_template.html'
  }
  )
  ],
};