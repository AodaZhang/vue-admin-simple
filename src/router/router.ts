/**
 * @description 路由实例
 * @author aodazhang 2021.04.09
 */
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'
import { initRoutes, asyncRoutes } from './routes'

// 1.创建路由实例函数
const initRouter = (): Router =>
  createRouter({
    routes: initRoutes,
    // hash路由创建可改为createWebHashHistory
    history: createWebHistory(process.env.VUE_APP_BASE_URL_ROUTER),
    // vue3.x中x、y变更为left、top
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition ? savedPosition : { left: 0, top: 0 }
    }
  })

// 2.根据用户权限过滤动态路由
const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  role: string
): RouteRecordRaw[] => {
  // 其他角色根据路由meta过滤
  const addRoutes: RouteRecordRaw[] = []
  routes.forEach(route => {
    const routeTmp = { ...route }
    let hasPermission = true
    if (
      routeTmp.meta &&
      Array.isArray(routeTmp.meta.roles) &&
      routeTmp.meta.roles.length
    ) {
      hasPermission = (routeTmp.meta.roles as string[]).includes(role)
    }
    if (hasPermission) {
      if (routeTmp.children) {
        routeTmp.children = filterAsyncRoutes(routeTmp.children, role)
      }
      addRoutes.push(routeTmp)
    }
  })
  return addRoutes
}

// 3.路由实例
const router = initRouter()

/**
 * 根据用户权限生成动态路由
 * @param role 用户权限
 * @returns 动态添加路由
 */
export function generateRoutes(role: string): RouteRecordRaw[] {
  if (role === 'admin') {
    // 管理员：返回全部页面
    return asyncRoutes
  } else {
    // 其他角色：返回权限对应页面
    return filterAsyncRoutes(asyncRoutes, typeof role === 'string' ? role : '')
  }
}

/**
 * 重置路由实例
 * vue2.x：https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 * vue3.x：https://next.router.vuejs.org/zh/api/#removeroute
 * @param addRoutes 动态添加路由
 * @returns 重置结果
 */
export function resetRouter(addRoutes: RouteRecordRaw[]): boolean {
  try {
    Array.isArray(addRoutes) &&
      addRoutes.forEach(({ name }) => name && router.removeRoute(name))
    return true
  } catch (error) {
    return false
  }
}

export default router
