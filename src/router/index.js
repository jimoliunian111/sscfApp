import Vue from 'vue';
import Router from 'vue-router';


import order from './order/order';
import v2order from './v2/order/order';
import faq from './faq/faq';


Vue.use(Router);

const router = new Router({
  routes: [
    // { path: '/',
    //   name: 'index',
    //   component: () => import('@/index')
    // },
    ...order,
    ...faq,
    ...v2order,
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
