<template>
  <div class="back-home-module" @click="backHome" v-if="data && data.link">
    <img class="home-icon-style" src="@/assets/image/home.png" />
  </div>
</template>

<script>
export default {
  name: 'back-home-module',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  methods: {
    backHome () {
      if (this.data) {
        window.location.href = this.data.link
        return
      }
      this.$vux.toast.show({
        text: '功能暂未开放',
        type: 'text'
      })
    }
  }
}
</script>

<style>
@import '@/assets/styles/main.scss';
.home-icon-style {
  width: rem(60);
  height: rem(60);
}
</style>
