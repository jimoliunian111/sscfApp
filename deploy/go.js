// 此文件定义要跑的项目
console.log('you run JavaScript now is file name of "go"')
require('shelljs/global');

const readline = require('readline');
const fs = require('fs');

function readFile(product, runtime, fileStr = './package.json') {
  var data = fs.readFileSync(fileStr);
  return writeFile(product, runtime, JSON.parse(data.toString()), fileStr)
}
function writeFile(product, runtime, data, fileStr) {
  data.scripts.dev = `cross-env NODE_ENV=${runtime} route=${product} node build/dev-server.js`
  fs.writeFileSync(fileStr, JSON.stringify(data, null, 2));
  console.log(product + '运行命令设置成功')
}
function setConf (product, runtime) {
  readFile(product, runtime)
  exec("npm run dev");
}


const product = require('./serveConf.js')

setConf(product.name, product.runtime)
