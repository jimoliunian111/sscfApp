<template>
  <div class="check-widget">
    <div class="special-check-item-style" v-if="checkObj">
      <div class="item-title" :style="titleStyle">{{title}}</div>
      <div class="list-content">
        <div class="error-style-check" v-if="!placeholder.isValidate">
          <div class="error"></div>
        </div>
        <div class="list-item"
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
    placeholder: {
      type: Object,
      default: () => {
        return {
          isValidate: true,
          name: ''
        }
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
.special-check-item-style {
  width: 100%;
  padding: 0.22rem 0rem 0 0;
  box-size: border-size;
  border-top: 1px solid #EFEFEF;
  background: #fff;
  .item-title {
    margin-bottom: 0.2rem;
    line-height: 1;
    font-size: .4rem;
    color: #333;
    text-align: left;
  }
  .list-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    width: 100%;
    .list-item {
      padding: 0 .32rem;
      float: left;
      height: .72rem;
      line-height: .72rem;
      box-sizing: border-box;
      border: .026667rem solid #efefef;
      margin-right: .183333rem;
      margin-bottom: .183333rem;
      border-radius: .133333rem;
    }
    .list-item.cur {
      color: #ff9000;
      border-color: #ff9000;
    }
  }
}
.error-style-check {
  position: relative;
  width: 0.5rem;
  height: 0.8rem;
  .error::before {
    left: 0 !important;
    top: 0.15rem;
  }
}
</style>
