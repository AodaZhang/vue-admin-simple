/**
 * @description vuex getters
 * @author aodazhang 2021.04.08
 */
import { GetterTree } from 'vuex'

// TODO：getters在组件中类型推导不正确
const getters: GetterTree<Vuex.RootState, Vuex.RootState> = {
  permission: state => state.user.permission
}

export default getters
