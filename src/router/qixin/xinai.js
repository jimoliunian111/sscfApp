import Vue from 'vue';
import Router from 'vue-router';

import qixin_xinai from '../routes/qixin_xinai';

import order from '../order/order';
import v2order from '../v2/order/order';
import faq from '../faq/faq';


Vue.use(Router);

const router = new Router({
  base: "/",
  routes: [
    // { path: '/',
    //   name: 'index',
    //   component: () => import('@/index')
    // },
    ...order,
    ...faq,
    ...v2order,
    ...huagui_xiaomai,
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '@/index')
    },
    {
      path: '/crash',
      name: 'crash',
      meta: {
        title: '页面奔溃'
      },
      component: () => import(/* webpackChunkName: "crash" */ '@/views/crash/crash')
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
