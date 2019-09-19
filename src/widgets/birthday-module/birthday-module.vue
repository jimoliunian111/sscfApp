<template>
  <div class="birthday-module" v-if="birthday">
    <div class="main-content-item" v-if="type === 'applicant'">
      <div class="main-content-item-title">出生日期</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <span v-if="!placeholder.isValidate">{{placeholder.name}}</span>
        <span v-else>{{ birthday.default }}</span>
      </div>
    </div>
    
    <div class="main-content-item" v-if="type === 'insured'">
      <div class="main-content-item-title">出生日期</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate}">
        <span v-if="certificate.type.default === 1">{{ birthday.default }}</span>
        <datetime v-model="birthday.default" class="datetime info-datetime" :class="{ disabled: disabled  }"
          v-else :start-date="birthday.max" :end-date="birthday.min"
          placeholder="请选择出生日期" @on-change="dateChange('insured_birthday')"></datetime>
        <img class="arrow-right-icon" v-if="certificate.type.default !== 1" src="../../assets/image/sinosig/wddg/arr-right-icon.png"
          alt="">
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
  name: 'birthday-module',
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
    },
    disabled: {
      type: Boolean,
      default: true
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

  },
  created () {

  },
  computed: {
    // applicantCertificateValid () {
    //   let active = this.certificate.type.default;
    //   return this.certificate.type.items.filter(item => item.value === active)[0];
    // },
    // insuredCertificateValid () {
    //   let active = this.certificate.type.default;
    //   return this.certificate.type.items.filter(item => item.value === active)[0];
    // }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.birthday-module {
  width: 100%;
}
</style>
