/**
 * @description 项目配置文件
 * @author aodazhang 2021.04.09
 */

module.exports = {
  // 1.项目名
  title: 'Vue3 Admin Simple',

  // 2.devServer
  port: 3000, // 端口号
  open: false, // 启动时是否自动开启浏览器

  // 3.静态资源路径
  // 在hash路由中，此处使用相对路径'./'不会对子路由页面刷新产生影响
  // 在history路由中，此处需使用绝对路径'/'，否则子路由页面刷新会报路径错误 Uncaught SyntaxError: Unexpected token '<'，详见https://cli.vuejs.org/zh/config/#publicpath
  publicPath: '/',

  // 4.生产环境是否开启analyzer
  isAnalyzer: true,

  // 5.ant-design-vue按需引入：覆盖antdv样式定义请解除下面注释
  // https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
  modifyVars: {
    // 'primary-color': '#1890ff' // 主色
  }
}
