<template>
  <div class="container">
    <div class="tips-logo">
      <i class="icon iconfont ask-logo">&#xe619;</i>
    </div>
    <div class="tips-words">
      <p>被保人需要转人工核保</p>
      <p>请联系您的保险规划师</p>
      <p>进行线下邮件核保。</p>
    </div>
    <div class="submit-button" @click="jumpBack">
      返回
    </div>
  </div>
</template>

<script>
import { saveConclusion } from '../../../apis/interlligent-underwriting-urls';

import isExpire from '../check-expire';

export default {
  data() {
    return {

    }
  },
  mounted() {
    isExpire(this);
    
    saveConclusion([], { scode: window.sessionStorage.getItem('health_serial') })
    .then(res => {
      if (!res.data.code) {

      } else {
        this.$vux.toast.show({
          text: res.data.message,
          type: 'text'
        });
      }
    })
    .catch(err => {
      console.log('err');
    });
  },
  methods: {
    jumpBack() {
      const product_type = window.sessionStorage.getItem('product_type');
      const scode = window.sessionStorage.getItem('scode');

      const routeName = `${product_type.split('.').splice(1,2).join('_').toLowerCase()}_detail`;

      this.$router.push({ name: routeName, query: { scode } });
    }
  }
}
</script>

<style scoped>
@import url(./underwriting-ask.css);
</style>

