const path = require('path')
const webpack = require('webpack')

let config = {
  entry: ['./src/app.tsx'],
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
      }
    ]
  }
}

module.exports = config