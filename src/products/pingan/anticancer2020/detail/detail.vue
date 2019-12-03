<template>
  <div class="damai-detail">
    <div class="main">
          <div class="product-banner">
            <img :src="source.banner" :alt="source.name">
          </div>

          <div class="product-info">
            <div class="product-info-title">
              <h3>{{ source.name }}</h3>
              <p>该产品由 {{ source.company_name }} 承保并负责理赔</p>
            </div>
            <div class="product-info-form">
              <detail-read-module title="承保年龄" value="28天-70周岁"></detail-read-module>
              <datetime-widget title="被保险人出生日期" :titleStyle="{width: '6rem'}" :dateObj="pageConf.insureBirthday" @getData="getBirthdayData" verStr="insured/birthday"></datetime-widget>
              <check-widget title="是否有医保" :checkObj="pageConf.social_security" @getData="getCheckData" verStr="insured/social_security"></check-widget>
              <select-widget title="年度保障计划" :selectObj="pageConf.scheme" @getData="getSelectData" verStr="insure_plan/scheme"></select-widget>

              <select-widget title="基本保额" :selectObj="pageConf.guarantee_quota" @getData="getSelectData" verStr="insure_plan/guarantee_quota"></select-widget>
              <select-widget title="保障期限" :selectObj="pageConf.guarantee_period" @getData="getSelectData" verStr="insure_plan/guarantee_period"></select-widget>
              <!-- <detail-read-module title="保障期限" value="200万"></detail-read-module>
              <detail-read-module title="保障期限" value="1年"></detail-read-module> -->
              <check-widget title="特定恶性肿瘤药品费用保险金" :titleStyle="{width: '13rem'}" :checkObj="pageConf.additional_insurance_00003" @getData="getCheckData" verStr="insure_plan/additional_insurance_00003"></check-widget>
            </div>
          </div>
          <div class="ensure-inviolable">
            <div class="common-title">
              <i class="icon iconfont">&#xe612;</i>保障权益
            </div>
            <div class="ensure-inviolable-content">
              <div class="ensure-inviolable-content-item" v-for="(item, idx) in ensureInviolable" :key="idx">
                <template v-if="item.show">
                  <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(idx)">{{item.title}}
                    <div class="ensure-inviolable-content-item-title-sub" v-if="item.value">{{ item.value }}
                      <i class="icon iconfont icon-arrow">&#xe60e;</i>
                    </div>
                  </div>
                  <div class="ensure-inviolable-content-item-shrink" v-html="item.content"></div>
                </template>
              </div>
            </div>
          </div>
          <product-description :source="source"></product-description>
          <mask-cover v-model="isLoading"></mask-cover>
        </div>
        <div class="fixed-footer">
          <div class="fixed-footer-client">
              <div class="common-tool-style">
                <back-home-module :data="source.source_info || {}"></back-home-module>
                <div @click="jump2FaqList">
                  <img class="fixed-footer-services" src="../../../../assets/image/sinosig/wddg/services-icon.png">
                </div>
              </div>

              <div class="fixed-footer-operate fixed-footer-client-operate clearfloat">
                  <div class="fixed-footer-client-price">
                      <span v-if="amount">{{ amount }}元</span>
                      <span v-else><load-more></load-more></span>
                  </div>
                  <a class="fixed-footer-operate-insure" @click="showHealthAdvice">立即投保</a>
              </div>
          </div>
        </div>


        <template>
          <health-module :title="healthData.title" :show.sync="healthData.show" :data="healthData.value" @allNot="healthAllNot"
          @atLeastOne="healthAtLeastOne" :extra="healthData.extra"></health-module>
        </template>

        <div v-transfer-dom>
          <popup v-model="claimsServiceShow" position="bottom" should-scroll-top-on-show>
            <div class="product-clause-content-popup" style="height: 14rem;">
              <div class="information-main-title">理赔说明
                <div class="health-notices-close" @click.stop="claimsServiceShow = false">
                  <img src="../../../../assets/image/sinosig/wddg/close-icon.png">
                </div>
              </div>
              <div class="client-agreement-content">
                <img src="../../../../assets/data/sinosig/wddg/lipei_advice.png" style="width: 80%;margin: 1rem;" alt="理赔说明">
                <div v-html="PxToRem(lipeiAdvice)" style="padding: 0 .5rem;"></div>
              </div>
            </div>
          </popup>
        </div>
        <template v-if="vocationShow">
          <vocation-module :productId="product_id" :show.sync="vocationShow" :level="6" :isExport="true" verKey="insured/profession" @getData="getProfession"
          @selectItem="getProfessionItem"></vocation-module>
        </template>
        <div v-transfer-dom>
          <alert v-model="showWarn"
                 title="抱歉，您不符合投保要求"
                 content="非常抱歉，根据您的健康告知，您未能通过本次投保审核，请选择其他保险产品"></alert>
        </div>
  </div>
