<template>
  <div class="start-time-module">
    <div class="main-content-item" v-if="type === 'applicant'">
      <div class="main-content-item-title">起效时间</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <datetime placeholder="请选择起效时间" class="datetime info-datetime"
          v-model="certificate.valid_start_at.default" :start-date="applicantCertificateValid.valid_start_at.min"
          :end-date="applicantCertificateValid.valid_start_at.max" @on-change="dateChange('applicant_certificate_valid_start_at')"></datetime>
        <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
      </div>
    </div>

    <div class="main-content-item" v-if="type === 'insured'">
      <div class="main-content-item-title">起效时间</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <datetime v-model="certificate.valid_start_at.default" class="datetime info-datetime"
          :start-date="insuredCertificateValid.valid_start_at.min" :end-date="insuredCertificateValid.valid_start_at.max"
          placeholder="请选择起效时间" @on-change="dateChange('insured_certificate_valid_start_at')"></datetime>
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
  name: 'start-time-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // 'applicant'  or 'insured'
    },
    certificate:{
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
    dateChange (val) {
      this.$emit('dateChange', val)
    }
  },
  created () {

  },
  computed: {
    applicantCertificateValid () {
      let active = this.certificate.type.default
      return this.certificate.type.items.filter(item => item.value === active)[0]
    },
    insuredCertificateValid () {
      let active = this.certificate.type.default
      return this.certificate.type.items.filter(item => item.value === active)[0]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.start-time-module {
  width: 100%;
}
</style>
