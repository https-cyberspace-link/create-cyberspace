import { qiankunRouter } from '../router/modules/common'
import store from '../store'

export function getPath (path) {
  const menus = store.getters.menus
  const paths = Object.keys(qiankunRouter)
  if (!paths.includes(path)) return '/404'
  return `/qiankun/${getMenusPath(menus, path)}`
}

function getMenusPath (list, path) {
  let t = ''
  for (let i = 0; i < list.length; i++) {
    if (path === list[i].powerUrl) {
      t = list[i].powerNo
      break
    } else {
      if (Array.isArray(list[i].children) && list[i].children.length > 0) {
        t = getMenusPath(list[i].children, path)
      }
    }
  }
  return t
}
