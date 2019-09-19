<template>
  <div class="main">
      <img src="../../../../assets/image/order/pay-success.jpg" />
      <div class="payment-info">
          <div class="payment-success-info">
              <div class="payment-success-info-title">订单信息</div>
              <div class="payment-success-info-item clearfloat"><span class="fl">支付单号</span><span class="fr">{{ source.pay_sn }}</span></div>
              <div class="payment-success-info-item clearfloat" v-if="source.policy_sn"><span class="fl">保单号</span><span class="fr">{{ source.policy_sn }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">投保人</span><span class="fr">{{ source.policy_holder }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">被保人</span><span class="fr">{{ source.recognizee_policy }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">保障期限</span><span class="fr">{{ source.guarantee_period }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">保障额度</span><span class="fr">{{ source.guarantee_quota }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">起保日期</span><span class="fr">{{ source.guarantee_time }}</span></div>
              <div class="payment-success-info-item clearfloat" v-if="source.guarantee_period !== '终身'"><span class="fl">终保日期</span><span class="fr">{{ source.final_guarantee_time }}</span></div>
              <div class="payment-success-info-item clearfloat" v-for="(item, index) in source.riskList" :key="item"><span class="fl" v-if="index == 0">附加险</span><span class="fr">{{ item }}</span></div>
              <div class="payment-success-info-item clearfloat"><span class="fl">订单金额：</span><span class="fr color-orange">{{ source.premium }}元</span></div>
          </div>
      </div>
      <div class="qrcode-thumb"><img src="../../../../assets/image/order/qrcode.png" /></div>
      <div class="warm-prompt">
          <div class="warm-prompt-title">温馨提示</div>
          <p class="warm-prompt-content">如有疑问，请咨询客服热线<span class="color-orange">400-188-8810</span>（工作日9:00-18:00，节假日除外），我们会有专业顾问为您1对1解惑</p>
      </div>
  </div>
</template>
<script>
import { orderSuccess } from '@/apis';
import wxShareFreeze from '@/utils/freezeShare';

export default {
  data() {
    return {
        source: {}
    }
  },
  created() {
    wxShareFreeze();
    
    const order_sn = this.$route.query.order_sn;
    //   this.source = query;
    orderSuccess({ order_sn }).then(res => {
      const data = res.data;

      // 处理额外险显示
      // is_main 为主险表识，如果为1，则跳过
      // 1 豁免 2 重疾 3 轻症 4 全额
      const risk_result = data.risks;
      // let riskResult;
      let riskList = []
      
      // let riskResultArray = risk_result.filter(i => i.is_main === 0 && (i.type === 1 || i.type === 3))
      //                             .map(y => y.type);

      // if (riskResultArray.length === 2) riskResult = '轻症及豁免';

      // if (riskResultArray.length === 1 
      //     && riskResultArray[0] === 1) riskResult = '投保人豁免';

      // if (riskResultArray.length === 1
      //     && riskResultArray[0] === 3) riskResult = '轻症';

      // if (!riskResultArray.length) riskResult = '';
      
      risk_result.map(item => {
        if (item.is_main === 0) {
          riskList = riskList.concat(item.add_risk_name_desc)
        }
      })
      console.log(riskList)
      this.source = {
        pay_sn: data.payment.pay_sn,
        policy_sn: data.policy_sn,
        policy_holder: data.policy_holder.name,
        recognizee_policy: data.recognizee_policy.name,
        guarantee_period: data.insurance_plan.guarantee_period,
        guarantee_quota: data.insurance_plan.guarantee_quota,
        guarantee_time: data.insurance_plan.guarantee_time,
        final_guarantee_time: data.insurance_plan.final_guarantee_time,
        // risk: riskResult,
        premium: data.premium,
        riskList: riskList
      }
    }).catch(res => {
      this.$vux.toast.show({
        text: res.data.message,
        type: 'text'
      });
    })
  }
}
</script>

<style scoped>
@import url(./order-success.css);
</style>


