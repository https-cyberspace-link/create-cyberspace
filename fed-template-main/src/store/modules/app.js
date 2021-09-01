import { isMobile } from '@/utils/utils'
import { getLanguage } from '@/lang/index'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(), // 多语言
  isMobile: isMobile(), // 是否是移动端
  menus: [], // 菜单
  getDynamicRouter: false // 动态路由刷新白屏处理
}

const mutations = {
  SET_IS_MOBILE (state, data) {
    state.isMobile = data
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_DYNAMIC_ROUTER: (state, value) => {
    state.getDynamicRouter = value
  }
}

const actions = {
  setLanguage ({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
