const webpack = require('webpack');
const MyPlugin = require('./MyPlugin.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MyPlugin(),
  ],
}
