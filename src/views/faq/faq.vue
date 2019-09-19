<template>
  <div class="main">
    <div class="question-item" 
         v-for="item in list"
         v-if="list.length"
         :key="item.id"
         @click="jump2Detail(item.id)">
         {{ item.question }}
    </div>
    <div class="question-list-loading"
         v-if="!list.length">
      <load-more></load-more>
    </div>
    <div class="fixed-footer-button online-services-button" @click="showOnline">在线客服</div>
    <div class="customer-services" 
         :class="{ show: isModalShow }"
         @click="closeModal">
        <div class="customer-services-inner" :class="{ shown: isModalShow }">
            <h3>为更好地解答您的疑惑</h3>
            <p>请您拨打官方客服热线:<br><span>400-188-8810</span>(工作日9:00-18:00,节假日除外)</p>
            <a href="tel:4001888810">拨打客服电话</a>
            <img class="customer-services-close" 
                 src="../../assets/image/sinosig/wddg/close-icon.png"
                 @click="closeModal">
        </div>
    </div>
  </div>
</template>
<script>
import { getFaqList } from '@/apis';
import { LoadMore } from 'vux';
import wxShareFreeze from '@/utils/freezeShare';

export default {
  components: {
    LoadMore
  },
  data() {
    return {
      list: [],
      isModalShow: false
    }
  },
  created() {
    wxShareFreeze();

    const product_id = this.$route.query.product_id;
    
    getFaqList({ product_id })
      .then(res => {
        this.list = res.data;
      }).catch(res => {
        this.$vux.toast.show({
          text: res.data.message,
          type: 'text'
        });
      })
  },
  methods: {
    jump2Detail(id) {
      this.$router.push({ name: 'faq_detail', query: { id } });
    },
    showOnline() {
      this.isModalShow = true;
    },
    closeModal(e) {
      if (e.target === document.querySelector('.customer-services')
          || e.target === document.querySelector('.customer-services-close')) {
            this.isModalShow = false;
      }
    }
  }
}
</script>
<style>
html, body {
  background-color: #fff;
}
</style>

<style scoped>
@import url(./faq.css);
</style>

