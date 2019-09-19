<template>
  <div class="region-item-widget">
    <div class="main-content-item">
      <div class="main-content-item-title">{{title}}</div>
      <div class="main-content-item-content" @click="clickFunc">
        <span v-if="value">{{value}}</span>
        <span v-else>请选择</span>
        <img class="arrow-right-icon" src="@/assets/image/sinosig/wddg/arr-right-icon.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'region-item-widget',
  props: {
    title: {
      type: String
    },
    value: {
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
    clickFunc () {
      this.$emit('exportFunc')
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
.region-item-widget {
  width: 100%;
}
</style>
