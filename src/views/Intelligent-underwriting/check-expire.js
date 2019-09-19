import { checkSerial } from '../../apis/interlligent-underwriting-urls';

export default function(Vue) {
  const data = {
    product_id: window.sessionStorage.getItem('product_id'),
    scode: window.sessionStorage.getItem('health_serial')
  }
  checkSerial([], data)
  .then(res => {
    if (res.data.code) {
      Vue.$vux.alert.show({
        title: '提示',
        content: '您已提交本次核保结论；如需修改，请返回详情页重新选择！',
        onHide () {
          const product_type = window.sessionStorage.getItem('product_type');
          const scode = window.sessionStorage.getItem('scode');

          const routeName = `${product_type.split('.').splice(1,2).join('_').toLowerCase()}_detail`;

          Vue.$router.push({ name: routeName, query: { scode } });
        }
      });
    }
  })
  .catch(err => {
    console.log(err);
  })
}