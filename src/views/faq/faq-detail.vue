<template>
  <div class="main">
    <h3 class="question-title">
      {{ source.question }}
    </h3>
    <p class="answer-content" v-if="source.answer && source.answer.indexOf('<p>') > -1" v-html="source.answer"></p>
    <p class="answer-content" v-else>{{ source.answer }}</p>
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
import { getFaq } from '@/apis';
import wxShareFreeze from '@/utils/freezeShare';

export default {
  data() {
    return {
      source: {},
      isModalShow: false
    }
  },
  created() {
    wxShareFreeze();

    getFaq({ id: this.$route.query.id })
      .then(res => {
        this.source = res.data;
      }).catch(res => {
        this.$vux.toast.show({
          text: res.data.message,
          type: 'text'
        });
      })
  },
  methods: {
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

<style scoped>
@import url(./faq-detail.css);
</style>