<template>
  <div>
    <div class="main">
        <img src="../../../assets/image/order/pay-fail.jpg" />
        <div class="payment-info">
            <div class="payment-fail-info">
                <div>
                    <h3 class="payment-fail-info-title">请联系您的专属保险顾问</h3>
                    <a class="payment-fail-info-call" href="tel:4001888810">联系我的顾问</a>
                </div>
            </div>
        </div>
        <div class="warm-prompt fail">
            <div class="warm-prompt-title">温馨提示</div>
            <p class="warm-prompt-content">如有疑问，请咨询客服热线<span class="color-orange">400-188-8810</span>（工作日9:00-18:00，节假日除外），我们会有专业顾问为您1对1解惑</p>
        </div>
    </div>
    <div class="fail-popup" :class="{ hide: isModalHide }" @click="closeModal">
        <div>
            <h3>支付失败</h3>
            <h4>{{ failMessage }}</h4>
            <a href="tel:4001888810">联系我的顾问</a>
            <img class="popup-close" src="../../../assets/image/order/close-icon.png" />
        </div>
    </div>
  </div>
</template>
<script>
import wxShareFreeze from '@/utils/freezeShare';
export default {
  data() {
    return {
      isModalHide: false,
      failMessage: ''
    }
  },
  mounted() {
    wxShareFreeze();
    this.failMessage = this.$route.query.message || '请联系您的专属保险顾问';
  },
  methods: {
    closeModal(e) {
      if (e.target === document.querySelector('.fail-popup')
          || e.target === document.querySelector('.popup-close')) {
        this.isModalHide = true;
      }
      
    }
  }
}
</script>

<style>
.hide {
  display: none;
}
</style>

<style scoped>
@import url(./order-fail.css);
</style>


