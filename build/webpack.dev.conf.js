// process.traceDeprecation = true
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const { argv } = require('yargs')

const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// const dllManifestDir = path.resolve(__dirname, './manifest/dev')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    main: [
      // 'react-hot-loader/patch',
      './build/dev-hot',
      './src/main'
    ]
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/chunks/[id].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: dllManifestDir,
    //   manifest: require(path.join(dllManifestDir, 'vendor-manifest.json'))
    // }),
    // new webpack.DllReferencePlugin({
    //   context: dllManifestDir,
    //   manifest: require(path.join(dllManifestDir, 'echarts-manifest.json'))
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig
