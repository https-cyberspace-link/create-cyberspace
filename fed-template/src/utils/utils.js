export function dateToString (date, pattern) {
  let value = date
  let fmt = pattern
  if (!value) {
    return ''
  }
  if (!value.getMonth) {
    value = new Date(value)
  }
  const o = {
    'M+': value.getMonth() + 1, // 月份
    'd+': value.getDate(), // 日
    'h+': value.getHours(), // 小时
    'm+': value.getMinutes(), // 分
    's+': value.getSeconds(), // 秒
    'q+': Math.floor((value.getMonth() + 3) / 3), // 季度
    S: value.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${value.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))) }
  })
  return fmt
}

export function getWeekday (v) {
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return `星期${week[v.getDay()]}`
}

export function deepClone (obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }
  if (typeof obj === 'object') {
    return deepAssign({}, obj)
  }
  return obj
}

export function isDef (val) {
  return val !== undefined && val !== null
}

export function isEmpty (v) {
  return v === '' || v === undefined || v === null || v === 'undefined' || v === 'null'
}

export function isObject (val) {
  return val !== null && typeof val === 'object'
}

function assignKey (to, from, key) {
  const val = from[key]

  if (!isDef(val)) {
    return
  }

  if (!Object.prototype.hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val
  } else {
    to[key] = deepAssign(Object(to[key]), from[key])
  }
}

export function deepAssign (to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key)
  })

  return to
}

export function stopPropagation (event) {
  event.stopPropagation()
}

export function preventDefault (event, isStopPropagation) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

export function toggleHtmlFobidden (isHidden) {
  document.querySelector('html').classList[`${isHidden ? 'add' : 'remove'}`]('html-hidden')
}

export const userAgent = navigator.userAgent

export const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
export const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

export const isMobile = function () {
  return document.documentElement.clientWidth < 720
}
// 是否是刘海屏
function isFringeDevice () {
  const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // iPhone X、iPhone XS
  var isIPhoneX = isIos && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812
  // iPhone XS Max
  var isIPhoneXSMax = isIos && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896
  // iPhone XR
  var isIPhoneXR = isIos && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896
  return isIPhoneX || isIPhoneXR || isIPhoneXSMax
}

export const isFringe = isFringeDevice()
