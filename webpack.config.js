const plugins = require('./webpack/plugins');
const commonPaths = require('./webpack/config.path');

module.exports = {
  entry: {
    index: commonPaths.entryPath,
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: commonPaths.stylePath,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|mp4)$/i,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: commonPaths.stylePath,
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=[name]__[hash:base64:5].[ext]' }],
        include: commonPaths.stylePath,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    historyApiFallback: true,
    hot: true,
  },
};
