const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(common, {
  mode: 'production',
  entry: ['./src/start.js'],
  output: {
    path: __dirname + '/docs/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/www/index.html`,
      filename: "index.html",
      inject: "body"
    })
  ],
})