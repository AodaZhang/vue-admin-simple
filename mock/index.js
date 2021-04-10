/**
 * @description 接口mock入口
 * @author aodazhang 2021.04.10
 */
const devServerConfig = {}

if (process.env.NODE_ENV === 'development') {
  // 只在开发环境中使用mock
  if (process.env.VUE_APP_MOCK === 'true') {
    // 1.使用webpack-dev-server内置express mock
    devServerConfig.before = app => {
      app.use(require('body-parser').json()) // 中间件解析post data数据
      require('./activity')(app)
      require('./user')(app)
    }
  } else {
    // 2.使用接口代理mock
    devServerConfig.proxy = {
      [process.env.VUE_APP_BASE_URL_API]: {
        target:
          'https://www.fastmock.site/mock/b6db459c335739e87e3a2aa489553b5a',
        changeOrigin: true
      }
    }
  }
}

module.exports = devServerConfig
