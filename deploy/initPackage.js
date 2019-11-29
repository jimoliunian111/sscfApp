const fs = require('fs');
require('shelljs/global');

const list = require('./build_list.js')

var data = JSON.parse((fs.readFileSync('./package.json')).toString());

function setConf () {
  let obj = {}
  obj['build:all'] = list.map(item => 'npm run build:' + item).join(' & ')
  list.map(item => {
    obj['build:' + item] = 'cross-env NODE_ENV=production' + ' env_config=prod route=' + item + ' node build/build.js'
  })
  let fixation = {
    "dev": "node build/dev-server.js",
    "go": "node deploy/go",
    "build:diy": "node deploy/diyBuild",
    "build:beta": "cross-env NODE_ENV=beta node build/build.js",
    "deploy:beta": "sh ./beta-build.sh",
    "deploy": "sh ./build.sh",
    "initConf": "node deploy/initPackage",
  }
  data.scripts = {
    ...fixation,
    ...obj
  }
  fs.writeFileSync('./package.json', JSON.stringify(data, null, 2));
  console.log('package.json文件设置成功')
  exec("npm run build:all")
}
setConf()
