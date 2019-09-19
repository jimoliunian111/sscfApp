<template>
	<div class="form-item-module">
    <!-- <div class="product-info"> -->
      <div class="product-info-title" v-if="type === 'text'">
        <h3>{{ textInfo.name || '222'}}</h3>
        <p>该产品由 {{ textInfo.company_name || 222}} 承保并负责理赔</p>  
      </div>
      <!-- <div class="product-info-form"> -->
        <div class="product-info-form-item" v-if="type === 'onlyShow'">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content">
            <div>{{onlyShowInfo.value || '30天-45周岁'}}</div>
          </div>
        </div>
        <div class="product-info-form-item" v-if="type === 'datetime' && datetimeObj">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content form-date">
            <div class="tar product-info-form-item-content-date">
              <datetime v-model="datetimeObj.date" 
                        :start-date="datetimeObj.min_date"
                        :end-date="datetimeObj.max_date"
                        class="datepicker"
                        @on-change="changeBirthday"></datetime>
              <i class="icon iconfont icon-date">&#xe609;</i>
            </div>
          </div>
        </div>
        <div class="product-info-form-item" v-if="type === 'check'">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content">
            
            <div class="product-info-form-item-radio" 
                :class="{ cur: checked.value === item.value }"
                @click="changeGender(item)" v-for="(item, idx) in checkList" :key="item.value">{{item.label}}</div>
          </div>
        </div>
        <div class="product-info-form-item" v-if="type === 'profession'">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content">
            <div>{{professionObj.title || '1-4类'}}</div>
            <div class="product-info-form-item-vocation" @click="clickFunc">查询</div>
          </div>
        </div>
        <div class="product-info-form-item area" v-if="type === 'region'">
          <div class="product-info-form-item-title">
            {{title}}
          </div>
          <div class="product-info-form-item-content">
            <span class="product-info-name"
                  v-if="regionObj.value"
                  @click="selectPlace">
              {{ regionObj.value }}
            </span>
            <div class="product-info-form-item-vocation"
                 v-if="!regionObj.value"
                 @click="selectPlace">请选择</div>
          </div>
        </div>
        <div class="product-info-form-item" v-if="type === 'select'">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content">
            <div class="product-info-form-item-select" @change="selectChange">
              <select v-if="selectObj.selected" 
                      v-model="selectObj.selected.value">
                <option v-for="(item, idx) in selectObj.list"
                        :key="item.value"
                        :value="item.value">{{ item.label }}</option> 
                
              </select>
              <img class="product-info-form-item-select-arrow" 
                   src="../../assets/image/sinosig/wddg/arr-select-icon.png">
            </div>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { Alert, TransferDom, Popup, Datetime, PopupPicker, Group, Cell, LoadMore  } from 'vux';
export default {
  name: 'form-item-module',
  directives: {
    TransferDom
  },
  props: {
    type: { // 引用类型: onlyShow/text/datetime/check/profession/region/select
      type: String,
      default: 'onlyShow'
    },
    title: { // 引用标题
      type: String
    },
    datetimeObj: { // 传进来的默认日期对象
      type: Object
    }, 
    checkList: { // 传进来的check列表
      type: Array,
      default: () => {
        return [
          {label: '男', value: 1},
          {label: '女', value: 2}
        ]
      }
    },
    professionObj: { // 传进来的默认职业对象
      type: Object,
      default: () => {
        return {
          title: '1-4类'
        }
      }
    },
    regionObj: {
      type: Object,
      default: () => {
        return {
          id: 146,
          value: '北京'
        }
      }
    },
    selectObj: { // 传入的默认选择属性对象
      type: Object,
      default: () => {
        return {
          selected: {label: '十年', value: 1},
          list: [
            {label: '十年', value: 1},
            {label: '二十年', value: 2}
          ]
        }
      }
    }
  },
  data () {
    return {
      textInfo: {},
      onlyShowInfo: {},
//       datetimeInfo: { // 日期对象
//         insured_birthday: '',
//         insured_birthday_min: '',
//         insured_birthday_max: ''
//       },
      checked: {
        value: 1
      },
      selected: {}
    }
  },
  components: {
    Popup,
    Datetime,
    PopupPicker,
    Group,
    Cell,
    LoadMore,
    Alert
  },
  methods: {
    changeBirthday () { // 日期变化监听
      this.$emit('getData', this.datetimeObj)
    },
    changeGender (obj) { // 单选监听
      this.checked = obj
      this.$emit('getData', this.checked)
    },
    clickFunc () { // 职业类型对外暴露点击事件
      console.log('职业类型对外暴露点击事件btnClick')
      this.$emit('btnClick')
    },
    selectPlace () {
      // 请在父组件中引用region-module组件来配合使用
      console.log('地区选择方法regionClick')
      this.$emit('regionClick')
    },
    selectChange () { // 监听select选择
      console.log('对外暴露监听select选择', this.selectObj.selected)
      this.$emit('getData', this.selectObj.selected)
    },
    init () {
//       if (this.type === 'datetime') {
//         this.datetimeInfo.date = this.datetimeInfo.insured_birthday
//         this.datetimeInfo.min_date = this.datetimeInfo.insured_birthday_min
//         this.datetimeInfo.max_date = this.datetimeInfo.insured_birthday_max
//       }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import './form-item-module.scss';
</style>
