import Vue from 'vue';
import { TYPE_ENUM, CODE_ENUM } from '@/config/request-enum.js';

export const ajaxRequest = (extendConfig) => {

  const baseConfig = {
    baseURL: process.env.DOMAIN,
    duration: 3000,
    method: TYPE_ENUM.GET_TYPE,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    successCb(res) { },
    failCb(res) { }
  };

  const AssignData = Object.assign({}, baseConfig, extendConfig);

  if (AssignData.method === TYPE_ENUM.GET_TYPE) {
    AssignData.params = AssignData.data;
    delete AssignData.data;
  }

  const instance = Vue.http.create(AssignData);

  instance().then((res) => {
    switch (parseInt(res.data.code)) {
      case CODE_ENUM.SUCCESS_CODE:
        AssignData.successCb(res.data);
        break;

      default:
        Vue.$vux.toast.show({
          text: res.data.message,
          time: AssignData.duration,
          type: 'text',
          onHide() {
            AssignData.failCb();
          }
        });
        break;
    }
  }).catch(function (err) { AssignData.failCb(err); });

}