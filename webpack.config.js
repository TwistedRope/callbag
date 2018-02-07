const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  devtool: false,

  entry: {
    app: './index.js',
  },

  output: {
    path: __dirname,
    filename: 'callbag.browser.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new FriendlyErrorsPlugin(),
    new UglifyJsPlugin({ minimize: true }),
  ],
};
