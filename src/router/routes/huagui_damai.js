export default [
  {
      path: '/detail',
      name: 'huagui_damaiDetail',
      meta: {
          title: '华贵大麦定期寿险'
      },
      component: () => import('@/products/huagui/damai/detail/detail')
  },
  {
      path: '/insureInfo',
      name: 'huagui_damaiDetail_insureInfo',
      meta: {
          title: '华贵大麦定期寿险投保页'
      },
      component: () => import('@/products/huagui/damai/insure-info/insure-info')
  },
  {
    path: '/checkstand',
    name: 'huagui_damaiDetail_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import('@/products/huagui/damai/check-stand/check-stand')
  }
];