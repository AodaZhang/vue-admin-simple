/**
 * @description route定义
 * @author aodazhang 2021.04.09
 */

/** 路由元信息 */
declare interface RouteMeta {
  /** 页面级权限匹配 */
  roles?: string[]
  /** 组件是否缓存 */
  keepAlive?: boolean
  /** 侧边栏标题 */
  title?: string
  /** 侧边栏icon */
  icon?: JSX.Element
}
