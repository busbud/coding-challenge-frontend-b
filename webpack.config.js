var webpack   = require('webpack'),
	path      = require('path'),

	BUILD_DIR = path.resolve(__dirname, 'build/public'),
	APP_DIR   = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  // Existing Code ....
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  plugins: PROD ? [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		}
	}),
    new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false }
    })
  ] : []
};

module.exports = config;