var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')


// 仅显示修改部分
const routePathRoot = utils.routePathRoot;
const routeAssetsPublicPath = utils.routeAssetsPublicPath;
const routeEntry = utils.routeEntry;




function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = vuxLoader.merge({
  context: path.resolve(__dirname, '../'),
  entry: {
    app: routeEntry
  },
  output: {
    path: routePathRoot,
    publicPath: process.env.NODE_ENV === "production" ? routeAssetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@assets': resolve('src/assets'),
      '@config': resolve('config')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('static/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('static/media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('static/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}, {
  plugins: ['vux-ui', {
    name: 'duplicate-style',
    options: {
      cssProcessorOptions : {
        safe: true,
        zindex: false,
        autoprefixer: {
          add: true,
          "browsers": [
            "iOS >= 7",
            "Android >= 4.1"
          ]
        }
      }
    }
  }, {
    name: 'less-theme',
    path: path.resolve(__dirname, '../src/contract/theme.less')
  }]
})
