<template>
  <div class="container">
    <h1 class="question-title">您需确认被保人是否存在以下所述情况：</h1>

    <div v-if="questionList.length">
      <p class="question-item"
        v-for="(item, index) in questionList"
        :key="item.id">
        {{ index + 1 }}.{{ item.question }}
      </p>
    </div>
    <div v-else>
      <Loading></Loading> 
    </div>

    <div class="fixed-button-group">
      <div class="fixed-button-item"
           :class="item.theme"
           v-for="item in answerList"
           :key="item.id"
           @click="jump2next(item.action)">
        {{ item.name }}     
      </div>
    </div>
  </div>
</template>
<script>
import { getSituationList, getConfigure, getHealthSerial, getSituationAnswer } from '../../apis/interlligent-underwriting-urls';
import { action } from '../../utils/interlligent-underwriting-emun';

import Loading from '../../components/loading/index';

export default {
  components: {
    Loading
  },
  data() {
    return {
      product_id: null,
      product_type: null,
      health_serial: null,
      questionList: [],
      answerList: []
    }
  },
  created() {
    this.product_id = window.sessionStorage.getItem('product_id');

    this.getConfigure();
    this.getHealthSerial();
  },
  mounted() {
    this.getSituationList();
    this.getSituationAnswer();
  },
  methods: {
    getSituationAnswer() {
      const data = { product_id: this.product_id };
      getSituationAnswer([], data)
      .then(res => {
        this.answerList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    getSituationList() {
      const data = { product_id: this.product_id};
      getSituationList([], data)
        .then(res => {
          this.questionList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getConfigure() {
      getConfigure([], { id: this.product_id })
      .then(res => {
        this.product_type = res.data.data.configure;
        window.sessionStorage.setItem('product_type', res.data.data.configure);
      })
      .catch(err => {
        console.log(err);
      });
    },
    getHealthSerial() {
      getHealthSerial([], { product_id: this.product_id })
      .then(res => {
        this.health_serial = res.data.data.scode;
        window.sessionStorage.setItem('health_serial', res.data.data.scode  );
      })
      .catch(err => {
        console.log(err);
      });
    },
    jump2next(type) {
      if (action[type] === '拒保'){
        this.$router.push({ name: 'underwriting_fail', query: { from: 'refuseConclusion' } });
      }
      if (action[type] === '转入分类') {
        this.$router.push({ name: 'underwriting_list' });
      }
    }
  }
}
</script>

<style scoped>
@import url(./Intelligent-underwriting.css);
</style>


