/**
 * @description plugins入口ts
 * @author aodazhang 2021.03.09
 */
import { App } from 'vue'
import setupVueRouter from '@/router'
import setupVuex from '@/store'
import setupDirective from './directive'
import setupAntdv from './antdv'
import setupComponent from './component'
import setupI18N from './i18n'

/** 初始化vue实例注册插件 */
export default function setupPlugins(app: App): void {
  setupVueRouter(app)
  setupVuex(app)
  setupDirective(app)
  setupAntdv(app)
  setupComponent(app)
  setupI18N(app)
}
