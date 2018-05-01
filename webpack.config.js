const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      }
    ]
  }
}
