/**
 * @description layout定义
 * @author aodazhang 2021.04.09
 */
import { ColumnProps, TableState } from 'ant-design-vue/lib/table/interface'

declare namespace _Layout {
  /** 表格layout配置项 */
  interface TableLayoutConfig {
    /** 功能按钮配置 */
    btnConfig?: LayoutButton[]
    /** 表格行配置 */
    rowKey?: string
    /** 表格列配置 */
    columns?: ColumnProps[]
    /** 分页器配置 */
    pagination?: Pagination
    /** 加载器配置 */
    loading?: boolean
  }

  /** 分页器配置 */
  type Pagination = TableState['pagination']

  /** layout功能按钮 */
  interface Button {
    /** 按钮类型 */
    type: 'export' | 'import' | 'download'
    /** 按钮标题 */
    title: string
  }
}

export = _Layout
export as namespace Layout
