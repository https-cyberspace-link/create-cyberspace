import axios from 'axios'
import store from '../store'
import { Message } from 'CjUi'
import { getToken } from '@cyberspace.link/auth'
import { API_PATH } from '@cyberspace.link/env'

const service = axios.create({
  baseURL: API_PATH,
  timeout: 15000
})

window.axiosCancel = []

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    config.cancelToken = new axios.CancelToken(cancel => {
      window.axiosCancel.push({
        cancel
      })
    })
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  async response => {
    if (response.request.responseType === 'arraybuffer') {
      return response.data
    } else {
      const res = response.data
      if (res.code === 401) {
        await store.dispatch('user/logout')
        return Promise.reject(response.data)
      } else if (res.code !== 1) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(response.data)
      } else {
        return response.data
      }
    }
  },
  (error) => {
    const data = error.response ? error.response.data : null
    const msg = (data && data.msg) || '网络错误'
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 处理get请求
export const get = (url, params, config = {}) => service.get(url, { ...config, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
export const del = (url, params, config = {}) => service.delete(url, { ...config, params })
// 处理post请求
export const post = (url, query, config = {}) => service.post(url, query, config)
// 处理put请求
export const put = (url, params, config = {}) => service.put(url, params, config)
// 处理patch请求
export const patch = (url, params, config = {}) => service.patch(url, params, config)

export default {
  get,
  del,
  post,
  put,
  patch
}
