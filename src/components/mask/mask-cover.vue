<template>
  <div class="mask" v-if="value"></div>
</template>
<script>
export default {
  props: {
    value: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: .8;
  z-index: 11;
}
</style>