const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.js'],
  },
  entry: {
    osheaga: ['./app/index.js', './app/styles/main.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
    filename: '[name].js',
  },
  module: {
    rules: [
      { 
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
          },
        },
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
}
