<template>
  <div class="ensure-inviolable">
    <div class="common-title">
      <i class="icon iconfont">&#xe612;</i>保障权益
    </div>
    <div class="ensure-inviolable-content">
      <div class="ensure-inviolable-content-item">
        <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(0)">重大疾病保险金
          <div class="ensure-inviolable-content-item-title-sub" v-if="formValue.guarantee_quota">{{ formValue.guarantee_quota / 10000 }}万
            <i class="icon iconfont icon-arrow">&#xe60e;</i>
          </div>
        </div>
        <div class="ensure-inviolable-content-item-shrink" >
          若被保险人经保险公司认可的医院专科医生确诊首次患本合同约定的重大疾病（无论一种或多种），保险公司按照确诊时本合同的基本保险金额给付重大疾病保险金，本合同及附加合同效力终止。
        </div>
      </div>
      <div class="ensure-inviolable-content-item" 
            :class="{ hidden: !((light_disease_options.length && formValue.light_disease) || formValue.immunity_and_light_disease) }">
        <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(1)">轻症疾病保险金
          <div class="ensure-inviolable-content-item-title-sub" v-if="formValue.guarantee_quota">{{ formValue.guarantee_quota / 10000 * .2 }}万
            <i class="icon iconfont icon-arrow">&#xe60e;</i>
          </div>
        </div>
        <div class="ensure-inviolable-content-item-shrink">
          被保险人因意外伤害或于等待期后经保险公司认可的医院专科医生确诊首次患本附加合同约定的轻症疾病（无论一种或多种），保险公司按照主险合同保额的20%给付轻症疾病保险金，本附加合同效力终止。
        </div>
      </div>
      <div class="ensure-inviolable-content-item">
        <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(2)">身故保险金
          <div class="ensure-inviolable-content-item-title-sub" v-if="formValue.guarantee_quota">{{ formValue.guarantee_quota / 10000 }}万
            <i class="icon iconfont icon-arrow">&#xe60e;</i>
          </div>
        </div>
        <div class="ensure-inviolable-content-item-shrink">
          18周岁前：主险合同已交保险费；18周岁后：同主险保额。
          若被保险人身故，我们按照如下方式给付身故保险金，本合同效力终止：（1）若被保险人身故时未满18周岁，我们无息退还主险合同已交保险费。（2）若被保险人身故时已满18周岁，我们按照本合同的基本保险金额给付身故保险金。
        </div>
      </div>
      <div class="ensure-inviolable-content-item"
            :class="{ hidden: !(immunity_and_light_disease_options.length && formValue.immunity_and_light_disease) }">
        <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(3)">轻症疾病豁免保险费
          <div class="ensure-inviolable-content-item-title-sub">豁免后期保险费
            <i class="icon iconfont icon-arrow">&#xe60e;</i>
          </div>
        </div>
        <div class="ensure-inviolable-content-item-shrink">
          若被保险人因意外伤害或于等待期后经我们认可的医院专科医生确诊首次患本附加合同约定的轻症疾病（无论一种或多种），我们将豁免自确诊之日起主合同应交且未交的保险费，本附加合同效力终止。豁免保险费后，主合同视同正常交费的保险合同。
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
/* @import './index.css'; */
</style>
