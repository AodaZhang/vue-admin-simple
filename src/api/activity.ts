/**
 * @description 活动
 * @author aodazhang 2021.04.10
 */
import { axiosInstance } from './ajax'

const baseUrl = '/activity'

/** 1.活动列表 */
export function getList(data: {
  activityDate: string
  activityPlatform: string
  activityId: string
  activityName: string
  pageSize: number
  current: number
}): ResponseInstance<ActivityInfos> {
  return axiosInstance.post(`${baseUrl}/list`, data)
}
