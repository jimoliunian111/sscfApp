<template>
  <div class="main">
    <img v-if="$route.query.type === 'damai'" src="../../../assets/image/order/applicant-success.png" />
    <img v-else src="../../../assets/image/order/pay-success.jpg" />
    <div class="payment-info">
      <div class="payment-success-info">
        <div class="payment-success-info-title">订单信息</div>
        <div class="payment-success-info-item clearfloat"><span class="fl">支付单号</span><span class="fr">{{ source.pay_sn }}</span></div>
        <div class="payment-success-info-item clearfloat" v-if="source.policy_sn"><span class="fl">保单号</span><span
            class="fr">{{ source.policy_sn }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">投保人</span><span class="fr">{{ source.policy_holder }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">被保人</span><span class="fr">{{ source.recognizee_policy }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">保障期限</span><span class="fr">{{ source.guarantee_period }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">保障额度</span><span class="fr">{{ source.guarantee_quota }}</span></div>
        <template v-if="$route.query.type === 'damai'">
          <div class="payment-success-info-item clearfloat"><span class="fl">缴费期限</span><span class="fr">{{ source.payment_period_str }}</span></div>
        </template>
        <div class="payment-success-info-item clearfloat"><span class="fl">起保日期</span><span class="fr">{{ source.guarantee_time }}</span></div>
        <div class="payment-success-info-item clearfloat" v-if="source.guarantee_period !== '终身'"><span class="fl">终保日期</span><span
            class="fr">{{ source.final_guarantee_time }}</span></div>
        <div class="payment-success-info-item clearfloat" v-if="source.risk"><span class="fl">附加险</span><span class="fr">{{ source.risk }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">订单金额：</span><span class="fr color-orange">{{ source.premium }}元</span></div>

        <div class="online-return" v-if="showOnline">
          <x-button type="primary" style="border-radius:99px;" @click.native="showReturnDialog">在线回访</x-button>
        </div>
      </div>
    </div>
    <div class="qrcode-thumb"><img src="../../../assets/image/order/qrcode.png" /></div>
    <div class="warm-prompt">
      <div class="warm-prompt-title">温馨提示</div>
      <p class="warm-prompt-content">如有疑问，请咨询客服热线<span class="color-orange">400-188-8810</span>（工作日9:00-18:00，节假日除外），我们会有专业顾问为您1对1解惑</p>
    </div>
    <div class="fail-popup" @touchmove.prevent :class="{ hide: isModalHide }" @click="closeModal">
        <div>
            <h3>您已投保成功</h3>
            <h4>可立即完成在线回访</h4>
            <div class="online-return-btn" @click="showReturnDialog">在线回访</div>
            <img class="popup-close" src="../../../assets/image/order/close-icon.png" />
        </div>
    </div>
  </div>
</template>
<script>
  import {
    orderSuccess,
    visit
  } from '../../../utils/apis';
  import wxShareFreeze from '@/utils/freezeShare';
  import {
    XButton
  } from 'vux'

  export default {
    data() {
      return {
        source: {},
        showOnline: true,
        isModalHide: false
      }
    },
    components: {
      XButton
    },
    methods: {
      showReturnDialog () {
        console.log('点击回访按钮')
        this.isModalHide = true;
        this.$router.push({name: 'online_back', query: {order_sn: this.$route.query.order_sn}})
      },
      closeModal(e) {
        if (e.target === document.querySelector('.fail-popup') || e.target === document.querySelector('.popup-close')) {
          this.isModalHide = true;
        }
      }
    },
    created() {
      wxShareFreeze();

      const order_sn = this.$route.query.order_sn;
      //   this.source = query;
      orderSuccess([], {
          order_sn
        })
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;

            // 处理额外险显示
            // is_main 为主险表识，如果为1，则跳过
            // 1 豁免 2 重疾 3 轻症 4 全额
            const risk_result = data.risks;
            let riskResult;

            let riskResultArray = risk_result.filter(i => i.is_main === 0 && (i.type === 1 || i.type === 3))
              .map(y => y.type);

            if (riskResultArray.length === 2) riskResult = '轻症及豁免';

            if (riskResultArray.length === 1 &&
              riskResultArray[0] === 1) riskResult = '投保人豁免';

            if (riskResultArray.length === 1 &&
              riskResultArray[0] === 3) riskResult = '轻症';

            if (!riskResultArray.length) riskResult = '';

            this.source = {
              pay_sn: data.payment.pay_sn,
              policy_sn: data.policy_sn,
              policy_holder: data.policy_holder.name,
              recognizee_policy: data.recognizee_policy.name,
              guarantee_period: data.insurance_plan.guarantee_period,
              guarantee_quota: data.insurance_plan.guarantee_quota,
              guarantee_time: data.insurance_plan.guarantee_time,
              payment_period_str: data.insurance_plan.payment_period_str,
              final_guarantee_time: data.insurance_plan.final_guarantee_time,
              risk: riskResult,
              premium: data.premium
            }
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text'
            });
          }
        })
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (to.query.type && to.query.type === 'damai') {
          vm.showOnline = true
        } else {
          vm.showOnline = false
        }
      })
    }
  }
</script>

<style scoped>
  @import url(./order-success.css);

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
</style>
