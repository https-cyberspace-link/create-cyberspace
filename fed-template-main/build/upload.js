const co = require('co')
const bce = require('baidubce-sdk')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const util = require('./utils')

if (!config.build.assetsSubDirectory) {
  console.log('请联系确定cdn上传路径')
  return
}

const extnameWhiteList = [
  '.js',
  '.css',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.map',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.svg',
  '.html',
  '.m4a',
  '.mp3',
  '.zip'
]
const rootClientDir = path.join(
  __dirname,
  '..',
  'dist',
  config.build.assetsSubDirectory
)
const rootServerDir = `${config.build.assetsSubDirectory}`
function getFileList (dirPath, filesList) {
  const files = fs.readdirSync(dirPath)
  files.forEach(item => {
    const innerDirPath = path.join(dirPath, item)
    const stat = fs.statSync(innerDirPath)
    if (stat.isDirectory()) {
      // 递归读取文件
      getFileList(`${innerDirPath}`, filesList)
    } else {
      const extname = path.extname(item)
      if (extnameWhiteList.indexOf(extname) > -1) {
        const filePath = path.join(dirPath, item)
        let relativeFilePath = path.relative(rootClientDir, filePath)
        relativeFilePath = path.join(rootServerDir, relativeFilePath)
        // 兼容windows系统
        relativeFilePath = relativeFilePath.replace(/\\/, '/')
        const fileInfo = {
          key: relativeFilePath,
          filePath
        }
        filesList.push(fileInfo)
      }
    }
  })
}

const clientConfig = {
  credentials: {
    ak: '', // 您的AK
    sk: '' // 您的SK
  },
  endpoint: 'http://bj.bcebos.com'
}

const client = new bce.BosClient(clientConfig)

const bucket = 'webapp-static-huabei2-prod'

const maxKeys = 1000
let retryCount = 0

function uploadFinaly (count, needUploadFileList, errorFiles, uploadFn) {
  if (count === needUploadFileList.length) {
    if (errorFiles.length > 0) {
      if (retryCount < 10) {
        uploadFn(errorFiles)
      } else {
        const errorMessage = `下列文件上传失败：${errorFiles
                    .map(item => item.key)
                    .join('，')}`
        console.error(errorMessage)
        throw new Error(errorMessage)
      }
    } else {
      console.log('上传完毕')
    }
  }
}

function upload (needUploadFileList) {
  retryCount++
  const errorFiles = []
  let count = 0
  needUploadFileList.forEach(fileInfo => {
    co(function * () {
      yield client.putObjectFromFile(
        bucket,
        fileInfo.key,
        fileInfo.filePath
      )
      count++
      console.log(
                `已上传${parseFloat(
                    (count / needUploadFileList.length) * 100,
                    10
                ).toFixed(2)}%`,
                '\t当前文件',
                fileInfo.key
      )
      uploadFinaly(count, needUploadFileList, errorFiles, upload)
    }).catch(err => {
      count++
      console.log(err)
      errorFiles.push(fileInfo)
      uploadFinaly(count, needUploadFileList, errorFiles, upload)
    })
  })
  if (needUploadFileList.length === 0) {
    console.log('上传完毕')
  }
}

function main (jsClientListResponse, cssClientListResponse, imageListResponse) {
  let jsClientList = []
  let cssClientList = []
  let imageList = []
  jsClientList = jsClientListResponse.body.contents.map(item => item.key)
  cssClientList = cssClientListResponse.body.contents.map(item => item.key)
  imageList = imageListResponse.body.contents.map(item => item.key)
  const clientFileList = []
  const needUploadFileList = []
  getFileList(rootClientDir, clientFileList)
  const jsClientListLocal = []
  const cssClientListLocal = []
  const imageListLocal = []
  clientFileList.forEach(item => {
    if (item.key.indexOf(`${util.getChunkDir()}js/`) > -1) {
      jsClientListLocal.push(item)
    } else if (item.key.indexOf(`${util.getChunkDir()}css/`) > -1) {
      cssClientListLocal.push(item)
    } else {
      imageListLocal.push(item)
    }
  })
  jsClientListLocal.forEach(clientFile => {
    if (jsClientList.indexOf(clientFile.key) < 0) {
      needUploadFileList.push(clientFile)
    }
  })
  cssClientListLocal.forEach(clientFile => {
    if (cssClientList.indexOf(clientFile.key) < 0) {
      needUploadFileList.push(clientFile)
    }
  })
  imageListLocal.forEach(clientFile => {
    if (imageList.indexOf(clientFile.key) < 0) {
      needUploadFileList.push(clientFile)
    }
  })
  upload(needUploadFileList)
}

co(function * () {
  // 这么区分的目的是突破每次查询只能查1000的限制
  const jsClientListResponse = yield client.listObjects(bucket, {
    prefix: `${rootServerDir}/${util.getChunkDir()}js/`,
    'max-keys': maxKeys
  })
  const cssClientListResponse = yield client.listObjects(bucket, {
    prefix: `${rootServerDir}/${util.getChunkDir()}css/`,
    'max-keys': maxKeys
  })
  const imageListResponse = yield client.listObjects(bucket, {
    prefix: `${rootServerDir}/${util.getAssetDir()}`,
    'max-keys': maxKeys
  })
  main(jsClientListResponse, cssClientListResponse, imageListResponse)
}).catch(err => {
  console.log(err)
  main()
})
