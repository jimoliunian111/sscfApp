<template>
	<div class="form-item-module">
    <!-- <div class="product-info"> -->
      <div class="product-info-title" v-if="type === 'text'">
        <h3>{{ textInfo.name || ''}}</h3>
        <p>该产品由 {{ textInfo.company_name || ''}} 承保并负责理赔</p>  
      </div>
      <!-- <div class="product-info-form"> -->
        <div class="product-info-form-item" v-if="type === 'onlyShow'">
          <div class="product-info-form-item-title">{{title}}</div>
          <div class="product-info-form-item-content">
            <div>{{onlyShowInfo || '30天-45周岁'}}</div>
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
    birthday: { // 传进来的默认日期
      type: String
    }, 
    checkList: { // 传进来的check列表
      type: Array
    },
    actived: {
      type: Object,
      default: () => {
        return {
          value: 1
        }
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
    selectList: {
      type: Array
    },
    selected: {
      type: Object
    },
    textInfo: {
      type: Object
    },
    onlyShowInfo: {
      type: String
    },
    start_date: {
      type: String
    },
    end_date: {
      type: String
    }
  },
  data () {
    return {
      checked: {}
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
    changeBirthday (val) { // 日期变化监听
      this.$emit('update:birthday', val)
      this.$emit('getData')
    },
    changeGender (obj) { // 单选监听
      this.checked = obj
      this.$emit('getData', this.checked)
    },
    clickFunc () { // 职业类型对外暴露点击事件
      console.log('职业类型对外暴露点击事件professionClick')
      this.$emit('professionClick')
    },
    selectPlace () {
      // 请在父组件中引用region-module组件来配合使用
      console.log('地区选择方法regionClick')
      this.$emit('regionClick')
    },
    selectChange () { // 监听select选择
      console.log('对外暴露监听select选择', this.selected)
      this.$emit('getData', this.selected)
    },
    init () {
      this.checked = this.actived
//       if (this.type === 'datetime') {
//         this.datetimeInfo.date = this.datetimeInfo.insured_birthday
//         this.datetimeInfo.min_date = this.datetimeInfo.insured_birthday_min
//         this.datetimeInfo.max_date = this.datetimeInfo.insured_birthday_max
//       }
    }
  },
  created () {
    this.init()
  },
  computed: {
    str: {
      get () {
        return this.birthday
      },
      set (val) {
        
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import './form-item-module.scss';
</style>
