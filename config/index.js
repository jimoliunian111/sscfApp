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
const buildNanme = process.env.route; // 获取package.json dev命令里route后的字符串，比如huagui_damai
let routeArr = process.env.route.split('_') // ['huagui', 'damai']

// ------------- 打包build配置, 不论dev 还是 build都会走这段代码 -------------start
const buildList = { //
  env: buildEnv,
  index: path.resolve(__dirname, `../dist/${routeArr[0]}/${routeArr[1]}/index.html`),
  assetsRoot: path.resolve(__dirname, `../dist/${routeArr[0]}/${routeArr[1]}`),
  assetsSubDirectory: "./",
  assetsPublicPath: `./`,
  productionSourceMap: false,
  devtool: "#source-map",
  productionGzip: false,
  productionGzipExtensions: ["js", "css"],
  bundleAnalyzerReport: process.env.npm_config_report
};
// ------------- end -------------

// ---------------------- 大对象，内含产品名为Key对应的打包配置， 如：{huagui_damai： buildList}--------start
let buildRouteConfig = {};
buildRouteConfig[buildNanme] = buildList;
//  ----------------------------end

module.exports = merge(buildRouteConfig, {
  dev: {// 此处省略
  	env: buildEnv, // require('./dev.env'),
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

  build: buildList,

});
