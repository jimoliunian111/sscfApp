<template>
  <div class="failure-module" v-if="certificate">
    <div class="main-content-item">
      <div class="main-content-item-title">失效时期</div>
      <div class="main-content-item-content">
        <div class="main-content-item-content-radio certificate-default-radio" v-for="item in applicantCertificateValid.is_long_term"
          :key="item.value" :class="{ cur: certificate.is_long_term.default === item.value }"
          @click="change_failure_time_type(item.value, type)">{{ item.label }}</div>
      </div>
    </div>

    <!-- <div class="main-content-item" v-if="type === 'insured'">
      <div class="main-content-item-title">失效时期</div>
      <div class="main-content-item-content">
        <div class="main-content-item-content-radio certificate-default-radio" v-for="item in insuredCertificateValid.is_long_term"
          :key="item.value" :class="{ cur: (calcAge(birthday.default) >= 46 && item.value === 1)
                          || (calcAge(birthday.default) < 46 && item.value === 0) }"
          @click="change_failure_time_type(item.value, 'insured')">{{ item.label }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { calcAge } from '@/utils/common-utils';
export default {
  name: 'failure-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // 'applicant' or 'insured'
    },
    birthday: {
      type: Object
    },
    certificate: {
      type: Object
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
    calcAge,
    change_failure_time_type (value, str) {
      this.$emit('change_failure_time_type', value, str, this.extra)
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
@import '@/assets/styles/main.scss';
.failure-module {
  width: 100%;
}
</style>
