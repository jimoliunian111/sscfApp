import Vue from 'vue';
import Router from 'vue-router';


import order from '@/router/order/order';
import v2order from '@/router/v2/order/order';
import faq from '@/router/faq/faq';


Vue.use(Router);

const routes = [
  {
      path: '/pingan/anticancer2020/detail/',
      name: 'pingan_anticancer2020_detail',
      meta: {
          title: '平安抗癌卫士2020'
      },
      component: () => import('@/products/pingan/anticancer2020/detail/detail')
  },
  {
      path: '/pingan/anticancer2020/insureInfo',
      name: 'pingan_anticancer2020_insureInfo',
      meta: {
          title: '平安抗癌卫士2020投保页'
      },
      component: () => import('@/products/pingan/anticancer2020/insure-info/insure-info')
  },
  {
    path: '/pingan/anticancer2020/checkstand',
    name: 'pingan_anticancer2020_checkstand',
    meta: {
        title: '填写支付信息'
    },
    component: () => import('@/products/pingan/anticancer2020/check-stand/check-stand')
  },
];


const router = new Router({
  routes: [
    ...order,
    ...faq,
    ...v2order,
    ...routes,
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '@/products/pingan/anticancer2020/detail/detail')
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
