const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const plugins = [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  }),
  new Dotenv({
    path: path.resolve(__dirname, `.env`),
  }),
];

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: plugins
};