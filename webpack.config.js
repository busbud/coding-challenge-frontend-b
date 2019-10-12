const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    publicPath: '/dist',
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
  },
};
