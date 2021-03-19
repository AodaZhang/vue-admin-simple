/**
 * @description 面包屑
 * @author zhangxinyu 2021.03.17
 */
import { defineComponent, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'
import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb'
import useLocale from '@/hooks/useLocale'
import './style.less'

export default defineComponent({
  name: 'Breadcrumb',

  setup() {
    const route = useRoute()
    const { langRef } = useLocale()
    const routesRef = ref<Route[]>([])

    // 监听当前路由匹配层级信息
    watchEffect(() => {
      const lang = langRef.value
      const routes: Route[] = []
      route.matched.forEach(({ path, meta }) => {
        const { title } = meta as Meta
        if (!title) {
          return
        }
        routes.push({
          path,
          breadcrumbName: lang[title] || title
        })
      })
      routesRef.value = routes
    })

    return () => {
      const routes = routesRef.value
      const lastRoute = routes[routes.length - 1]
      const title = lastRoute ? lastRoute.breadcrumbName : ''
      const slot = ({ routes, route }: { routes: Route[]; route: Route }) => {
        const { path, breadcrumbName } = route
        return routes.indexOf(route) === routes.length - 1 ? (
          <span key={path}>{breadcrumbName}</span>
        ) : (
          <RouterLink key={path} to={path}>
            {breadcrumbName}
          </RouterLink>
        )
      }
      return (
        <div class="breadcrumb">
          <Breadcrumb routes={routes} v-slots={{ itemRender: slot }} />
          {title && <h1>{title}</h1>}
        </div>
      )
    }
  }
})
