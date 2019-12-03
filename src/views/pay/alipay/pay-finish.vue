<template>
  <div class="main">
    <img src="../../../assets/image/order/pay-success.jpg" />
    <div class="payment-info">
      <div class="payment-success-info">
        <div class="payment-success-info-title">
          <p>尊敬的客户，恭喜您已完成支付！</p>
          <p>请耐心等待保险公司的承保，如承保成功，保险公司将会发送短信告知您，请注意短信。如有疑问，请咨询您的服务顾问，谢谢。</p>
          <p>订单信息如下</p>
        </div>
        <div class="payment-success-info-item clearfloat"><span class="fl">保险</span><span class="fr">{{ $route.query.product_name }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">订单号</span><span class="fr">{{ $route.query.order_sn }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">金额</span><span class="fr">{{ $route.query.order_amount }}</span></div>
      </div>
    </div>
    
    <div class="qrcode-thumb"><img src="../../../assets/image/order/qrcode.png" /></div>
    <div class="warm-prompt">
      <div class="warm-prompt-title">温馨提示</div>
      <p class="warm-prompt-content">如有疑问，请咨询客服热线<span class="color-orange">400-188-8810</span>（工作日9:00-18:00，节假日除外），我们会有专业顾问为您1对1解惑</p>
    </div>
  </div>
</template>
<script>
  import {
    orderSuccess, getPayStatus
  } from '../../../utils/apis';
  import wxShareFreeze from '@/utils/freezeShare';
  import {
    XButton
  } from 'vux'

  export default {
    data() {
      return {
        source: {},
        order_sn: null,
        delay: 1000,
        message: '', // 传到页面的提示
        overTime: 60, // 超时时间30秒
        step: 0, // 计时器，不超过30，不小于0
        buttonText: '承保中',
        orderSuccessStatus: 0 // 0: 查询中 1: 成功 2: 超时
      }
    },
    components: {
      XButton
    },
    methods: {
      
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
      })
    }
  }
</script>

