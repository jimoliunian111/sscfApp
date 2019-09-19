<template>
  <div class="container">
    <div class="question-title">
      请确认您的告知异常选项 
    </div>
    <div class="require-item">
      <p class="questionAndAnswer">{{ requireWords }}</p>
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
import { saveSubjectAnswer, checkSerial, saveCategoryAnswer } from '../../../apis/interlligent-underwriting-urls';

import { action } from '../../../utils/interlligent-underwriting-emun';
import isExpire from '../check-expire';

export default {
  data() {
    return {
      requireWords: '',
      type: null,
      id: null
    }
  },
  created() {
    const { require, action, id } = this.$route.query;
    this.requireWords = require;
    this.type = action;
    this.id = id;
  },
  mounted() {
    isExpire(this);
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
        } else {
          this.certain();
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    certain() {
      const data = { id: this.id, scode: window.sessionStorage.health_serial};
      saveCategoryAnswer([], data)
      .then(res => {
        if (!res.data.code) {
          switch(true) {
            case action[this.type] === '承保':
              this.$router.push({ name: 'underwriting_success' });
              break;
            case action[this.type] === '拒保' || action[type] === '延期':
              this.$router.push({ name: 'underwriting_fail' });
              break;
            case action[this.type] === '咨询人工核保':
              this.$router.push({ name: 'underwriting_ask' });
              break;

            default:
              break;
          }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    pageBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
@import url(./underwriting-list-answer.css);
</style>


