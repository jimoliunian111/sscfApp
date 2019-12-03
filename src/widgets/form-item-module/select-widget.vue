<template>
  <div>
    <div class="product-info-form-item" v-if="selectObj.list && selectObj.list.length > 0">
      <div class="product-info-form-item-title">{{title}}</div>
      <div class="product-info-form-item-content">
        <div class="product-info-form-item-select" @change="selectChange">
          <select v-model="selectObj.selected.value" :disabled="disabled" :class="{ disabled: disabled }">
            <option v-for="(item, idx) in selectObj.list"
                    :key="idx"
                    :value="item.value">{{ item.label }}</option>

          </select>
          <img class="product-info-form-item-select-arrow"
               src="../../assets/image/sinosig/wddg/arr-select-icon.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const conf = {
  selected: {
    value: 1
  },
  list: [
    {label: '选项1', value: 1},
    {label: '选项2', value: 2}
  ]
}
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    selectObj: {
      type: Object,
      default: () => {
        return conf
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'select-widget'
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    selectChange () {
      this.$emit('getData', this.selectObj.selected, this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './form-item-module.scss';
</style>
