const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;

const path = require('path');
const deps = require('../package.json').dependencies;
const env = (envFile) =>
  require('dotenv').config({ path: path.join(process.cwd(), envFile) }).parsed;

const extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];

module.exports = (envFile) => ({
  entry: path.join(process.cwd(), 'src', 'index.tsx'),
  output: {
    publicPath: 'auto',
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
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: babelLoaderExcludeNodeModulesExcept(['@frontend/core/*']),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ttf|woff)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'operacao',
      filename: 'remoteEntry.js',
      remotes: {
        login: env(envFile).FRONTEND_LOGIN,
      },
      exposes: {
        './OperacaoPages': './src/OperacaoPages',
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: deps['@mui/material'],
        },
        '@frontend/core': {
          singleton: true,
          requiredVersion: deps['@frontend/core'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.join(process.cwd(), envFile),
      safe: true,
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
  ],
});
