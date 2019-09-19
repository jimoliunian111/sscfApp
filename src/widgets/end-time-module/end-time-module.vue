<template>
  <div class="end-time-module" v-if="certificate">
    <div class="main-content-item" v-if="type === 'applicant'">
      <div class="main-content-item-title">失效时间</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate}">
        <datetime class="datetime info-datetime" v-model="certificate.valid_end_at.default"
          :start-date="applicantCertificateValid.valid_end_at.min" :end-date="applicantCertificateValid.valid_end_at.max"
          placeholder="请选择失效时间" @on-change="dateChange('applicant_certificate_valid_end_at')"></datetime>
        <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
      </div>
    </div>
    
    <div class="main-content-item" v-if="type === 'insured'">
      <div class="main-content-item-title">失效时间</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <datetime v-model="certificate.valid_end_at.default" class="datetime info-datetime"
          :start-date="insuredCertificateValid.valid_end_at.min"
          :end-date="insuredCertificateValid.valid_end_at.max" placeholder="请选择失效时间" @on-change="dateChange('insured_certificate_valid_end_at')"></datetime>
        <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {
    TransferDom,
    Popup,
    Datetime
  } from 'vux';
export default {
  name: 'end-time-module',
  props: {
    type: {
      type: String,
      default: 'applicant'
    },
    certificate: {
      type: Object
    },
    birthday: {
      type: Object
    },
    placeholder: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  components: {
    TransferDom,
    Popup,
    Datetime
  },
  methods: {
    dateChange (str) {
      this.$emit('dateChange', str)
    }
  },
  created () {

  },
  computed: {
    applicantCertificateValid () {
      let active = this.certificate.type.default;
      return this.certificate.type.items.filter(item => item.value === active)[0];
    },
    insuredCertificateValid () {
      let active = this.certificate.type.default;
      return this.certificate.type.items.filter(item => item.value === active)[0];
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
</style>
