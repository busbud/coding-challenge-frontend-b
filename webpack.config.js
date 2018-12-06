const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'; // eslint-disable-line
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = { // eslint-disable-line
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['transform-object-rest-spread']
          }
        }

      },
      {
        test: /\.less$/,
        use: [
          {loader: (devMode ? 'style-loader' : MiniCssExtractPlugin.loader)},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [htmlPlugin, new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  })]
};
