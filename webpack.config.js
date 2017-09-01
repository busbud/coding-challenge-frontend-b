const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envVars = {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	TOKEN: JSON.stringify(process.env.token),
};

const SASS_CONSTANTS = '@import \'src/constants.scss\';';

module.exports = {
	entry: ['babel-polyfill', './src/main.js'],
	output: {
		path: path.join(__dirname, './out'),
		filename: 'app.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}, {
			test: /\.html$/,
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				context: './src',
			},
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'resolve-url-loader',
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						data: SASS_CONSTANTS,
					},
				},
			],
		}],
	},
	stats: {
		colors: true,
	},
	plugins: [
		new webpack.LoaderOptionsPlugin(),
		new webpack.DefinePlugin(envVars),
		new CopyWebpackPlugin([
			{ from: 'src/index.html' },
			{ from: 'static/' },
		]),
	],
	devServer: {
		contentBase: './static',
		port: process.env.PORT || 8080,
		headers: { 'Access-Control-Allow-Origin': '*' },
		historyApiFallback: {
			rewrites: [
				{ from: /./, to: '/' },
			],
		},
	},
};

if (process.env.NODE_ENV !== 'production') {
	console.info('Using dev environment');
	module.exports.devtool = 'source-map';
	module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
	console.info('Using prod environment');
	module.exports.devtool = false;
	module.exports.plugins.push(new UglifyJSPlugin({
		sourceMap: 'source-map',
		compress: {
			screw_ie8: true, // danger! :)
			warnings: false,
		},
		comments: false,
		mangle: true,
		minimize: true,
		warningsFilter: function filter() {
			return false;
		},
	}));
	module.exports.plugins.push(new CompressionPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.(js|html|s?css)$/,
		threshold: 500,
		minRatio: 0.8,
		deleteOriginalAssets: 0,
	}));
	module.exports.devServer.compress = true;
}
