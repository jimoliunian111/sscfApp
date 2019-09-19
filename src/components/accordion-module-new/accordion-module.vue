<template>
  <div class="accordion-module">
    <div class="ensure-inviolable" v-if="obj">
      <div class="common-title">
        <!-- <i class="icon iconfont">&#xe612;</i> -->
        <i class="icon iconfont" :class="obj.mainIcon || 'icon-dunpai'"></i>
        {{obj.title || '保障权益'}}
      </div>
      <div class="ensure-inviolable-content">
        <div class="ensure-inviolable-content-item" v-for="(item, idx) in obj.list" :key="idx">
          <div class="ensure-inviolable-content-item-title" @click="ensureTitleClick(idx)">
            {{item.itemTitle}}
            <div class="ensure-inviolable-content-item-title-sub">
              {{item.itemVal}}{{item.itemUnit || ''}}
              <i class="icon iconfont icon-arrow">{{item.itemIcon || '&#xe60e;'}}</i>
            </div>
          </div>
          <div class="ensure-inviolable-content-item-shrink">
            {{item.itemDesc || ''}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accordion-module',
  props: {
    obj: {
      type: Object,
      default: () => {
        return {
          title: '保障权益',
          mainIcon: 'icon-dunpai',
          list: [
            {
              itemTitle: '重大疾病保险金',
              itemVal: 1000,
              itemIcon: '',
              itemUnit: '',
              itemDesc: '若被保险人因意外伤害或于等待期后首次发病并经保险公司指定或认可的医院的专科医生确诊首次患有本合同约定的任意一种重大疾病，保险公司将按本合同的基本保险金额                         向被保险人给付重大疾病保险金（若被保险人同时符合一项以上重大疾病时，该给付以一次为限），给付后该种重大疾病的保险责任终止。本合同重大疾病保险金的给付次数                         以三次为限，且相邻两次重大疾病的确诊日期间隔须不小于365天，当重大疾病保险金累计给付达到三次后，本合同效力终止。'
            },
            {
              itemTitle: '附加投保人豁免保险费',
              itemVal: '豁免后期保险费',
              itemIcon: '',
              itemUnit: '',
              itemDesc: '若被保险人因意外伤害或于等待期后因疾病导致身故，全残或首次发病并经保险公司指定或认可的医院的专科医生确诊首次患有本附加合同约定的重大疾病或轻症疾病，则保                         险公司自下一个保险费约定支付日开始，豁免主合同及其附加合同后续应交纳的各期保险费至交费期限届满为止。'
            },
          ]
        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 手风琴点击事件
    ensureTitleClick(type) {
      const titleGroup = document.querySelectorAll('.accordion-module .ensure-inviolable-content-item-title');
      const isCurrent = titleGroup[type].classList.contains('cur');
    
      [...titleGroup].map(item => {
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
    
//       this.$nextTick(() => {
//         this.tabLocation = document.querySelector('.main-tabs').offsetTop;
//       });
    }
  }
}
</script>

<style lang="scss" scoped>
@import './accordion-module.scss';
// @import url(./accordion-module.css);
</style>