</template>

<script>
import { Alert, TransferDom, Popup, Datetime, PopupPicker, Group, Cell, LoadMore  } from 'vux';
import maskCover from '@/components/mask/mask-cover';
import productDescription from '@/components/product-description';

import { healthAdvice } from '@/assets/data/tongfang/bbd/health_advice';
import lipeiAdvice from '@/assets/data/sinosig/wddg/lipei_advice';

import healthModule from '../components/health-module'

// mixin
import { detailMixin } from '../detail.js'
export default {
  name: 'damaiDetail',
  directives: {
    TransferDom
  },
  mixins: [detailMixin],
  data () {
    return {
      healthAdvice,
      lipeiAdvice,
      isLoading: false,
      showWarn: false,
      healthAdviceShow: false,
      applicantHealthAdviceShow: false,
      date: '',
      isInit: false,
      amount: null,
      placesList: [],
      listValue: [],
      claimsServiceShow: false,
      code: '',
      tabLocation: null,
      healthData: {
        show: false,
        title: '',
        value: ''
      }
    }
  },
  components: {
    Popup,
    Datetime,
    PopupPicker,
    Group,
    Cell,
    maskCover,
    LoadMore,
    Alert,
    productDescription,
    healthModule
  },
  methods: {
    healthAllNot (obj) {
      // 第一次若是投保健告， 且全部为否的话直接切换被保人健告数据
      if (this.healthData.type === 'applicant') {
        this.healthData.show = false
        let that = this
        setTimeout(() => {
          that.sethealthData('insured', false)
          // that.healthData = {
          //   show: true,
          //   type: that.source.health_inform_items.insured.type,
          //   title: that.source.health_inform_items.insured.title,
          //   value: that.source.health_inform_items.insured.value,
          //   extra: {
          //     isMore: false
          //   }
          // }
        }, 200);
      } else if (this.healthData.type === 'insured') { // 这实际上已经是第二次， 则为被保人健告，全部为否的话，直接跳转
        this.jump2InsureInfo()
      }
    },
    healthAtLeastOne (obj) {
      // 第一次投保健告， 部分为是的话直接弹框不符合
      if (this.healthData.type === 'applicant') {
        this.showWarn = true;
        this.healthData.show = false
      } else if (this.healthData.type === 'insured') { // 这实际上已经是第二次，则为被保人健告，部分为是的话跳转第三方智能核保
        this.warn()
      }

    },
    showHealthAdvice() {
			this.sethealthData('insured', false)
    },
    sethealthData (type, isMore) {
      this.healthData = {
        show: true,
        type: type,
        title: '健康告知',
        value: this.source.health_inform_items,
        extra: {
          isMore: isMore
        }
      }
    }
  },
  computed: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
.pr {
  position: relative;
}
.major-claims-btn {
  position: absolute;
  top: 1.5rem;
  left: 3.2rem;
  width: 3.6rem;
  height: .6rem;
}
.vux-popup-dialog {
  background-color: #fff !important;
}
.weui-cell_access .weui-cell__ft:after {
  opacity: 0 !important;
}
.datepicker .vux-cell-value {
  color: #000 !important;
}

</style>
<style>
@import url(./detail.scss);
.profession-text {
  width: 100%;
  border-top: 1px solid #efefef;
  text-align: right;
  line-height: 0.63rem;
}
.profession-text span {
  color: #ff9900;
}
.damai-detail .main-tabs .tab-item {
  flex: 1 !important;
}
</style>
