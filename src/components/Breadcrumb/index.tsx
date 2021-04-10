/**
 * @description 面包屑
 * @author aodazhang 2021.04.10
 */
import { defineComponent, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'
import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
  name: 'Breadcrumb',

  setup() {
    const route = useRoute()
    const { langRef } = useLocale()
    const routesRef = ref<Route[]>([])

    // 监听当前url匹配的路由层级信息，动态生成面包屑数组
    watchEffect(() => {
      const lang = langRef.value
      const routes: Route[] = []
      route.matched.forEach(({ path, meta }) => {
        const { title } = meta as RouteMeta
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
        <section style="padding:12px 24px 16px; background-color:#fff;">
          <Breadcrumb routes={routes} v-slots={{ itemRender: slot }} />
          {title && <h1 style="margin-top:5px;">{title}</h1>}
        </section>
      )
    }
  }
})
