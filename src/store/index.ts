/**
 * @description vuex入口
 * @author aodazhang 2021.04.08
 */
import { App, toRaw } from 'vue'
import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'

const store = createStore<Vuex.RootState>({
  getters,
  modules: {
    user
  }
})

if (process.env.NODE_ENV === 'development') {
  // 开发环境订阅mutations
  store.subscribe((mutations, state) => {
    console.log('[vuex]mutations', mutations, toRaw(state))
  })
}

export { store }
/** vue实例安装vuex */
export default function setupVuex(app: App): void {
  app.use(store)
}
