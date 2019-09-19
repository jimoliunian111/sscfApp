export default [
  {
      path: '/huagui/012B0500/detail',
      name: 'huagui_damaiDetail',
      meta: {
          title: '华贵大麦定期寿险'
      },
      component: () => import('@/views/huagui/damai/detail/detail')
  },
  {
      path: '/huagui/012B0500/insureInfo',
      name: 'huagui_damaiDetail_insureInfo',
      meta: {
          title: '华贵大麦定期寿险投保页'
      },
      component: () => import('@/views/huagui/damai/insure-info/insure-info')
  },
  {
    path: '/huagui/012B0500/checkstand',
    name: 'huagui_damaiDetail_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import('@/views/huagui/damai/check-stand/check-stand')
  }
];