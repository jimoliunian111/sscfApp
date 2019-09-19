<template>
  <div class="papers-num-module" v-if="certificate">
    <div class="main-content-item">
      <div class="main-content-item-title">证件号码</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" v-if="certificate.type.default === 1"
          @blur="recognize(certificate.number.default)"
          v-model="certificate.number.default" :placeholder="placeholder.name">
        <input type="text" class="validate-input" v-if="certificate.type.default !== 1"
          @blur="formChange(certificate.number.default)"
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
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    // 是身份证  执行recognize， 是护照执行formChange
    recognize (value) {
      if (this.type === 'applicant') {
        this.$emit('recognize', 'applicant_certificate_number', value)
      } else {
        this.$emit('recognize', 'insured_certificate_number', value)
      }
    },
    formChange (str, value) {
      if (this.type === 'applicant') {
        this.$emit('formChange', 'applicant_certificate_number', value)
      } else {
        this.$emit('formChange', 'insured_certificate_number', value)
      }
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
