<template>
  <div class="container">
    <div class="tips-logo">
      <i class="icon iconfont fail-logo">&#xe61a;</i>
    </div>
    <div class="tips-words">
      抱歉，您暂不符合投保要求 不能通过智能核保。
    </div>
    <div class="submit-button" @click="jumpBack">
      核保失败，请点击确认
    </div>
  </div>
</template>

<script>
import { saveConclusion, refuseConclusion } from '../../../apis/interlligent-underwriting-urls';

import isExpire from '../check-expire';

export default {
  data() {
    return {

    }
  },
  mounted() {
    isExpire(this);

    setTimeout(() => {
      if (this.$route.query.from === 'refuseConclusion') {
        this.refuseConclusion();
      } else {
        this.saveConclusion();
      }
    }, 50);
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (to.name === 'underwriting') {
      this.$nextTick(() => {
        this.$router.push({ 
          name: 'sinosig_wddg_detail',
          query: { scode: window.sessionStorage.getItem('scode') }
         })
      });
    }
  },
  methods: {
    refuseConclusion() {
      refuseConclusion([], { scode: window.sessionStorage.getItem('health_serial') })
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
    saveConclusion() {
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
@import url(./underwriting-fail.css);
</style>

