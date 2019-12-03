<template>
  <div class="main" v-if="isInit">
    <div class="notice">
      请在今天<span>23:59</span>之前完成支付，逾期订单会自动取消
    </div>
    <div class="info">
        <div class="info-item">
            <div class="info-item-title">订单号</div>
            <div class="info-item-content">{{ order_sn }}</div>
        </div>
        <div class="info-item">
            <div class="info-item-title">商品名称</div>
            <div class="info-item-content">{{ source.product_name }}</div>
        </div>
    </div>

    <!-- 支付方式选择 -->
    <!-- <div class="pay-way-box">
      <group>
        <radio :options="payWays" @on-change="change" :selected-label-style="{color: '#FF9900 !important'}" v-model="radioSelected">
          <template slot-scope="props" slot="each-item">
            <div class="radio-item-box">
              <div class="radio-icon-box"><img :src="props.icon" class="vux-radio-icon"></div>
              <div class="radio-title-box">{{ props.label }}</div>
            </div>
          </template>
        </radio>
      </group>
    </div> -->

    <a href="javascript:void(0);" v-if="!isPaying" class="pay-button" @click="pay">
      立即支付
    </a>
    <a href="javascript:void(0);" v-else class="pay-button waiting">
      立即支付
      <load-more class="result-loading"></load-more>
    </a>
    <template>
      <certificate-upload
      :isCertificateModalShow.sync="isCertificateModalShow"
      :isForSelf="true"
      :productId="product_id"
      v-model="formValue"
      @upload="certificateUpload"
      @close="certificateModalClose"></certificate-upload>
    </template>
  </div>
</template>

<script>
import { LoadMore, TransferDom, Popup, PopupPicker, Radio, Group } from 'vux';
import { payDetail, pay, getPayStatus } from '@/utils/apis'; // 支付相关接口方法
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';

import { standType, payType, proposalStatus } from './stand-enum';

