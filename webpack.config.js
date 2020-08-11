const path = require('path')
const dotenv = require('dotenv')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const dotenvConfig = dotenv.config()
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.tsx',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    publicPath: '/dist',
    contentBase: './',
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'audio/wav',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TSConfigPathsPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenvConfig.parsed),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
