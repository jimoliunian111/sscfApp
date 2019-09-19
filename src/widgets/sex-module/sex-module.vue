<template>
  <div class="sex-module" v-if="gender && certificate">
    <div class="main-content-item">
      <div class="main-content-item-title">性别</div>
      <div class="main-content-item-content">
        <div class="main-content-item-content-radio" v-if="certificate.type.default === 1"
          v-for="item in gender.items" :key="item.value" :class="{ cur: item.value == gender.default }">{{ item.label }}</div>
        <div class="main-content-item-content-radio" v-if="certificate.type.default !== 1"
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
      this.$emit('changeGender', val)
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