import { getBankDistrict, getWapBank } from '@/utils/apis'; // 银行列表、银行地区接口方法
import { FetchUploadSftp } from '@/utils/apis'; // 统一命名后引用的方法
import wxShareFreeze from '@/utils/freezeShare';
import certificateUpload from '../components/certificate-upload/index.vue'
export default {
  directives: {
    TransferDom
  },
  components: {
    LoadMore,
    Popup,
    PopupPicker,
    Radio,
    Group,
    certificateUpload
  },
  data() {
    return {
      isInit: false,
      order_sn: null,
      source: {},
      regionLevel: null,
      regionTabs: ['请选择' , '请选择'],
      regionData: [,],
      regionList: [],
      regionName: '',
      selectPlaceShow: false,
      bankList: [],
      isPaying: false,
      // 新增
      payWays: [
        {
          icon: require('@/assets/image/wx_icon.png'),
          key: 3,
          value: '微信公众号'
        },
        {
          icon: require('@/assets/image/alipay.png'),
          key: 4,
          value: '支付宝'
        },
        // {
        //   icon: require('@/assets/image/qrcodePay.png'),
        //   key: 5,
        //   value: '微信二维码'
        // }
      ],
      radioSelected: 3,
      // 渤海所需
      isCertificateModalShow: false, // 加载上传组件
      applicantCertificate: { // 用装载上传模块组件回传的数据  投保人
        front: {},
        back: {}
      },
      formValue: {}, //JSON.parse(window.sessionStorage.getItem('uploadObj')).formValue,
      product_id: '' // JSON.parse(window.sessionStorage.getItem('uploadObj')).productId,

    }
  },
  watch: {
    // selectPlaceShow(v) {
    //   this.shouldBodyFreeze(v);
    // }
  },
  created () {
    this.order_sn = this.$route.query.order_sn;
  },
  mounted () {
    this.getPayDetail();
    wxShareFreeze();
  },
  methods: {
    // 身份证上传
    certificateUpload (v) { // 点击完成调用
      console.log('身份上传模块回传数据', v)
      this.applicantCertificate.front = v.applicant.front.file_id;
      this.applicantCertificate.back = v.applicant.back.file_id;
      this.tellThirdUploaded()
    },
    tellThirdUploaded () {
      this.$vux.loading.show({
        text: '上传中'
      });
      let params = {
        order_sn: this.order_sn,
        applicant_front_file_id: this.applicantCertificate.front,
        applicant_back_file_id: this.applicantCertificate.back
      }
      FetchUploadSftp([], params).then(res => {
        console.log('告知第三方请求成功', res)
        this.$vux.loading.hide();
        if (res.data.code === 0) {
          this.isPaying = false
          console.log('sasaasasas', res.data)
          this.certificateModalClose()
        } else {
          this.$vux.toast.show({
            text: res.data.message || '操作失败',
            type: 'text'
          });
          this.isPaying = false
          return
        }
      }).catch(res => {
        console.log('告知第三方请求失败', res)
        this.$vux.toast.show({
          text: res.data.message || '操作失败',
          type: 'text'
        });
        this.isPaying = false
      })
    },
    certificateModalClose () {
      this.isCertificateModalShow = false;
    },
    change (val, label) { // 监听支付方式变化
      console.log('change', val, label)
      this.radioSelected = val
    },
    bankChange () {
      console.log('银行变化', this.source.account_bank.default)
    },
    getBankList () { // 获取银行列表
      const data = {
        product_id: this.product_id
      }
      getWapBank([], data).then(res => {
        this.bankList = res.data.data;
      }).catch(err => {
        console.log(err)
      });
    },
    getPayDetail() { // 获取订单信息
      payDetail([], { order_sn: this.order_sn }).then(res => {
        console.log('获取订单信息', res.data.data)
        this.source = res.data.data;
        this.product_id = this.source.product_id;
        this.getBankList();
        this.isInit = true;
      }).catch(err => {
        console.log('订单信息获取失败', err)
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    showUpload () { // 请求接口判断是否显示
      // this.$vux.toast.show({
      //   text: '保费（保费*缴费期限）累计超过20万， 需要上传本人证件',
      //   type: 'text'
      // });
      this.isCertificateModalShow = true
    },
    goWxPay () {
      let payType = 'wxPayH5'
      if (this.radioSelected === 4) {
        payType = 'aliPay'
        console.log('aliPay')
        window.location.href = process.env.HEALTH_HOST + '/common/pay/bridge' + `?order_sn=${this.order_sn}&pay_channel=${this.radioSelected}&payType=${payType}`
        // window.location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/#/pay/alipay?order_sn=' + this.order_sn + '&pay_channel=' + this.radioSelected
        // this.$router.push({name: 'pay_alipay', query: {order_sn: this.order_sn, pay_channel: this.radioSelected}})
      } else {
        if (this.radioSelected === 5) {
          payType = 'qrcode'
        } else if (this.radioSelected === 3) {
          payType = 'wxPayH5'
        }
        window.sessionStorage.setItem('payLoad', true)
			  window.location.href = process.env.HEALTH_HOST + '/common/pay/bridge' + `?order_sn=${this.order_sn}&pay_channel=${this.radioSelected}&payType=${payType}`
      }
      // window.sessionStorage.setItem('payLoad', true)
      // this.$router.push({
      //   name: 'pay_wxpay',
      //   query: {
      //     order_sn: this.order_sn,
      //     pay_channel: this.radioSelected,
      //     // params: obj,
      //     payType: payType
      //   }
      // })

      // window.sessionStorage.setItem('payLoad', true)
      // let str = location.protocol + '//' + location.hostname + (location.port ? `:${location.port}` : '')
      // let url = `${str}/vue/#/pay/wxpay?order_sn=${this.order_sn}&pay_channel=${this.radioSelected}&payType=${payType}`
      // window.location.href = url

      // let params = {
			//   url: payUrl,
			// }
			// let url = this.seturl(process.env.HEALTH_HOST + '/bohai/pay/bridge', params)
   //    console.log('----------url-------', url)
			// window.location.href = payUrl
    },
		seturl (path, obj) {
		  return path + '?' + Object.entries(obj).map(item => item.join('=')).join('&')
		},
    pay () {
      // this.showUpload() // 测试代码， 记得删除
      // return // 测试代码， 记得删除
      this.isPaying = true;
      const data = {
        order_sn: this.order_sn,
        pay_channel: this.radioSelected
      };
      pay([], data).then(res => {
        if (res.data.code === 400001) {
          this.$vux.toast.show({
            text: res.data.message || '操作失败',
            type: 'text'
          });
          let that = this
          setTimeout(() => {
            that.showUpload()
          }, 2000)
          this.isPaying = false
          return
        }
        if (res.data.code === 400002) {
          this.$vux.toast.show({
            text: res.data.message || '操作失败',
            type: 'text'
          });
          this.isPaying = false
          return
        }
        if (res.data.code !== 0) {
          this.$vux.toast.show({
            text: res.data.message || '操作失败',
            type: 'text'
          });
          this.isPaying = false
          return
        }
        if (res.data.code === 0) {
          this.isPaying = false
          console.log('sasaasasas', res.data)
          this.goWxPay()
        }
      })
    }
    // rolling () {
    //   getPayStatus([], { order_sn: this.order_sn }).then(res => {
    //     const status = res.data.data.proposal_status;
    //     if (status == proposalStatus.PENDING || status == proposalStatus.PAID) { // 如果在处理中  则每秒钟在请求一次状态
    //       setTimeout(() => {
    //         this.rolling();
    //       }, 1000);
    //     } else if (status == proposalStatus.DONE) { // 交易成功， 跳转订单成功页面
    //       this.$router.push({
    //         name: 'order_success',
    //         query: { order_sn: this.order_sn, type: 'damai' }
    //       });
    //     } else if (status == proposalStatus.PAY_FAILED || status == proposalStatus.CONFIRM_FAILED) { // 交易失败， 跳转订单失败页面
    //       this.$router.push({ name: 'order_fail', query: { message: res.data.data.proposal_err_reason } });
    //     }
    //   }).catch(err => {
    //     this.$vux.toast.show({
    //       text: err,
    //       type: 'text'
    //     });
    //     this.isPaying = false;
    //   });
    // },
    // pay () { // 支付方法
    //   const idCard = this.source.debit_card_number.default;
    //   if (this.radioSelected === 2) {
    //     if (!idCard) {
    //       this.$vux.toast.show({
    //         text: '请填写银行卡号',
    //         type: 'text'
    //       })
    //       return
    //     }
    //   }
    //   this.isPaying = true;
    //   const data = {
    //     order_sn: this.order_sn,
    //     pay_channel: this.radioSelected,
    //     debit_card_number: this.source.debit_card_number.default,
    //     account_bank_code: this.source.account_bank.default.code,
    //     account_name: this.source.account_name.default
    //   };
    //   pay([], data).then(res => {
    //     if (res.data.code !== 0) {
    //       this.$vux.toast.show({
    //         text: res.data.message,
    //         type: 'text'
    //       });
    //       this.isPaying = false
    //       return
    //     }
    //     if (this.radioSelected === 1) {
    //       console.log('666666666', res)
    //       if (res.data.data.errorCode === '0000') {
    //         window.location.href = res.data.data.payUrl
    //       } else {
    //         this.$vux.toast.show({
    //           text: res.data.data.message,
    //           type: 'text'
    //         });
    //         this.isPaying = false;
    //       }
    //     } else {
    //       if (res.data.data.errorCode === '0000') {
    //         let status = res.data.data.status;
    //         if (+status === standType.success) {
    //           this.$router.push({
    //             name: 'order_success',
    //             query: { order_sn: this.order_sn, type: 'damai' }
    //           });
    //         } else if (status == standType.fail) {
    //           this.$router.push({ name: 'order_fail', query: { message: res.data.data.message } });
    //         } else if (status == standType.dealing) {
    //           // 等待中
    //           this.rolling();
    //         }
    //       } else {
    //         this.$vux.toast.show({
    //           text: res.data.data.message,
    //           type: 'text'
    //         });
    //         this.isPaying = false;
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     this.$vux.toast.show({
    //       text: err,
    //       type: 'text'
    //     });
    //   });
    // }
  }
}
</script>

<style>
html, body {
  background-color: #f5f5f5 !important;
}
</style>

<style scoped>
@import url(./check-stand.css);
.radio-item-box {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.radio-icon-box {
  width: 0.66rem;
  margin-right: 0.4rem;
}
.radio-icon-box img {
  width: 100%;
}
.radio-title-box {
  flex: 1;
}
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  color: #ff9900 !important;
}
</style>
