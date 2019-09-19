<template>
  <div class="mobile-num-module" v-if="mobile">
    <div class="main-content-item" v-if="type === 'applicant'">
      <div class="main-content-item-title">手机号码</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" :class="{ disabled: disabled }"
          @blur="formChange('applicant_mobile', mobile.default)" v-model="mobile.default"
          :placeholder="placeholder.name">
      </div>
    </div>
    
    <div class="main-content-item" v-if="type === 'insured'">
      <div class="main-content-item-title">手机号码</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" :class="{ disabled: disabled }" 
        @blur="formChange('insured_mobile', mobile.default)"
          v-model="mobile.default" :placeholder="placeholder.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile-num-module',
  props: {
    type:{
      type: String,
      default: 'applicant'
    },
    mobile: {
      type: Object
    },
    placeholder: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    formChange (str, val) {
      this.$emit('formChange', str, val)
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
.mobile-num-module {
  width: 100%;
}
</style>
