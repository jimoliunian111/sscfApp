// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../../../lib/flexible.js';
import '../../../../lib/flexible_css.js';

// const FastClick = require('fastclick');
// FastClick.attach(document.body);

import Vue from 'vue';
import App from './index.vue';
import router from '@/router/huagui/index.js';
import store from '@/store';
import VueResource from 'vue-resource'
import 'babel-polyfill'
import VueLazyload from 'vue-lazyload'

import VConsole from 'vconsole';

import { LoadingPlugin, ToastPlugin, WechatPlugin, AlertPlugin, ConfirmPlugin } from 'vux';

const env = process.env
Vue.use(VueResource)
Vue.use(VueLazyload)
Vue.use(LoadingPlugin);
// Vue.use(AjaxPlugin);
Vue.use(ToastPlugin, {position: 'middle'});
Vue.use(WechatPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);

if (process.env.DEBUG) {
	new VConsole();
}
store.dispatch('setplaceholder', require('@/config/placeholderLib.js').default)
let query={};
if (location.href.indexOf('scode')) {
  location.hash.replace(/([^?&=]+)=([^&]+)/g, (_, key, value) => {
    query[key] = value
  });
}

let token = '' + (query.scode || sessionStorage.getItem("scode")) + (new Date()).getTime().toString(36).substring(2) + Math.random().toString(36).substring(2)

Vue.config.productionTip = false

Vue.http.interceptors.push(function (request, next) {
    // 请求发送前的处理逻辑
    if (request.url.indexOf('//') < 0) {
      request.url = env.DOMAIN + request.url
    }
    let reqData = request.body
    //  let ua = store.getter.getUA
    if (request.method === 'GET') {
      request.params = {
        ...request.params,
        page_token: token
      }
      if (env.NEWAUTH && router.currentRoute.query.developer == '1') {
        request.params.developer = 1
      }
    } else {
      // request.url += ('?page_token=' + token)
      request.url += request.url.indexOf('?') > 0 ? ('&page_token=' + token) : ('?page_token=' + token)
      reqData = {
        ...reqData
      }
      if (env.NEWAUTH && router.currentRoute.query.developer == '1') {
        reqData.developer = 1
      }
    }
    request.body = reqData
    // request.beforeSend = function() {
    // request.headers.set('Agent-token', token)
    // }
      // ...
    next(function (response) {
      // 请求发送后的处理逻辑
      return response
    })
  })

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
