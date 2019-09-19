<template>
  <div class="only-read-module">
    <div class="main-content-item">
      <div class="main-content-item-title">{{title}}</div>
      <div class="main-content-item-content">
        <span>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'only-read-module',
  props: {
    title: {
      type: String
    },
    content: {
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
.only-read-module {
  width: 100%;
}
</style>
