import Vue from 'vue'

Vue.directive('click-outside', {
  bind (el, bindings, vnode) {
    el.handle = e => {
      if (!el.contains(e.target)) {
        const method = bindings.expression
        vnode.context[method]()
      }
    }
    el.addEventListener('blur', el.handle, false)
    window.addEventListener('click', el.handle, false)
  },
  unbind (el) {
    el.removeEventListener('blur', el.handle, false)
    window.removeEventListener('click', el.handle, false)
  }
})
