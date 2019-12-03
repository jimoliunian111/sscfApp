<template>
  <div class="check-widget">
    <div class="product-info-form-item" v-if="checkObj">
      <div class="product-info-form-item-title" :style="titleStyle">{{title}}</div>
      <div class="product-info-form-item-content">

        <div class="product-info-form-item-radio"
            :class="{ cur: checkObj.checked.value === item.value }"
            @click="changeGender(item)" v-for="(item, idx) in checkObj.list" :key="item.value">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const conf = {
  checked: {
    value: 1
  },
  list: [
    {label: '选项1', value: 1},
    {label: '选项2', value: 2}
  ]
}
export default {
  name: 'check-widget',
  props: {
    title: {
      type: String
    },
    checkObj: {
      type: Object,
      default: () => {
        return conf
      }
    },
    titleStyle: {
      type: Object
    },
    verStr: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    changeGender (obj) { // 单选监听
      if (this.checkObj.checked.value === obj.value) return
      this.checkObj.checked = obj
      this.$emit('getData', obj, this.verStr)
    }
  },
  created () {

  },
  computed: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style lang="scss" scoped>
@import './form-item-module.scss';
</style>
