export default [
  {
      path: '/tongfang/TCIB11/detail/',
      name: 'tongfang_bbd_detail',
      meta: {
          title: '同方全球「 同佑 e生」（保倍多）终身重大疾病险'
      },
      component: () => import(/* webpackChunkName: "tongfang_bbd_detail" */ '@/views/tongfang/bbd/detail/detail')
  },
  {
      path: '/tongfang/TCIB11/detail/insureInfo',
      name: 'tongfang_bbd_detail_insureInfo',
      meta: {
          title: '同方全球「 同佑 e生」（保倍多）终身重大疾病险投保页'
      },
      component: () => import(/* webpackChunkName: "tongfang_bbd_detail_insureInfo" */ '@/views/tongfang/bbd/insure-info/insure-info')
  },
  {
    path: '/tongfang/TCIB11/checkstand',
    name: 'tongfang_bbd_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import(/* webpackChunkName: "tongfang_bbd_checkstand" */ '@/views/tongfang/bbd/check-stand/check-stand')
  }
];