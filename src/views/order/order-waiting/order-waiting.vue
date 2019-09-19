<template>
  <div class="main">
    <div class="content">
      <img src="../../../assets/image/order/card.gif" class="card" alt="">
      <p>支付成功，正在处理中</p>
      <img src="../../../assets/image/order/loding.gif" class="loading" alt="">
      <p class="color-orange">马上为您返回投保结果</p>
      <p class="color-orange">请勿退出</p>
    </div>
  </div>
</template>
<script>
import { queryOrder } from '../../../utils/apis';
import STATES from '@/config/waiting-status-enum';
import wxShareFreeze from '@/utils/freezeShare';

export default {
  data() {
    return {
      order_sn: null,
      delay: 500
    }
  },
  created() {
    this.order_sn = this.$route.query.order_sn;
  },
  mounted () {
    this.confirmQuery();
    wxShareFreeze();
  },
  methods: {
    confirmQuery() {
      queryOrder([], { order_sn: this.order_sn })
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          if (data.order_status === STATES.WAITING) {
            setTimeout(() => {
              this.confirmQuery();
            }, this.delay);
          } else if (data.order_status === STATES.PAYED && !data.policy_sn) {
            setTimeout(() => {
              this.confirmQuery();
            }, this.delay);
          } else if (data.order_status === STATES.PAYED && data.policy_sn) {
            this.$router.replace({ name: 'order_success', query: { order_sn: this.order_sn } });
          } else if (data.order_status === STATES.CLOSED) {
            this.$router.replace({ name: 'order_close' });
          }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: '接口出错',
          type: 'text'
        });
      });
    }
  }
}
</script>
<style scoped>
.card {
  width: 1.6rem;
  margin-left: 4.3rem;
  margin-top: 3rem;
}
.main p {
    font-family: PingFangSC-Bold,sans-serif;
    font-size: .426667rem;
    color: #333;
    line-height: 1;
    text-align: center;
    padding-bottom: .266667rem;
}
.loading {
  width: 6rem;
  margin-left: 2rem;
  margin-bottom: .8rem;
}
.color-orange {
  color: #ff9900 !important;
}
</style>

<style scoped>
@import url(./order-waiting.css);
</style>


