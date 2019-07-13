const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  performance: { hints: false },
  output:{
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: '3d-rasterization.min.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'resources/',
      to: './',
    }])
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  }
};
