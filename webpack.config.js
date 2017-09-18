const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./src/app.js', './src/stylesheets/entry.scss'],
  output: {
    filename: 'dist/app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties','transform-decorators-legacy']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('dist/styles.css'),
  ]
}
