export default [
  {
    path: '/faq/list',
    name: 'faq_list',
    meta: {
      title: '问题列表'
    },
    component: () => import(/* webpackChunkName: "faq" */ '@/views/faq/faq')
  },
  {
    path: '/faq/detail',
    name: 'faq_detail',
    meta: {
      title: '问题详情'
    },
    component: () => import(/* webpackChunkName: "faq_detail" */ '@/views/faq/faq-detail')
  }
];