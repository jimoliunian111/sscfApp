<template>
  <div class="container">
    <div class="question-title">
      请确认您的告知异常选项 
    </div>
    <div v-for="(item, index) in requireList"
         :key="index"
         class="require-item">
      <div class="prefix">Q{{index + 1}}:</div>
      <p class="questionAndAnswer">{{ item.question.title }}</p>
      <div class="prefix">A{{index + 1}}:</div>
      <p class="questionAndAnswer">{{ item.answer.title }}</p>
    </div>
    <div class="big-select-button certain" @click="checkSerial">
      确认
    </div>
    <div class="big-select-button prev-set" @click="pageBack">
      上一步
    </div>
    <div class="ps">
      注：点击“确认”后，系统将会保存此次智能核保的结论；如需修改答案，请点击“上一步”
    </div>
  </div>
</template>

<script>
import { saveSubjectAnswer, checkSerial } from '../../../apis/interlligent-underwriting-urls';

import { action } from '../../../utils/interlligent-underwriting-emun';
import isExpire from '../check-expire';

export default {
  data() {
    return {
      requireList: [],
      type: null,
      routerFlag: false
    }
  },
  created() {
    const requireList = JSON.parse(this.$route.query.require);
    this.requireList = requireList;
    this.type = this.$route.query.action;
  },
  mounted() {
    isExpire(this);
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'underwriting_question' && !this.routerFlag) {
      next();
      this.$nextTick(() => {
        let backNumber = this.requireList.length;
        this.$router.go(-backNumber);
      });
    } else {
      next();
    }
  },
  methods: {
    checkSerial() {
      const data = {
        product_id: window.sessionStorage.getItem('product_id'),
        scode: window.sessionStorage.getItem('health_serial')
      }
      checkSerial([], data)
      .then(res => {
        if (res.data.code) {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
          // this.$router.push({ name: 'sinosig_wddg_detail', scode: window.sessionStorage.getItem('scode') });
        } else {
          this.certain();
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    certain() {
      const requireArray = this.requireList.map(i => ({
              subject_id: i.question.id,
              answer_id: i.answer.id
            }));
      const data = {
        scode: window.sessionStorage.getItem('health_serial'),
        data: JSON.stringify(requireArray)
      }
      saveSubjectAnswer([], data)
      .then(res => {
        const { type } = this;

        switch(true) {

          case action[type] === '承保':
            this.$router.push({ name: 'underwriting_success' });
            break;

          case action[type] === '拒保' || action[type] === '延期':
            this.$router.push({ name: 'underwriting_fail' });
            break;

          case action[type] === '咨询人工核保':
            this.$router.push({ name: 'underwriting_ask' });
            break;

          default:
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    pageBack() {
      this.routerFlag = true;
      let backNumber = this.requireList.length;
      this.$router.go(-backNumber);
    }
  }
}
</script>

<style scoped>
@import url(./underwriting-answer.css);
</style>


