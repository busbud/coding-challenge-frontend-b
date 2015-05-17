var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'sinon' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
      loaders: [
      // image loader - https://www.npmjs.com/package/image-webpack-loader
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }, 
      // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'],
      }, 
      // styles
      {
        test: /\.[s]?css$/,
        loader: "style!css!autoprefixer-loader?browsers=last 2 version!sass"
      }, 
      // and font files - embed them if possible
      { 
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" 
      }, { 
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff2" 
      }, { 
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" 
      }, { 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" 
      }
      ]
    }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
