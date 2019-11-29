var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV_ROUTE = process.env.route; // 获取产品名
// 根据路由进行配置
let routePathRoot = config.build.assetsRoot;
let routePathSubDirectory = config.build.assetsSubDirectory;
let routeAssetsPublicPath = config.build.assetsPublicPath;
let routeEntry = `./src/products/${ENV_ROUTE.split('_')[0]}/${ENV_ROUTE.split('_')[1]}/main.js`;
let templatePath = "index.html";
let filename = config.build.index;

if (ENV_ROUTE) {
	if (ENV_ROUTE.indexOf('_') > -1) {
		let routeArr = ENV_ROUTE.split('_')
		routePathRoot = config[ENV_ROUTE].assetsRoot;
    routePathSubDirectory = config[ENV_ROUTE].assetsSubDirectory;
    routeAssetsPublicPath = config[ENV_ROUTE].assetsPublicPath;
    routeEntry = `./src/products/${routeArr[0]}/${routeArr[1]}/main.js`;
    templatePath = path.resolve(`./src/products/${routeArr[0]}/${routeArr[1]}/index.html`);
    filename = config[ENV_ROUTE].index;
	}
}

exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === "production" ? routePathSubDirectory : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};
exports.routePathRoot = routePathRoot;
exports.routePathSubDirectory = routePathSubDirectory;
exports.routeAssetsPublicPath = routeAssetsPublicPath;
exports.routeEntry = routeEntry;
exports.templatePath = templatePath;
exports.filename = filename;

//exports.assetsPath = function (_path) {
//var assetsSubDirectory = process.env.NODE_ENV !== 'development'
//  ? ''
//  : config.dev.assetsSubDirectory
//return path.posix.join(assetsSubDirectory, _path)
//}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV !== 'development',
      sourceMap: options.sourceMap,
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader, postcssLoader, 'sass-loader', {
      loader: 'sass-resources-loader',
      options: {
        // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
        resources: [path.resolve(__dirname, '../src/assets/css/base.scss')]
      }
    }]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
