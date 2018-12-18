const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  entry: ['./src/app.tsx', './src/css/application.sass'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  devServer: {
    noInfo: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'tslint-loader',
        enforce:  'pre',
        exclude: [/node_modules/]
      },
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: './index.html'
    })
  ]
}

module.exports = config