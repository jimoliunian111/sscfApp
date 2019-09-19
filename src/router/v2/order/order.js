export default [
  {
    path: '/v2/order/detail',
    name: 'v2_order_detail',
    meta: {
      title: '订单详情'
    },
    component: () => import(/* webpackChunkName: "v2_order_detail" */ '@/views/v2/order/detail/index')
  },
  {
    path: '/v2/order/close',
    name: 'v2_order_close',
    meta: {
      title: '订单关闭'
    },
    component: () => import(/* webpackChunkName: "v2_order_close" */ '@/views/v2/order/order-close/order-close')
  },
  {
    path: '/v2/order/fail',
    name: 'v2_order_fail',
    meta: {
      title: '订单失败'
    },
    component: () => import(/* webpackChunkName: "v2_order_fail" */ '@/views/v2/order/order-fail/order-fail')
  },
  {
    path: '/v2/order/success',
    name: 'v2_order_success',
    meta: {
      title: '订单成功'
    },
    component: () => import(/* webpackChunkName: "v2_order_success" */ '@/views/v2/order/order-success/order-success')
  },
  {
    path: '/v2/order/waiting',
    name: 'v2_order_waiting',
    meta: {
      title: '订单确认中'
    },
    component: () => import(/* webpackChunkName: "v2_order_waiting" */ '@/views/v2/order/order-waiting/order-waiting')
  }
];