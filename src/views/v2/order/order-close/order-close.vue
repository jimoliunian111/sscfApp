<template>
  <div class="main">
      <div class="status fail">
          <div>
              <img class="status-fail-icon" src="../../../../assets/image/order/fail-icon.png" />
              <p class="status-text">订单关闭</p>
          </div>
      </div>
      <div class="payment-info">
          <div class="payment-fail-info">
              <div>
                  <h3 class="payment-fail-info-title">您的订单已超时关闭，请重新投保</h3>
                  <div class="payment-fail-info-button"
                       @click="returnDetail">返回详情页</div>
              </div>
          </div>
      </div>
      <div class="warm-prompt fail">
          <div class="warm-prompt-title">温馨提示</div>
          <p class="warm-prompt-content">如有疑问，请咨询客服热线<span class="color-orange">400-188-8810</span>（工作日9:00-18:00，节假日除外），我们会有专业顾问为您1对1解惑</p>
      </div>
  </div>
</template>
<script>
import wxShareFreeze from '@/utils/freezeShare';
export default {
  data() {
    return {
      screenHeight: ''
    }
  },
  mounted() {
    wxShareFreeze();
    this.screenHeight = screen.height;
  },
  methods: {
    returnDetail() {
      const scode = window.sessionStorage.getItem('scode');
      this.$router.push({ name: 'sinosig_wddg_detail', query: { scode } });
    }
  }
}
</script>

<style scoped>
@import url('./order-close.css');
</style>


