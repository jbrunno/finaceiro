const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const common = require('./webpack.common.js');

module.exports = (env) =>
  merge(common(env.ENV_FILE), {
    mode: 'development',
    externals: [nodeExternals()],
  });
