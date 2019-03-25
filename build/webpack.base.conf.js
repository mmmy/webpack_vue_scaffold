const path = require('path')
const { argv } = require('yargs')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const resolve = (_path) => {
  return path.resolve(__dirname, `../${_path}`)
}

const webpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@components': resolve('src/components'),
      '@views': resolve('src/views'),
      '@helpers': resolve('src/helpers'),
      '@store': resolve('src/redux'),
      '@constants': resolve('src/constants'),
      '@libs': resolve('src/libs'),
      '@static': resolve('src/static')
    }
  },
  externals: {
    // 'dmp-chart-sdk': 'DmpChartSDK'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
    child_process: 'empty'
  },
  // 调整webpack文件大小限制 避免多余的警告
  performance: {
    maxEntrypointSize: 524288,
    maxAssetSize: 2097152
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader?cacheDirectory=true',
        // loader: 'happypack/loader?id=jsx',
        include: [resolve('src')],
        // exclude: /node_modules/
        exclude: [],
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
    // new HappyPack({
    //   id: 'jsx',
    //   threadPool: happyThreadPool,
    //   loaders: ['babel-loader?cacheDirectory=true']
    // })
  ]
}

if (argv.pre === 'yes') {
  webpackConfig.module.rules.unshift({
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  })
}

module.exports = webpackConfig
