<template>
  <div class="container">
    <div class="tips-logo">
      <i class="icon iconfont success-logo">&#xe61b;</i>
    </div>
    <div class="tips-words">
      <p>被保人已通过健康告知</p>
      <p>可正常投保。</p>
    </div>
    <div class="submit-button" @click="jump2Insurce">
      立即投保
    </div>
    <div class="select-button" @click="jump2List">
      被保人还患有其他疾病
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
    // isExpire(this);
  },
  methods: {
    jump2Insurce() {
      const product_type = window.sessionStorage.getItem('product_type');

      const routeName = `${product_type.split('.').splice(1,2).join('_').toLowerCase()}_detail_insureInfo`;

      saveConclusion([], { scode: window.sessionStorage.getItem('health_serial') })
      .then(res => {
        if (!res.data.code) {
          this.$router.push({ name: routeName});
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

      // this.$router.push({ name: routeName});
    },
    jump2List() {
      this.$router.push({ name: 'underwriting_list'});
    }
  }
}
</script>

<style scoped>
@import url(./underwriting-success.css);
</style>

