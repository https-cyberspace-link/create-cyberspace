const path = require('path')
const moment = require('moment')
const config = require('./config')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

function getDate () {
  const date = new Date()
  return moment(date).format('YYMM')
}

// 如果发现上传每次图片都会上传，则改下这个前缀
function getAssetDir () {
  return 'asset-1907/'
}

exports.getAssetDir = getAssetDir

exports.getChunkDir = function () {
  return `chunk-${getDate()}/`
}

exports.getFullName = function (baseName, isDev) {
  let dir = getAssetDir()
  if (isDev) {
    dir = ''
  }
  return function (file) {
    const dirName = path.dirname(path.relative(path.join(__dirname, '..', 'src-client'), file))
    return exports.assetsPath(`${dir}${dirName}/${baseName}`)
  }
}
