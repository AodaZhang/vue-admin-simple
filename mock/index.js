/**
 * @description 接口mock入口js
 * @author aodazhang 2021.03.11
 */

const devServerConfig = {}

if (process.env.NODE_ENV === 'development') {
  // 只在开发环境中使用mock
  if (process.env.VUE_APP_MOCK === 'true') {
    // 1.使用webpack-dev-server内置express mock
    devServerConfig.before = app => {
      app.use(require('body-parser').json()) // 中间件解析post data数据
      require('./user')(app)
    }
  } else {
    // 2.使用接口代理mock
    devServerConfig.proxy = {
      [process.env.VUE_APP_BASE_URL_USER]: {
        target: 'https://test132.maxuscloud.cn/api',
        changeOrigin: true
      }
    }
  }
}

module.exports = devServerConfig
