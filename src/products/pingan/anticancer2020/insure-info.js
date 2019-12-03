import { calcAge } from '@/utils/common-utils';
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';
import wxShareFreeze from '@/utils/freezeShare';
import { isEmpty, isBeneficiaryPass } from './insure-info/verify-config.js';
import validatePlaceholders from '@/config/placeholderLib.js';

// 测试数据
import pageConf from './insure-info/pageConf.json'
// 组件集合
import namesModule from '@/widgets/names-module/names-module.vue'
import papersTypeModule from '@/widgets/v2/papers-type-module.vue'
import papersNumModule from '@/widgets/v2/papers-num-module.vue'
import birthdayModule from '@/widgets/v2/birthday-module.vue'
import sexModule from '@/widgets/v2/sex-module.vue'
import mobileNumModule from '@/widgets/mobile-num-module/mobile-num-module.vue'
import onlyReadModule from '@/widgets/only-read-module/only-read-module.vue'
import regionModule from './components/region-module/region-module.vue';
import startTimeModule from '@/widgets/start-time-module/start-time-module.vue'
import failureModule from '@/widgets/v2/failure-module/failure-module.vue'
import endTimeModule from '@/widgets/end-time-module/end-time-module.vue'
import addressModule from '@/widgets/address-module/address-module.vue'
import insureCheckWidget from './components/check-widget/index.vue'
import inputModule from '@/widgets/input-module/input-module.vue'
import emailWidget from '@/widgets/email-widget/email-widget.vue'
import vocationModule from './components/vocation-module/vocation-module'

// 接口集合

import { FetchInsureData, FetchCalc, FetchBank, FetchAgreement, FetchRecognize, FetchValidate, FetchStore } from '@/utils/apis';

const emailSuffix = ['@qq.com', '@sina.com', '@163.com', '@139.com', '@126.com'];
const requestParams = ['insured_birthday', 'guarantee_period', 'payment_period_value', 'payment_period_unit',
  'guarantee_quota',
  'insured_gender', 'applicant_immunity',
  'applicant_gender', 'applicant_birthday', 'applicant_personal_address_area', 'applicant_personal_address_city',
  'applicant_personal_address_province', 'scode'
];
const beneficiaryPlaceholders = {
  relation: {
    name: '请选择受益人关系',
    isValidate: true
  },
  name: {
    name: '请输入受益人姓名',
    isValidate: true
  },
  certificate_number: {
    name: '请输入证件号码',
    isValidate: true
  },
  birthday: {
    name: '请输入生日',
    isValidate: true
  },
  certificate_valid_start_at: {
    name: '请选择起效时间',
    isValidate: true
  },
  certificate_valid_end_at: {
    name: '请选择失效时间',
    isValidate: true
  },
  benefit_percent: {
    name: '请选择比例',
    isValidate: true
  },
  current: {
    name: '序号',
    isValidate: true
  }
};

