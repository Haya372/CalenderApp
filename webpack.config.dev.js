const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    host: 'localhost',
    port: 30001,
    proxy: {
      '/api/**': {
        target: 'http://localhost:30002',
        secure: false,
        logLevel: 'debug'
      }
    },
  }
});