const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DSSWebpackPlugin = require("dss-webpack");
const path = require("path");

module.exports = {
  entry: ["./polyfills", "react-hot-loader/patch", "./index.web.js"],
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve("./index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new DSSWebpackPlugin({
      test: /index\.css$/,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          presets: ["@babel/env", "react", "react-native"],
          plugins: [
            "react-hot-loader/babel",
            ["babel-plugin-classnames", { packageName: "dss-classnames" }],
          ],
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: DSSWebpackPlugin.loader,
            query: {
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: DSSWebpackPlugin.loader,
            query: {
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
    extensions: [".web.js", ".js", ".web.jsx", ".jsx"],
    mainFields: ["browser", "main"],
  },
};
