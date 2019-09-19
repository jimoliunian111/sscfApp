export default [
  {
      path: '/sinosig/wddg/detail',
      name: 'sinosig_wddg_detail',
      meta: {
          title: '阳光人寿i保终身重大疾病保险Plus款'
      },
      component: () => import(/* webpackChunkName: "wddg_details" */ '@/views/sinosig/wddg/detail/detail')
  },
  {
      path: '/sinosig/wddg/detail/insureInfo',
      name: 'sinosig_wddg_detail_insureInfo',
      meta: {
          title: '阳光人寿i保终身重大疾病保险Plus款投保页'
      },
      component: () => import(/* webpackChunkName: "wddg_insure_info" */ '@/views/sinosig/wddg/insure-info/insure-info')
  },
  {
    path: '/sinosig/wddg/underwriting/listAnswer',
    name: 'underwriting_list_answer',
    meta: {
      title: '智能核保'
    },
    component: () => import(/* webpackChunkName: "underwriting_list_answer" */ '@/views/Intelligent-underwriting/underwriting-list-answer/underwriting-list-answer')
  },
  {
    path: '/sinosig/wddg/underwriting',
    name: 'underwriting',
    meta: {
      title: '智能核保'
    },
    component: () => import(/* webpackChunkName: "underwriting" */ '@/views/Intelligent-underwriting/Intelligent-underwriting')
  },
  {
    path: '/sinosig/wddg/underwriting/list',
    name: 'underwriting_list',
    meta: {
      title: '智能核保'
    },
    component: () => import(/* webpackChunkName: "underwriting_list" */ '@/views/Intelligent-underwriting/underwriting-list/underwriting-list')
  },
  {
    path: '/sinosig/wddg/underwriting/fail',
    name: 'underwriting_fail',
    meta: {
      title: '核保结论'
    },
    component: () => import(/* webpackChunkName: "underwriting_fail" */ '@/views/Intelligent-underwriting/underwriting-fail/underwriting-fail')
  },
  {
    path: '/sinosig/wddg/underwriting/success',
    name: 'underwriting_success',
    meta: {
      title: '核保结论'
    },
    component: () => import(/* webpackChunkName: "underwriting_success" */ '@/views/Intelligent-underwriting/underwriting-success/underwriting-success')
  },
  {
    path: '/sinosig/wddg/underwriting/ask',
    name: 'underwriting_ask',
    meta: {
      title: '核保结论'
    },
    component: () => import(/* webpackChunkName: "underwriting_ask" */ '@/views/Intelligent-underwriting/underwriting-ask/underwriting-ask')
  },
  {
    path: '/sinosig/wddg/underwriting/question',
    name: 'underwriting_question',
    meta: {
      title: '智能核保'
    },
    component: () => import(/* webpackChunkName: "underwriting_question" */ '@/views/Intelligent-underwriting/underwriting-question/underwriting-question')
  },
  {
    path: '/sinosig/wddg/underwriting/answer',
    name: 'underwriting_answer',
    meta: {
      title: '智能核保'
    },
    component: () => import(/* webpackChunkName: "underwriting_answer" */ '@/views/Intelligent-underwriting/underwriting-answer/underwriting-answer')
  }
];