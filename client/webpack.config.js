import HTMLWebpackPlugin from "html-webpack-plugin";
import { resolve as _resolve } from "path";

export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader",
    },
  ],
};

export const resolve = {
  extensions: [".tsx", ".ts", ".jsx", ".js"],
};
export const output = {
  filename: "bundle.js",
  path: _resolve(__dirname, "dist"),
};
export const plugins = [
  new HTMLWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
  }),
];
