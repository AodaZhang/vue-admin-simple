/**
 * @description vue-router入口
 * @author aodazhang 2021.04.09
 */
import { App } from 'vue'
import { RouteRecordName, RouteRecordRaw } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router, { generateRoutes, resetRouter } from './router'
import { initRoutes } from './routes'
import { store } from '@/store'
import storage from '@/utils/storage'

nprogress.configure({ showSpinner: false })

const loginPage = 'Login' // 登陆页
const indexPage = 'Dashboard' // 默认页
const whitePageList: RouteRecordName[] = [loginPage] // 白名单页列表

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const { redirect } = from.query
  const { name, path, fullPath } = to

  // 路由权限控制
  const token = storage.getItem('token')
  if (token) {
    // 1.登陆态
    const permission: UserPermission = store.getters.permission
    if (permission.role) {
      // 1-1.有权限
      if (whitePageList.includes(name)) {
        // 白名单页：重定向到默认页
        next({ name: indexPage, replace: true })
      } else {
        // 其他页：放行
        next()
      }
    } else {
      // 1-2.无权限
      try {
        // 获取用户信息与权限 + 动态生成路由表
        const addRoutes: RouteRecordRaw[] = await store.dispatch('user/info')
        // vue3.x动态挂载路由：https://github.com/vuejs/vue-router-next/issues/676#issuecomment-751150995
        addRoutes.forEach(route => router.addRoute(route))
        // 处理重定向：由于动态路由在token获取之后挂载，因此重定向时机需晚于登陆成功
        const redirectPath = decodeURIComponent((redirect as string) || path)
        // vue3.x带有参数的path不能通过next({ path: redirectPath })的方式传递
        redirectPath === path
          ? next({ ...to, replace: true })
          : next(redirectPath)
      } catch (error) {
        // 失败则重置登陆信息 + 重定向到登陆页
        store.dispatch('user/reset')
        next({
          name: loginPage,
          replace: true,
          query: { redirect: fullPath }
        })
      }
    }
  } else {
    // 2.非登陆态
    if (whitePageList.includes(name)) {
      // 2-1.白名单页：放行
      next()
    } else {
      // 2-2.其他页：重置登陆信息 + 重定向到登陆页
      store.dispatch('user/reset')
      next({ name: loginPage, replace: true, query: { redirect: fullPath } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export { initRoutes, generateRoutes, resetRouter }
/** vue实例安装vue-router */
export default function setupVueRouter(app: App): void {
  app.use(router)
}
