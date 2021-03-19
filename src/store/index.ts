/**
 * @description vuex入口ts
 * @author aodazhang 2021.03.09
 */
import { App, toRaw } from 'vue'
import { createStore } from 'vuex'
import { BaseModel } from './model'
import getters from './getters'
import user from './modules/user'

const store = createStore<Vuex.RootState>({
  getters,
  modules: {
    user
  }
})

if (process.env.NODE_ENV === 'development') {
  // 订阅mutations
  store.subscribe((mutations, state) => {
    console.log('[vuex]mutations', mutations, toRaw(state))
  })
}

export { store, BaseModel }
/** vue实例安装vuex */
export default function setupVuex(app: App): void {
  app.use(store)
}
