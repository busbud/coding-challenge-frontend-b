//get webpack
const webpack = require('webpack');
//check if we're in production to avoid having minified bundle file in development
const isProduction = (process.env.NODE_ENV === 'production');
//prepare plugins (depending on environemment)
var plugins = [];
if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        })
    );
}

module.exports = {
     entry: './src/app.js',
     output: {
        path: './dist',
        filename: isProduction ? 'app.bundle.min.js' : 'app.bundle.js'
     },
     module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
     },
    plugins: plugins
 };