/**
 * @description 用户类视图layout
 * @author zhangxinyu 2021.03.11
 */
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ConfigProvider } from 'ant-design-vue'
import AnimateBackground from '@/components/AnimateBackground'
import SelectLang from '@/components/SelectLang'
import { createRouterView } from '../view'
import './style.less'

export default defineComponent({
  name: 'UserLayout',

  setup() {
    const store = useStore()
    return () => (
      <ConfigProvider locale={store.getters.localeAntdv}>
        <div id="userLayout" class="user-layout">
          <AnimateBackground />
          <SelectLang class="user-layout__lang" color="#fff" />
          <div class="user-layout__main">
            <h1 class="user-layout__main__header">Vue Admin Simple</h1>
            <section class="user-layout__main__container">
              {createRouterView(false)}
            </section>
            <p class="user-layout__main__footer">
              Copyright &copy; 2021 AodaZhang
            </p>
          </div>
        </div>
      </ConfigProvider>
    )
  }
})
