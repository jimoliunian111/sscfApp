<template>
  <div class="main">
    <p class="pay-title-style">订单号:{{order_sn}}</p>
    <div id="gopay" v-html="payHtml" style="display: none;"></div>
  </div>
</template>

<script>
import { getPayUrl } from '@/apis'; // 支付相关接口方法
import ap from '@/views/pay/alipay/ap.js'

export default {
  data() {
    return {
      isInit: false,
      order_sn: null,
      pay_channel: null,
      payType: null,
      payHtml: '',
      source: {},
      isPaying: false,
      args: {}
    }
  },
  created () {
    this.order_sn = this.$route.query.order_sn;
    this.pay_channel = this.$route.query.pay_channel
    this.payType = this.$route.query.pay_type
    this.init()
  },
  mounted() {
    // this.init();
  },
  methods: {
    formatForm (data) {
      var innerHtml = `<form id='alipaysubmit' name='alipaysubmit' action='${data.pay_url}' method='POST'>`
      Object.keys(data.sign_data).map(item => {
        innerHtml += `<input type='hidden' name='${item}' value='${data.sign_data[item]}'/>`
      })
      innerHtml += "<input type='submit' value='ok' style='display:none;'></form>"
      return innerHtml
    },
    aliPay (param) {
      if (/(micromessenger)/i.test(navigator.userAgent)) {
        var _ap = ap()
        document.getElementById('gopay').innerHTML = param
        var queryParam = ''
        Array.prototype.slice.call(document.querySelectorAll('input[type=hidden]')).forEach(function (ele) {
          queryParam += '&' + ele.name + '=' + encodeURIComponent(ele.value)
        })
        var gotoUrl = document.querySelector('#alipaysubmit').getAttribute('action') + queryParam
        window.sessionStorage.setItem('ali_order_sn', this.order_sn)
        _ap.b.pay(gotoUrl)
      } else {
        document.getElementById('gopay').innerHTML = param
        document.getElementById('alipaysubmit').submit()
      }
    },
    init() {
      this.$vux.loading.show({
        text: '请稍后'
      });
      // let terminal = ''
      // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS  
      //   terminal = 2
      // } else {  //pc  
      //   terminal = 1
      // };
      const params = {
        order_sn: this.order_sn,
        pay_channel: this.pay_channel,
        canPay: true,
        // terminal: terminal
      };
      getPayUrl(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          // this.args = res.data
          // this.chooseWay()
          var payStr = this.formatForm(res.data)
          this.$vux.loading.hide();
          this.aliPay(payStr)
        } else {
          this.$vux.toast.show({
            text: res.message,
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
  @import url(./alipay.css);

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
