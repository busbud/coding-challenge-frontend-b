const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../client/index.js'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[hash].js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            query: {
              data: `@import "${path.resolve(__dirname, '../client/_theme.scss')}";`
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'X_BUSBUD_TOKEN': JSON.stringify(process.env.X_BUSBUD_TOKEN)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: path.resolve(__dirname, '../dist')
    }])
  ]
}
