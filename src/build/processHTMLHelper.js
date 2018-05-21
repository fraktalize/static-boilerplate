const path = require("path");
const fs = require("fs");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = path.resolve(__dirname, "../..");
const distPath = path.resolve(root, "dist");
const srcPath = path.resolve(root, "src");

module.exports = () => {
  const htmlDocuments = glob.sync(`${srcPath}/**/*.html`);

  return htmlDocuments.map(document => {
    const filename = document.replace(srcPath, distPath);
    return new HtmlWebpackPlugin({
      template: document,
      filename,
      hash: true
    });
  });
};
