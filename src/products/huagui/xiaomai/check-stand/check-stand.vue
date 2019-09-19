<template>
  <div class="main" v-if="isInit">
    <div class="notice">
      请在今天<span>23:59</span>之前完成支付，逾期订单会自动取消
    </div>
    <div class="info">
        <div class="info-item">
            <div class="info-item-title">订单号</div>
            <div class="info-item-content">{{ order_sn }}</div>
        </div>
        <div class="info-item">
            <div class="info-item-title">商品名称</div>
            <div class="info-item-content">{{ source.product_name }}</div>
        </div>
    </div>

    <!-- 支付方式选择  银联或者微信 -->
    <div class="pay-way-box">
      <group>
        <radio :options="radio003" @on-change="change" :selected-label-style="{color: '#FF9900 !important'}" v-model="radioSelected">
          <template slot-scope="props" slot="each-item">
            <div class="radio-item-box">
              <div class="radio-icon-box"><img :src="props.icon" class="vux-radio-icon"></div>
              <div class="radio-title-box">{{ props.label }}</div>
            </div>
          </template>
        </radio>
      </group>
    </div>

    <div class="account-info-wrapper" v-if="radioSelected === 2">
      <div class="account-info-title">
        <i class="icon iconfont label-icon">&#xe601;</i>
        &nbsp;首期账户信息
      </div>
      <div class="account-info">
        <div class="account-item">
          <div class="account-item-title">
            帐户开户名
          </div>
          <div class="account-item-content">
            <input type="text" v-model="source.account_name.default" placeholder="请填写账户开户名" readonly>
          </div>
        </div>
        <!-- <div class="account-item">
          <div class="account-item-title">
            银行地区
          </div>
          <div class="account-item-content drop-down-lists"
               @click="selectPlace">
            <span>{{ regionName }}</span>
            <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
          </div>
        </div> -->
        <div class="account-item">
          <div class="account-item-title">
            开户银行
          </div>
          <div class="account-item-content drop-down-lists" @change="bankChange">
            <select v-model="source.account_bank.default.code">
              <option value="" disabled>请选择开户银行</option>
              <option v-for="item in bankList"
                      :key="item.code"
                      :value="item.code">{{ item.name }}</option>
            </select>
            <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
          </div>
        </div>
        <div class="account-item">
          <div class="account-item-title">
            借记卡号
          </div>
          <div class="account-item-content">
            <input type="text" v-model="source.debit_card_number.default" placeholder="请填写借记卡号">
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" v-if="!isPaying" class="pay-button" @click="pay">
      立即支付
    </a>
    <a href="javascript:void(0);" v-else class="pay-button waiting">
      立即支付
      <load-more class="result-loading"></load-more>
    </a>
    <!-- 银行地区浮层 -->
    <!-- <div v-transfer-dom>
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
    </div> -->
  </div>
</template>

<script>
import { LoadMore, TransferDom, Popup, PopupPicker, Radio, Group } from 'vux';
import { payDetail, pay, getPayStatus } from '@/utils/apis'; // 支付相关接口方法
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';

import { standType, payType, proposalStatus } from './stand-enum';

import { getBankDistrict, getWapBank } from '@/utils/apis'; // 银行列表、银行地区接口方法
import wxShareFreeze from '@/utils/freezeShare';

