const { merge } = require('webpack-merge'),
  webpack = require('webpack'),
  common = require('./webpack.common.js'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');

module.exports = merge(common, {
  entry: './src/start.js',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: "localhost",
    port: 7777,
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/www/index.html`,
      filename: 'index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})