const fs = require('fs');
var path = require('path')

function getAllDirs(mypath = './src/products') {
  const items = fs.readdirSync(mypath);
  let result = [];
  items.map(item => { // 遍历当前目录中所有的文件和文件夹
    let temp = path.join(mypath, item);
    // 若当前的为文件夹
    if(fs.statSync(temp).isDirectory()) {
      result.push(item); // 存储当前文件夹的名字
      // result = result.concat( getAllDirs( temp ) ); // 进入下一级文件夹访问
    }
  });
  return setProductsArr(result, mypath)
  //  return result;
}

function setProductsArr(arr, mypath = './src/products') {
  let productsConf = []
  arr.map(company => { // 遍历传进来的数组，即products目录下的公司名数组
    const products = fs.readdirSync(mypath + '/' + company); // 获取每个公司名下的所有产品名数组
    products.map(product => { // 遍历每个公司名下的所有产品名
      let temp = path.join(mypath + '/' + company, product); // 由公司名加产品名组成新的地址字符串
      if(fs.statSync(temp).isDirectory()) { // 判断由公司名加产品名组成新的地址字符串是否是文件夹
        let str = company + '_' + product
        productsConf.push(str)
      } else {
        console.log('目录结构不正确')
      }
    })
  })
  return readFile(productsConf)
  //	return productsConf;
}

function readFile(confs, fileStr = './package.json') {
  var data = fs.readFileSync(fileStr);
  return writeFile(confs, JSON.parse(data.toString()), fileStr)
  //	return JSON.parse(data.toString())
}

function writeFile(arr, data, fileStr) {
  let obj = {}
  obj['build:all'] = arr.map(item => 'npm run build:' + item).join(' & ')
  arr.map(item => {
    obj['build:' + item] = 'cross-env NODE_ENV=production env_config=prod route=' + item + ' node build/build.js'
  })
  let fixation = {
    "dev": "node build/dev-server.js",
    "dev:beta": "cross-env NODE_ENV=beta node build/dev-server.js",
    "build:beta": "cross-env NODE_ENV=beta node build/build.js",
    "build:dev": "cross-env NODE_ENV=development node build/build.js",
    "beta": "node build/beta.js",
    "deploy:beta": "sh ./beta-build.sh",
    "deploy": "sh ./build.sh",
    "start": "npm run dev",
    "initConf": "node deploy/initPackage",
    "build": "node build/build.js",
  }
  data.scripts = {
    ...fixation,
    ...obj
  }
  fs.writeFileSync(fileStr, JSON.stringify(data, null, 2));
  console.log('package.json文件设置成功')
}
getAllDirs()

//const ora = require('ora');
//const spinner = ora('building for production...');
//spinner.start();

require('shelljs/global');

const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question('请输入打包产品名，如huagui_damai  ', (answer) => {
  console.log(`正在打包中...：${answer}`);
  exec("npm run build:" + answer);
  rl.close();
});
