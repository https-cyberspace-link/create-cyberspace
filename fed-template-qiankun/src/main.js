import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 多语言配置
import i18n from '@/lang'
// 权限配置
import '@/permission'
// 指令
import '@/directive/clickOutside'
import { hasPermissions } from './directive/permission'
// 预设置
import '@/utils/preSetting'
// 整体样式
import '@/assets/css/index.scss'

Vue.config.productionTip = false

let instance = null

function render (props = {}) {
  const { container, data } = props
  Vue.use(hasPermissions)

  store.commit('user/SET_TOKEN', data?.token || '')
  store.commit('user/SET_PROFILE', data?.profile || {})
  store.commit('user/SET_POWER_NO_LIST', data?.powerNoList || [])
  store.commit('app/SET_MENUS', data?.menus || [])
  store.commit('app/SET_LANGUAGE', data?.language)

  instance = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