<style scoped>

  .weui-btn_primary {
    background: #ff9900;
    margin: 0.3rem 0;
  }

  .weui-btn_primary:not(.weui-btn_disabled):active {
    background: #ff9900;
  }

  .online-return {
    overflow: hidden;
  }
  .fail-popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .fail-popup>div {
    background: #fff;
    border-radius: .266667rem;
    text-align: center;
    color: #333;
    padding: .8rem 0 .48rem;
    width: 5.733333rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 5.4rem;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }

  .fail-popup>div>h3 {
    font-size: .48rem;
    font-family: PingFangSC-Bold, sans-serif;
    line-height: 1;
    padding-bottom: .36rem;
  }

  .fail-popup>div>h4 {
    font-size: .373333rem;
    line-height: 1;
    padding-bottom: .8rem;
  }

  .fail-popup>div>a, .fail-popup>div>.online-return-btn {
    width: 80%;
    height: 1.066667rem;
    line-height: 1.066667rem;
    background: url("../../../assets/image/order/call-bg.png") no-repeat;
    background-size: cover;
    display: block;
    text-align: center;
    color: #fff;
    font-size: .48rem;
    font-family: PingFangSC-Bold, sans-serif;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
  }

  .fail-popup>div>a:hover {
    text-decoration: none;
  }

  .fail-popup>div>a:before {
    content: '';
    width: .453333rem;
    height: .48rem;
    background: url("../../../assets/image/order/call-icon.png") no-repeat;
    background-size: cover;
    margin-right: .133333rem;
  }

  .fail-popup>div>.popup-close {
    width: .453333rem;
    height: .453333rem;
    position: absolute;
    right: -0.586667rem;
    top: -0.586667rem;
  }
  .hide {
    display: none;
  }
  html {
  height: 100%;
  background: #f5f5f5 !important; }
  html body {
    height: 100%; }

.main {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  height: 100%;
  background: #f5f5f5; 
  max-width: 640px;
  margin: 0 auto;
}

.payment-info > .payment-success-info {
  padding: 0 .573333rem 0 .386667rem;
  margin-bottom: .32rem;
  background: #fff; }
  .payment-info > .payment-success-info > .payment-success-info-title {
    font-size: .4rem;
    color: #333;
    line-height: 1;
    padding: .4rem 0;
    border-bottom: .026667rem solid #efefef; }
  .payment-info > .payment-success-info > .payment-success-info-item {
    /* height: .986667rem; */
    line-height: .986667rem;
    font-size: .373333rem;
    color: #999;
    border-bottom: .026667rem solid #efefef; }
    .payment-info > .payment-success-info > .payment-success-info-item > span:last-child {
      color: #333;
      word-break: break-all;
      max-width: 60%; }
    .payment-info > .payment-success-info > .payment-success-info-item:last-child {
      border-bottom: 0; }

.payment-info > .payment-fail-info {
  padding: 0 .32rem;
  margin-top: .32rem; }
  .payment-info > .payment-fail-info > div {
    background: #fff;
    border-radius: .266667rem;
    padding: 1.573333rem 0 .546667rem;
    text-align: center;
    width: 100%;
    -webkit-box-sizing: border-box;
            box-sizing: border-box; }
    .payment-info > .payment-fail-info > div > .payment-fail-info-title {
      font-size: .48rem;
      color: #333;
      line-height: 1;
      padding-bottom: .8rem; }
    .payment-info > .payment-fail-info > div > .payment-fail-info-call {
      width: 4.773333rem;
      height: 1.066667rem;
      line-height: 1.066667rem;
      background: url("../../../assets/image/order/call-bg.png") no-repeat;
      background-size: cover;
      display: block;
      text-align: center;
      color: #fff;
      font-size: .48rem;
      font-family: PingFangSC-Bold, sans-serif;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin: 0 auto; }
      .payment-info > .payment-fail-info > div > .payment-fail-info-call:hover {
        text-decoration: none; }
      .payment-info > .payment-fail-info > div > .payment-fail-info-call:before {
        content: '';
        width: .453333rem;
        height: .48rem;
        background: url("../../../assets/image/order/call-icon.png") no-repeat;
        background-size: cover;
        margin-right: .133333rem; }
    .payment-info > .payment-fail-info > div > .payment-fail-info-button {
      width: 4.773333rem;
      height: 1.066667rem;
      line-height: 1.066667rem;
      background: url("../../../assets/image/order/call-bg.png") no-repeat;
      background-size: cover;
      display: block;
      text-align: center;
      color: #fff;
      font-size: .48rem;
      font-family: PingFangSC-Bold, sans-serif;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin: 0 auto; }
      .payment-info > .payment-fail-info > div > .payment-fail-info-button:hover {
        text-decoration: none; }

.qrcode-thumb {
  width: 93.6%;
  margin: 0 auto 1.106667rem; }

.warm-prompt {
  padding: 0 .32rem .586667rem; }
  .warm-prompt.fail {
    position: absolute;
    left: 0;
    bottom: 1.333333rem;
    padding-bottom: 0; }
  .warm-prompt > .warm-prompt-title {
    text-align: center;
    font-size: .373333rem;
    color: #999;
    position: relative;
    line-height: 1; }
    .warm-prompt > .warm-prompt-title:before {
      content: '';
      width: 3.546667rem;
      height: .026667rem;
      background: #999;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
              transform: translateY(-50%);
      left: 0; }
    .warm-prompt > .warm-prompt-title:after {
      content: '';
      width: 3.546667rem;
      height: .026667rem;
      background: #999;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
              transform: translateY(-50%);
      right: 0; }
  .warm-prompt > p.warm-prompt-content {
    font-size: .373333rem;
    color: #333;
    margin-top: .373333rem;
    line-height: .506667rem; }

.PC .warm-prompt {
  max-width: 540px;
  left: 50%;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%); }

.fail-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); }
  .fail-popup > div {
    background: #fff;
    border-radius: .266667rem;
    text-align: center;
    color: #333;
    padding: .8rem 0 .48rem;
    width: 5.733333rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 5.4rem;
    -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0); }
    .fail-popup > div > h3 {
      font-size: .48rem;
      font-family: PingFangSC-Bold, sans-serif;
      line-height: 1;
      padding-bottom: .36rem; }
    .fail-popup > div > h4 {
      font-size: .373333rem;
      line-height: 1;
      padding-bottom: .8rem; }
    .fail-popup > div > a {
      width: 4.773333rem;
      height: 1.066667rem;
      line-height: 1.066667rem;
      background: url("../../../assets/image/order/call-bg.png") no-repeat;
      background-size: cover;
      display: block;
      text-align: center;
      color: #fff;
      font-size: .48rem;
      font-family: PingFangSC-Bold, sans-serif;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin: 0 auto; }
      .fail-popup > div > a:hover {
        text-decoration: none; }
      .fail-popup > div > a:before {
        content: '';
        width: .453333rem;
        height: .48rem;
        background: url("../../../assets/image/order/call-icon.png") no-repeat;
        background-size: cover;
        margin-right: .133333rem; }
    .fail-popup > div > .popup-close {
      width: .453333rem;
      height: .453333rem;
      position: absolute;
      right: -0.586667rem;
      top: -0.586667rem; }

.status {
  height: 4.52rem;
  width: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center; }
  .status.fail {
    background: #999; }
  .status .status-fail-icon {
    width: 5.453334rem;
    height: 1.92rem; }
  .status .status-text {
    font-size: .48rem;
    font-family: PingFangSC-Bold, sans-serif;
    color: #fff;
    line-height: 1;
    padding-top: .4rem;
    text-align: center;
    margin-left: -.186667rem; }
  .color-orange {
    color: #ff9000 !important;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }

</style>
