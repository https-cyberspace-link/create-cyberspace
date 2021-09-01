import Vue from 'vue'
import store from '../store'

const hasPermissions = Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    // 获取按钮权限
    const permissions = store.getters.powerNoList
    const permission = binding.value.toString()
    if (!permissions || permissions.indexOf(permission) === -1) {
      Vue.nextTick(() => el.parentNode.removeChild(el))
    }
  }
})
export { hasPermissions }
