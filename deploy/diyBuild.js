// 此文件用于打包产品, 单个或全部等, 单个支持环境变量,全部打包不支持环境更改, 仅支持生产环境
require('shelljs/global');

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

let runtimeStr = 'production' // 打包环境

rl.question('请输入打包编码，如： production/huagui_damai  ', (keyStr) => {
  setConf(keyStr.split('/')[1], keyStr.split('/')[0])
});

function readFile(product, runtime, fileStr = './package.json') {
  var data = fs.readFileSync(fileStr);
  return writeFile(product, runtime, JSON.parse(data.toString()), fileStr)
  //	return JSON.parse(data.toString())
}
function writeFile(product, runtime, data, fileStr) {
  data.scripts.build = `cross-env NODE_ENV=${runtime} env_config=prod route=${product} node build/build.js`
  fs.writeFileSync(fileStr, JSON.stringify(data, null, 2));
  console.log(product + '运行命令设置成功')
}
function setConf (product, runtime) {
  readFile(product, runtime)
  exec("npm run build");
  rl.close();
}
