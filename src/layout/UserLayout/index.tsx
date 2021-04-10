/**
 * @description 用户页面Layout
 * @author aodazhang 2021.04.10
 */
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import useLocale from '@/hooks/useLocale'
import { createRouterView } from '@/utils/view'
import SelectLang from '@/components/SelectLang'

export default defineComponent({
  name: 'UserLayout',

  setup() {
    const { langAntdRef } = useLocale()

    return () => {
      const langAntdv = langAntdRef.value
      return (
        <ConfigProvider locale={langAntdv}>
          <section class="flex-center" style="height:100%">
            <SelectLang
              class="hover"
              style="position:absolute;top:20px;right:0;"
            />
            <div class="flex-item-shrink" style="width:300px;">
              <h1 style="text-align:center;">Vue3 Admin Simple</h1>
              <main style="margin-top:40px;">{createRouterView(false)}</main>
              <footer style="margin-top:40px;text-align:center;">
                Copyright &copy; 2021 AodaZhang
              </footer>
            </div>
          </section>
        </ConfigProvider>
      )
    }
  }
})
