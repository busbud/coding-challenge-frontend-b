var ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssModuleLoader = (isProduction) => {
  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: [{
        loader:'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]--[hash:base64:5]',
        }
      }]
    });
  } else {
    return [{
        loader: 'style-loader'
      }, {
        loader:'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]--[hash:base64:5]',
        }
      }
    ];
  }
}

module.exports = cssModuleLoader