/**
 * // 如果不启用设置为 null
 * api: {
 *  target: '<url>',
 *  pathRewrite: {
 *    '^/api' : '/api' // pathRewrite这里的作用，相当于是替代‘/api’，如果接口中是没有api的，那就直接置空，如果接口中有api，那就得写成{‘^/api’:‘/api’}，可以理解为一个重定向或者重新赋值的功能。
 *  }
 * }
 */
module.exports = null
