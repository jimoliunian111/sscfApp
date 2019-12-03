<template>
  <div class="main">
    <img src="../../../assets/image/order/pay-success.jpg" />
    <div class="payment-info">
      <div class="payment-success-info">
        <div class="payment-success-info-title">
          <p>尊敬的客户，恭喜您已完成支付！</p>
          <p>请耐心等待保险公司的承保，如承保成功，保险公司将会发送短信告知您，请注意短信。订单信息如下</p>
        </div>
        <div class="payment-success-info-item clearfloat"><span class="fl">支付单号</span><span class="fr">{{ source.pay_sn }}</span></div>
        <div class="payment-success-info-item clearfloat"><span class="fl">投保人</span><span class="fr">{{ source.policy_holder }}</span></div>
        <div class="payment-success-info-item clearfloat" v-for="(item, idx) in source.recognizee_policy_many" :key="idx"><span class="fl">被保人 {{ source.recognizee_policy_many.length > 1 ? idx + 1 : '' }}</span><span class="fr">{{ item.name }}</span></div>
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
      </div>
      <div class="online-return">
        <x-button type="primary" style="border-radius:99px;" @click.native="toGoSomeWhere">{{buttonText}}</x-button>
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
      toGoSomeWhere () {
        if (this.orderSuccessStatus == 0) {
          return
        } else if (this.orderSuccessStatus == 1) {
          this.$router.replace({ name: 'order_success', query: { order_sn: this.order_sn, type: this.$route.query.type, from_pay: true} });
        } else if (this.orderSuccessStatus == 2) {
          this.$router.replace({ 
            name: 'order_timeOver',
            query: {
              order_sn: this.order_sn,
              type: this.$route.query.type || '',
              message: this.message,
              showMessage: true
            } 
          });
        }
      },
      setText () {
        if (this.orderSuccessStatus == 0) {
          if (this.buttonText.indexOf('...') >= 0) {
            this.buttonText = this.buttonText.replace('...', '')
          } else {
            this.buttonText += '.'
          }
          setTimeout(() => {
            this.setText()
          }, 800)
        }
      },
      confirmQuery() {
        if (this.step >= this.overTime) {
          // console.log('超时了哦')
          // this.$router.replace({
          //   name: 'order_timeOver',
          //   query: {
          //     order_sn: this.order_sn,
          //     type: this.$route.query.type || '',
          //     message: this.message,
          //     showMessage: true,
          //   },
          // });
          // this.$router.replace({ name: 'order_timeOver', query: { order_sn: this.order_sn, type: this.$route.query.type || ''} });
          this.orderSuccessStatus = 2
          this.buttonText = '承保超时'
          this.toGoSomeWhere()
          return
        }
        getPayStatus([], { order_sn: this.order_sn }).then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            console.log('qqweqeq', data)
            if (data.proposal_status === 3) {
              this.message = res.data.data.proposal_err_reason || '成功'
              this.orderSuccessStatus = 1
              this.buttonText = '查看承保信息'
              // this.$router.replace({ name: 'pay_success', query: { order_sn: this.order_sn, type: this.$route.query.type || '' } });
            } else if (data.proposal_status === 1) {
              this.message = res.data.data.proposal_err_reason
              setTimeout(() => {
                this.step++
                this.confirmQuery();
              }, this.delay);
            } else {
              this.message = res.data.data.proposal_err_reason
              this.orderSuccessStatus = 2
              this.buttonText = '承保异常'
              this.toGoSomeWhere()
            }
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text'
            });
          }
        }).catch(err => {
          this.$vux.toast.show({
            text: '接口出错',
            type: 'text'
          });
        });
      }
    },
    created() {
      this.setText()
      wxShareFreeze();
      this.order_sn = this.$route.query.order_sn
      const order_sn = this.$route.query.order_sn;
      //   this.source = query;
      orderSuccess([], {
          order_sn
        })
        .then(res => {
          if (res.data.code === 0) {
            setTimeout(() => {
              this.confirmQuery()
            }, 3000)
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
              recognizee_policy_many: data.recognizee_policy_many,
              risk: riskResult,
              premium: data.total_premium
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
      })
    }
  }
</script>

<style scoped>
  @import url(./pay-success.css);

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
</style>
