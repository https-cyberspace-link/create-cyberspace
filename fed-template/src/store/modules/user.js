import { TOKEN_NAME } from '@cyberspace.link/env'
import { getToken } from '@cyberspace.link/auth'
import Cookies from 'js-cookie'

const state = {
  token: getToken(),
  profile: {
    userType: null, // 用户类型,1:总部,2:区域,3:影院
    adminFlag: false, // 是否管理员
    orgId: null, // 组织架构Id
    powerNoList: [], // 拥有的权限编码
    clientType: null,
    orgIdList: [],
    userId: 1,
    userLoginName: '',
    userName: ''
  },
  powerNoList: [] // 拥有的权限编码
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PROFILE: (state, value) => {
    state.profile = value
  },
  SET_POWER_NO_LIST: (state, value) => {
    state.powerNoList = value
  }
}

const actions = {
  login ({ commit, dispatch }, userInfo) {
    // 登录操作
    return new Promise((resolve, reject) => {
      // login(userInfo).then(res => {
      // 请求登录接口 返回 用户token

      setTimeout(() => {
        const token = 'test-token'
        commit('SET_TOKEN', token)
        Cookies.set(TOKEN_NAME, token)
        resolve()
      }, 1000)
      // }).catch(err => {
      //   reject(err)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
