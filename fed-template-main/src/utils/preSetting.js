import { isMobile } from './utils'
import store from '../store'

window.addEventListener('resize', setIsMobile)
function setIsMobile () {
  store.commit('app/SET_IS_MOBILE', isMobile())
}
