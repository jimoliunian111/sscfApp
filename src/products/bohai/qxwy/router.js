import Vue from 'vue';
import Router from 'vue-router';

import order from '@/router/order/order';
import v2order from '@/router/v2/order/order';
import faq from '@/router/faq/faq';


Vue.use(Router);

let routes = [
  {
      path: '/detail',
      name: 'bohai_qxwy_detail',
      meta: {
          title: '前行无忧'
      },
      component: () => import('@/products/bohai/qxwy/detail/detail')
  },
  {
      path: '/insureInfo',
      name: 'bohai_qxwy_insureInfo',
      meta: {
          title: '前行无忧'
      },
      component: () => import('@/products/bohai/qxwy/insure-info/insure-info')
  },
  {
    path: '/checkstand',
    name: 'bohai_qxwy_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import('@/products/bohai/qxwy/check-stand/check-stand')
  }
]

const router = new Router({
  base: "/",
  routes: [
    ...order,
    ...faq,
    ...v2order,
    ...routes,
    {
      path: '/',
      name: 'index',
			meta: {
			    title: '前行无忧'
			},
      component: () => import('@/products/bohai/qxwy/detail/detail')
    },
    {
      path: '/crash',
      name: 'crash',
      meta: {
        title: '页面奔溃'
      },
      component: () => import('@/views/crash/crash')
    }
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

// 设置meta为页面标题
router.beforeEach((to, from, next) => {
  const { title } = to.meta;
  title && (document.title = title);
  next();
});

export default router;
