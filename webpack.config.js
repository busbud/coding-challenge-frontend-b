var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'index_bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{test: /\.(js)$/, use: 'babel-loader'},
			{test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	plugins: [new HTMLWebpackPlugin(
			{template: 'app/index.html'}
		)]
};