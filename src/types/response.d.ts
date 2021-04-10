/**
 * @description 响应结构体定义
 * @author aodazhang 2021.04.09
 */

/** axios实例返回promise响应结果 */
declare type ResponseInstance<T = unknown> = Promise<Response<T>>

/** 响应结构体 */
declare interface Response<T = unknown> {
  /** 状态码 */
  code: number
  /** 错误信息 */
  errMsg: string
  /** 数据 */
  data: T
}

declare interface UserInfo {
  /** 用户名 */
  name: string
  /** 用户头像 */
  avatar: string
}

declare interface UserPermission {
  /** 用户角色：页面级权限 */
  role: string
  /** 用户操作：dom级权限 */
  actionMap: {
    [key: string]: string[]
  }
}

declare interface ActivityInfos {
  /** 数据总量 */
  total: number
  /** 数据列表 */
  list: ActivityInfo[]
}

declare interface ActivityInfo {
  /** 活动序号 */
  activityId: number
  /** 活动名称 */
  activityName: string
  /** 活动平台 */
  activityPlatform: string
  /** 活动日期 */
  activityDate: string
  /** 活动标签 */
  activitytags: string[]
}
