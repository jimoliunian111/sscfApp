<template>
  <div class="verify-result">
    <div class="verify-result-title">核保结果</div>
    <div class="verify-result-reason" v-if="+dataObj.conclusionCode !== 1">
      {{ +dataObj.conclusionCode === 3 ? '除外' : '拒保' }}原因： {{dataObj.remark || ''}}
    </div>
    <div class="verify-result-content">{{content}}</div>

		<p class="text-desc-style" v-if="+dataObj.conclusionCode === 3">您是否接受此条件投保</p>

    <div class="verify-result-tools">
      <div class="tools-btn primary-style"
      v-if="+dataObj.conclusionCode === 1"
       @click="goInsurePage">去投保</div>
       <div class="tools-btn primary-style"
       v-if="+dataObj.conclusionCode === 3"
        @click="goInsurePage">同意，去投保</div>
      <div class="tools-btn"
      v-if="+dataObj.conclusionCode !== 1 && +dataObj.conclusionCode !== 3"
      @click="goDetailPage">取消</div>
      <div class="tools-btn primary-style"
      v-if="+dataObj.conclusionCode !== 1 && +dataObj.conclusionCode !== 3"
      @click="restAssess">重新评估</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verify-result',
  data () {
    return {
      dataObj: {}
    }
  },
  components: {

  },
  methods: {
    goInsurePage () {
      this.$router.replace({
        name: 'bohai_qxwy_insureInfo',
        query: {
          qaId: this.dataObj.qaId,
          scode: this.dataObj.scode,
          channel_product_id: this.dataObj.channel_product_id,
          product_id: this.dataObj.product_id,
          conclusionCode: this.dataObj.conclusionCode,
        }
      })
    },
    goDetailPage () {
      this.$router.replace({
        name: 'bohai_qxwyDetail',
        query: {
          qaId: this.dataObj.qaId,
          scode: this.dataObj.scode,
          channel_product_id: this.dataObj.channel_product_id,
          product_id: this.dataObj.product_id,
          conclusionCode: this.dataObj.conclusionCode,
        }
      })
    },
    seturl (path, obj) {
      return path + '?' + Object.entries(obj).map(item => item.join('=')).join('&')
    },
    restAssess () {
      let params = {
        product_id: this.dataObj.product_id,
        channel_product_id: this.dataObj.channel_product_id,
        scode: this.dataObj.scode
      }
      let url = this.seturl(process.env.HEALTH_HOST + '/bohai/health-inform', params)
      window.location.href = url
    }
  },
  created () {
    console.log('url 参数:', this.$route.query)
    this.dataObj = this.$route.query
  },
  computed: {
    content () {
      if (+this.dataObj.conclusionCode === 1) {
        return '感谢您提供的健康信息，恭喜您可以投保本产品';
      } else if (+this.dataObj.conclusionCode === 3) {
        return this.dataObj.content || '尊敬的客户，通过智能核保问卷评估，本保险合同对被保险人因如上原因引起的保险事故不承担保险责任。'
      } else {
        return '尊敬的客户，通过智能核保问卷评估，您本次的健告情况暂不支持在线投保，给您带来不便敬请见谅，感谢您的支持配合！'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.verify-result {
  width: 100%;
  padding: rem(0) rem(40);
  box-sizing: border-box;
  background: #fff;
}
.verify-result-title {
  width: 100%;
  margin: rem(60) auto;
  text-align: center;
  font-size: rem(48);
  font-weight: 500;
  color: #333;
}
.verify-result-reason {
  width: 100%;
  margin: rem(40) auto;
  font-size: rem(28);
  color: #333;
}

.text-desc-style {
  width: 100%;
  margin: rem(40) auto;
  font-size: rem(28);
  color: #333;
}
.verify-result-content {
  width: 100%;
  margin: rem(40) auto;
  font-size: rem(28);
  color: #333;
}
.verify-result-tools {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  width: rem(400);
  margin: rem(46) auto;
  .tools-btn {
    min-width: rem(160);
    // height: rem(72);
    padding: rem(20) rem(40);
    box-sizing: border-box;
    border: 1px solid #efefef;
    border-radius: rem(5);
    // line-height: rem(72);
    text-align: center;
    color: #333;
    font-size: rem(32);
  }
  .primary-style {
    color: #fff;
    background: #ff9900;
  }
}
</style>
