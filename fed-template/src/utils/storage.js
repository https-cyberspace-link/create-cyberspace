import { removeToken } from '@cyberspace.link/auth'

export function setLocalItem (key, value) {
  localStorage.setItem(`${key}`, value)
}

export function getLocalItem (key) {
  return localStorage.getItem(`${key}`)
}

export function removeLocalItem (key) {
  localStorage.removeItem(`${key}`)
}

export function clearLocal () {
  removeToken() // 清除cookie中token
  localStorage.clear()
}
