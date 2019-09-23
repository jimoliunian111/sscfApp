'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var buildEnv = (function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return require('./dev.env')
    case 'beta':
      return require('./beta.env')
    default:
      return require('./prod.env')
  }
})()


const merge = require("webpack-merge");
const buildNanme = process.env.route;
let routeArr = process.env.route.split('_')
const buildList = {
  index: path.resolve(__dirname, `../dist/${routeArr[0]}/${routeArr[1]}/index.html`),
  assetsRoot: path.resolve(__dirname, `../dist/${routeArr[0]}/${routeArr[1]}`),
  assetsSubDirectory: "./static",
  assetsPublicPath: `./`,
  productionSourceMap: false,
  devtool: "#source-map",
  productionGzip: false,
  productionGzipExtensions: ["js", "css"],
  bundleAnalyzerReport: process.env.npm_config_report
};
let buildRouteConfig = {};
buildRouteConfig[buildNanme] = buildList;
module.exports = merge(buildRouteConfig, {
  dev: {// 此处省略
  	env: require('./dev.env'),
    port: 8089, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/trajectory': {
        // target: 'http://product.service.cfb.com/',
        // target: 'http://m.proxy.cfb.com/',
        target: 'http://h5.beta.12354.com',
        changeOrigin: true,
        autoRewrite: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api/trajectory': '/trajectory'
        }
      },
      '/api/api/api/v1': {
        // target: 'http://product.service.cfb.com/',
        // target: 'http://m.proxy.cfb.com/',
        target: 'http://h5.beta.12354.com',
        changeOrigin: true,
        autoRewrite: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api/api': ''
        }
      },
      '/api': {
        // target: 'http://product.service.cfb.com/',
        // target: 'http://m.proxy.cfb.com/',
        target: 'http://h5.beta.12354.com',
        changeOrigin: true,
        autoRewrite: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/static_none': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/static': ''
        }
      }
    },
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: merge(buildList, {
    env: buildEnv,
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist")
  })
});


//module.exports = {
//dev: {
//  env: require('./dev.env'),
//  port: 8089,
//  // Paths
//  assetsSubDirectory: 'static',
//  assetsPublicPath: '/',
//  proxyTable: {
//    '/api/trajectory': {
//      // target: 'http://product.service.cfb.com/',
//      // target: 'http://m.proxy.cfb.com/',
//      target: 'http://h5.beta.12354.com',
//      changeOrigin: true,
//      autoRewrite: true,
//      logLevel: 'debug',
//      pathRewrite: {
//        '^/api/trajectory': '/trajectory'
//      }
//    },
//    '/api/api/api/v1': {
//      // target: 'http://product.service.cfb.com/',
//      // target: 'http://m.proxy.cfb.com/',
//      target: 'http://h5.beta.12354.com',
//      changeOrigin: true,
//      autoRewrite: true,
//      logLevel: 'debug',
//      pathRewrite: {
//        '^/api/api': ''
//      }
//    },
//    '/api': {
//      // target: 'http://product.service.cfb.com/',
//      // target: 'http://m.proxy.cfb.com/',
//      target: 'http://h5.beta.12354.com',
//      changeOrigin: true,
//      autoRewrite: true,
//      logLevel: 'debug',
//      pathRewrite: {
//        '^/api': ''
//      }
//    },
//    '/static_none': {
//      target: 'http://localhost:8089',
//      changeOrigin: true,
//      logLevel: 'debug',
//      pathRewrite: {
//        '^/static': ''
//      }
//    }
//  },
//  autoOpenBrowser: true,
//  errorOverlay: true,
//  notifyOnErrors: true,
//  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
//  devtool: 'cheap-module-eval-source-map',
//  cacheBusting: true,
//
//  cssSourceMap: true
//},
//
//build: {
//  env: buildEnv,
//  index: path.resolve(__dirname, '../dist/index.html'),
//  assetsRoot: path.resolve(__dirname, '../dist'),
//  assetsSubDirectory: 'static',
//  assetsPublicPath: '/',
//  productionSourceMap: /beta|development/.test(process.env.NODE_ENV),
//  productionDebug: /beta|development/.test(process.env.NODE_ENV),
//  devtool: '#source-map',
//  productionGzip: /production/.test(process.env.NODE_ENV),
//  productionGzipExtensions: ['js', 'css'],
//  bundleAnalyzerReport: process.env.npm_config_report
//}
//}
