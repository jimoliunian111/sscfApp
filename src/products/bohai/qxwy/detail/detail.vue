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
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">承保年龄</div>
                <div class="product-info-form-item-content">
                  <div>18-60周岁</div>
                </div>
              </div>
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">被保人出生日期</div>
                <div class="product-info-form-item-content form-date">
                  <div class="tar product-info-form-item-content-date">
                    <datetime v-model="formValue.insured_birthday" 
                              :start-date="insured_birthday_min"
                              :end-date="insured_birthday_max"
                              class="datepicker"
                              @on-change="changeBirthday()"></datetime>
                    <i class="icon iconfont icon-date">&#xe609;</i>
                  </div>
                </div>
              </div>
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">被保人性别</div>
                <div class="product-info-form-item-content">
                  <div class="product-info-form-item-radio" 
                      :class="{ cur: formValue.insured_gender === 1 }"
                      @click="changeGender(1)">男</div>
                  <div class="product-info-form-item-radio" 
                      :class="{ cur: formValue.insured_gender === 2 }"
                      @click="changeGender(2)">女</div>
                </div>
              </div>
              <!-- 职业类型 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">职业类型</div>
                <div class="product-info-form-item-content">
                  <div>1-6类</div>
                  <div class="product-info-form-item-vocation" @click="searchVocation">请选择</div>
                </div>
              </div>
              <div class="profession-text" v-if="profressionText !== ''"><span>*</span>{{profressionText || ''}}</div>
              
              <!-- 投保区域 -->
              <div class="product-info-form-item area">
                <div class="product-info-form-item-title">
                  投保区域
                  <!-- <p class="product-tips">* 全国201个已开业机构</p> -->
                </div>
                <div class="product-info-form-item-content">
                  <span class="product-info-name"
                        v-if="formValue.insured_personal_address_city"
                        @click="selectPlace">
                    {{ regionName }}
                  </span>
                  <div class="product-info-form-item-vocation" 
                      v-if="!formValue.insured_personal_address_city"
                      @click="selectPlace">请选择</div>
                </div>
              </div>
              
              <!-- 有无社保 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">有无社保</div>
                <div class="product-info-form-item-content">
                  <div class="product-info-form-item-radio" 
                      v-for="item in social_security_items"
                      :key="item.value"
                      :class="{ cur: formValue.social_security === item.value }"
                      @click="changeSocial_security(item.value)">{{ item.label }}</div>
                </div>
              </div>

              <!-- 保障期限 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">保障期限</div>
                <div class="product-info-form-item-content">
                  <!-- <div class="product-info-form-item-radio cur">终身</div> -->
                  <div class="product-info-form-item-select" @change="select_guarantee_quota">
                    <select v-model="formValue.guarantee_period">
                      <option v-for="item in guarantee_period_items"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</option> 
                    </select>
                    <img class="product-info-form-item-select-arrow" 
                        src="../../../../assets/image/sinosig/wddg/arr-select-icon.png">
                  </div>
                </div>
              </div>
              
              <!-- 保障额度 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">保障额度</div>
                <div class="product-info-form-item-content">
                  <div class="product-info-form-item-select" @change="select_guarantee_quota">
                    <select v-if="formValue.guarantee_quota" 
                            v-model="formValue.guarantee_quota">
                      <option v-for="item in guarantee_quota_items"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</option> 
                      
                    </select>
                    <img class="product-info-form-item-select-arrow" 
                        src="../../../../assets/image/sinosig/wddg/arr-select-icon.png">
                  </div>
                </div>
              </div>

              <!-- 缴费期限 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">缴费期限</div>
                <div class="product-info-form-item-content">
                  <div class="product-info-form-item-select" @change="select_payment_period">
                    <select v-if="payment_period_items_format"
                            v-model="payment_period_format">
                      <option v-for="item in payment_period_items_format"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</option>
                    </select>
                    <img class="product-info-form-item-select-arrow" 
                        src="../../../../assets/image/sinosig/wddg/arr-select-icon.png">
                  </div>
                </div>
              </div>
    
              
              <!-- 年收入 -->
              <div class="product-info-form-item">
                <div class="product-info-form-item-title">年收入</div>
                <div class="product-info-form-item-content">
                  <div>{{formValue.annual_income && formValue.annual_income.items.label}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="ensure-inviolable">
            <div class="common-title">
              <i class="icon iconfont">&#xe612;</i>保障权益
            </div>
            <div class="ensure-inviolable-content">
              <div class="ensure-inviolable-content-item">
                <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(0)">身故保险金
                  <div class="ensure-inviolable-content-item-title-sub" v-if="formValue.guarantee_quota">{{ formValue.guarantee_quota / 10000 }}万
                    <i class="icon iconfont icon-arrow">&#xe60e;</i>
                  </div>
                </div>
                <div class="ensure-inviolable-content-item-shrink" >
                  被保险人于本合同生效（或合同效力恢复）之日起 90 日内（含）非因意外伤害导致身故，本公司按本合同实际交纳的保险费给付身故保险金，本合同终止。
                  被保险人因意外伤害导致身故或于本合同生效（或合同效力恢复）之日起 90 日后（不含）非因意外伤害导致身故，本公司按身故当时的基本保险金额给付身故保险金，本合同终止。
                </div>
              </div>
              <div class="ensure-inviolable-content-item">
                <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(1)">身体全残保障
                  <div class="ensure-inviolable-content-item-title-sub" v-if="formValue.guarantee_quota">{{ formValue.guarantee_quota / 10000 }}万
                    <i class="icon iconfont icon-arrow">&#xe60e;</i>
                  </div>
                </div>
                <div class="ensure-inviolable-content-item-shrink">
                  被保险人因意外伤害导致身体全残或于本合同生效（或合同效力恢复）之日起 90 日后（不含）非因意外伤害导致身体全残，本公司按身体全残当时的基本保险金额给付身体全残保险金，本合同终止.
    被保险人于本合同生效（或合同效力恢复）之日起 90 日内（含）非因意外伤害导致身体全残， 本公司按本合同实际交纳的保险费给付身体全残保险金，本合同终止。
                </div>
              </div>
            </div>
          </div>
          <product-description :source="source"></product-description>
          <mask-cover v-model="isLoading"></mask-cover>  
          <div v-transfer-dom>
            <popup v-model="selectPlaceShow" 
                   position="bottom" 
                   @on-hide="selectPlaceHide"
                   should-scroll-top-on-show>
              <div class="product-clause-content-popup">
                <div class="region-title">选择地区</div>
                <div class="region-selected clearfloat">
                  <span :class="{ selected: true, cur: regionLevel === 0 }"
                        @click="regionBack(0)">{{ regionTabs[0] }}</span>
                  <span :class="{ selected: regionLevel >= 2, cur: regionLevel === 1 }"
                        @click="regionBack(1)">{{ regionTabs[1] }}</span>
                  <span :class="{ selected: regionLevel >= 3, cur: regionLevel === 2 }">{{ regionTabs[2] }}</span>
                </div>
                <div class="region-lists">
                  <div v-if="!regionList.length" class="region-lists-loading">
                    <load-more></load-more>
                  </div>
                  <div class="region-list-item" 
                       v-for="item in regionList"
                       :key="item.id"
                       @click="regionSelect(item)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </popup>
          </div>
          <div v-transfer-dom>
            <popup v-model="isVocationShow" position="right" @on-hide="vocationClose">
              <vocation :prevVocation="prevVocation"
                        :vocationSelected="vocationSelected"
                        :vocationSearchNumber="vocationSearchNumber"
                        :vocationList="vocationList"
                        :productId="product_id"
                        vocationType="insured"
                        @vocationFetch="vocationFetch"
                        @vocationShow="vocationShow"
                        @vocationBack="vocationBack"
                        @selectItem="selectItem"></vocation>
            </popup>
          </div>
        </div>
        <div class="fixed-footer">
          <div class="fixed-footer-client">
              <div @click="jump2FaqList">
                <img class="fixed-footer-services" src="../../../../assets/image/sinosig/wddg/services-icon.png">
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
        <div v-transfer-dom>
          <popup v-if="healthAdviceShow" v-model="healthAdviceShow" position="bottom" should-scroll-top-on-show>
            <div class="product-clause-content-popup">
              <div class="health-notices-title">
                健康告知
                <div class="health-notices-close" @click.stop="healthAdviceShow = false">
                  <img src="../../../../assets/image/sinosig/wddg/close-icon.png">
                </div>
              </div> 
              <!-- healthAdvice -->
              <div class="health-notices-content" 
                   v-html="source.health_inform"></div>
              <div class="health-notices-operate">
                  <div class="health-notices-reject button" @click="warn">
                    <div>
                      <p>部分为是</p>
                    </div>
                  </div>
                  <div class="health-notices-accept button" @click="jump2InsureInfo"><span>全部为否</span></div>
              </div>
            </div>
          </popup>
        </div>
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
import vocation from '../components/vocation-selector';
import productDescription from '@/components/product-description';
import guaranteeEquities from '@/components/guarantee-equities';

import { PxToRem, calcAge } from '@/utils/common-utils';
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';
import { firstSharePage, sharePage } from '../sharePage';
import report from '@/utils/report';

import { healthAdvice } from '@/assets/data/tongfang/bbd/health_advice';
import lipeiAdvice from '@/assets/data/sinosig/wddg/lipei_advice';
import { getWapDetail, getWapCalc, getWapPlace, getWapVocation, getWapAttribute } from '@/utils/apis';


export default {
  name: 'damaiDetail',
  directives: {
    TransferDom
  },
  data () {
    return {
      healthAdvice,
      lipeiAdvice,
      channel_product_id: null,
      product_id: null,
      source: {},
      isLoading: false,
      showWarn: false,
      isVocationShow: false, // 职业类别显示变量, 测试时用true, 测试结束记得改回false
      selectPlaceShow: false,
      healthAdviceShow: false,
      date: '',
      formValue: {},
      guarantee_period: [],
      guarantee_quota: [],
      payment_period: [],
      vocationList: [],
      vocationSearchNumber: 0,
      vocationSelected: [],
      insured_birthday_min: '',
      insured_birthday_max: '',
      applicant_birthday_min: '',
      applicant_birthday_max: '',
      payment_period_format: '',
      payment_period_items_format: [],
      guarantee_quota_items: [],
      insure_for_self_items: [],
      applicant_immunity_items: [],
      applicant_gender_items: [],
      isInit: false,
      amount: null,
      placesList: [],
      listValue: [],
      regionTabs: ['请选择' , '请选择', '请选择'],
      regionData: [,,],
      regionList: [],
      regionLevel: null,
      regionName: '',
      claimsServiceShow: false,
      prevVocation: [],
      code: '',
      tabLocation: null,
      // 华贵新增变量
      guarantee_period_items: [],
      social_security_items: [],
      profressionText: '', // 职业拼凑字符串，用作缓存
      vocationArr: [] // 用作传参缓存的职业选取数组
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
    vocation,
    productDescription,
    guaranteeEquities
  },
  methods: {
    calcAge,
    PxToRem,
    // 固定页面
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
    // 问题页面跳转
    jump2FaqList () {
      console.log('11122')
      this.$router.push({ name: 'faq_list', query: { product_id: this.product_id }});
      unbindFreeze();
    },
    vocationBack() { // 职业浮层后退按钮
      this.prevVocationFetch(this.prevVocation[this.vocationSearchNumber - 2]);
    },
    // 健康告知警告
    warn() {
      this.showWarn = true;
    },
    changeGender (type) { // 性别更改
      this.formValue.insured_gender = type;
      (this.formValue.insure_for_self === 1) && (this.formValue.applicant_gender = type);
      this.fetchAttributes();
    },
    changeBirthday () {
      // (this.formValue.insure_for_self === 1) && (this.formValue.applicant_birthday = this.formValue.insured_birthday);
      this.fetchAttributes();
    },
    // changeInsureForSelf (type) {
    //   this.formValue.insure_for_self = type;
    //   type && (this.formValue.applicant_immunity = 0);
    //   type && (this.formValue.applicant_gender = this.formValue.insured_gender);
    //   type && (this.formValue.applicant_birthday = this.formValue.insured_birthday);
    
    //   this.fetchAttributes();
    // },
    // changeApplicantImmunity(type) {
    //   this.formValue.applicant_immunity = type;
    
    //   this.fetchAttributes();
    // },
    // changeApplicantGender(type) {
    //   this.formValue.applicant_gender = type;
    
    //   this.fetchAttributes();
    // },
    changeSocial_security (type) { // 有无社保
      this.formValue.social_security = type
      this.fetchAttributes();
    },
    // 获取页面属性
    fetchAttributes() {
      if (this.isInit) {
        this.$vux.loading.show({
          text: '正在加载中'
        });
    
        getWapAttribute([], this.attribution())
        .then(res => {
          if (res.data.code === 0) {
            this.$vux.loading.hide();
            const data = res.data.data;
            this.valueFormat(data);
            this.calcValue();
    
            this.$nextTick(() => {
              this.tabLocation = document.querySelector('.main-tabs').offsetTop;
            });
    
            // 分享 刷新页面参数
            sharePage(res.data.data, this.scode);
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text'
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'text'
          });
        })
      }
    },
    showHealthAdvice () {
      if (this.profressionText === '') {
        this.$vux.toast.show({
          text: '请先选择职业',
          type: 'text'
        });
        return
      }
      if (this.formValue.insured_personal_address_province) {
        this.healthAdviceShow = true;
      } else {
        this.$vux.toast.show({
          text: '请先填写投保区域',
          type: 'text'
        });
      }
    
    },
    infoStorage() {
      Object.keys(this.attribution()).forEach(item => {
        window.sessionStorage.setItem(item, this.attribution()[item]);
      });
    
      // 需额外把地区信息带过去填充
      window.sessionStorage.setItem('insured_personal_address_province_name', this.regionData[0].name);
      window.sessionStorage.setItem('insured_personal_address_city_name', this.regionData[1].name);
      window.sessionStorage.setItem('insured_personal_address_area_name', this.regionData[2].name || '');
    
      window.sessionStorage.setItem('channel_product_id', this.channel_product_id);
      window.sessionStorage.setItem('scode', this.scode);

      window.sessionStorage.setItem('share_cover', this.source.share_cover);
      window.sessionStorage.setItem('share_description', this.source.share_description);
      window.sessionStorage.setItem('share_title', this.source.title);
    },
    jump2InsureInfo() {
      if ((+this.amount * this.formValue.payment_period_value) > 200000) {
        this.$vux.toast.show({
          text: '单笔订单总保费(交费期间*首期保费)不能大于20万，请拆分保单投保',
          type: 'text'
        });
        return
      }
      this.infoStorage();
      // 缓存职业信息
      let professionObj = {
        name: this.profressionText,
        list: this.vocationArr
      }
      window.sessionStorage.setItem('professionObj', JSON.stringify(professionObj));
      this.$router.push({ name: 'huagui_damaiDetail_insureInfo'});
      unbindFreeze();
    },
    // 计算保费
    calcValue() {
      this.amount = null;
    
      getWapCalc([], this.calculate())
      .then(res => {
        if (res.data.code === 0) {
          this.amount = res.data.data.amount;
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
          this.amount = '--'
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    selectPlaceHide() {
      this.regionTabs = ['请选择' , '请选择', '请选择'];
      // this.regionData = [,,];
      this.regionLevel = 0;
    },
    selectPlace() {
      this.selectPlaceShow = true;
      const data = { product_id: this.product_id };
    
      this.regionList = [];
      getWapPlace([], data)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.regionList = data;
          this.regionLevel = 0;
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      })
    },
    regionBack(type) { // 地区选择， 返回上一级
      if (this.regionLevel === type) return;
      if (type === 0) {
        this.selectPlace();
        this.regionTabs = ['请选择', '请选择', '请选择'];
        this.regionLevel = 0;
      } else {
        this.regionTabs = [this.regionTabs[0], '请选择', '请选择'];
        this.regionLevel = 0;
        this.regionSelect(this.regionData[type - 1]);
      }
    },
    regionSelect(item) {
      this.regionTabs[this.regionLevel] = item.name;
      this.regionData[this.regionLevel] = item;
      const data = { product_id: this.product_id, parent_id: item.id};
    
      this.regionList = [];
      getWapPlace([], data)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.regionList = data;
          if (this.regionLevel === 2) {
            this.regionName = this.regionData.filter(i => i).map(y => y.name).join('-');
            this.selectPlaceShow = false;
            this.fetchAttributes();
          } else if (this.regionLevel === 1 && !res.data.data.length) {
            this.regionData[2] = { name: '', id: ''};
            this.regionName = this.regionData.filter(i => i.id).map(y => y.name).join('-');
            this.selectPlaceShow = false;
            this.fetchAttributes();
          } else {
            this.regionLevel += 1;
          }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
        
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      })
    },
    select_guarantee_quota() { // 保障期限、保障额度选择监听
      this.fetchAttributes();
    },
    select_payment_period () { // 缴费期限
      const format = this.payment_period_format;
      const value = format.split('_')[0];
      const unit = format.split('_')[1];
      this.formValue.payment_period_value = value;
      this.formValue.payment_period_unit = unit;
    
      this.fetchAttributes();
    },
    vocationClose () { // 浮层关闭时的逻辑
      this.vocationSearchNumber = 0;
      this.vocationSelected = [];
      this.prevVocation = [];
    },
    vocationShow() { // 触发浮层关闭
      this.isVocationShow = false;
    },
    searchVocation () { // 触发浮层打开
      this.isVocationShow = true;
      this.vocationFetch();      
    },
    selectItem (val) {
      this.vocationArr[2] = val // 备用
      this.profressionText = val.name
      this.formValue.insured_profession_id = val.id
      this.formValue.insured_profession_code = val.code || ''
      this.formValue.insured_profession_name = val.name
      this.vocationShow()
      this.fetchAttributes();
    },
    vocationFetch(parent) {
      if (parent) this.vocationSelected.push(parent);
      const params = parent ? { product_id: this.source.id, parent_id: parent.id }
                               : { product_id: this.source.id };  
      
      this.vocationList = [];
      getWapVocation([], params)
      .then(({data}) => { 
        this.prevVocation.push(parent);
        this.vocationList = data.data;
        this.vocationSearchNumber += 1;
        if (this.vocationList.length === 0 && this.vocationSearchNumber === 4) {
          let str = ''
          this.vocationSelected.map((item, idx) => str += item.name + (idx + 1 === this.vocationSelected.length ? '' : '-'))
          this.profressionText = str
          this.vocationArr = []
          this.vocationArr = this.vocationSelected
          this.formValue.insured_profession_id = this.vocationArr[2].id
          this.formValue.insured_profession_name = str
          this.formValue.insured_profession_code = this.vocationArr[2].code
          this.isVocationShow = false;
          this.fetchAttributes();
        }
      });
    },
    prevVocationFetch(prevParent) {
      this.vocationSelected.pop();
      const params = prevParent ? { product_id: this.source.id, parent_id: prevParent.id }
                               : { product_id: this.source.id }; 
    
      this.vocationList = [];
      getWapVocation([], params)
      .then(({data}) => { 
        this.prevVocation.pop();
        this.vocationList = data.data;
        this.vocationSearchNumber -= 1;
      });
    },
    pageInit() {
      this.isLoading = true;
      this.$vux.loading.show({
        text: '正在加载中'
      });
      // 获取页面初始化参数
      getWapDetail([], { scode: this.scode })
      .then(({data}) => {
    
        if (data.code === 0) {
          this.$vux.loading.hide();
          this.isLoading = false;
          this.source = data.data;
          this.product_id = data.data.id;
          this.channel_product_id = data.data.channel_product_id;
    
          this.valueFormat(data.data.attributes);
          this.calcValue();
    
          // 设置微信分享
          firstSharePage(data.data, this.scode);
    
          setTimeout(() => {
            this.isInit = true;
          }, 300);
    
          // 等待页面渲染队列加载完毕，tabTop能获取到正确位置
          setTimeout(() => {
            const tab = document.querySelector('.main-tabs');
            
            this.tabLocation = tab.offsetTop;
    
            window.addEventListener('scroll', () => {
              const windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
              if (windowScrollTop > this.tabLocation) {
                tab.classList.add('tab-fixed');
              } else {
                tab.classList.remove ('tab-fixed');
              }
            });
          }, 500);
        } else {
          this.$vux.toast.show({
            text: data.message,
            type: 'text'
          });
        }
        
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    // 返回保费计算所需数据
    calculate() {
      return {
        product_id: this.product_id,
        insured_birthday: this.formValue.insured_birthday,
        guarantee_period: +this.formValue.guarantee_period,
        payment_period_value: this.formValue.payment_period_value,
        payment_period_unit: this.formValue.payment_period_unit,
        guarantee_quota: this.formValue.guarantee_quota,
        guarantee_period: this.formValue.guarantee_period,
        insured_gender: this.formValue.insured_gender,
        social_security: this.formValue.social_security
        // insure_for_self: this.formValue.insure_for_self,
        // applicant_birthday: this.formValue.applicant_birthday,
        // applicant_immunity: this.formValue.applicant_immunity,
        // applicant_gender: this.formValue.applicant_gender
      }
    },
    // 返回页面属性所需数据
    attribution() {
      return {
          product_id: this.product_id,
          insured_birthday: this.formValue.insured_birthday,
          guarantee_period: +this.formValue.guarantee_period,
          payment_period_value: this.formValue.payment_period_value,
          payment_period_unit: this.formValue.payment_period_unit,
          guarantee_quota: this.formValue.guarantee_quota,
          insured_gender: this.formValue.insured_gender,
          // insure_for_self: this.formValue.insure_for_self,
          // applicant_immunity: this.formValue.applicant_immunity,
          // applicant_gender: this.formValue.applicant_gender,
          // applicant_birthday: this.formValue.applicant_birthday,
          insured_personal_address_province: this.regionData[0] && this.regionData[0].id || '',
          insured_personal_address_city: this.regionData[1] && this.regionData[1].id || '',
          insured_personal_address_area: this.regionData[2] && this.regionData[2].id || '',
          // 以下为华贵新增 社保-地址-职业
          social_security: this.formValue.social_security,
          insured_profession_id: this.formValue.insured_profession_id || '',
          insured_profession_name: this.formValue.insured_profession_name || '',
          insured_profession_code: this.formValue.insured_profession_code || '',
          annual_income: this.formValue.annual_income.default || ''
        }
    },
    // 格式化页面属性数据
    valueFormat (value) {
      this.formValue = Object.assign({}, this.formValue, {
        insured_birthday: value.insured_birthday.default,
        guarantee_period: value.guarantee_period.default,
        payment_period_value: value.payment_period.default.value,
        payment_period_unit: value.payment_period.default.unit,
        guarantee_quota: value.guarantee_quota.default,
        insured_gender: value.insured_gender.default,
        // insure_for_self: value.insure_for_self.default,
        // applicant_immunity: value.applicant_immunity.default,
        // applicant_gender: value.applicant_gender.default,
        // applicant_birthday: value.applicant_birthday.default,
        insured_personal_address_province: value.insured_personal_address_province.default && value.insured_personal_address_province.default.id || '',
        insured_personal_address_city: value.insured_personal_address_city.default && value.insured_personal_address_city.default || '',
        insured_personal_address_area: value.insured_personal_address_area.default && value.insured_personal_address_area.default || '',
        // 华贵新增
        annual_income: value.annual_income || '',
        social_security: (value.social_security && value.social_security.default),
        // 华贵新增职业属性
        insured_profession_id: value.insured_profession.default.id,
        insured_profession_name: value.insured_profession.default.name,
        insured_profession_code: value.insured_profession.default.code,
        // // 华贵新增
        profressionObj: {
          name: this.profressionText,
          list: this.vocationArr
        }
      });
    
      // 地区名称初始化
      if (value.insured_personal_address_province.default) {
        this.regionName = `${value.insured_personal_address_province.default.name}-${value.insured_personal_address_city.default.name}-${value.insured_personal_address_area.default.name}`;
        this.regionData = [value.insured_personal_address_province.default, value.insured_personal_address_city.default, value.insured_personal_address_area.default];
      }
      
      
      // 职业初始化
      this.profressionText = value.insured_profession.default.name || ''
    
      // 缴费期限default format
      this.payment_period_format = `${value.payment_period.default.value}_${value.payment_period.default.unit}`;
    
      // 缴费期限items format
      this.payment_period_items_format = value.payment_period.items.map(item => {
        return {
          label: item.label,
          value: `${item.value}_${item.unit}`
        }
      });
      console.log('1111111747', value, value.payment_period.items, this.payment_period_items_format, this.payment_period_format)
      // // 是否为本人items 
      // this.insure_for_self_items = value.insure_for_self.items.map(item => {
      //   return {
      //     label: item.label,
      //     value: item.value,
      //     is_valid: item.is_valid
      //   }
      // });
    
      // // 投保人性别items
      // this.applicant_gender_items = value.applicant_gender.items.map(item => {
      //   return {
      //     label: item.label,
      //     value: item.value
      //   }
      // });
      // // 投保人豁免
      // this.applicant_immunity_items = value.applicant_immunity.items.map(item => {
      //   return {
      //     label: item.label,
      //     value: item.value
      //   }
      // });

      // 保障期限
      this.guarantee_period_items = value.guarantee_period.items;
    
      // 保障额度
      this.guarantee_quota_items = value.guarantee_quota.items;

      // 有无社保
      this.social_security_items = (value.social_security && value.social_security.items);
    
      // 被保人生日最大最小限制
      this.insured_birthday_min = value.insured_birthday.max;
      this.insured_birthday_max = value.insured_birthday.min;
    
      // // 投保人生日最大最小限制
      // this.applicant_birthday_min = value.applicant_birthday.max;
      // this.applicant_birthday_max = value.applicant_birthday.min;
      
      this.guarantee_quota = value.guarantee_quota.items.map(item => {
        return {
          name: item.label,
          value: item.value
        }
      });
      this.payment_period = value.payment_period.items.map(item => {
        return {
          name: item.label,
          value: item.value
        }
      });
    },
    // 保障权益列表点击事件
    ensureTitleClick(type) {
      const titleGroup = document.querySelectorAll('.ensure-inviolable-content-item-title');
      const isCurrent = titleGroup[type].classList.contains('cur');
    
      [...titleGroup].forEach(item => {
        item.querySelector('.icon').innerHTML = '&#xe60e;';
        item.querySelector('.icon').style.color = '#B3B3B3';
        item.classList.remove('cur');
        item.nextElementSibling.classList.remove('cur');
      })
    
      if (!isCurrent) {
        titleGroup[type].querySelector('.icon').innerHTML = '&#xe608;';
        titleGroup[type].querySelector('.icon').style.color = '#ffa714';
        titleGroup[type].classList.add('cur');
        titleGroup[type].nextElementSibling.classList.add('cur');
      }
    
      this.$nextTick(() => {
        this.tabLocation = document.querySelector('.main-tabs').offsetTop;
      });
    },
    // 当前页面菜单栏微信配置，每个页面单独配置
    wxConfig () {
      try {
        wx.ready(function () {
            wx.showOptionMenu();
            wx.hideMenuItems({
             menuList: ['menuItem:copyUrl', 'menuItem:editTag', 'menuItem:delete', 
                        'menuItem:openWithQQBrowser', 'menuItem:originPage',
                        'menuItem:favorite', 'menuItem:openWithSafari'] 
            });
        });
      } catch (e) {
          console.log('该功能需要在微信配置已配置的前提下才能使用');
      }
    }
  },
  watch: {
    // 解决滚动穿透问题
    isVocationShow(v) {
      this.shouldBodyFreeze(v);
    },
    selectPlaceShow(v) {
      this.shouldBodyFreeze(v);
    },
    contentPopupShow(v) {
      this.shouldBodyFreeze(v);
    },
    claimsServiceShow(v) {
      this.shouldBodyFreeze(v);
    },
    healthAdviceShow(v) {
      this.shouldBodyFreeze(v);
    }
  },
  mounted () {
    const self = this;
    this.pageInit();
    console.log('process', process.env)
    if (process.env.DOMAIN !== 'http://m.proxy.cfb.com') {
      report(this);
    }
  
    window['openInformationPopup'] = function() {
      self.claimsServiceShow = true;
    }
  },
  created () {
    this.scode = this.$route.query.scode;
    
    // 微信设置
    this.wxConfig();
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
