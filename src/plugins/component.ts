/**
 * @description 全局组件引入
 * @author zhangxinyu 2021.01.23
 */
import { App } from 'vue'

/** vue实例注册全局组件 */
export default function setupComponent(app: App): void {
  // 1.获取components目录下所有以 .vue .tsx 结尾的文件路径
  const modules = require.context('../components', true, /\w+.(vue|tsx)$/)

  // 2.正则匹配文件路径为 ./xxx/index.tsx 上的 xxx 作为组件名注册
  modules.keys().forEach(fileName => {
    const names = fileName.match(/(?!=\/)\w+(?=\/\w+.(vue|tsx))/g) || []
    if (!names[0]) {
      return
    }
    const component = modules(fileName)
    app.component(names[0], component.default || component)
  })
}
