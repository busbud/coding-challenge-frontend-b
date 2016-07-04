//get webpack
const webpack = require('webpack');
//check if we're in production to avoid having minified bundle file in development
const env = process.env.NODE_ENV;
const isProduction = ( env === 'production');
//prepare plugins (depending on environemment)
var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env || 'development')
    })
];
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
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: './dist',
        filename: isProduction ? 'app.bundle.min.js' : 'app.bundle.js'
    },
    module: {
        loaders: [
            //ES6
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            //SCSS
            {   test: /\.scss$/, 
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: plugins
 };