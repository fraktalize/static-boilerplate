const path = require("path");
const fs = require("fs");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = path.resolve(__dirname, "../..");
const distPath = path.resolve(root, "dist");
const srcPath = path.resolve(root, "src");
const pack = require("../../package.json");

module.exports = () => {
  const viewsPath = `${srcPath}/views`;
  const htmlDocuments = glob.sync(`${viewsPath}/**/*.html`);

  return htmlDocuments.map(document => {
    const filename = document.replace(viewsPath, distPath);
    return new HtmlWebpackPlugin({
      template: document,
      filename,
      hash: true,
      title: pack.config.title,
      favicon: pack["meta-tags"].favicon,
      minify: false,
      meta: pack["meta-tags"]
    });
  });
};
