import router from './router'
import store from './store'
import { getToken } from '@cyberspace.link/auth'
import { qiankunRouter, LayoutRouter, BlankRouter } from './router/modules/common'

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    const dynamicRouter = store.getters.getDynamicRouter
    if (!dynamicRouter) {
      const menus = store.getters.menus
      const routes = getQiankunRoutes(menus)
      const defaultRoutes = getDefaultRoutes(qiankunRouter)
      LayoutRouter.children = routes.length > 0 ? [...routes] : [...defaultRoutes]
      router.addRoutes([LayoutRouter])
      console.log('LayoutRouter', LayoutRouter)
      router.options.routes.push([LayoutRouter])
      store.commit('app/SET_DYNAMIC_ROUTER', true)
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else {
    // window.location.href = '/login'
  }
})

// 兼容iframe方式添加路由
function getDefaultRoutes (routeObject) {
  const routes = []
  for (const path in routeObject) {
    routes.push({
      path,
      ...routeObject[path]
    })
  }
  return routes
}

// 处理qiankun子路由
function getQiankunRoutes (menus) {
  return menus.map(m => {
    const r = {
      path: m.path, ...qiankunRouter[m.powerUrl]
    }
    if (Array.isArray(m.children) && m.children.length > 0) {
      r.component = BlankRouter
      r.children = getQiankunRoutes(m.children)
    }
    return r
  })
}
