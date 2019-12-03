<template>
  <div class="detail-choose-widget">
    <div class="product-info-form-item-title">{{title}}</div>
    <div class="product-info-form-item-content">
      <div>{{subTitle || ''}}</div>
      <div class="product-info-form-item-vocation" @click="clickFunc">{{value || emitText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-choose-widget',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    },
    value: {
      type: String
    },
    emitText: {
      type: String,
      default: '选择'
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
      this.$emit('getData')
    }
  },
  created () {

  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.detail-choose-widget {
  display: flex;
  align-items: center;
  border-top: .026667rem solid #efefef;
  min-height: 1.146667rem;
  left: 1.146667rem;
}
</style>
