const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const app = express();

config.mode = 'development';
const compiler = webpack(config);

const instance = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  writeToDisk: true,
});

app.use(instance);
app.use(require('webpack-hot-middleware')(compiler));

app.use('/', express.static(__dirname + '/dist'));

app.listen(3000, () => {
  console.log('Running on port 3000...');
});
