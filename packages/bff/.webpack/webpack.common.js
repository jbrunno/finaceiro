const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');
const webpack = require('webpack');
const path = require('path');

const extensions = ['.js', '.json', '.ts'];

module.exports = (envFile) => ({
  target: 'node',
  entry: path.join(process.cwd(), 'src', 'index.ts'),
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'index.bundle.js',
    clean: true,
  },
  resolve: {
    extensions,
    plugins: [
      new TsconfigPathsPlugin({
        extensions,
      }),
    ],
    alias: {
      '@perms': path.join(process.cwd(), 'perms'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: babelLoaderExcludeNodeModulesExcept(['@bff/core/*']),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.join(process.cwd(), envFile),
      safe: true,
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
});
