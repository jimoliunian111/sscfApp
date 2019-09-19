<template>
  <div class="back-online">
    <div class="back-online-header">
      <img src="../../../assets/image/damai/online-logo.png" />
      <div class="order-info" v-if="dataObj">
        <div class="product-info">
          <p class="product-info-title">{{dataObj.product_name}}</p>
          <p class="product-info-subtitle">尊敬的客户您好，感谢您购买[华贵大麦定期寿险]。为了维护您的权益，现根据监管的要求对您进行一次服务性回访。本次回访将通过系统记录并存档，请您认真核对以下信息：</p>
        </div>
        <div class="order-info-list">
          <div class="order-info-item">
            <div class="order-info-item-left">您的保单号</div>
            <div class="order-info-item-right">{{dataObj.policy_sn}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">投保人姓名</div>
            <div class="order-info-item-right">{{dataObj.policy_holder && dataObj.policy_holder.name}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">投保人证件号码</div>
            <div class="order-info-item-right">{{dataObj.policy_holder && dataObj.policy_holder.certificate_number || ''}}</div>
          </div>
          <div class="order-info-item align-items">
            <div class="order-info-item-left">联系地址</div>
            <div class="order-info-item-right">{{address || ''}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">联系电话</div>
            <div class="order-info-item-right">{{dataObj.recognizee_policy && dataObj.recognizee_policy.mobile || ''}}</div>
          </div>
         <!-- <div class="order-info-item">
            <div class="order-info-item-left">被保人</div>
            <div class="order-info-item-right">{{dataObj.recognizee_policy && dataObj.recognizee_policy.name}}</div>
          </div> -->
          <div class="order-info-item">
            <div class="order-info-item-left">保险期限</div>
            <div class="order-info-item-right">{{dataObj.insurance_plan && dataObj.insurance_plan.guarantee_period}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">保额</div>
            <div class="order-info-item-right">{{dataObj.insurance_plan && dataObj.insurance_plan.guarantee_quota}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">交费年限</div>
            <div class="order-info-item-right">{{dataObj.insurance_plan && dataObj.insurance_plan.payment_period_str}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-item-left">生效日期</div>
            <div class="order-info-item-right">{{dataObj.insurance_plan && dataObj.insurance_plan.guarantee_time}}</div>
          </div>
          <!-- <div class="order-info-item">
            <div class="order-info-item-left">生效日期</div>
            <div class="order-info-item-right">{{dataObj.insurance_plan && dataObj.insurance_plan.final_guarantee_time}}</div>
          </div> -->
          <div class="order-info-item">
            <div class="order-info-item-left">保费</div>
            <div class="order-info-item-right">{{dataObj.premium}}</div>
          </div>
        </div>
      </div>
      <div class="order-desc">
        <p class="order-desc-item">1、您投保的保单信息和上面显示的信息一致吗？</p>
        <p class="order-desc-item">2、您是否收到电子版保险合同？</p>
        <p class="order-desc-item">3、请问您是否阅读投保提示，对保险条款中的保险责任、责任免除是否都清楚？</p>
        <p class="order-desc-item">4、保险合同承保日起20个自然日内为犹豫期，在20天内您享有全额退保的权益，20天后选择退保，您可能会承担一定损失，请问您了解吗？</p>
      </div>
      <div class="sure-btn" :class="{'sure-btn-disable': isBacked}" @click="sureFunc">{{isBacked ? '已回访' : '确认回访'}}</div>
    </div>
    
    <div class="fail-popup" @touchmove.prevent :class="{ hide: isModalHide }" @click="closeModal">
        <div>
            <h3>您已完成在线回访</h3>
            <h4>我们将在6日内给您致电进行满意度调查，请您注意接听华贵保险官方客服电话<span class="primary-font-color">0851-88574001</span></h4>
            <div class="online-return-btn">确认</div>
            <img class="popup-close" src="../../../assets/image/order/close-icon.png" />
        </div>
    </div>
  </div>
</template>

<script>
  import {
    orderSuccess,
    visit
  } from '../../../utils/apis';
  import wxShareFreeze from '@/utils/freezeShare';
  import {
    XButton
  } from 'vux'
export default {
  name: 'back-online',
  data () {
    return {
      source: {},
      isModalHide: true, // 显示弹框
      dataObj: {},
      isBacked: false // 是否已回访
    }
  },
  components: {

  },
  methods: {
    closeModal(e) {
      if (e.target === document.querySelector('.fail-popup') || e.target === document.querySelector('.popup-close') || 
      e.target === document.querySelector('.online-return-btn')) {
        this.isModalHide = true;
      }
    },
    sureFunc () {
      if (this.isBacked) return
      this.visitFunc()
    },
    visitFunc () { // 华贵新增回访
      this.$vux.loading.show({
       text: '请稍后...'
      })
      let params = {
        order_sn: this.$route.query.order_sn
      }
      visit([], params).then(res => {
        console.log('回访请求返回的信息', res)
        this.$vux.loading.hide()
        if (res.data.data.code === 0) {
          console.log('回访成功', res.data.data)
          this.isModalHide = false
          this.isBacked = true
          // this.$router.push({name: 'online_back', query: {order_sn: this.$route.query.order_sn}})
        } else {
          console.log('回访失败', res.data.data)
          this.$vux.toast.show({
            text: res.data.data.msg || '回访失败',
            type: 'text'
          });
        }
      }).catch(res => {
        console.log('回访请求失败返回的信息', res)
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: res.data.data.msg || '回访失败',
          type: 'text'
        });
      })
    }
  },
  created () {
    wxShareFreeze();
  
    const order_sn = this.$route.query.order_sn;
    //   this.source = query;
    orderSuccess([], {
        order_sn
      })
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.dataObj = res.data.data
          console.log('订单信息', res.data.data)
          // this.source = {
          //   pay_sn: data.payment.pay_sn,
          //   policy_sn: data.policy_sn,
          //   policy_holder: data.policy_holder.name,
          //   recognizee_policy: data.recognizee_policy.name,
          //   guarantee_period: data.insurance_plan.guarantee_period,
          //   guarantee_quota: data.insurance_plan.guarantee_quota,
          //   guarantee_time: data.insurance_plan.guarantee_time,
          //   final_guarantee_time: data.insurance_plan.final_guarantee_time,
          //   risk: riskResult,
          //   premium: data.premium
          // }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
  },
  computed: {
    address () {
      return `${this.dataObj.policy_holder.province_name}-${this.dataObj.policy_holder.city_name}-${this.dataObj.policy_holder.district_name}-${this.dataObj.policy_holder.addr}`
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/main.scss';
.back-online {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background: #fff;
}
.back-online-header {
  width: 100%;
  img {
    width: 100%;
  }
}
.order-info {
  width: 100%;
}
.product-info {
  width: 100%;
  overflow: hidden;
  padding: rem(0) rem(20);
  box-sizing: border-box;
}
.product-info-title {
  width: 100%;
  text-align: center;
  font-size: rem(36);
  font-weight: bold;
  line-height: 1;
  margin-top: rem(70);
}
.product-info-subtitle {
  width: 100%;
  text-align: justify;
  font-size: rem(24);
  line-height: 1.4;
  margin-top: rem(30);
}
.order-info-list {
  width: 100%;
  padding: rem(0) rem(20);
  box-sizing: border-box;
  margin-top: rem(20);
}
.order-info-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  padding: rem(15) 0;
  box-sizing: border-box;
}
.order-info-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  border-top: 1px solid #efefef;
}
.order-info-item:last-of-type:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  border-bottom: 1px solid #efefef;
}
.order-info-item-left {
  width: rem(200);
  text-align: left;
  font-size: rem(24);
  color: #AD987B;
}
.order-info-item-right {
  flex: 1;
  text-align: right;
  font-size: rem(24);
}
.align-items {
  align-items: flex-start;
}
.order-desc {
  width: 100%;
  padding: rem(0) rem(20);
  box-sizing: border-box;
  margin-top: rem(20);
}
.order-desc-item {
  width: 100%;
  font-size: rem(24);
  margin: rem(15) 0;
}
.sure-btn {
  width: rem(300);
  margin: rem(20) auto rem(30) auto;
  border-radius: rem(30);
  line-height: rem(55);
  text-align: center;
  color: #fff;
  font-size: rem(24);
  background: linear-gradient(to left, #ffaa00, #ff9900);
  background: -webkit-linear-gradient(to left, #ffaa00, #ff9900);
}

.fail-popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .fail-popup>div {
    background: #fff;
    border-radius: .266667rem;
    text-align: center;
    color: #333;
    padding: 0.8rem 0.5rem 0.48rem 0.5rem;
    width: 6.733333rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 5.4rem;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
  
  .fail-popup>div>h3 {
    font-size: .48rem;
    font-family: PingFangSC-Bold, sans-serif;
    line-height: 1;
    padding-bottom: .36rem;
  }
  
  .fail-popup>div>h4 {
    font-size: .373333rem;
    line-height: 1;
    padding-bottom: .8rem;
  }
  
  .fail-popup>div>a, .fail-popup>div>.online-return-btn {
    width: 4.773333rem;
    height: 1.066667rem;
    line-height: 1.066667rem;
    background: url("../../../assets/image/order/call-bg.png") no-repeat;
    background-size: cover;
    display: block;
    text-align: center;
    color: #fff;
    font-size: .48rem;
    font-family: PingFangSC-Bold, sans-serif;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  .fail-popup>div>a:hover {
    text-decoration: none;
  }
  
  .fail-popup>div>a:before {
    content: '';
    width: .453333rem;
    height: .48rem;
    background: url("../../../assets/image/order/call-icon.png") no-repeat;
    background-size: cover;
    margin-right: .133333rem;
  }
  
  .fail-popup>div>.popup-close {
    width: .453333rem;
    height: .453333rem;
    position: absolute;
    right: -0.586667rem;
    top: -0.586667rem;
  }
  .hide {
    display: none;
  }
  .primary-font-color {
    color: #ff9900;
  }
  .sure-btn-disable {
    width: rem(300);
    margin: rem(20) auto rem(30) auto;
    border-radius: rem(30);
    line-height: rem(55);
    text-align: center;
    color: #fff;
    font-size: rem(24);
    background: linear-gradient(to left, #ddd, #ccc);
    background: -webkit-linear-gradient(to left, #ddd, #ccc);
  }
</style>
