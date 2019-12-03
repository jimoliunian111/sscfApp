<template>
  <div class="sex-module" v-if="gender && certificate">
    <div class="main-content-item">
      <div class="main-content-item-title">{{gender.name || '性别'}}</div>
      <div class="main-content-item-content">
        <div class="main-content-item-content-radio"
          v-for="item in gender.items" :key="item.value" :class="{ cur: item.value == gender.default }"
          @click="changeGender(item.value)">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sex-module',
  props: {
    certificate: {
      type: Object
    },
    gender: {
      type: Object
    },
    canClick: {
      type: Boolean,
      default: true
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
    changeGender (val) {
      if (!this.canClick) return
      this.gender.default = val
      this.$emit('getData', val, this.extra)
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
.sex-module {
  width: 100%;
}
</style>
