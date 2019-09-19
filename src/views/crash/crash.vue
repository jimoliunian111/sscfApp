<template>
  <div class="main" :style="{ height: `${screenHeight}px` }">
    <div>
        <img class="error-img" src="../../assets/image/crash/crash-title.png">
        <p>页面出错了！</p>
        <p>请联系您的保险规划师！</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenHeight: ''
    }
  },
  mounted() {
    this.screenHeight = screen.height;
  }
}
</script>

<style scoped>
@import url('./crash.css');
</style>


