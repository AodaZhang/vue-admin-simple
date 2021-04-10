/**
 * @description 全局组件引入
 * @author aodazhang 2021.04.09
 */
import { App } from 'vue'

/**
 * 正则匹配文件路径 ./xxx/index.tsx、./xxx/index.vue 上的 xxx 作为组件名注册
 * @param modules webpack require上下文
 * @param app vue实例
 */
function registerComponent(
  modules: __WebpackModuleApi.RequireContext,
  app: App
): void {
  modules.keys().forEach(fileName => {
    const names = fileName.match(/(?!=\/)\w+(?=\/\w+.(vue|tsx))/g) || []
    if (!names[0]) {
      return
    }
    const component = modules(fileName)
    app.component(names[0], component.default || component)
  })
}

/** vue实例注册全局组件 */
export default function setupComponent(app: App): void {
  // 获取src/components、src/layout下所有以.vue、.tsx结尾的文件路径
  const components = require.context('../components', true, /\w+.(vue|tsx)$/)
  const layout = require.context('../layout', true, /\w+.(vue|tsx)$/)
  registerComponent(components, app)
  registerComponent(layout, app)
}
