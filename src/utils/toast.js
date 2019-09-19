import Vue from 'vue';

import { ToastPlugin } from 'vux';

Vue.use(ToastPlugin);

const vue = new Vue();


/**
 * @param message  信息
 * @param type  状态 success/warning/info/error
 * @param duration 延时
 */
export default function(text, type = 'text') {
  vue.$vux.toast.show({ text, type });
}
