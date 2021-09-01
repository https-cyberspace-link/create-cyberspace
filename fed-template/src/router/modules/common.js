export const routes = [
  {
    path: '/',
    name: '超境应用',
    meta: {
      title: '超境应用'
    },
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/test',
        name: '测试页面',
        meta: {
          title: '测试页面'
        },
        component: () => import('@/views/test.vue')
      },
      {
        path: '/login',
        name: '登录',
        meta: {
          title: '登录'
        },
        component: () => import('@/views/login/index.vue')
      }
    ]
  }
]
