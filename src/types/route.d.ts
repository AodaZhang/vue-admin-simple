/**
 * @description vue-router全局定义
 * @author aodazhang 2021.03.17
 */

/** 路由元信息 */
declare interface Meta {
  /** 组件是否在侧边栏展示 */
  menu?: boolean
  /** 组件是否缓存 */
  keepAlive?: boolean
  /** 侧边栏标题 */
  title?: string
  /** 侧边栏icon */
  icon?: JSX.Element
  /** 页面级权限匹配 */
  roles?: string[]
}
