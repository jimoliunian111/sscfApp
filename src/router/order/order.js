export default [
  {
    path: '/order/detail',
    name: 'order_detail',
    meta: {
      title: '订单详情'
    },
    component: () => import(/* webpackChunkName: "order_detail" */ '@/views/order/detail/index')
  },
  {
    path: '/order/close',
    name: 'order_close',
    meta: {
      title: '订单关闭'
    },
    component: () => import(/* webpackChunkName: "order_close" */ '@/views/order/order-close/order-close')
  },
  {
    path: '/order/fail',
    name: 'order_fail',
    meta: {
      title: '订单失败'
    },
    component: () => import(/* webpackChunkName: "roder_fail" */ '@/views/order/order-fail/order-fail')
  },
  {
    path: '/order/success',
    name: 'order_success',
    meta: {
      title: '订单成功'
    },
    component: () => import(/* webpackChunkName: "order_success" */ '@/views/order/order-success/order-success')
  },
  {
    path: '/order/waiting',
    name: 'order_waiting',
    meta: {
      title: '订单确认中'
    },
    component: () => import(/* webpackChunkName: "order_waiting" */ '@/views/order/order-waiting/order-waiting')
  },
  {
    path: '/online/onlineBack',
    name: 'online_back',
    meta: {
      title: '在线回访'
    },
    component: () => import(/* webpackChunkName: "back-online" */ '@/views/order/back-online/back-online')
  }
];