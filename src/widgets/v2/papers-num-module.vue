<template>
  <div class="papers-num-module" v-if="certificate">
    <div class="main-content-item">
      <div class="main-content-item-title">证件号码</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" @blur="blurFunc(certificate.number.default)"
          v-model="certificate.number.default" :placeholder="placeholder.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'papers-num-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // 'applicant' 或者 'insured'
    },
    certificate: {
      type: Object // 传入 formValue.applicant.certificate或者 formValue.applicant.certificate
    },
    placeholder: { // validatePlaceholders.insured_certificate_number
      type: Object
    },
    verStr: {
      type: String
    },
    extra: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    blurFunc (value) {
      this.$emit('getData', this.verStr, value, this.extra)
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
.papers-num-module {
  width: 100%;
}
</style>
