/**
 * @description 用户与权限相关store
 * @author aodazhang 2021.03.09
 */
import { Module } from 'vuex'
import { initRoutes, generateRoutes, resetRouter } from '@/router'
import storage from '@/utils/storage'
import api from '@/api'

const module: Module<Vuex.UserState, Vuex.RootState> = {
  namespaced: true,
  state: {
    token: storage.getItem('token') || '',
    info: {
      name: '',
      avatar: ''
    },
    permission: {
      roles: [],
      actionMap: {}
    },
    addRoutes: [],
    routes: []
  },

  mutations: {
    SET_TOKEN(state, payload) {
      const token = payload || ''
      state.token = token
      storage.setItem('token', token)
    },
    SET_INFO(state, payload) {
      state.info = payload || { name: '', avatar: '' }
    },
    SET_PERMISSION(state, payload) {
      state.permission = payload || { roles: [], actionMap: {} }
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
        const { token } = await api.user.getLogin({ username, password })
        if (!token) {
          throw new Error()
        }
        commit('SET_TOKEN', token)
        return ''
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 2.用户登出
    async logout({ dispatch }) {
      try {
        await api.user.getLogout()
        dispatch('reset')
        return ''
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 3.获取用户信息与权限，并生成动态路由
    async info({ commit }) {
      try {
        const { info } = await api.user.getInfo()
        const { permission } = await api.user.getPermission()
        const { roles } = permission || {}
        if (!roles.length) {
          // 权限为空则认为失败
          throw new Error()
        }
        const addRoutes = generateRoutes(roles)
        commit('SET_INFO', info)
        commit('SET_PERMISSION', permission)
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
