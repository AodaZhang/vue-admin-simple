/**
 * @description vuex定义
 * @author aodazhang 2021.03.09
 */
import { RouteRecordRaw } from 'vue-router'

declare namespace _Vuex {
  interface RootState {
    user: UserState
  }

  interface UserState {
    /** 用户token */
    token: string
    /** 用户信息 */
    info: UserInfo
    /** 用户权限 */
    permission: UserPermission
    /** 动态路由 */
    addRoutes: RouteRecordRaw[]
    /** 基础路由 */
    routes: RouteRecordRaw[]
  }
}

// 处理.d.ts文件import定义文件导致declare失效：https://segmentfault.com/q/1010000021163174?sort=created#
export = _Vuex
export as namespace Vuex
