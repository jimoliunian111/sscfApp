<template>
  <div class="product-info-form-item">
    <div class="product-info-form-item-title">{{title}}</div>
    <div class="product-info-form-item-content">
      <div>{{value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-read-module',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String, Boolean]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
