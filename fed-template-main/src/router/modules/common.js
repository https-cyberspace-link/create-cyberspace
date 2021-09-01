// 用来配置qiankun应用 用对应的路径配置成key 匹配对应的页面组件
export const qiankunRouter = {
  '/home': {
    name: '用户管理',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/Home.vue')
  },
  '/test': {
    name: '用户管理',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/test.vue')
  }
}

// 用来配置
export const LayoutRouter = {
  path: '/',
  name: '该应用名称',
  meta: {
    title: '该应用名称'
  },
  component: () => import('@/layout/index.vue'),
  children: []
}

export const BlankRouter = () => import('@/layout/blank.vue')
