<template>
  <div>
    <div class="main-tabs">
      <div class="tab-item features" :class="{ cur: tab === 'features' }" @click="tabClick('features')">
        <span>产品特色</span>
      </div>
      <div class="tab-item attentions" :class="{ cur: tab === 'attentions' }" @click="tabClick('attentions')">
        <span>投保须知</span>
      </div>
      <div class="tab-item clause" :class="{ cur: tab === 'clause' }" @click="tabClick('clause')">
        <span>产品条款</span>
      </div>
      <div class="tab-item claims" :class="{ cur: tab === 'claims' }" @click="tabClick('claims')">
        <span>理赔服务</span>
      </div>
      <div class="tab-item faq" :class="{ cur: tab === 'faq' }" @click="tabClick('faq')">
        <span>常见问题</span>
      </div>
    </div>
    <div class="block product-features" id="features">
      <img v-for="(item, index) in source.features" :key="index" :src="item" alt="产品特色">
    </div>
    <div class="block insured-attentions" id="attentions">
      <div class="common-title">
        <i class="icon iconfont">&#xe610;</i> 投保须知
      </div>
      <div class="insured-attentions-content"
            v-if="source.instruction" 
            v-html="PxToRem(source.instruction)"></div>
      <div class="insured-attentions-more" @click="insuredMoreClick" v-if="!isMoreShow">
        <p>点击展开</p>
        <i class="icon iconfont icon-arrow">&#xe60e;</i>
      </div>
      <div class="insured-attentions-more" @click="insuredMoreClick" v-else>
        <p>点击收起</p>
        <i class="icon iconfont icon-arrow">&#xe608;</i>
      </div>
    </div>
    <div class="block product-clause" id="clause">
      <div class="common-title">
        <i class="icon iconfont">&#xe611;</i> 产品条款
      </div>
      <div class="product-clause-content">
        <div class="product-clause-content-item" 
            v-for="(item, index) in source.terms"
            :key="index"
            @click="produceClauseClick(index)">
          {{ item.name }} 
          <i class="icon iconfont arrow">&#xe616;</i>    
        </div>
      </div>
    </div>
    <div class="block claims-services" id="claims">
      <div class="common-title">
        <i class="icon iconfont">&#xe60b;</i> 理赔服务
      </div>
      <div class="claims-services-content" 
            v-if="source.claims_service"
            v-html="PxToRem(source.claims_service)">
      </div>
    </div>
    <div class="block claims-services" id="faq">
      <div class="common-title">
        <i class="icon iconfont">&#xe60a;</i> 常见问题
      </div>
      <div class="faq-services-content" >
        <div v-for="(item, idx) in list" :key="idx">
          <div class="title">
            {{item.question}}
          </div>
          <div class="content">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup style="height: 14rem;" v-if="contentPopupShow" v-model="contentPopupShow" position="bottom" should-scroll-top-on-show>
        <div class="information-main-title">产品条款
          <div class="health-notices-close" 
                @click="contentPopupShow = false">
            <img 
                src="../../assets/image/sinosig/wddg/close-icon.png">
                
          </div>
        </div>
        <div class="product-clause-content-popup" style="height: 14rem;">
          <div class="client-agreement-content" v-lazy-container="{ selector: 'img' }">
            <img v-for="(item, index) in popupContentArray.images" :key="index" :data-src="item.file_url" alt="">
          </div>
        </div>
      </popup>
    </div>
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
import { TransferDom, Popup  } from 'vux';
import { getFaqAll } from '@/apis';
import { PxToRem } from '@/utils/common-utils';
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';

export default {
  directives: {
    TransferDom
  },
  props: {
    source: {
      type: Object
    },
    productId: {
      type: Number,
      default: 249
    },
    isModalShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Popup
  },
  data() {
    return {
      tab: 'features',
      isMoreShow: false,
      contentPopupShow: false,
      popupContentArray: [],
      list: null
    }
  },
  watch: {
    contentPopupShow(v) {
      this.shouldBodyFreeze(v);
    }
  },
  mounted() {
    this.bindScrollEvent();
    const product_id = this.productId;
      getFaqAll({ product_id })
      .then(res => {
        this.list = res.data;
      }).catch(res => {
        this.$vux.toast.show({
        text: res.message,
        type: 'text'
        });
      })
  },
  beforeDestroy() {
    this.unBindScrollEvent();
  },
  methods: {
    PxToRem,
    shouldBodyFreeze(v) {
      
      if (v) {
        this.bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
        bindFreeze(); 
      } else {
        unbindFreeze();
        document.documentElement.scrollTop = this.bodyTop;
        document.body.scrollTop = this.bodyTop;
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    bindScrollEvent() {
      window.addEventListener('scroll', this.scrollHandler);
    },
    unBindScrollEvent() {
      window.removeEventListener('scroll', this.scrollHandler);
    },
    insuredMoreClick() {
      this.isMoreShow = !this.isMoreShow;
      document.querySelector('.insured-attentions-more').previousElementSibling.classList.toggle('cur');

      if (!this.isMoreShow) {
        document.documentElement.scrollTop = document.querySelector('#attentions').offsetTop;
        document.body.scrollTop = document.querySelector('#attentions').offsetTop;
      }
    },
    tabClick(type) {
      this.unBindScrollEvent();

      const blockTop = document.querySelector(`#${type}`).offsetTop;
      const tabHeight = document.querySelector('.main-tabs').getBoundingClientRect().height;
      const disparity = blockTop - tabHeight;

      document.documentElement.scrollTop = disparity;
      // window.pageYOffset = disparity;
      document.body.scrollTop = disparity;

      this.tab = type;
      setTimeout(() => {
        this.bindScrollEvent();
      }, 300);
    },
    produceClauseClick(type) {
      this.contentPopupShow = true;
      this.popupContentArray = this.source.terms[type];

      this.$nextTick(() => {
        document.querySelector('.client-agreement-content').scrollTop = 0;
      });
    },
    scrollHandler() {
      const tabs = Array.prototype.slice.call(document.querySelectorAll('.block'));
      const windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const tabsHeight = document.querySelector('.main-tabs').getBoundingClientRect().height;

      tabs.forEach(item => {
        if (windowScrollTop + tabsHeight > item.offsetTop) {
          this.tab = item.id;
        }
      });
    }
  },
  created() {

  },
}
</script>

<style scoped>
@import './product-descriptionnew.css';

</style>


