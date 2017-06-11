var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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