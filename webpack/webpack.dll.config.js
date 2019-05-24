const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    context: __dirname,
    name: '[name]_library'
  })
]

module.exports = env => {
  let outputFileName = '[name].dll.js'
  if (env.NODE_ENV === 'production') {
    outputFileName = '[name]-[chunkhash].js'
    plugins.push(
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new UglifyJSPlugin({
        cache: 'node_modules/.cache/uglifyjs_cache',
        parallel: true,
        sourceMap: true
      })
    )
  }
 return {
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: ['lodash'],
  },
  output: {
    path: path.join(__dirname, '../dist/dll'),
    filename: outputFileName,
    library: '[name]_library'
  },
  plugins: plugins
 }
}