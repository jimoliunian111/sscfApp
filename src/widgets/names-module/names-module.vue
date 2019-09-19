<template>
  <div class="names-module" v-if="name">
    <div class="main-content-item">
      <div class="main-content-item-title">{{type === 'applicant' ? '投保人姓名' : '被保人姓名'}}</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input"
          @blur="blurFunc(verity, name.default)" v-model="name.default"
          :placeholder="placeholder.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'names-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // 'applicant' 或者 'insured'
    },
    name: {
      type: Object,
      required: true
    },
    placeholder: {
      type: Object
    },
    verity: { // insured_name or applicant_name
      type: String,
      default: 'applicant_name'
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    blurFunc (str, value) {
      this.$emit('formChange', str, value)
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

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.names-module {
  width: 100%;
}
.main-content .main-content-item:last-child {
  // border-bottom: 0;
}
.main-content-item {
  padding: .32rem 0;
  border-bottom: .04rem solid #efefef;
  display: flex;
  align-items: center;
}
.main-content-item-title {
  font-size: .4rem;
  color: #333;
  width: 31.713%;
  font-family: PingFangSC-Regular,sans-serif!important;
}
.main-content-item-content {
  font-size: .4rem;
  color: #333;
  line-height: 1;
  width: 68.287%;
  position: relative;
  font-family: PingFangSC-Regular,sans-serif!important;
  display: flex;
  align-items: center;
}
.main-content-item-content input {
  width: 90%;
  outline: 0;
  border: 0;
  font-family: PingFangSC-Regular,sans-serif!important;
}
.main-content-item {
  padding: .32rem 0;
  border-bottom: .04rem solid #efefef;
  display: flex;
  align-items: center;
}
.main-content-item-content-radio {
  padding: 0 .32rem;
  height: .666667rem;
  line-height: .666667rem;
  border: .026667rem solid #f0f0f0;
  border-radius: .133333rem;
  color: #333;
  margin-right: .2rem;
}
.certificate-default-radio {
  color: #ccc;
}
.main-content-item-content-radio.cur {
  color: #ff9000;
  border-color: #ff9000;
}
.main-content-item-content-radio:last-child {
  margin-right: 0;
}
.main.no-padding-top {
  padding-top: 0;
}
.main.padding-bottom-footer {
  padding-bottom: 1.306667rem;
}
.color-orange {
  color: #ff9000!important;
}
.error::before {
  position: absolute;
  left: -.4rem;
  content: "";
  width: .373333rem;
  height: .373333rem;
  background: url(../../assets/image/sinosig/wddg/error-icon.png) no-repeat;
  background-size: contain;
  margin-right: .12rem;
}
.error .placeholder {
  color: red !important;
}
.error select {
  color: red !important;
}
.placeholder {
  color: #999;
}
.main-content-item .email-lists {
  position: absolute;
  right: 0;
  top: 100%;
  width: 68.287%;
  z-index: 2000;
  background: #fff;
  border: .04rem solid #efefef;
}
.main-content-item .email-lists > li {
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: .4rem;
  color: #414141;
  padding-left: .306667rem;
  width: 100%;
  box-sizing: border-box;
  display: block;
}
.main-content-item .email-lists>li.selected {
  background: #ececec;
}
.pr {
  position: relative;
}
.validate-input.disabled,
.check-icon.disabled {
  pointer-events: none;
}

</style>
