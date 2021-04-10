/**
 * @description 基础Layout
 * @author aodazhang 2021.04.10
 */
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ConfigProvider, Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { createRouterView } from '@/utils/view'
import useLocale from '@/hooks/useLocale'
import Breadcrumb from '@/components/Breadcrumb'
import Logo from '@/components/Logo'
import SelectLang from '@/components/SelectLang'
import SelectMenu from '@/components/SelectMenu'
import SelectUser from '@/components/SelectUser'

export default defineComponent({
  name: 'BaseLayout',

  setup() {
    const route = useRoute()
    const { langAntdRef } = useLocale()
    const collapsedRef = ref(false)

    // menu收起/展开
    const toggleCollapsed = () => (collapsedRef.value = !collapsedRef.value)

    return () => {
      const langAntdv = langAntdRef.value
      const collapsed = collapsedRef.value
      return (
        <ConfigProvider locale={langAntdv}>
          <Layout style="height:100%;" hasSider>
            {/* 侧边栏 */}
            <Layout.Sider
              breakpoint="lg"
              collapsible
              trigger={null}
              v-model={[collapsedRef.value, 'collapsed']}
            >
              <Logo collapsed={collapsed} />
              <SelectMenu collapsed={collapsed} />
            </Layout.Sider>
            {/* 主区域 */}
            <Layout>
              {/* 控制区 */}
              <Layout.Header class="flex-between">
                {collapsed ? (
                  <MenuUnfoldOutlined
                    class="flex-center hover-bg-gray"
                    style="height:100%;padding:0 23px;"
                    onClick={toggleCollapsed}
                  />
                ) : (
                  <MenuFoldOutlined
                    class="flex-center hover-bg-gray"
                    style="height:100%;padding:0 23px;"
                    onClick={toggleCollapsed}
                  />
                )}
                <div class="flex-item-grow"></div>
                <SelectUser class="hover-bg-gray" />
                <SelectLang class="hover-bg-gray" />
              </Layout.Header>
              {/* 内容区 */}
              <Layout.Content>
                <Breadcrumb />
                <section style="padding:24px 24px 0;">
                  {createRouterView(route.meta.keepAlive, 'router')}
                </section>
              </Layout.Content>
              {/* 信息区 */}
              <Layout.Footer>Copyright &copy; 2021 AodaZhang</Layout.Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      )
    }
  }
})
