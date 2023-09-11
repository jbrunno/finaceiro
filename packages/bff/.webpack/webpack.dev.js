const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const AutoReloadWebpackPlugin = require('auto-reload-webpack-plugin');

module.exports = (env) =>
  merge(common(env.ENV_FILE), {
    mode: 'development',
    stats: 'normal',
    watch: true,
    watchOptions: {
      poll: 1000,
      ignored: path.join(process.cwd(), 'node_modules'),
    },
    externals: [nodeExternals({ allowlist: ['webpack/hot/poll?1000'] })],
    plugins: [
      new AutoReloadWebpackPlugin({
        filePath: path.join(process.cwd(), 'build', 'index.bundle.js'),
      }),
    ],
  });
