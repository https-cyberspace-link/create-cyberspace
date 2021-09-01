import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 多语言配置
import i18n from '@/lang'
// 权限配置
import '@/permission'
// 指令
import { hasPermissions } from './directive/permission'
// 预设置 监听M端
import '@/utils/preSetting'
// 整体样式
import '@/assets/css/index.scss'
Vue.use(hasPermissions)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
