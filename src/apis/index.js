import Vue from 'vue'
const env = process.env

// 静态数据
// 妈咪保贝 保障权益 这个是有用的 勿删
export function momGetInviolable (params) {
  return Vue.http.get('/../../static/mom_and_baby/inviolable-content.json?version=' + env.VERSION, params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 康乐2019 保障权益 这个是有用的 勿删
export function kangleGetInviolable (params) {
  return Vue.http.get('/../../static/kangle2019/inviolable-content.json?version=' + env.VERSION, params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}
// 静态数据完毕
// 获取配置信息 get '/api/v2/product/configure' '../../static/mom_and_baby/inviolable-content.json'
export function getConfigure (params) {
  return Vue.http.get('/api/v2/insurance/product/configure', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 问答 /api/v1/insurance/product/faq/list
export function getFaqList (params) {
  return Vue.http.get('/api/v1/insurance/product/faq/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取详情页信息 get /api/v2/product/distribution/detail '../../static/details.json'
export function getDetails (params) {
  return Vue.http.get('/api/v2/insurance/product/distribution/detail', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}
// 计算保费 post api/v2/product/premium/calculate ../../static/calculate.json
export function getCalc (params) {
  return Vue.http.post('/api/v2/insurance/product/premium/calculate', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}
// 详情页修改信息 post api/v2/product/attributes ../../static/getAttribute.json
export function getAttribute (params) {
  console.log(params)
  return Vue.http.post('/api/v2/insurance/product/attributes', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 现金价值表 get /api/v2/product/cash-value/list ../../static/cash-value.json
export function getCashList (params) {
  return Vue.http.get('/api/v2/insurance/product/cash-value/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 分享信息 post api/v2/product/distribution/detail/forward/agent ../../static/forward-agent.json
export function forwardAgent (params) {
  return Vue.http.post('/api/v2/insurance/product/distribution/detail/forward/agent', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 投保页
// 投保协议列表 get /api/v2/product/agreement/list ../../static/forward-agent.json
export function getAgreement (params) {
  return Vue.http.get('/api/v2/insurance/product/agreement/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 投保初始化 post  /api/v2/product/distribution/insure/attributes ../../static/insure-attr.json
export function getInsureAttribute (params) {
  return Vue.http.post('/api/v2/insurance/product/distribution/insure/attributes', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 银行列表  /api/v2/product/bank/list ../../static/forward-agent.json
export function getBank (params) {
  return Vue.http.get('/api/v2/insurance/product/bank/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 投保页校验信息 post /api/v2/insurance/order/distribution/store/validate ../../static/validate.json
export function validate (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/store/validate', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 投保页转发 post /api/v2/product/distribution/insure/forward/agent ../../static/validate.json
export function insureForward (params) {
  return Vue.http.post('/api/v2/insurance/product/distribution/insure/forward/agent', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 身份证信息识别  /api/v2/product/id/card/recognize ../../static/validate.json
export function recognize (params) {
  return Vue.http.post('/api/v2/insurance/product/id/card/recognize', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 选择地址  /api/v1/product/district/list ../../static/region-city.json
export function getPlace (params) {
  return Vue.http.get('/api/v2/insurance/product/district/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}


// 以下为微信端专享接口

// 获取微信分享  /api/v2/wechat/jssdk/config
export function getWxConfig (params) {
  return Vue.http.get('/api/v2/wechat/jssdk/config', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 下单  /api/v2/product/district/list 
export function store (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/store', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 发送验证码 /v1/insurance/product/distribution/insure/renew/mobile/captcha
export function getCode (params) {
  return Vue.http.post('/api/v2/insurance/product/distribution/insure/renew/mobile/captcha', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取职业列表 /api/v2/insurance/product/profession/list
export function getVocation (params) {
  return Vue.http.get('/api/v1/insurance/product/profession/list', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 职业查询 /api/v1/product/distribution/detail/forward/user
export function searchProfession (params) {
  return Vue.http.post('/api/v1/insurance/product/profession/search-name', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}


// 获取待支付订单详情 /v1/insurance/product/distribution/insure/renew/mobile/captcha
export function getOrderDetail (params) {
  return Vue.http.get('/api/v2/insurance/order/distribution/cashier-desk/attributes', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取支付链接 /v1/insurance/product/distribution/insure/renew/mobile/captcha
export function getPayUrl (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/pay', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 检查订单状态 /api/v1/insurance/order/distribution/info
export function queryOrder (params) {
  return Vue.http.get('/api/v2/insurance/order/distribution/info', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取订单信息 /api/v1/insurance/order/distribution/simple-info
export function orderSuccess (params) {
  return Vue.http.get('/api/v2/insurance/order/distribution/simple-info', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 我也不知道什么接口 /api/v1/insurance/product/faq/detail 
export function getFaq (params) {
  return Vue.http.get('/api/v1/insurance/product/faq/detail', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取分享链接 /api/v1/product/distribution/user/share/link
export function getPrevShareLink (params) {
  return Vue.http.get('/api/v1/product/distribution/user/share/link', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 分享回调 /api/v1/product/distribution/detail/forward/user
export function forward (params) {
  return Vue.http.post('/api/v1/product/distribution/detail/forward/user', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 第三方智能核保 api/v1/insurance/health/third-party/situation/list
export function healthSituation (params) {
  return Vue.http.post('/api/v1/insurance/health/third-party/situation/list', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 健康告知页面 /api/v2/insurance/product/health-inform-result
export function getHealthData (params) {
  return Vue.http.get('/api/v2/insurance/product/health-inform-result', { params }, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}
// 职业
export function getApplicantVocation(params) {
  return Vue.http.post('/api/v1/insurance/product/applicant/profession/list', params, { emulateJSON: true }).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 订单详情 /api/v1/insurance/order/distribution/detail
export function getOrderInfo (params) {
  return Vue.http.get('/api/v1/insurance/order/distribution/detail', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 回访确认 /api/v1/insurance/order/distribution/visit
export function visit (params) {
  return Vue.http.post('/api/v1/insurance/order/distribution/visit', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function getBankDistrict (params) {
  return Vue.http.get('/api/v1/insurance/product/bank/district/list',  { params }, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 问答全部 /api/v1/insurance/product/faq/all
export function getFaqAll (params) {
  return Vue.http.get('/api/v2/insurance/product/faq/all', {params}, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 上传图片
export function getFilePath (params) {
  return Vue.http.get(env.UPLOADDOMAIN + '/api/files/path', { params }, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 上传图片
export function getUploadImg (params) {
  return Vue.http.post(env.UPLOADDOMAIN + '/api/files/upload', params).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 上传图片
export function uploadOcrFile (params) {
  return Vue.http.post('/api/v1/insurance/order/distribution/upload-ocr-files', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 获取服务器时间
export function getTimeNow (params) {
  return Vue.http.get('/common/time/now',  { params }, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 平安健康 验证短信 签约 /api/v2/insurance/order/distribution/verify-sms
export function verifySms (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/verify-sms', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 平安健康 快捷签约 获取短信 /api/v2/insurance/order/distribution/get-fast-contract-sms
export function getFastContractSms (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/get-fast-contract-sms', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 平安健康 查询是否签约 /api/v2/insurance/order/distribution/query-contract
export function queryContract (params) {
  return Vue.http.post('/api/v2/insurance/order/distribution/query-contract', params, {emulateJSON: true}).then(res => {
    if (typeof res.data === 'object') {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}