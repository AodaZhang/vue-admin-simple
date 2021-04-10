/**
 * @description axios实例
 * @author aodazhang 2021.04.09
 */
import request from '@/utils/request'

/** 1.application/json请求实例 */
export const axiosInstance = request.createAxiosInstance(
  process.env.VUE_APP_BASE_URL_API,
  'application/json;charset=UTF-8',
  20000,
  false
)
