<template>
  <div class="input-module">
    <div class="main-content-item">
      <div class="main-content-item-title">{{title}}</div>
      <div class="main-content-item-content" :class="{ error: !placeholder.isValidate }">
        <input type="text" class="validate-input" @blur="formChange(dataObj.default)"
          v-model="dataObj.default" :placeholder="placeholder.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-module',
  props: {
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: Object
    },
    verifyKey: { // 验证的key
      type: String
    },
    dataObj: {
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
    formChange (value) {
      this.$emit('formChange', this.verifyKey, value)
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
</style>
