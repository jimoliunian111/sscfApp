<template>
  <div class="list-container">
    <div class="detail-list-title">
      请选择被保人所患的具体疾病名称
    </div>
    <div class="list-item"
         v-for="item in categoryList"
         :key="item.id"
         @click="categorySelect(item.action, item.id, item.name)">
      {{ item.name }}
      <i class="icon iconfont list-arrow">&#xe616;</i>
    </div>
    <div v-if="!categoryList.length">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import { getCategoryList, saveCategoryAnswer } from '../../../apis/interlligent-underwriting-urls'; 
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
      categoryList: []
    }
  },
  watch: {
    $route(v) {
      const parentId = v.query.id;
      if (parentId) {
        this.getCategoryList(parentId);
      } else {
        this.getCategoryList();
      }
    }
  },
  created() {
    this.product_id = window.sessionStorage.getItem('product_id');
  },
  mounted() {
    isExpire(this);
    const parentId = this.$route.query.id;
    if (parentId) {
      this.getCategoryList(parentId);
    } else {
      this.getCategoryList();
    }
  },
  methods: {
    getCategoryList(parentId) {

      let data = {
        product_id: this.product_id
      }

      if (parentId) {
        data = Object.assign({}, data, { parent_id: parentId });
      }
      
      getCategoryList([], data)
      .then(res => {
        this.categoryList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      })
    },
    saveCategoryAnswer(id, cb) {
      const data = { id, scode: window.sessionStorage.health_serial};
      saveCategoryAnswer([], data)
      .then(res => {
        if (!res.data.code) {
          cb();
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    categorySelect(type, id, name) {

      switch(true) {
        case action[type] === '转入分类': 
          this.categoryList = [];
          this.$router.push({ query: { id } });
          this.getCategoryList(id);
          break;

        case action[type] === '转入题目':
          this.$router.push({ name: 'underwriting_question', query: { category_id: id } });
          break;

        default:
          this.$router.push({ name: 'underwriting_list_answer', query: {
              require: `您是否患有 ${name}`,
              action: type,
              id
            } });
          break;
      }


      // this.$router.push({ name: 'underwriting_question' });
    }
  }
}
</script>
<style scoped>
@import url(./underwriting-list.css);
</style>


