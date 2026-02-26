const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const assets = ["icons"];
module.exports = [
  ...assets.map(asset => new CopyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, "src", "assets", asset),
      to: path.resolve(__dirname, ".webpack/renderer", asset)
    }]
  }))
];
