/**
 * @description vuex getters
 * @author zhangxinyu 2021.01.23
 */
import { GetterTree } from 'vuex'

// TODO：getters在组件中类型推导不正确
const getters: GetterTree<Vuex.RootState, Vuex.RootState> = {
  token: state => state.user.token,
  permission: state => state.user.permission
}

export default getters