export default {
  directives: {
    TransferDom
  },
  components: {
    LoadMore,
    Popup,
    PopupPicker,
    Radio,
    Group
  },
  data() {
    return {
      isInit: false,
      order_sn: null,
      source: {},
      regionLevel: null,
      regionTabs: ['请选择' , '请选择'],
      regionData: [,],
      regionList: [],
      regionName: '',
      selectPlaceShow: false,
      bankList: [],
      isPaying: false,
      // 新增
      radio003: [
        {
          icon: require('../../../../assets/image/damai/wx_icon.png'),
          key: 1,
          value: '微信公众号'
        }, 
        {
          icon: require('../../../../assets/image/damai/yinlian_icon.png'),
          key: 2,
          value: '银联'
        }
      ],
      radioSelected: 2
    }
  },
  watch: {
    // selectPlaceShow(v) {
    //   this.shouldBodyFreeze(v);
    // }
  },
  created () {
    this.order_sn = this.$route.query.order_sn;
  },
  mounted () {
    this.getPayDetail();
    wxShareFreeze();
  },
  methods: {
    change (val, label) { // 监听支付方式变化
      console.log('change', val, label)
      this.radioSelected = val
    },
    bankChange () {
      console.log('银行变化', this.source.account_bank.default)
    },
    getBankList () { // 获取银行列表
      const data = {
        product_id: this.product_id
        // province_code: this.source.account_bank_district.province.default.code,
        // city_code: this.source.account_bank_district.city.default.code
      }
      getWapBank([], data).then(res => {
        this.bankList = res.data.data;
      }).catch(err => {
        console.log(err)
      });
    },
    getPayDetail() { // 获取订单信息
      payDetail([], { order_sn: this.order_sn }).then(res => {
        console.log('获取订单信息', res.data.data)
        this.source = res.data.data;
        this.product_id = this.source.product_id;
        // let bank_district_province = this.source.account_bank_district.province.default.name; // 华贵大麦无此需求， 故注释
        // let bank_district_city = this.source.account_bank_district.city.default.name; // 华贵大麦无此需求， 故注释
        // this.regionName = `${bank_district_province}-${bank_district_city}`; // 华贵大麦无此需求， 故注释
        this.getBankList();
        this.isInit = true;
      }).catch(err => {
        console.log('订单信息获取失败', err)
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    rolling () {
      getPayStatus([], { order_sn: this.order_sn }).then(res => {
        const status = res.data.data.proposal_status;
        if (status == proposalStatus.PENDING || status == proposalStatus.PAID) { // 如果在处理中  则每秒钟在请求一次状态
          setTimeout(() => {
            this.rolling();
          }, 1000);
        } else if (status == proposalStatus.DONE) { // 交易成功， 跳转订单成功页面
          this.$router.push({
            name: 'order_success',
            query: { order_sn: this.order_sn, type: 'damai' }
          });
        } else if (status == proposalStatus.PAY_FAILED || status == proposalStatus.CONFIRM_FAILED) { // 交易失败， 跳转订单失败页面
          this.$router.push({ name: 'order_fail', query: { message: res.data.data.proposal_err_reason } });
        }
      }).catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
        this.isPaying = false;
      });
    },
    pay () { // 支付方法
      const idCard = this.source.debit_card_number.default;
      if (this.radioSelected === 2) {
        if (!idCard) {
          this.$vux.toast.show({
            text: '请填写银行卡号',
            type: 'text'
          })
          return
        }
      }
      this.isPaying = true;
      const data = {
        order_sn: this.order_sn,
        pay_channel: this.radioSelected,
        debit_card_number: this.source.debit_card_number.default,
        account_bank_code: this.source.account_bank.default.code,
        account_name: this.source.account_name.default
      };
      pay([], data).then(res => {
        if (res.data.code !== 0) {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
          this.isPaying = false
          return
        }
        if (this.radioSelected === 1) {
          console.log('666666666', res)
          if (res.data.data.errorCode === '0000') {
            window.location.href = res.data.data.payUrl
          } else {
            this.$vux.toast.show({
              text: res.data.data.message,
              type: 'text'
            });
            this.isPaying = false;
          }
        } else {
          if (res.data.data.errorCode === '0000') {
            let status = res.data.data.status;
            if (+status === standType.success) {
              this.$router.push({
                name: 'order_success',
                query: { order_sn: this.order_sn, type: 'damai' }
              });
            } else if (status == standType.fail) {
              this.$router.push({ name: 'order_fail', query: { message: res.data.data.message } });
            } else if (status == standType.dealing) {
              // 等待中
              this.rolling();
            }
          } else {
            this.$vux.toast.show({
              text: res.data.data.message,
              type: 'text'
            });
            this.isPaying = false;
          }
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    }
    // selectPlaceHide() { // 隐藏地区选择浮层， 华贵大麦无此需求， 故注释
    //   this.regionTabs = ['请选择' , '请选择'];
    //   // this.regionData = [,,];
    //   this.regionLevel = 0;
    // },
    // selectPlace() { // 选择地区方法， 华贵大麦无此需求， 故注释
    //   this.selectPlaceShow = true;
    //   const data = { product_id: this.product_id };
    //   this.regionList = [];
    //   getBankDistrict([], data)
    //   .then(res => {
    //     if (res.data.code === 0) {
    //       const data = res.data.data;
    //       this.regionList = data;
    //       this.regionLevel = 0;
    //     } else {
    //       this.$vux.toast.show({
    //         text: res.data.message,
    //         type: 'text'
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     this.$vux.toast.show({
    //       text: err,
    //       type: 'text'
    //     });
    //   })
    // },
    // regionBack(type) { // 地区后退方法
    //   if (this.regionLevel === type) return;
    //   if (type === 0) {
    //     this.selectPlace();
    //     this.regionTabs = ['请选择', '请选择'];
    //     this.regionLevel = 0;
    //   } else {
    //     this.regionTabs = [this.regionTabs[0], '请选择'];
    //     this.regionLevel = 0;
    //     this.regionSelect(this.regionData[type - 1]);
    //   }
    // },
    // regionSelect(item) { // 银行地区选择
      // this.regionTabs[this.regionLevel] = item.name;
      // this.regionData[this.regionLevel] = item;
      // const data = { product_id: this.product_id, parent_id: item.id};
      // this.regionList = [];
      // getBankDistrict([], data)
      // .then(res => {
      //   if (res.data.code === 0) {
      //     const data = res.data.data;
      //     this.regionList = data;
      //     if (this.regionLevel === 1) {
      //       this.regionName = this.regionData.filter(i => i).map(y => y.name).join('-');
            // this.source.account_bank_district.province.default = this.regionData[0];
            // this.source.account_bank_district.city.default = this.regionData[1];
            // this.source.account_bank.default.id = '';
            // this.source.account_bank.default.name = '';
            // this.getBankList();
            // this.selectPlaceShow = false;
          // } else {
            // this.regionLevel += 1;
          // }
        // } else {
          // this.$vux.toast.show({
            // text: res.data.message,
            // type: 'text'
          // });
        // }
      // })
      // .catch(err => {
      //   this.$vux.toast.show({
      //     text: err,
      //     type: 'text'
      //   });
      // })
    // },
    // shouldBodyFreeze(v) {
    //   if (v) {
    //     this.bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     bindFreeze(); 
    //   } else {
    //     unbindFreeze();
    //     document.documentElement.scrollTop = this.bodyTop;
    //     document.body.scrollTop = this.bodyTop;
    //   }
    // },
  }
}
</script>

<style>
html, body {
  background-color: #f5f5f5 !important;
}
</style>

<style scoped>
@import url(./check-stand.css);
.radio-item-box {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.radio-icon-box {
  width: 0.66rem;
  margin-right: 0.4rem;
}
.radio-icon-box img {
  width: 100%;
}
.radio-title-box {
  flex: 1;
}
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  color: #ff9900 !important;
}
</style>


