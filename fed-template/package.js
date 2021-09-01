const readdirp = require('readdirp')
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const { exec } = require('child_process')
const { webpackBarName } = require('./config/webpack')
const dirname = __dirname
var fs = require('fs')
const version = '0.0.0.1'
const components = []
const fileJSON = []
const staticFile = ["import '@/assets/index.scss'", `const version = '${version}'`]
readdirp(path.join(dirname, 'src/views'), {
  // depth: 1,
  fileFilter: '*.vue'
}).on('data', (entry) => {
  const name = toHump(entry.path.replace(/[\\/\\.]/g, '_'))
  const path = `@/views/${entry.path}`
  components.push(name)
  fileJSON.push(`import ${name} from '${path}'`)
}).on('end', () => {
  writeFile()
})
// 下划线转换驼峰
function toHump (name) {
  // eslint-disable-next-line no-useless-escape
  return name.replace(/[\_-](\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// 驼峰转换下划线
// eslint-disable-next-line no-unused-vars
function toLine (name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

let install = 'const install = function (Vue) {\n' +
'  // 判断是否安装\n' +
'  if (install.installed) return\n' +
'  // 遍历注册全局组件\n' +
'  components.map((component, name) => {\n' +
'    Vue.component(component.name, component)\n' +
'  })\n' +
'}\n' +
'// 判断是否是直接引入文件\n' +
'if (typeof window !== \'undefined\' && window.Vue) {\n' +
'  install(window.Vue)\n' +
'}\n' +
'\n' +
'export { install, version, #{components} }\n\n' +
'export default {\n' +
'  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装\n' +
'  install,\n' +
'  version\n' +
'}'

function runCMD () {
  const spinner = ora('打包组件...')
  spinner.start()
  exec(`vue-cli-service build --target lib --name ${webpackBarName} export.js --dest package --report --report-json --formats umd-min --mode buildCM`, (err, stdout, stderr) => {
    if (err) {
      console.log(chalk.red(err))
    }
    console.log(chalk.green(`stdout: ${stdout}`))
    // console.log(`stderr: ${stderr}`)
    spinner.stop()
  })
}

function writeFile () {
  const spinner = ora('文件解析中...')
  spinner.start()
  install = install.replace(/#{components}/, components.join(', '))
  const result = []
  result.push(fileJSON.join('\n'))
  result.push(staticFile.join('\n') + '\n')
  components.map(item => {
    result.push(`${item}.install = Vue => { Vue.component(${item}.name, ${item}) }`)
  })
  result.push(`\nconst components = [${components.join(', ')}]\n`)
  result.push(install)
  fs.writeFileSync('./export.js', result.join('\n') + '\n')
  console.log(chalk.green('export.js文件已生成'))
  spinner.stop()
  runCMD()
}
