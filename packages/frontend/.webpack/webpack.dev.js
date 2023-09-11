const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) =>
  merge(common(env.ENV_FILE), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      static: path.join(process.cwd(), 'build'),
      port: 3010,
      open: true,
      hot: false,
      liveReload: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
  });
