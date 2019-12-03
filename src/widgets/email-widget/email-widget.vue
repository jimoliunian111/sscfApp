<template>
  <div class="email-widget">
    <div class="main-content-item pr">
      <div class="main-content-item-title">电子邮箱</div>
      <div class="main-content-item-content"
           :class="{ error: !placeholder.isValidate }">
        <input type="text"
               class="validate-input"
               v-if="data"
               @blur="autoChange(verityKey, data.default)"
               @input="emailTaping"
               v-model="data.default"
               :placeholder="placeholder.name">
      </div>
      <ul class="email-lists" v-if="isAutoComplateShow" style="display: block;">
        <li class="email-lists-item"
            v-for="(item, index) in emailSuffix"
            :key="index"
            @touchstart.stop="autoComplate(item)">{{ data.default }}{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const emailSuffix = ['@qq.com', '@sina.com', '@163.com', '@139.com', '@126.com'];
export default {
  name: 'email-widget',
  props: {
    data: {
      type: Object,
      required: true
    },
    placeholder: {
      type: Object,
      required: true
    },
    verityKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      emailSuffix,
      isAutoComplateShow: false
    }
  },
  methods: {
    emailTaping () { // 实时监听邮箱输入
      const email = this.data.default;

      if (email && !~email.indexOf('@')) return this.isAutoComplateShow = true;
      return this.isAutoComplateShow = false;
    },
    autoChange (type, value) { // 邮箱失去焦点验证方法
      if (!value) return;
      this.isAutoComplateShow = false;
      setTimeout(() => {
        this.$emit('formChange', type, value)
      }, 300);
    },
    autoComplate (emailSuffix) { // 自动补全
      this.isAutoComplateShow = false;
      const complateWords = `${this.data.default}${emailSuffix}`;
      this.data.default = complateWords;
      this.autoChange(this.verityKey, complateWords);
    }
  }
}
</script>

<style>
</style>
