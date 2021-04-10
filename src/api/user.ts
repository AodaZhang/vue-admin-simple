/**
 * @description 用户与权限
 * @author aodazhang 2021.04.09
 */
import { axiosInstance } from './ajax'

const baseUrl = '/user'

/** 1.用户登陆 */
export function getLogin(data: {
  username: string
  password: string
}): ResponseInstance<string> {
  return axiosInstance.post(`${baseUrl}/login`, data)
}

/** 2.用户登出 */
export function getLogout(): ResponseInstance {
  return axiosInstance.post(`${baseUrl}/logout`)
}

/** 3.用户信息 */
export function getInfo(): ResponseInstance<UserInfo> {
  return axiosInstance.get(`${baseUrl}/info`)
}

/** 4.用户权限 */
export function getPermission(): ResponseInstance<UserPermission> {
  return axiosInstance.get(`${baseUrl}/permission`)
}
