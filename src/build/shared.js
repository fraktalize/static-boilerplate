const path = require("path");
const webpack = require("webpack");
const MiniCssPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyPlugin = require("copy-webpack-plugin");
const FaviconsPlugin = require("favicons-webpack-plugin");
const processHTMLPages = require("./processHTMLHelper.js");

const root = path.resolve(__dirname, "../..");
const distPath = path.resolve(root, "dist");
const srcPath = path.resolve(root, "src");

module.exports = {
  context: srcPath,
  target: "web",
  entry: ["babel-polyfill", "./scripts/main.js"],
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(srcPath, "images"),
        to: path.resolve(distPath, "images")
      }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: process.env.NODE_ENV !== "production"
    }),
    new MiniCssPlugin({
      filename: "[hash].style.css"
    })
  ].concat(processHTMLPages()),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: [/\.scss$/, /\.sass$/, /\.css$/],
        exclude: [/node_modules/],
        use: [MiniCssPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        query: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  output: {
    path: distPath,
    filename: "[chunkhash].bundle.js"
  }
};
