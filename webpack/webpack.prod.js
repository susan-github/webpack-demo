const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const projectRootPath = path.resolve(__dirname, '../');
const staticPath = path.resolve(projectRootPath, './dist/static');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([staticPath], { root: projectRootPath }),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'id.css',
    }),
    new webpack.DllReferencePlugin({
      // 跟dll.config里面DllPlugin的context一致
      context: __dirname, 
      
      // dll过程生成的manifest文件
      manifest: require('../dist/dll/vendor-manifest.json')
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
    ],
    splitChunks: {
      name: 'common',
      minChunks: Infinity,
    },
  },
});