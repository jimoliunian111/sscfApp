<template>
  <div class="container">
    <div v-if="subject.title">
      <div class="question-title">
        Q{{ questionList.length + 1 }}: {{ subject.title }}
      </div>
      <div class="big-select-button"
            :class="item.theme"
            v-for="item in answer"
            :key="item.id"
            @click="select(item.action, item.to_subject_id, item)">
        {{ item.name }}
      </div>
      <!-- <div class="big-select-button uncertain">
        我不确定
      </div> -->
      <div class="big-select-button prev-set" @click="pageBack">
        上一步
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import { getCategorySubject, getHealthSubject } from '../../../apis/interlligent-underwriting-urls';
import { action } from '../../../utils/interlligent-underwriting-emun';

import Loading from '../../../components/loading/index';
import isExpire from '../check-expire';

export default {
  components: {
    Loading
  },
  data() {
    return {
      product_id: null,
      category_id: null,
      subject_id: null,
      subject: {},
      answer: [],
      questionList: []
    }
  },
  watch: {
    $route(v) {
      if (v) {
        const category_id = v.query.category_id;
        const subject_id = v.query.subject_id;

        if (category_id) {
          this.category_id = category_id;
          this.getCategorySubject();
        }

        if (subject_id) {
          this.subject_id = subject_id;
          this.getHealthSubject(subject_id);
        }
      }
    }
  },
  created() {
    this.product_id = window.sessionStorage.getItem('product_id');

    this.category_id = this.$route.query.category_id;
    // this.subject_id = this.$route.query.subject_id;

    if (this.category_id) {
      window.sessionStorage.setItem('category_id', this.category_id);
      this.getCategorySubject();
    } else {
      this.category_id = window.sessionStorage.getItem('category_id');
      this.$router.push({ query: { category_id: this.category_id } });
    }
  },
  mounted() {
      // this.getCategorySubject();
      isExpire(this);
  },
  methods: {
    select(type, nextId, item) {
      this.questionList.push({
        question: {
          title: this.subject.title,
          id: this.subject.id
        },
        answer: {
          title: item.name,
          id: item.id
        }
      });

      switch(true) {
        case action[type] === '转入题目':
          this.getHealthSubject(nextId);
          break;
        // case action[type] === '承保':
        //   this.$router.push({ name: 'underwriting_answer' });
        //   break;
        // case action[type] === '拒保' || action[type] === '延期':
        //   this.$router.push({ name: 'underwriting_answer' });
        //   break;
        // case action[type] === '咨询人工核保':
        //   this.$router.push({ name: 'underwriting_answer' });
        //   break;
        
        default:
          this.$router.push({ name: 'underwriting_answer', query: {
            require: JSON.stringify(this.questionList),
            action: type
          } }); 
          break;
      }
    },
    getHealthSubject(id) {
      this.subject = {};
      this.answer = [];
      const data = {
        product_id: this.product_id,
        subject_id: id
      };

      getHealthSubject([], data)
      .then(res => {
        this.subject = res.data.data.subject;
        this.answer = res.data.data.answer;
        this.$router.push({ query: { subject_id: res.data.data.subject.id } })
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCategorySubject() {
      const data = {
        product_id: this.product_id,
        category_id: this.category_id
      };
      getCategorySubject([], data)
      .then(res => {
        this.subject = res.data.data.subject;
        this.answer = res.data.data.answer;
      })
      .catch(err => {
        console.log(err);
      });
    },
    pageBack() {
      this.$router.back();
      this.questionList.pop();
    }
  }
}
</script>

<style scoped>
@import url(./underwriting-question.css);
</style>


