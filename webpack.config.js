var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
	entry: './app/index.js',
	output: {
		filename: 'index_bundle.js',
		path: path.resolve(__dirname, 'dist'),
		// Sets base path for all assets
		publicPath: '/'
	},
	module: {
		rules: [
			{test: /\.(js)$/, use: 'babel-loader'},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.json$/, use: 'json-loader'},
			{test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						query: {
							name:'images/[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: true,
							},
							optipng: {
								optimizationLevel: 7,
							}
						}
					}
				]
			}
		]
	},
	// Allows us to request urls from browser
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HTMLWebpackPlugin(
			{template: 'app/index.html'}
		)]
};

// We set NODE_ENV to production in package.json 
// so that we can check it's state in webpack.config.js
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		// Create new instace of webpack.DefinePlugin
		new webpack.DefinePlugin({
			// Set property on process.env
			'process.env': {
				// We do this so we set NODE_ENV to production
				// in our compiled code that webpack will compile
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		// Add new instance of webpack.optimize
		// Call UglifyJsPlugin to minify our code
		new webpack.optimize.UglifyJsPlugin()
	);
}

module.exports = config;