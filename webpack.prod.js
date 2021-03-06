const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack')
//TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: './index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types',
    },
  ]
})