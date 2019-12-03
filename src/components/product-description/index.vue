<template>
  <div>
    <div :class="['main-tabs', {'flex-item': isFlex }]">
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
      <div class="tab-item example" :class="{ cur: tab === 'example' }" @click="tabClick('example')" v-if="tabExample">
          <span>投保案例</span>
        </div>
        <div class="tab-item comment" :class="{ cur: tab === 'comment' }" @click="tabClick('comment')" v-if="tabComment">
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
            v-html="PxToRem(source.instruction)" @click="specialOccupationListShow"></div>
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
    <!-- 标题五内容 -->
    <div class="block insured-example" id="example" v-if="tabExample">
            <div class="common-title example">
              <i class="icon iconfont">&#xe604;</i>投保案例</div>
            <div class="product-example-content">
                <div class="example-box">
                    <div class="example-applicant">
                        <img src="../../assets/image/sinosig/wddg/details_circle_star.png" class="example-star" alt="">投保人
                        <p>{{tabExample.applicant}}</p>
                    </div>
                    <div class="example-insured">
                        <img src="../../assets/image/sinosig/wddg/details_circle_star.png" class="example-star" alt="">被保人信息
                        <p>{{tabExample.insured}}</p>
                    </div>
                    <div class="example-equity">
                        <img src="../../assets/image/sinosig/wddg/details_circle_star.png" class="example-star" alt="">所获得的保险利益
                        <div v-for="(item, index) in tabExample.equity" :key="index">
                            <p>{{index+1}}、{{item}}</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <!-- 标题六内容 -->
      <div class="block user-comment" id="comment" v-if="tabComment">
            <div class="common-title comment">
              <i class="icon iconfont">&#xe602;</i>用户评论</div>
            <div class="comment-box" v-for="(item, index) in tabComment" :key="index" v-if="index < 3 || isCommentShow">
                <div class="comment-info">
                        <img src="../../assets/image/sinosig/wddg/details_author.png" class="auther" alt="">
                        <span class="comment-name">{{item.name}}</span>
                        <div class="comment-show-star">
                            <img :src=" item.star >= i ? require('../../assets/image/sinosig/wddg/details_star_cur.png') : require('../../assets/image/sinosig/wddg/details_star.png')" class="star" v-for="i in 5" :key='"star" + i' alt="">
                        </div>
                        <span class="comment-date">{{item.data}}</span>
                </div>
                <div class="comment-content">{{item.comment}}</div>
                    <div class="comment-reply" v-if="!!(item.reply)">{{item.reply}}</div>
            </div>
            <div @click="isCommentShow = true" v-if="!isCommentShow" class="comment-chech-all">查看更多</div>
      </div>

    <!-- 动画浮层 -->
    <div v-transfer-dom>
      <popup style="height: 14rem;" v-if="contentPopupShow" v-model="contentPopupShow" position="bottom" should-scroll-top-on-show>
        <div class="information-main-title">产品条款
          <div class="health-notices-close" @click="contentPopupShow = false">
            <img src="../../assets/image/sinosig/wddg/close-icon.png">
          </div>
        </div>
        <div class="product-clause-content-popup" style="height: 14rem;">
          <div class="client-agreement-content"  v-lazy-container="{ selector: 'img' }">
            <img v-for="(item, index) in popupContentArray.images" :key="index" :data-src="item.file_url" alt="">
          </div>
        </div>
      </popup>
    </div>
          <!-- 健康告知特殊职位表动画浮层 -->
      <div v-transfer-dom>
          <popup style="height: 14rem;" v-if="listPopupShow" v-model="listPopupShow" position="bottom" should-scroll-top-on-show>
            <div class="information-main-title">特殊职业类别表
              <div class="health-notices-close" @click="listPopupShow = false">
                <img src="../../assets/image/sinosig/wddg/close-icon.png">
              </div>
            </div>
            <div class="product-clause-content-popup" style="height: 14rem;">
              <div class="client-agreement-content">
                <img v-for="(item, index) in specialOccupationList" :key="index" :src="item" alt="" >
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
    },
    isFlex: {
      default: false,
      type: Boolean
    },
    isclick: {
      default: false,
      type: Boolean
    },
    tabExample: {
      type: Object
    },
    tabComment: {
      type: Array
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
      listPopupShow: false,
      specialOccupationList: [],
      equities: {},
      isCommentShow: false
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
    specialOccupationListShow() {
      console.log('hhhhhhhhh');
      if(!!this.isclick) {
          let that = this;
        document.querySelector('#specialOccupationListShow').onclick = function() {
          that.listPopupShow = true;
          that.specialOccupationList = that.equities.specialOccupationList
        }
      }
    },
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
    //tab栏导航定位
    tabClick(type) {
      this.unBindScrollEvent();
      const blockTop = document.querySelector(`#${type}`).offsetTop;
      const tabHeight = document.querySelector('.main-tabs').getBoundingClientRect().height;
      var disparity;
      //判断是否点击第一个导航栏
      if(type == 'features') {
        if(document.documentElement.scrollTop > document.querySelector(`#${type}`).offsetTop) {
        disparity = blockTop;
        }else {
        disparity = blockTop - tabHeight;
        }
      }else {
        if(document.documentElement.scrollTop < document.querySelector(`#features`).offsetTop) {
          disparity = blockTop - tabHeight - tabHeight;
        }else {
          disparity = blockTop - tabHeight;
        }
      }
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
<style>
  /* 新增投保案例 用户评论 */
  .insured-example {
    background-color: #fff;
    padding: 0 .22rem .32rem .22rem;
    margin-bottom: .24rem;
  }
  .insured-example .example-box{
    padding: 0.533rem 0;
    border-bottom: .026667rem solid #efefef;
  }

  .insured-example .example-box .example-star{
    width: 0.2667rem;
    height: 0.2667rem;
    display: inline-block;
  }

  .insured-example .example-box .example-star{
    width: 0.2667rem;
    height: 0.2667rem;
    display: inline-block;
    margin-right: 0.1866rem;
  }

  .insured-example .example-box .example-applicant,
  .insured-example .example-box .example-insured,
  .insured-example .example-box .example-equity{
    font-size: 0.3733rem;
    font-weight: bold;
    color: rgba(51,51,51,1);
    line-height: 0.4rem;
    margin-top: 0.5333rem;
  }

  .insured-example .example-box .example-applicant{
    margin-top: 0;
  }

  .insured-example .example-box .example-applicant p,
  .insured-example .example-box .example-insured p,
  .insured-example .example-box .example-equity p{
    font-size: 0.3733rem;
    color: rgba(51,51,51,1);
    line-height: 0.6rem;
    font-weight: normal;
    margin-top: 0.32rem;
    margin-left: 0.4533rem;
  }

  .insured-example .example-box .example-equity p{
    margin-top: 0px;
  }

  .insured-example .example-box .example-equity p:first-of-type{
    margin-top: 0.32rem;
  }

  /* 用户评论 */
  .user-comment {
    background-color: #fff;
    padding: 0 .22rem .32rem .22rem;
  }
  .user-comment .comment-box{
    padding: 0.533rem 0;
    border-bottom: .026667rem solid #efefef;
  }

  .user-comment .comment-box:last-child{
    border-bottom: 0px;
  }

  .user-comment .comment-box .auther{
    width: 0.855rem;
    height: 0.855rem;
    display: inline-block;
  }

  .user-comment .comment-box .comment-name{
    font-size: 0.4rem;
    line-height: 0.855rem;
    display: inline-block;
    margin-left: 0.266rem;
  }

  .user-comment .comment-box .comment-show-star{
    line-height: 0.855rem;
    margin-left: 0.266rem;
    display: inline-block;
  }

  .user-comment .comment-box .comment-show-star img{
    width: 0.3733rem;
    height: 0.3466rem;
  }

  .user-comment .comment-box .comment-date{
    line-height: 0.855rem;
    margin-left: 0.266rem;
    display: inline-block;
    float: right;
    font-size: 0.4rem;
    color:rgba(153,153,153,1);
  }

  .user-comment .comment-content{
    margin-top: 0.4rem;
    font-size: 0.3733rem;
    color:rgba(51,51,51,1);
    line-height: 0.56rem;
  }

  .user-comment .comment-reply{
    background: rgba(239,239,239,1);
    margin-top: 0.4rem;
    padding: 0.4rem 0.48rem 0.4266rem 0.3466rem;
    position: relative;
    border-radius: 10px;
  }

  .user-comment .comment-reply:before{
    content: '';
    width: 0.19rem;
    height: 0.19rem;
    background: rgba(239,239,239,1);
    transform: rotate(45deg);
    position: absolute;
    left: 0.5333rem;
    top: -0.095rem;
  }

  .user-comment .comment-chech-all{
    width: 3.013rem;
    height:0.986rem;
    border: 0.026rem solid rgba(255,144,0,1);
    background: rgba(255,170,0,.1);
    border-radius: 3rem;
    font-size: 0.426rem;
    color:rgba(255,144,0,1);
    margin: 0 auto;
    text-align: center;
    line-height: 0.986rem;
  }

  .claims-services {
  background-color: #fff;
  margin-bottom: .24rem;
}
.claims-services .common-title {
  padding: .4rem .32rem;
}
.insured-example .common-title {
  padding: .32rem .32rem;
}
.user-comment .common-title {
  padding: .32rem .32rem;
}
</style>
<style scoped>
@import './index.css';
.main-tabs.flex-item .tab-item {
  flex: 1;
}
</style>
