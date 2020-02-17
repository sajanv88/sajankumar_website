const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const ENV = process.env.NODE_ENV;
module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: "./server.js",
  mode: ENV,
  output: {
    path: path.join(__dirname, "build"),
    filename: "server.js"
  },
  node: {
    __dirname: false
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  },
  plugins: [
    new CopyPlugin([{ from: "**/*", to: ".", ignore: ["*.scss"] }]),
    new WebpackShellPlugin({
      onBuildEnd: ["nodemon build/server.js"]
    })
  ]
};
