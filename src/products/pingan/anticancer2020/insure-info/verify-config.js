import Vue from 'vue'
const conf = {
  "applicant": {
    "name": "投保人姓名",
    "certificate": {
      "type": "投保人证件类型",
      "number": "投保人证件号码",
      "is_long_term": "投保人证件时效",
      "valid_end_at": "投保人证件失效时间",
      "valid_start_at": "投保人证件起效时间"
    },
    "birthday": "投保人出生日期",
    "gender": "投保人性别",
    "profession": {
      "id": "投保人职业信息",
      "code": "投保人职业信息",
      "name": "投保人职业信息"
    },
    "personal_address": {
      "province": "投保人所在省",
      "city": "投保人所在市",
      "area": "投保人所在地区",
      "detail": "投保人详细地址",
      "zip_code": "投保人邮编"
    },
    "email": "投保人电子邮箱",
    "mobile": "投保人手机号码"
  },
  "insured": {
    "relation": "被保人关系",
    "name": "被保人姓名",
    "certificate": {
      "type": "被保人证件类型",
      "number": "被保人证件号码",
      "is_long_term": "被保人证件时效",
      "valid_end_at": "被保人证件失效时间",
      "valid_start_at": "被保人证件起效时间"
    },
    "birthday": "被保人出生日期",
    "gender": "被保人性别",
    "profession": {
      "id": "被保人职业信息",
      "code": "被保人职业信息",
      "name": "被保人职业信息"
    },
    "mobile": "被保人手机号码",
    "personal_address": {
      "province": "被保人所在省",
      "city": "被保人所在市",
      "area": "被保人所在地区",
      "detail": "被保人详细地址",
      "zip_code": "被保人邮编"
    }
  },
  "renewal_info": {
    "account_name": "银行账户名",
    "id_card_number": "身份证号",
    "account_bank": "银行ID标识",
    "debit_card_number": "银行卡号",
    "account_bank_code": "银行编码",
    "account_bank_name": "银行名称"
  }
}

export function isBeneficiaryPass (totalFormData) {
  let obj = totalFormData.beneficiary
  let isPass = true
  if (obj.type === 2) {
    obj.items.map(item => {
      if (item.certificate.is_long_term === 1) { // 判断长期还是选择有效期，若是长期则删掉失效时间valid_end_at
        delete item.certificate.valid_end_at
      }
      let arr = Object.keys(item)
      arr.map(key => {
        if (item[key] === '') {
          Vue.$vux.toast.show({
            text: '请完善受益人信息',
            type: 'text'
          })
          return isPass = false
        }
        if (Object.prototype.toString.call(item[key]) === '[object Object]') {
          Object.keys(item[key]).map(child => {
            if (item[key][child] === '') {
              Vue.$vux.toast.show({
                text: '请完善受益人信息',
                type: 'text'
              })
              return isPass = false
            }
          })
        }
      })
    })
  }
  return isPass
}

export function isEmpty(totalFormData) { // 投保前检测为不为空
  let msg = conf
  let obj = totalFormData
  let isPass = true
  delete obj.insure_plan
  delete obj.beneficiary
  delete obj.renewal_info
  delete obj.insured.qaId
  // 如果是本人,删掉除职业以外的属性
  if (totalFormData.insured.relation === 1) {
    delete obj.insured.certificate
    delete obj.insured.name
    delete obj.insured.birthday
    delete obj.insured.gender
    delete obj.insured.mobile
    delete obj.insured.personal_address
    delete obj.insured.profession
  } else {
    // 选择指定时间  则删除 失效时间， 投保被保一样
    if (totalFormData.insured.certificate.is_long_term === 1) {
      delete obj.insured.certificate.valid_end_at
    }
  }
  if (totalFormData.applicant.certificate.is_long_term === 1) {
    delete obj.applicant.certificate.valid_end_at
  }
  let arr = Object.keys(obj)
  arr.map(item => {
    Object.keys(obj[item]).map(key => {
      if ((typeof obj[item][key] === 'string' || typeof obj[item][key] === 'number') && obj[item][key] === '') {
        Vue.$vux.toast.show({
          text: '请完善' + msg[item][key] + '信息',
          type: 'text'
        })
        return isPass = false
      } else if (Object.prototype.toString.call(obj[item][key]) === '[object Object]') {
        Object.keys(obj[item][key]).map(child => {
          if ((typeof obj[item][key][child] === 'string' || typeof obj[item][key][child] === 'number') &&
            obj[item][key][child] === '') {
            Vue.$vux.toast.show({
              text: '请完善' + msg[item][key][child] + '信息',
              type: 'text'
            })
            return isPass = false
          } else if (Object.prototype.toString.call(obj[item][key][child]) === '[object Object]') {
            Object.keys(obj[item][key][child]).map(last => {
              if ((typeof obj[item][key][child][last] === 'string' || typeof obj[item][key][child][last] ===
                  'number') && obj[item][key][child][last] === '') {
                Vue.$vux.toast.show({
                  text: '请完善' + msg[item][key][child][last] + '信息',
                  type: 'text'
                })
                return isPass = false
              }
            })
          }
        })
      }
    })
  })
  return isPass
}
