<template>
  <div class="main">
    <p class="pay-title-style">订单号:{{order_sn}}</p>
  </div>
</template>

<script>
import { pay, getWxConfig } from '@/utils/apis'; // 支付相关接口方法

export default {
  data() {
    return {
      isInit: false,
      order_sn: null,
      pay_channel: null,
      payType: null,
      source: {},
      isPaying: false,
      args: {}
    }
  },
  created () {
		if (window.sessionStorage.getItem('payLoad')) {
			window.sessionStorage.removeItem('payLoad')
			window.location.reload()
      return
		}
    this.order_sn = this.$route.query.order_sn;
    this.pay_channel = this.$route.query.pay_channel
    this.payType = this.$route.query.pay_type || 'wxPayH5' // 微信支付 wxPayH5， 二维码支付 qrcode
    this.wxInit()
  },
  mounted() {
    this.init();
  },
  methods: {
    // 一、请求接口配置cogfig， 详情页面已经初始化， 这里不做初始化
    // 二、判断支付方式payType，'qrcode'的话是二维码， 其余都是直接支付
    wxInit () {
      getWxConfig().then(res => {
        console.log('微信支付初始化请求', res)
        res.data.data.jsApiList.push('chooseWXPay') // 测试代码 记得删除
        wx.config(res.data.data);
      })
    },
    wxPayFunc (args) {
      let that = this
      wx.ready(function() {
        that.$vux.loading.hide();
        wx.chooseWXPay({
          timestamp: args.timeStamp,
          nonceStr: args.nonceStr,
          package: args.package,
          signType: args.signType,
          paySign: args.paySign,
          success: function(res) {
            console.log('微信支付唤起成功', res)
            that.$router.replace({
              name: 'pay_process',
              query: {
                order_sn: that.order_sn
              }
            })
          },
          cancel: function(res) {
            alert('已取消支付');
            that.$vux.loading.hide();
          },
          fail: function(res) {
            console.log('微信支付唤起失败', res)
            alert('购买失败，请重新创建订单' + JSON.stringify(res))
            that.$vux.loading.hide();
          }
        });
      });
    },
    qrCodeFunc (args) {

    },
    chooseWay () { // 判断使用支付方式
      if (this.payType === 'wxPayH5') {
        // 唤起微信支付
        this.wxPayFunc(this.args)
      } else {
        // 生成二维码
        this.qrCodeFunc(this.args)
      }
    },
    init() {
      this.$vux.loading.show({
        text: '请稍后'
      });
      const params = {
        order_sn: this.order_sn,
        pay_channel: this.pay_channel,
        canPay: true
      };
      pay([], params).then(res => {
        console.log('66666666666666', res.data)
        if (res.data.code === 0) {
          this.args = res.data.data
          this.chooseWay()
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      }).catch(res => {
        this.$vux.toast.show({
          text: res.data.message || '系统故障',
          type: 'text'
        });
      })
    }
  }
}
</script>

<style>
  html,
  body {
    background-color: #f5f5f5 !important;
  }
</style>

<style scoped>
  @import url(./wxPay.css);

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

  .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
    color: #ff9900 !important;
  }

  .pay-title-style {
    width: 100%;
    margin-top: 0.6rem;
    text-align: center;
    font-size: 0.43rem;
    color: #333;
  }
</style>
