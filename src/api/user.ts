import request from '@/utils/request'

const axiosInstance = request.createAxiosInstance(
  process.env.VUE_APP_BASE_URL_USER
)

/** 1.用户登陆 */
export function getLogin(data: {
  username: string
  password: string
}): Promise<{ token: string }> {
  return axiosInstance.post('/login', data)
}

/** 2.用户登出 */
export function getLogout(): Promise<unknown> {
  return axiosInstance.post('/logout')
}

/** 3.用户信息 */
export function getInfo(): Promise<{ info: Vuex.Info }> {
  return axiosInstance.get('/info')
}

/** 4.用户权限 */
export function getPermission(): Promise<{ permission: Vuex.Permission }> {
  return axiosInstance.get('/permission')
}
