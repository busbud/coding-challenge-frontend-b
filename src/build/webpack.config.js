module.exports = {
  entry: "../components/AppContainer/AppContainer.js",
  output: {
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      { // JSX
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      { // LESS
        test: /\.less$/,
        loader: 'style!css!less'
      },
      { // CSS (for the Material UI's internal use only)
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.jpg$/, loader: "url-loader" } // JPG (image URLs inside LESS)
    ]
  }
};
