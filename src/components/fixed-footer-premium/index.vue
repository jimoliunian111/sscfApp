<template>
    <div class="fixed-footer">
        <template v-if="status === statusEnum.unpaid">
            <div class="premium-txt">保费：<span>{{premium}}元</span></div>
            <a class="pay-button" href="javascript:void(0);" @click="goPay">立即支付</a>
        </template>
        <template v-else-if="status === statusEnum.paid && (policyFileUrl.filter(item=>{if(item.url){return item}})).length > 0">
            <!-- <a class="send-policy" :href="policyFileUrl" target="_blank">打开电子保单</a> -->
            <div class="send-policy" @click="openElectronicPolicy">打开电子保单</div>
        </template>
        <div v-transfer-dom>
          <popup style="height: 14rem;" v-if="electronicPolicyShow" v-model="electronicPolicyShow" position="bottom" should-scroll-top-on-show>
            <div class="information-main-title">电子保单
              <div class="health-notices-close" @click="electronicPolicyShow = false">
                <img src="../../assets/image/sinosig/wddg/close-icon.png">
              </div>
            </div>
            <div class="product-clause-content-popup" style="height: 14rem;">
                <div v-for="(item, index) in policyFileUrl" :key="index">
                    <a class="send-policy" :href="item.url" target="_blank"><div class="send-policy-name">{{item.name}}：</div><div class="send-policy-cn">{{item.policy_sn}} {{item.url ? '（已生成）': '（生成中）'}}</div></a>
                </div>
            </div>
          </popup>
        </div>
    </div>
</template>

<script>
import { orderStatusEnum } from '@/config/map-data.js';
import {
  TransferDom,
  Popup
} from 'vux';
export default {
    directives: {
      TransferDom
    },
    components: {
      Popup,
    },
    props: {
        premium: {
            type: String
        },
        status: {
            type: Number
        },
        policyFileUrl: {
            type: Array
        }
    },
    data() {
        return {
            statusEnum: orderStatusEnum,
            electronicPolicyShow: false,
            urlArray: []
        }
    },
    methods: {
        goPay() {
            this.$emit('toPay');
        },
        openElectronicPolicy() {
            this.electronicPolicyShow = true;
        }
    }
}

</script>

<style lang="scss">
@import "./index.scss";
.health-notices-close {
  width: .453333rem;
  height: .453333rem;
  position: absolute;
  top: 50%;
  right: .32rem;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  line-height: 1;
}
.information-main-title {
  height: 1.093333rem;
  line-height: 1.093333rem;
  border-bottom: .04rem solid #f5f5f5;
  text-align: center;
  font-size: .48rem;
  font-family: PingFangSC-Bold,sans-serif;
  color: #333;
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
.product-clause-content-popup {
    padding: 0 .48rem 0;
}
.product-clause-content-popup > div:first-child {
    margin-top: 1.093333rem;
}
.product-clause-content-popup > div > a {
    display: block;
    padding: .24rem 0;
    align-items: center;
    display: flex;
    font-size: .4rem;
    color: #333;
    border-top: 1px solid #e0d6d6;
}
.send-policy-name {
    width: 2.853333rem;
    font-weight: 500;
}
.send-policy-cn {
    width: 6.186667rem;
    align-items: center;
}
</style>
