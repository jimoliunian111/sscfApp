<template>
  <div class="papers-type-module" v-if="certificate && list.length > 0">
    <div class="main-content-item">
      <div class="main-content-item-title">证件类型</div>
      <div class="main-content-item-content">
        <div class="main-content-item-content-radio"  v-if="!useSelect"
          :class="{ cur: item.value === certificate.type.default }"
          v-for="item in list" :key="item.value"
          @click="changeFunc(item.value)">{{ item.label }}</div>

        <div class="main-content-item-content-select" v-if="useSelect">
          <select @change="changeFunc(certificate.type.default)"
                  v-model="certificate.type.default"
                  :class="{ selected: true }">
            <option value="" disabled>请选择证件类型</option>
            <option v-for="item in list"
                    :key="item.value"
                    :value="item.value">
                {{ item.label }}
            </option>
          </select>
        </div>
        <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt=""  v-if="useSelect">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'papers-type-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // 'applicant' 或者 'insured'
    },
    certificate: { // 需要传入 formValue.applicant.certificate 或者 formValue.insured.certificate
      type: Object
    },
    list: {
      type: Array // 需要传入 formValue.applicant.certificate.type.items 或者 formValue.insured.certificate.type.items
    },
    verStr: {
      type: String
    },
    useSelect: {
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
    changeFunc (val) {
      if (this.verStr) {
        this.$emit('getData', this.verStr, val)
        return
      }
      if (this.type === 'applicant') {
        this.$emit('certificate_type_change', val)
      } else {
        this.$emit('insured_certificate_type_change', val)
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
.papers-type-module {
  width: 100%;
}
</style>
