/**
 * @description 页面菜单
 * @author aodazhang 2021.04.09
 */
import { computed, defineComponent, PropType, reactive, watch } from 'vue'
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Menu } from 'ant-design-vue'
import useLocale from '@/hooks/useLocale'

/**
 * 根据路由实例数组创建MenuItem
 * @param lang 语言包
 * @param routes 路由实例数组
 * @param parentPath 父级路由路径
 * @returns jsx
 */
function createMenuItem(
  lang: { [key: string]: string },
  routes: RouteRecordRaw[],
  parentPath?: string
): JSX.Element {
  return routes.map(route => {
    const { meta, children, path } = route || {}
    const { roles, title, icon } = (meta as RouteMeta) || {}
    // 当前路径
    const fullPath = !parentPath
      ? `${path}`
      : parentPath === '/'
      ? `/${path}`
      : `${parentPath}/${path}`
    // 菜单项slot
    const slot = () => (
      <>
        {icon}
        <span>{lang[title]}</span>
      </>
    )
    if (!roles) {
      // 1.不存在权限列表：不生成MenuItem
      return null
    } else if (Array.isArray(children)) {
      // 2.存在子路由：根据子路由情况判断是否生成二级菜单
      if (children.length > 1) {
        return (
          <Menu.SubMenu key={fullPath} v-slots={{ title: slot }}>
            {createMenuItem(lang, children, fullPath)}
          </Menu.SubMenu>
        )
      } else {
        const subFullPath =
          fullPath === '/'
            ? `/${children[0].path}`
            : `${fullPath}/${children[0].path}`
        return (
          <Menu.Item key={subFullPath}>
            <RouterLink to={subFullPath}>{slot}</RouterLink>
          </Menu.Item>
        )
      }
    } else {
      // 3.不存在子路由：直接生成MenuItem
      return (
        <Menu.Item key={fullPath}>
          <RouterLink to={fullPath}>{slot}</RouterLink>
        </Menu.Item>
      )
    }
  })
}

export default defineComponent({
  name: 'SelectMenu',

  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    const store = useStore<Vuex.RootState>()
    const { langRef } = useLocale()
    const routesRef = computed(() => store.state.user.routes)
    const state = reactive({
      preOpenKeys: [],
      openKeys: [],
      selectedKeys: []
    })

    watch(
      () => props.collapsed,
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
        props.collapsed
          ? (state.preOpenKeys = [...openKeys])
          : (state.openKeys = [...openKeys])
        // 选中Menu.Item：更新选中key
        const lastItem = newVal[newVal.length - 1]
        state.selectedKeys = lastItem ? [lastItem.path] : []
      },
      { immediate: true }
    )

    return () => {
      const lang = langRef.value
      const routes = routesRef.value
      return (
        <Menu
          inlineCollapsed={true}
          mode="inline"
          theme="dark"
          v-models={[
            [state.openKeys, 'openKeys'],
            [state.selectedKeys, 'selectedKeys']
          ]}
        >
          {createMenuItem(lang, routes)}
        </Menu>
      )
    }
  }
})
