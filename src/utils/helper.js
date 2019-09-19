import Vue from 'vue';
// import { AjaxPlugin } from 'vux';
// Vue.use(AjaxPlugin);

const headers = {};

function finalURL(baseUrl, params) {
  return [baseUrl].concat(params).join('/');
}

export function get(baseUrl, params = [], query = {} ) {

  const url = finalURL(baseUrl, params);

  return Vue.http.get(url, { params: query, headers });

  // return new Promise((resolve, reject) => {
  //   Vue.http.get(url, { params: query, headers }).then(res => {
  //     if (res.status === 200 && res.data && res.data.code === 0) {
  //       return resolve(res)
  //     } else {
  //       return reject(res)
  //     }
  //   }).catch(err => {
  //     return reject(err)
  //   })
  // });
}

export function post(baseUrl, params = [], data = {} ) {

  const url = finalURL(baseUrl, params);

  return Vue.http.post(url, data, { headers });
}
