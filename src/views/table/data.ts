/**
 * @description 数据层
 * @author aodazhang 2021.04.10
 */
import { Dayjs } from 'dayjs'

export interface State {
  /** layout配置 */
  layout: Layout.TableLayoutConfig
  /** 搜索数据 */
  search: Search
  /** 列表数据 */
  list: ActivityInfo[]
}

interface Search {
  /** 活动日期 */
  activityDate: Dayjs
  /** 活动平台 */
  activityPlatform: string
  /** 活动序号 */
  activityId: string
  /** 活动名称 */
  activityName: string
}

export const layout: Layout.TableLayoutConfig = {
  btnConfig: [
    { type: 'export', title: '导出列表数据' },
    { type: 'import', title: '导入列表数据' },
    { type: 'download', title: '下载' }
  ],
  rowKey: 'activityId',
  columns: [
    {
      title: '活动序号',
      key: 'activityId',
      dataIndex: 'activityId',
      align: 'center'
    },
    {
      title: '活动名称',
      key: 'activityName',
      dataIndex: 'activityName',
      align: 'center'
    },
    {
      title: '活动平台',
      key: 'activityPlatform',
      dataIndex: 'activityPlatform',
      align: 'center'
    },
    {
      title: '活动日期',
      key: 'activityDate',
      dataIndex: 'activityDate',
      align: 'center'
    },
    {
      title: '活动标签',
      key: 'activitytags',
      dataIndex: 'activitytags',
      align: 'center',
      slots: { customRender: 'tag' }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      slots: { customRender: 'action' }
    }
  ],
  pagination: {
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    total: 0,
    pageSize: 10,
    current: 1
  },
  loading: false
}

export const search: Search = {
  activityDate: null,
  activityPlatform: null,
  activityId: null,
  activityName: null
}
