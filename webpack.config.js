var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: 'app.js'
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
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
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

