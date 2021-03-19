/**
 * @description axios网络请求
 * @author aodazhang 2021.03.09
 */
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { message } from 'ant-design-vue'
import storage from './storage'

/** Request实例接口 */
export interface RequestInstance extends AxiosInstance {
  cancel?: () => void
}

/** Content-Type编码格式 */
type RequestEnctype =
  | 'application/json;charset=UTF-8'
  | 'application/x-www-form-urlencoded;charset:UTF-8'
  | 'multipart/form-data'

/** HTTP状态响应码 */
const responseStatusMap = new Map([
  [400, '请求错误'],
  [401, '请求认证失败，请重新登录'],
  [403, '请求被服务器拒绝'],
  [404, '请求资源不存在'],
  [405, '请求的http方法不合法'],
  [408, '请求超时'],
  [500, '服务器错误'],
  [501, '网络未实现'],
  [502, '网络错误'],
  [503, '服务器不可用'],
  [504, '网络超时'],
  [505, 'http版本不支持该请求']
])

/**
 * axios实例创建函数
 * @param baseURL 请求根路径
 * @param enctype request Content-Type
 * @param timeout request 超时时间
 * @param useCancel 是否开启axios取消请求功能
 */
function createAxiosInstance(
  baseURL: string,
  enctype?: RequestEnctype,
  timeout?: number,
  useCancel?: boolean
): RequestInstance {
  // 1.axios实例
  const axiosInstance: RequestInstance = axios.create({
    baseURL: baseURL || '',
    timeout: timeout || 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': enctype || 'application/json;charset=UTF-8'
    }
  })

  // 2.axios请求取消函数集合
  const cancelMap = new Map()

  // 3.取消之前全部网络请求
  axiosInstance.cancel = () => {
    for (const [key, value] of cancelMap) {
      value && value()
      cancelMap.delete(key)
    }
  }

  // 4.请求拦截器
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // [取消请求]增加取消请求token
      if (useCancel === true) {
        const source = axios.CancelToken.source()
        cancelMap.set(source.token, source.cancel)
        config.cancelToken = source.token
      }
      // [登陆]增加登录态
      const token = storage.getItem('token')
      token && (config.headers['token'] = token)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 5.响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { config, data } = response
      const { cancelToken } = config
      // [取消请求]已响应请求不取消
      if (useCancel === true) {
        cancelToken && cancelMap.delete(cancelToken)
      }
      return data
    },
    (error: AxiosError) => {
      const { status } = error.response
      message.error(responseStatusMap.get(status) || '网络错误，请稍后再试')
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

export default { createAxiosInstance }
