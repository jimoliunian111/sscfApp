<template>
  <div class="main">
    <div class="content">
      <img src="../../../assets/image/order/card.gif" class="card" alt="">
      <p>您的订单已经提交</p>
      <div class="loading-box">
        <img src="../../../assets/image/order/loding.gif" class="loading" alt="">
      </div>

      <p class="color-orange">正在处理，请耐心等待</p>
    </div>
  </div>
</template>
<script>
import { queryOrder, getPayStatus } from '../../../utils/apis';
import STATES from '@/config/waiting-status-enum';
import wxShareFreeze from '@/utils/freezeShare';

export default {
  data() {
    return {
      order_sn: null,
      delay: 1000,
		  message: '', // 传到页面的提示
      overTime: 10, // 超时时间30秒
      step: 0 // 计时器，不超过30，不小于0
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
      if (this.step >= this.overTime) {
        console.log('超时了哦')
        this.$router.replace({
          name: 'order_timeOver',
          query: {
            order_sn: this.order_sn,
            type: this.$route.query.type || '',
            message: this.message,
            showMessage: true,
          },
        });
        // this.$router.replace({ name: 'order_timeOver', query: { order_sn: this.order_sn, type: this.$route.query.type || ''} });
        return
      }
      getPayStatus([], { order_sn: this.order_sn }).then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          console.log('qqweqeq', data)
          if (data.order_status === 2) {
            // this.message = res.data.data.proposal_err_reason || '成功'
            this.$router.replace({ name: 'pay_success', query: { order_sn: this.order_sn, type: this.$route.query.type || '' } });
          } else if (data.order_status === 1) {
						this.message = '支付超时'
            setTimeout(() => {
              this.step++
              this.confirmQuery();
            }, this.delay);
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
  }
}
</script>
<style scoped>
.card {
  width: 1.6rem;
  margin-left: 4.3rem;
  margin-top: 3rem;
  margin-bottom: 0.16rem;
}
.main p {
    font-family: PingFangSC-Bold,sans-serif;
    font-size: .426667rem;
    color: #333;
    line-height: 1;
    text-align: center;
    padding-bottom: .266667rem;
}
.loading-box {
  width: 6rem;
  margin: 0 auto;
  margin-bottom: .8rem;
}
.loading {
  width: 100%;
 /* margin-left: 2rem;
  margin-bottom: .8rem; */
}
.color-orange {
  color: #ff9900 !important;
}
</style>

<style scoped>
@import url(./pay-process.css);
</style>
