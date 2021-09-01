export default {
  token: state => state.user.token,
  profile: state => state.user.profile,
  powerNoList: state => state.user.powerNoList,
  language: state => state.app.language,
  isMobile: state => state.app.isMobile,
  menus: state => state.app.menus,
  getDynamicRouter: state => state.app.getDynamicRouter
}
