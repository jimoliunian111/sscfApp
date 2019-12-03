<template>
  <div class="setPayForm-module">
    <div id="gopay" v-html="payHtml" style="opacity: 0;"></div>
  </div>
</template>

<script>
export default {
  name: 'setPayFormModule',
  props: {
    data: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      payHtml: ''
    }
  },
  methods: {
    setPayFormDom (data, name) {
      var innerHtml = `<form id='${name}' name='${name}' action='${data.pay_url}' method='POST'>`
      Object.keys(data.sign_data).map(item => {
        innerHtml += `<input type='hidden' name='${item}' value='${data.sign_data[item]}'/>`
      })
      innerHtml += "<input type='submit' value='ok' style='display:none;'></form>"
      this.payHtml = innerHtml
      return innerHtml
    },
    submitFunc () {
      this.$nextTick(function () {
        document.getElementById(this.name).submit()
      })
    }
  },
  created () {
    this.setPayFormDom(this.data, this.name)
  }
}
</script>

<style>
</style>
