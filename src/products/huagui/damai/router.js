import Vue from 'vue';
import Router from 'vue-router';

import order from '@/router/order/order';
import v2order from '@/v2/order/order';
import faq from '@/faq/faq';


Vue.use(Router);

let routes = [
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
      component: () => import('@/products/huagui/damai/detail/detail')
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
