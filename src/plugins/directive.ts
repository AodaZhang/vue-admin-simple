/**
 * @description vue自定义指令挂载
 * @author aodazhang 2021.03.09
 */
import { App, Directive } from 'vue'
import { store } from '@/store'

// 1.dom级权限控制
const action: Directive = {
  mounted(el: HTMLElement, binding) {
    // 1.指令
    const { arg, value } = binding
    const actionId = arg || '' // 指令参数
    let actionValue = [] // 指令值
    if (Array.isArray(value)) {
      actionValue = value
    } else if (typeof value === 'string' && value) {
      actionValue.push(value)
    }
    if (!actionValue.length) {
      return
    }

    // 2.数据
    let isAction = false // 当前用户dom权限
    const actionMap = store.getters.permission.actionMap
    const actions = actionMap[actionId]
    if (Array.isArray(actions) && actions.length) {
      actionValue.every(action => {
        if (actions.includes(action)) {
          isAction = true
          return false
        }
        return true
      })
    }

    // 3.dom节点操作
    if (isAction) {
      return
    }
    el.parentNode ? el.parentNode.removeChild(el) : (el.style.display = 'none')
  }
}

/** vue实例注册自定义指令 */
export default function setupDirective(app: App): void {
  const directives = [{ name: 'action', directive: action }]
  directives.forEach(({ name, directive }) => app.directive(name, directive))
}
