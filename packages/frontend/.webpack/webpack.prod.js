const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) =>
  merge(common(env.ENV_FILE), {
    mode: 'production',
    plugins: [new CompressionPlugin()],
  });
