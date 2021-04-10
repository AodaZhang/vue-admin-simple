/**
 * @description ant-design-vue组件引入
 * @author aodazhang 2021.04.09
 */
import { App } from 'vue'
// 1.ant-design-vue全量引入：实际开发更推荐这种方式，避免手动引入组件且可以使用less文件覆盖样式定义
import Antdv from 'ant-design-vue'
// 2.ant-design-vue按需引入：使用该功能请在babel.config.js中打开相应配置，且需要在project.config.js中配置modifyVars覆盖样式定义
// import { ConfigProvider, Button } from 'ant-design-vue'

/** vue实例安装ant-design-vue组件 */
export default function setupAntdv(app: App): void {
  app.use(Antdv)
  // ;[ConfigProvider, Button].forEach(component => app.use(component))
}
