const shared = require("./shared");
const merge = require("webpack-merge");

const config = merge.smart(shared, {
  mode: "development"
});

module.exports = config;
