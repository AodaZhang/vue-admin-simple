/**
 * @description 用户与权限
 * @author aodazhang 2021.04.10
 */
import { Module } from 'vuex'
import { initRoutes, generateRoutes, resetRouter } from '@/router'
import storage from '@/utils/storage'
import { RESPONSE_CODE, user } from '@/api'
import { UserInfoModel, UserPermissionModel } from '@/model'

const module: Module<Vuex.UserState, Vuex.RootState> = {
  namespaced: true,
  state: {
    token: storage.getItem('token'),
    info: new UserInfoModel(),
    permission: new UserPermissionModel(),
    addRoutes: [],
    routes: []
  },

  mutations: {
    SET_TOKEN(state, payload) {
      const token = payload
      state.token = token
      storage.setItem('token', token)
    },
    SET_INFO(state, payload) {
      state.info =
        payload instanceof UserInfoModel ? payload : new UserInfoModel()
    },
    SET_PERMISSION(state, payload) {
      state.permission =
        payload instanceof UserPermissionModel
          ? payload
          : new UserPermissionModel()
    },
    SET_ADDROUTES(state, payload) {
      const addRoutes = Array.isArray(payload) ? payload : []
      state.addRoutes = addRoutes
      state.routes = initRoutes.concat(addRoutes)
    }
  },

  actions: {
    // 1.用户登录
    async login({ commit }, payload) {
      try {
        const { username, password } = payload || {}
        const { code, data } = await user.getLogin({ username, password })
        if (code !== RESPONSE_CODE.NORMAL) {
          throw new Error()
        }
        commit('SET_TOKEN', data)
        return ''
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 2.用户登出
    async logout({ dispatch }) {
      try {
        await user.getLogout()
        dispatch('reset')
        return ''
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 3.获取用户信息与权限，并生成动态路由
    async info({ commit }) {
      try {
        const { code: code1, data: data1 } = await user.getInfo()
        const { code: code2, data: data2 } = await user.getPermission()
        const { role } = data2 || {}
        if (
          code1 !== RESPONSE_CODE.NORMAL ||
          code2 !== RESPONSE_CODE.NORMAL ||
          !role
        ) {
          throw new Error()
        }
        const addRoutes = generateRoutes(role)
        commit('SET_INFO', new UserInfoModel(data1))
        commit('SET_PERMISSION', new UserPermissionModel(data2))
        commit('SET_ADDROUTES', addRoutes)
        return addRoutes
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 4.重置用户token + 用户信息 + 基础路由
    reset({ commit, state }) {
      resetRouter(state.addRoutes)
      commit('SET_TOKEN', null)
      commit('SET_INFO', null)
      commit('SET_PERMISSION', null)
      commit('SET_ADDROUTES', null)
    }
  }
}

export default module
