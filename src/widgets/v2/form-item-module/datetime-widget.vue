<template>
  <div>
    <div class="product-info-form-item" v-if="Object.keys(dateObj).length > 0">
      <div class="product-info-form-item-title" :style="titleStyle">{{title}}</div>
      <div class="product-info-form-item-content form-date">
        <div class="tar product-info-form-item-content-date">
          <datetime v-model="dateObj.date"
                    :start-date="dateObj.start_date"
                    :end-date="dateObj.end_date"
                    class="datepicker"
                    @on-change="changeBirthday"></datetime>
          <i class="icon iconfont icon-date">&#xe609;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Alert, TransferDom, Popup, Datetime, PopupPicker, Group, Cell, LoadMore  } from 'vux';
const conf = {
  date: '2019-06-12',
  start_date: '2019-06-5',
  end_date: '2020-06-12'
}
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    dateObj: {
      type: Object,
      default: () => {
        return conf
      }
    },
    verStr: {
      type: String,
      default: ''
    },
		titleStyle: {
			type: Object
		}
  },
  data () {
    return {

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
    changeBirthday (val) {
      this.$emit('getData', val, this.verStr)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './form-item-module.scss';
</style>