export const insureInfo = {
  data () {
    return {
      // 公共数据
      saveValidatePlaceholders: validatePlaceholders,
      validatePlaceholders,
      emailSuffix,
      // 通用数据
      prevParamsSave: {},
      amount: '',
      source: {},
      formValue: {},
      prevParamsSave: {},
      channel_product_id: null,
      product_id: null,
      scode: null,
      beneficiaryPlaceholdersArray: [],
      isInit: false,
      order_sn: null,
      // 渤海数据
      dataObj: pageConf,
      insured_relation: {},
      vocationShow: false,
      beneficiary_relation: [],
      regionShow: false,
      regionType: 'applicant',
      isCaptchaSand: false,
      isCaptchaLock: false,
      captchaSecond: '',
      captcha: ''
    }
  },
  components: {
    regionModule,
    namesModule,
    papersTypeModule,
    papersNumModule,
    birthdayModule,
    sexModule,
    mobileNumModule,
    onlyReadModule,
    startTimeModule,
    failureModule,
    endTimeModule,
    addressModule,
    insureCheckWidget,
    inputModule,
    emailWidget,
    vocationModule
  },
  methods: {
    calcAge,
    resizeControl() {
      (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
        ~e.target.className.indexOf('debit-card-input') && e.target.scrollIntoView(false);
      }, true);

    },
    showRegionModule (str) {
      this.regionType = str
      this.regionShow = true
    },
    // ----------------职业模块----------------
    chooseProfression () {
      console.log('点击了职业模块')
      this.vocationShow = true
    },
    getProfession (arr, str, name) {
      console.log('获取职业信息', arr, str, name)
      this.formValue.applicant.profession.default = arr[2]
    },
    getProfessionItem (item, str) {
      console.log('点击获取职业信息', item, str)
      this.formValue.applicant.profession.default = item
    },
    storeLocalData () { // 缓存页面填写信息 // 存储的内容加上时间戳  一小时3600秒
      this.addLocalData(this.totalFormData(), this.scode)
    },
    relationFunc (val, str) {
      console.log('关系数据', val, str)
      this.formValue.insured.relation.default = val.value
      if (this.formValue.insured.relation.default === 1) {
      	this.formValue.insured = this.deepObjectMerge(this.formValue.insured, this.formValue.applicant) // 深度合并
      }
      this.relationChange(str, val.value)
      this.fetchCalc();
    },
    initData () {
      this.setShare()
      this.getAgree()
    },
    setShare () {
      let prevParamsSave = {};
      requestParams.forEach(item => {
        prevParamsSave[item] = window.sessionStorage.getItem(item);
      });
      this.channel_product_id = window.sessionStorage.getItem('channel_product_id');
      this.product_id = window.sessionStorage.getItem('product_id');
      this.scode = window.sessionStorage.getItem('scode');
      this.prevParamsSave = prevParamsSave;
    },
    getAgree () {
      FetchAgreement([], {
        product_id: JSON.parse(window.sessionStorage.getItem('formValue')).product_id,
        insured_birthday: JSON.parse(window.sessionStorage.getItem('formValue')).insured.birthday
      }).then(res => {
        this.agreements = res.data.data;
      }).catch(err => console.log(err));
    },
		dateChange(type) {
		  // if (type === 'insured_birthday' || type === 'applicant_birthday') {
		  //   this.fetchCalc();
		  //   this.validatePost(type);
		  // } else {
		  //   this.validatePost(type);
		  // }
		  this.validatePost(type);
		},
    change_failure_time_type (value, str) {
      if (this.calcAge(this.formValue[str].birthday.default) < 46) return
      console.log('失效时期导出数据', value, str)
      if (this.formValue.insured.relation.default !== 1) {
        if (str === 'insured') {
          console.log('6666======', value, str)
          this.formValue[str].certificate.is_long_term.default = value
        } else {
          return
        }
      }
      if (this.formValue.insured.relation.default === 1) {
        console.log('66666666', value, str)
        this.formValue[str].certificate.is_long_term.default = value
      }
    },
    // ------------------收益人模块*开始-----------------------------
    beneficiaryRelationFunc (val, str) {
      this.formValue.beneficiary.default[+str].relation = val.value
      this.beneficiary_relation[+str].checked.value = val.value
    },
    // 受益人身份证校验
    beneficiaryRecognize(value, index) {
      if (!value) return;
      this.formValue.beneficiary.default[index].certificate.number = this.formValue.beneficiary.default[index].certificate.number.toLocaleUpperCase()
      const data = {
        number: value.toLocaleUpperCase()
      };

      FetchRecognize([], data).then(res => {
        const data = res.data.data;
        if (data.number) {
          this.beneficiaryPlaceholdersArray[index].certificate_number.name = data.number[0];
          this.beneficiaryPlaceholdersArray[index].certificate_number.isValidate = false;

          this.beneficiaryPlaceholdersArray[index].isCertificatePass = false;

          this.$vux.toast.show({
            text: data.number[0],
            type: 'text'
          });
        } else {
          this.beneficiaryPlaceholdersArray[index].certificate_number.name = beneficiaryPlaceholders.certificate_number
            .name;
          this.beneficiaryPlaceholdersArray[index].certificate_number.isValidate = true;

          this.formValue.beneficiary.default[index].birthday = data.birthday;
          this.formValue.beneficiary.default[index].gender = data.gender;
          // 新增
          if (calcAge(data.birthday) >= 46) {
            this.formValue.beneficiary.default[index].certificate.is_long_term = 1
          } else {
            this.formValue.beneficiary.default[index].certificate.is_long_term = 0
          }
          this.storeLocalData()
          this.beneficiaryFormChange('certificate_number', value, index);
          this.beneficiaryPlaceholdersArray[index].isCertificatePass = true;
        }
      }).catch(err => console.log(err));
    },
    // 受益人校验单独控制
    beneficiaryFormChange (type, value, index) {
      if (!value) return;

      let params = {
        ...this.totalFormData(),
        product_id: this.product_id
      };

      FetchValidate([], params).then(res => {
        const data = res.data.data;
        if (res.data.code === 200004) {
          let arr = data.beneficiary_items
          let currentObj = arr.find(item => +item.current === index)
          const bf = currentObj[type];
          if (bf && bf.length) {
            this.beneficiaryPlaceholdersArray[index][type].name = bf[0];
            this.beneficiaryPlaceholdersArray[index][type].isValidate = false;
            this.$vux.toast.show({
              text: bf[0] || '数据格式错误',
              type: 'text'
            });
          } else {
            this.beneficiaryPlaceholdersArray[index][type].name = beneficiaryPlaceholders[type].name;
            this.beneficiaryPlaceholdersArray[index][type].isValidate = beneficiaryPlaceholders[type].isValidate;
          }
        }
      })
    },
    changeBeneficiaryCertificateType(value, index) { //  受益人证件类型
      console.log('555555', value, index)
      this.formValue.beneficiary.default[index].certificate.type = value;
    },
    // 比例转为比例options
    percentFromat(percent) {
      let data = [];

      for (let i = percent; i >= 10; i = i - 10) {
        data.push({
          label: `${i}%`,
          value: i
        });
      }

      return data;
    },
    percentChange (idx) {
      console.log('6666666', idx, this.formValue.beneficiary.default[idx])
      if (this.formValue.beneficiary.default[idx].benefit_percent === 100) {
        let objActive = this.formValue.beneficiary.default[idx]
        let beneficiaryActive = this.beneficiaryPlaceholdersArray[idx]
        this.formValue.beneficiary.default = [];
        this.beneficiaryPlaceholdersArray = [];
        this.formValue.beneficiary.default.push(objActive);
        this.beneficiaryPlaceholdersArray.push(beneficiaryActive);
      }
      this.storeLocalData()
    },
    addBeneficiary () { // 添加受益人按钮
      let active = this.formValue.beneficiary.certificate.type.default
      let activeObj = this.formValue.beneficiary.certificate.type.items.find((item => item.value === active))
      let date = new Date(new Date().getTime() + 24*60*60*1000)
      let year = date.getFullYear()
      let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}`.slice(-2) : date.getMonth() + 1
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      let defaultRelation = this.formValue.beneficiary.relation.items[0].value
      let beneficiaryItem = {
        current: this.formValue.beneficiary.default.length,
        benefit_percent: 0,
        birthday: '',
        certificate: {
          number: '',
          type: 1,
          is_long_term: 1,
          valid_end_at: '',
          valid_start_at: '',
          valid_start_at_max: `${year}-${month}-${day}`,
          valid_end_at_min: activeObj.valid_end_at.min,
          valid_end_at_max: activeObj.valid_end_at.max
        },
        gender: 1,
        relation: defaultRelation || '',
        name: ''
      }
      this.formValue.beneficiary.default.push(beneficiaryItem);
      let obj = {
        checked: {
          value: defaultRelation || ''
        },
        list: this.formValue.beneficiary.relation.items
      }
      this.beneficiary_relation.push(obj)

      this.beneficiaryPlaceholdersArray.push(JSON.parse(JSON.stringify(beneficiaryPlaceholders)));
    },
    changeBeneficiaryEndTimeType(val, index) {
      this.formValue.beneficiary.default[index].certificate.is_long_term = val
    },
    beneficiaryRemove(index) { // 删除受益人按钮
      let self = this;
      console.log('aaaaaaaaaaaaaaaa', index, this.formValue)
      if (this.formValue.beneficiary.default.length === 1) {
        this.$vux.confirm.show({
          title: '提示',
          content: '是否重置受益人',
          onConfirm(msg) {
            self.formValue.beneficiary.default = [];
            self.beneficiaryPlaceholdersArray = [];
            self.addBeneficiary()
          }
        });
        return
      }
      this.$vux.confirm.show({
        title: '提示',
        content: '是否删除该受益人',
        onConfirm(msg) {
          self.formValue.beneficiary.default.splice(index, 1);
          self.beneficiaryPlaceholdersArray.splice(index, 1);
        }
      });
    },
    changeBeneficiary (type) {
      this.formValue.beneficiary.type.default = type;

      if (type === 1) {
        this.formValue.beneficiary.default = [];
        this.beneficiaryPlaceholdersArray = [];
      } else {
        this.formValue.beneficiary.default = [];
        this.beneficiaryPlaceholdersArray = [];
        this.addBeneficiary()
      }
    },
    // ------------------收益人模块*结束-----------------------------
    getBankList(params = {}) {
      const data = {
        product_id: this.product_id,
        ...params
      }
      FetchBank([], data).then(res => {
        this.bankList = res.data.data;
      }).catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      })
    },
    relationChange(type, value) {
      if (!value) return;
      // this.fetchCalc();
      if (this.formValue.insured.relation.default != 1 && this.formValue.insured.certificate.number.default) {
        this.recognize('insured_certificate_number', this.formValue.insured.certificate.number.default)
      }
      this.validatePost(type);
    },
    insure () { // 投保方法
      // if (!isEmpty(this.totalFormData())) {
      //   return
      // }
      // if (!isBeneficiaryPass(this.totalFormData())) {
      //   return
      // }
      // if (this.formValue.payment_period_value) {
      //   if ((+this.amount * this.formValue.payment_period_value) >= 200000) {
      //     this.$vux.toast.show({
      //       text: '单笔订单总保费(交费期间*首期保费)不能大于20万，请拆分保单投保',
      //       type: 'text'
      //     });
      //     return
      //   }
      // } else {
      //   let active = +this.formValue.insure_plan.payment_period.default.value
      //   if ((+this.amount * active) >= 200000) {
      //     this.$vux.toast.show({
      //       text: '单笔订单总保费(交费期间*首期保费)不能大于20万，请拆分保单投保',
      //       type: 'text'
      //     });
      //     return
      //   }
      // }
      if (!this.readed) {
        return this.$vux.toast.show({
          text: '请先勾选协议',
          type: 'text'
        })
      }

      this.isResultBack = false;

      if (this.formValue.insured.relation.default === 1) { // 深度合并
        this.formValue.insured = this.deepObjectMerge(this.formValue.insured, this.formValue.applicant)
      }
      const data = {
        ...this.totalFormData(),
        scode: this.scode
      }
      data.renewal_info.captcha = this.captcha
      FetchStore([], data).then(res => {
        const data = res.data;
        if (data.code === 0) {
          this.order_sn = data.data.order_sn;

          let uploadObj = { // 渤海特例， 上传证件所需参数
            isCertificateModalShow: this.isCertificateModalShow,
            isForSelf: true,
            productId: this.product_id,
            model: this.formValue
          }
          window.sessionStorage.setItem('uploadObj', JSON.stringify(uploadObj))

          this.$router.push({
            name: 'pingan_anticancer2020_checkstand',
            query: {
              order_sn: this.order_sn
            }
          });
        } else if (data.code === 200004) {
          Object.keys(data.data).map(item => {
            if (this.validatePlaceholders[item]) {

              // 特殊处理 为谁投保
              if (this.formValue.insured.relation.default) {
                this.$vux.toast.show({
                  text: data.data[item][0],
                  type: 'text'
                });
              }
              this.$vux.toast.show({
                text: data.data[Object.keys(data.data)[0]][0] || '投保失败',
                type: 'text'
              });
              // Object.keys(data.data[0][0])
              this.validatePlaceholders[item].name = data.data[item][0] || this.saveValidatePlaceholders[item].name;
              this.validatePlaceholders[item].isValidate = false;
            } else {
              console.log('rrrrrr', data.data[Object.keys(data.data)[0]][0])
              let idx = Object.keys(data.data[Object.keys(data.data)[0]][0])[0]
              this.$vux.toast.show({
                text: data.data[Object.keys(data.data)[0]][0][idx][0] || '投保失败',
                type: 'text'
              });
            }
          });
          if (data.data.beneficiary_items) {
            data.data.beneficiary_items.map((item, index) => {
              Object.keys(item).map(key => {
                this.beneficiaryPlaceholdersArray[item.current][key].name = item[key][0]
                this.beneficiaryPlaceholdersArray[item.current][key].isValidate = false
              })

              // Object.keys(data.data.beneficiary_items[index]).map(key => {
              //   this.beneficiaryPlaceholdersArray[index][key].name = data.data.beneficiary_items[index][key][0]
              //   this.beneficiaryPlaceholdersArray[index][key].isValidate = false;
              // })
            })
          }

          this.isResultBack = true;

          // this.$nextTick(() => {
          //   document.querySelector('.error').parentElement.scrollIntoView();
          // });
        } else if (data.code === 350004) {
          this.isCertificateModalShow = true;
          this.isResultBack = true;
        } else {
          this.$vux.toast.show({
            text: data.message,
            time: 3000,
            type: 'text'
          });
          this.isResultBack = true;
        }
      }).catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        })
        this.isResultBack = true;
      })
    },
    recognize(type, value) {
      // if (!value) return;

      const typeArray = type.split('_');
      const groupName = typeArray[0];

      if (!value) {
        this.formValue[groupName].certificate.number.default = '';
        this.formValue[groupName].birthday.default = '';
        this.formValue[groupName].gender.default = '';

        return;
      }

      this.formValue[groupName].certificate.number.default = this.formValue[groupName].certificate.number.default.toLocaleUpperCase()
      const data = {
        number: this.formValue[groupName].certificate.number.default.toLocaleUpperCase()
      }
      FetchRecognize([], data)
        .then(res => {
          console.log('sdsadas', res)
          if (res.data.code === 0) {
            if (type === 'insured_certificate_number' || this.formValue.insured.relation.default === 1) {
              this.compareDate(res.data.data.birthday)
            }
          }

          const data = res.data.data;
          if (data.number) {
            this.validatePlaceholders[type].name = data.number[0];
            this.validatePlaceholders[type].isValidate = false;
            // 被保人身份证判断联动
            if (type === 'insured_certificate_number') {
              this.isInsuredCertificatePass = false;
            } else {
              this.isApplicationCertificatePass = false;
            }
            this.$vux.toast.show({
              text: data.number[0],
              type: 'text'
            });
          } else {

            this.validatePlaceholders[type].name = validatePlaceholders[type].name;
            this.validatePlaceholders[type].isValidate = true;
            this.formValue[groupName].birthday.default = data.birthday;
            this.formValue[groupName].gender.default = data.gender;

            if (this.formValue.insured.relation.default === 1) {
              this.formValue.applicant.birthday.default = data.birthday
              this.formValue.insured.birthday.default = data.birthday

              this.formValue.applicant.gender.default = data.gender
              this.formValue.insured.gender.default = data.gender
            }
            this.validatePost(type);
            this.validatePost(`${groupName}_birthday`);
            this.validatePost(`${groupName}_gender`);

            this.formValue[groupName].certificate.valid_end_at.default = '';

            // 身份证改动后自动判断年龄从而自动选择证件失效时期类型
            if (calcAge(data.birthday) >= 46) {
              this.formValue[groupName].certificate.is_long_term.default = 1;
            } else {
              this.formValue[groupName].certificate.is_long_term.default = 0;
            }

            this.storeLocalData()
            this.fetchCalc();

            if (type === 'insured_certificate_number') {
              this.isInsuredCertificatePass = true;
            } else {
              this.isApplicationCertificatePass = true;
            }
          }
        })
    },
    validatePost (type) {
      if (this.formValue.insured.relation.default === 1) {
        this.formValue.insured.birthday.default = this.formValue.applicant.birthday.default
      }
      if (this.formValue.applicant.certificate.number.default) {
        this.formValue.applicant.certificate.number.default = this.formValue.applicant.certificate.number.default.toLocaleUpperCase()
      }

      this.canInsure = false
      let data = {
        ...this.totalFormData(),
        product_id: this.product_id
      };

      FetchValidate([], data).then(res => {
        if (res.data.code !== 0 && !res.data.data) {
          this.$vux.toast.show({
            text: res.data.message || '网络异常',
            type: 'text'
          });
          return
        }
        this.canInsure = true
        const data = res.data.data
        if (data && data[type] && data[type].length) {
          this.validatePlaceholders[type].name = data[type][0];
          this.validatePlaceholders[type].isValidate = false;
          this.$vux.toast.show({
            text: data[type][0],
            type: 'text'
          });
        } else {
          this.storeLocalData()
          this.validatePlaceholders[type].name = validatePlaceholders[type].name;
          this.validatePlaceholders[type].isValidate = true;
        }
      }).catch(err => {
        console.log('网络异常', err)
        this.canInsure = true
        this.$vux.toast.show({
          text: err.data.message || '网络异常',
          type: 'text'
        });
      })
    },
    specialMsg (str, data) { // 特殊处理关系提示
      if (data[str] && data[str].length > 0) {
        let that = this
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: '提示',
          content: data[str][0],
          showCancelButton: false,
          onConfirm: () => {
            console.log('222222222')
            that.$router.replace({
              name: 'pingan_anticancer2020_detail',
              query: {
                scode: that.scode
              }
            })
          }
        })
      }
    },
    paperNumFunc (str, value, extra) { // 身份证号组件方法
      let type = str.split('_')[0]
      if (this.formValue[type].certificate.type.default === 1) {
        this.recognize(str, value)
      } else {
        this.formChange(str, value)
      }
    },
    fetchCalc () {
      this.getFetchCalc(this.totalFormData())
    },
    getFetchCalc (params = {}) {
      this.amount = null;
      const {
        insured,
        insure_plan,
        applicant
      } = this.formValue;
      const data = {
        ...params
      }
      FetchCalc([], data)
        .then(res => {
          if (res.data.data) {
            this.amount = res.data.data.amount;
          } else {
            this.amount = '-- --';
          }
        })
        .catch(err => {
          this.amount = '-- --';
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        });
    },
    formChange (type, value) {
      if (!value) return;

      // 键盘顶起bug兼容
      (/iphone|ipod|ipad/i.test(navigator.appVersion)) &&
      type === 'renewal_info_account_bank' &&
        document.querySelector('.account-bank-select').scrollIntoView(false);


      this.validatePost(type);
    },
    getRegionModule (arr, name, str) {
      console.log('地址模块数据', arr, name, str)
      this.formValue[this.regionType].personal_address.province.default.id = arr[0].id
      this.formValue[this.regionType].personal_address.province.default.name = arr[0].name
      this.formValue[this.regionType].personal_address.city.default.id = arr[1].id
      this.formValue[this.regionType].personal_address.city.default.name = arr[1].name
      this.formValue[this.regionType].personal_address.area.default.id = arr[2].id
      this.formValue[this.regionType].personal_address.area.default.name = arr[2].name
    },
    shouldBodyFreeze(v) {

      if (v) {
        this.bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
        bindFreeze();
      } else {
        unbindFreeze();
        document.documentElement.scrollTop = this.bodyTop;
        document.body.scrollTop = this.bodyTop;
      }
    },
    onCancel() {
      this.isLeave = false;
      this.routerLeave(false);
    },
    onConfirm () {
      this.routerLeave();
      this.$nextTick(() => {
        this.$router.push({
          name: 'pingan_anticancer2020_detail',
          query: {
            scode: this.scode
          }
        });
      });
    },
    compareDate (str) {
      let todayInt = new Date(new Date().toLocaleDateString()).getTime() // 取当天零点时间
      let oneDay = 86400000 // 一天的时间戳
      let num = todayInt + oneDay // 明天时间戳
      let month = ('0' + (new Date(num).getMonth() + 1)).slice(-2) // 月
      let day = ('0' + (new Date(num).getDate())).slice(-2) // 日
      if (str.split('-')[1] == month && str.split('-')[2] == day) { // 对比
        let date = new Date() // 一下格式化日期以供显示
        let y = date.getFullYear()
        let m = ('0' + (date.getMonth() + 1)).slice(-2)
        let d = ('0' + date.getDate()).slice(-2)
        this.formValue.insure_plan.insure_start_at.default = `${y}-${m}-${d}`
      }
    },
    deepObjectMerge(FirstOBJ, SecondOBJ) { // 深度合并对象
      for (let key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ?
          this.deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key]
      }
      return FirstOBJ
    },
    fetchAttributes () {
      this.$vux.loading.show({
        text: '正在加载中'
      });
      const params = JSON.parse(window.sessionStorage.getItem('formValue'))

      const data = {
        scode: this.scode,
        ...params,
        qaId: this.$route.query.qaId || ''
      }

      FetchInsureData([], data).then(res => {
          console.log('aaaaa123', res)
          if (res.data.code !== 0) {
            this.$vux.loading.hide();
            let that = this
            this.$vux.confirm.show({
              // 组件除show外的属性
              title: '提示',
              content: (res.data.data && res.data.data[Object.keys(res.data.data)[0]][0]) || res.data.message || '核保信息异常',
              showCancelButton: false,
              onConfirm: () => {
                that.$router.replace({
                  name: 'pingan_anticancer2020_detail',
                  query: {
                    scode: that.scode
                  }
                })
              }
            })
            return
          } else if (res.data.code === 0) {
            this.formValue = res.data.data; // 正常代码
            this.isInit = true;
            this.fetchCalc();
            this.$vux.loading.hide();
            // 缓存功能总入口
            this.enterFunc(this.scode, data, true)
          }
        })
        .catch(err => {
          console.log('初始化失败', err)
          this.$vux.toast.show({
            text: err.data.message || '初始化失败',
            type: 'text'
          });
        });
    },
    localInsureData (params) {
      let totalParams = JSON.parse(window.sessionStorage.getItem('formValue'))
      // 单独处理不使用缓存的字段： 关系、职业
      if (totalParams.insured.relation === 1) { // 为本人投保时候， 投保人数据赋值给被保人
        params.insured = this.deepObjectMerge(params.insured, params.applicant)
        params.applicant.profession = params.insured.profession // 为本人投保时候， 投保人职业不可选， 故使用被保人职业赋值给投保人
      }

      params.insured.profession = totalParams.insured.profession
      params.insured.relation = totalParams.insured.relation
      FetchInsureData([], params).then(res => {
        if (res.data.code === 0) {
          this.formValue = res.data.data; // 正常代码
          this.isInit = true;
          this.fetchCalc();
          this.$vux.loading.hide();
        } else {
          this.$vux.loading.hide();
          let that = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            title: '提示',
            content: (res.data.data && res.data.data[Object.keys(res.data.data)[0]][0]) || res.data.message || '核保信息异常',
            showCancelButton: false,
            onConfirm: () => {
              that.$router.replace({
                name: 'pingan_anticancer2020_detail',
                query: {
                  scode: that.scode
                }
              })
            }
          })
          return
        }
      }).catch(res => {
        this.$vux.toast.show({
          text: res.data.message || '初始化失败',
          type: 'text'
        });
      })
    },
    letslazyload (contentp) {
        let regexp1 = new RegExp(/(\<img )([^>]*)(src=")([^"]*")([^>]*)(\>)/, 'g');
        contentp = contentp.replace(regexp1, function(match, p1, p2, p3, p4, p5, p6) {
            return p1 + p2 + 'data-src="' + p4 + p5 + p6;
        });
        return contentp;
    },
    showAgreement(type) {
      this.contentPopupShow = true;
      this.popupTitle = this.agreements[type].name;
      // this.popupContent = this.agreements[type].content;
      this.popupContent = this.letslazyload(this.agreements[type].content)

      this.$nextTick(() => {
        document.querySelector('.client-agreement-content').scrollTop = 0;
      });
    }
  },
  created () {
    wxShareFreeze();
    this.initData()
  },
  mounted() {
    this.validatePlaceholders = JSON.parse(JSON.stringify(this.saveValidatePlaceholders));
    // 获取页面属性
    this.fetchAttributes();
    // ios 底端键盘bug兼容
    this.resizeControl();
  },
  computed: {
    // 被保人地区
    cityBelone () {
      const address = this.formValue.insured.personal_address;
      const array = [address.province.default.name, address.city.default.name, address.area.default ? address.area.default
        .name : ''
      ];
      return array.filter(i => i).join('-');
    },
    // 是否显示增加受益人
    isAddBeneficiary () {
      if (this.benefitPercent === 100) return false;
      if (this.formValue.beneficiary.default.length >= 3) return false;
      return true;
    },
    // 受益人比例
    benefitPercent() {
      return this.formValue.beneficiary.default.reduce((prev, next) => (prev + +next.benefit_percent), 0);
    }
  },
  watch: {
    contentPopupShow(v) {
      this.shouldBodyFreeze(v);
    },
    isCertificateModalShow(v) {
      this.shouldBodyFreeze(v);
    }
  },
  // 如果页面跳转到详情页，则提示弹窗
  beforeRouteLeave(to, from, next) {
    this.isCertificateModalShow = false;
    if (to.name !== 'pingan_anticancer2020_detail') {
      next();
    } else {
      this.isLeave = true;
      this.routerLeave = next;
    }
  }
}
