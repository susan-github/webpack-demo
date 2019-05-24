const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 添加vendor到html的<script>中
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    task: './src/task/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    }),
    new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../dist/dll/vendor*.js') })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/static')
  },
};