<template>
  <div class="address-module" v-if="address">
    <div class="main-content-item">
      <div class="main-content-item-title">详细地址</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" :class="{ disabled: disabled  }"
          @blur="formChange(address.detail.default)"
          v-model="address.detail.default" :placeholder="placeholder.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'address-module',
  props: {
    type: {
      type: String,
      default: 'applicant' // applicant 或者 insured
    },
    placeholder: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    address: {
      type: Object
    },
    verifyKey: { // 验证的key
      type: String
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    formChange (value) {
      if (this.verifyKey) {
        this.$emit('formChange', this.verifyKey, value)
      } else {
        let str = this.type === 'applicant' ? 'applicant_personal_address_detail' : 'insured_personal_address_detail'
        this.$emit('formChange', str, value)
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
.address-module {
  width: 100%;
}
</style>
