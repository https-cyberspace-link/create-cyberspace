import { getToken } from '@cyberspace.link/auth'

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

export default {
  namespaced: true,
  state,
  mutations
}
