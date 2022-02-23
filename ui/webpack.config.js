const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../public")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      publicPath: "/static"
    })
  ]
}