module.exports = {
  mode: "development",
  entry: "./src/browser.tsx",
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
    },
  },
  module: {
      rules: [
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          { test: /\.(png|jpg)$/, loader: "url-loader" }
      ]
  },
};