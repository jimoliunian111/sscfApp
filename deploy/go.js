// 此文件定义要跑的项目
console.log('you run JavaScript now is file name of "go"')
require('shelljs/global');

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question('请输入运行的产品名，如huagui_damai  ', (answer) => {
  if (answer.length === 0 || answer === '' || answer === undefined) {
    console.log(`产品名不能为空`);
    rl.close();
    return
  }
  rl.question('请输入运行的环境，如development  ', (runtime) => {
    if (runtime.length === 0 || runtime === '' || runtime === undefined) {
      console.log(`环境不能为空`);
      rl.close();
      return
    }
    setConf(answer, runtime)
    rl.close();
  });
});

function readFile(product, runtime, fileStr = './package.json') {
  var data = fs.readFileSync(fileStr);
  return writeFile(product, runtime, JSON.parse(data.toString()), fileStr)
  //	return JSON.parse(data.toString())
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
