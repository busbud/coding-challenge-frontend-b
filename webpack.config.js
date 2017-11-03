var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                exclude: /src/,
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {

            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './public/dist/assets'),
            'pages': path.resolve(__dirname, './src/pages'),
            'components': path.resolve(__dirname, './src/components'),
            'stores': path.resolve(__dirname, './src/stores'),
            'vue$': 'vue/dist/vue.common.js'
        },
        modules: [
  
            'node_modules'
        ]
    },
    devServer: {

        historyApiFallback: true,
        noInfo: true,
        contentBase: './public',
    },
    performance: {

        hints: false
    },
    devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = (module.exports.plugins || []).concat([
    
        new webpack.DefinePlugin({
            
            'process.env': {

                NODE_ENV: '"production"'
            }
        }),
        
        new webpack.optimize.UglifyJsPlugin({
            
            sourceMap: false,
            compress: {

                warnings: false
            }
        }),

        new webpack.LoaderOptionsPlugin({
            
            minimize: true,
            compress: {

                warnings: false
            }
        }),

        new webpack.optimize.OccurrenceOrderPlugin()
    ])
}

