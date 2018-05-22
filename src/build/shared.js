const path = require("path");
const webpack = require("webpack");
const MiniCssPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyPlugin = require("copy-webpack-plugin");
const processHTMLPages = require("./processHTMLHelper.js");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

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
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "http://localhost:8080/"
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
        use: [
          MiniCssPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              config: { path: `${srcPath}/build/postcss.config.js` }
            }
          }
        ]
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
    filename: "[hash].bundle.js"
  }
};
