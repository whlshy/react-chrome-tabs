const {merge} = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack')
//TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  entry: './index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
})