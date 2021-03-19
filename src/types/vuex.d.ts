/**
 * @description vuex全局定义
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
    info: Info
    /** 用户权限 */
    permission: Permission
    /** 动态路由 */
    addRoutes: RouteRecordRaw[]
    /** 基础路由 */
    routes: RouteRecordRaw[]
  }

  /** 用户信息 */
  interface Info {
    /** 用户名 */
    name: string
    /** 用户头像 */
    avatar: string
  }

  /** 用户权限 */
  interface Permission {
    /** 用户角色：页面级权限 */
    roles: string[]
    /** 用户操作：dom级权限 */
    actionMap: {
      [key: string]: string[]
    }
  }
}

// 处理.d.ts文件import定义文件导致declare失效：https://segmentfault.com/q/1010000021163174?sort=created#
export = _Vuex
export as namespace Vuex
