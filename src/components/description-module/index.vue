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
      <div class="tab-item claims" :class="{ cur: tab === 'claims' }" @click="tabClick('claims')">
        <span>投保案例</span>
      </div>
      <div class="tab-item claims" :class="{ cur: tab === 'claims' }" @click="tabClick('claims')">
        <span>用户评论</span>
      </div>
    </div>
    <!-- 标签内容一 -->
    <div class="block product-features" id="features">
      <img v-for="(item, index) in source.features" :key="index" :src="item" alt="产品特色">
    </div>
    <!-- 标签内容二 -->
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
    <!-- 标签内容三 -->
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
    <!-- 标签内容四 -->
    <div class="block claims-services" id="claims">
      <div class="common-title">
        <i class="icon iconfont">&#xe60b;</i> 理赔服务
      </div>
      <div class="claims-services-content" 
            v-if="source.claims_service"
            v-html="PxToRem(source.claims_service)">
      </div>
    </div>
    <!-- 动画浮层 -->
    <div v-transfer-dom>
      <popup style="height: 14rem;" v-if="contentPopupShow" v-model="contentPopupShow" position="bottom" should-scroll-top-on-show>
        <div class="information-main-title">产品条款
          <img class="health-notices-close" 
                @click="contentPopupShow = false" 
                src="../../assets/image/sinosig/wddg/close-icon.png">
        </div>
        <div class="product-clause-content-popup" style="height: 14rem;">
          <div class="client-agreement-content">
            <img v-for="(item, index) in popupContentArray.images" :key="index" :src="item.file_url" alt="">
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup } from 'vux';

import { PxToRem } from '@/utils/common-utils';
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';

export default {
  directives: {
    TransferDom
  },
  props: {
    source: {
      type: Object
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
      popupContentArray: []
    }
  },
  watch: {
    contentPopupShow(v) {
      this.shouldBodyFreeze(v);
    }
  },
  mounted() {
    this.bindScrollEvent();
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
    tabClick (type) {
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
  }
}
</script>

<style scoped>
@import './index.css';
</style>


