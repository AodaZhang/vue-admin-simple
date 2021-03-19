import { computed, defineComponent, PropType, reactive, watch } from 'vue'
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ConfigProvider, Layout, Menu } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import useLocale from '@/hooks/useLocale'
import Logo from '@/components/Logo'
import Breadcrumb from '@/components/Breadcrumb'
import SelectLang from '@/components/SelectLang'
import SelectUser from '@/components/SelectUser'
import { createRouterView } from '../view'
import './style.less'

/** 递归列表项 */
const MenuItem = defineComponent({
  props: {
    route: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    path: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props) {
    const { langRef } = useLocale()
    return () => {
      const lang = langRef.value
      const { route, path } = props
      const { meta, children } = route
      const { menu, title, icon } = (meta as Meta) || {}
      const slot = () => (
        <span>
          {icon}
          <span>{lang[title]}</span>
        </span>
      )
      if (!menu) {
        return null
      } else if (Array.isArray(children)) {
        return (
          <Menu.SubMenu v-slots={{ title: slot }}>
            {children.map(item => {
              const fullPath =
                !path || path === '/' ? `/${item.path}` : `${path}/${item.path}`
              return <MenuItem key={fullPath} route={item} path={fullPath} />
            })}
          </Menu.SubMenu>
        )
      } else {
        return (
          <RouterLink to={path}>
            <Menu.Item>{slot}</Menu.Item>
          </RouterLink>
        )
      }
    }
  }
})

export default defineComponent({
  name: 'BaseLayout',

  setup() {
    const route = useRoute()
    const { langAntdRef } = useLocale()
    const store = useStore<Vuex.RootState>()
    const routesRef = computed(() => store.state.user.routes)
    const state = reactive({
      collapsed: false,
      preOpenKeys: [],
      openKeys: [],
      selectedKeys: []
    })

    watch(
      () => state.collapsed,
      newVal => {
        state.openKeys = newVal ? [] : state.preOpenKeys
      }
    )

    watch(
      () => state.openKeys,
      (_newVal, oldVal) => {
        oldVal.length && (state.preOpenKeys = oldVal)
      }
    )

    // 监听路由matched计算展开SubMenu + 选中Menu.Item
    watch(
      () => route.matched,
      newVal => {
        // openKeys去重
        const openKeys = new Set(state.openKeys)
        newVal.forEach(({ path }) => path && openKeys.add(path))
        // 计算展开SubMenu：slider收起状态下更新preOpenKeys
        state.collapsed
          ? (state.preOpenKeys = [...openKeys])
          : (state.openKeys = [...openKeys])
        // 选中Menu.Item：更新选中key
        const lastItem = newVal[newVal.length - 1]
        state.selectedKeys = lastItem ? [lastItem.path] : []
      },
      { immediate: true }
    )

    // menu收起/展开
    const toggleCollapsed = () => (state.collapsed = !state.collapsed)

    return () => {
      const langAntdv = langAntdRef.value
      const routes = routesRef.value
      return (
        <ConfigProvider locale={langAntdv}>
          <Layout class="base-layout" hasSider>
            <Layout.Sider
              breakpoint="lg"
              collapsible
              trigger={null}
              v-model={[state.collapsed, 'collapsed']}
            >
              <Logo collapsed={state.collapsed} />
              <Menu
                inlineCollapsed={true}
                mode="inline"
                theme="dark"
                v-models={[
                  [state.openKeys, 'openKeys'],
                  [state.selectedKeys, 'selectedKeys']
                ]}
              >
                {routes.map(item => (
                  <MenuItem key={item.path} route={item} path={item.path} />
                ))}
              </Menu>
            </Layout.Sider>
            <Layout>
              <Layout.Header>
                {state.collapsed ? (
                  <MenuUnfoldOutlined
                    class="base-layout__trigger tran-hover"
                    onClick={toggleCollapsed}
                  />
                ) : (
                  <MenuFoldOutlined
                    class="base-layout__trigger tran-hover"
                    onClick={toggleCollapsed}
                  />
                )}

                <SelectLang
                  class="base-layout__lang tran-hover"
                  color="rgba(0, 0, 0, 0.65)"
                />
                <SelectUser class="base-layout__user tran-hover" />
              </Layout.Header>
              <Layout.Content>
                <Breadcrumb />
                <section class="base-layout__main">
                  {createRouterView(route.meta.keepAlive, 'router')}
                </section>
              </Layout.Content>
              <Layout.Footer>Copyright &copy; 2021 AodaZhang</Layout.Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      )
    }
  }
})
