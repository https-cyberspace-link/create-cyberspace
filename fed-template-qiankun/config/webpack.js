module.exports = {
  webpackBarName: 'cyberspace-admin',
  webpackBanner:
    ' build: cyberspace-admin \n copyright: 超境汽车前端组 \n time: ',
  donationConsole () {
    const chalk = require('chalk')
    console.log(
      chalk.green(
        '> 欢迎使用CJUI组件（地址：暂定 http://ui.cj.cloud）'
      )
    )
    console.log('\n')
  }
}
