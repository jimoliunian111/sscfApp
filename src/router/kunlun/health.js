export default [
  {
      path: '/kunlun/012B0500/detail',
      name: 'kunlun_damaiDetail',
      meta: {
          title: '健康保2.0重大疾病保险'
      },
      component: () => import('@/views/kunlun/health/detail/detail')
  },
  {
      path: '/kunlun/012B0500/insureInfo',
      name: 'kunlun_damaiDetail_insureInfo',
      meta: {
          title: '填写投保信息'
      },
      component: () => import('@/views/kunlun/health/insure-info/insure-info')
  },
  {
    path: '/kunlun/012B0500/checkstand',
    name: 'kunlun_damaiDetail_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import('@/views/kunlun/health/check-stand/check-stand')
  }
];