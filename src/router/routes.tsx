/**
 * @description 路由配置
 * @author aodazhang 2021.04.09
 */
import { RouteRecordRaw } from 'vue-router'
import {
  DesktopOutlined,
  FormOutlined,
  HomeOutlined,
  TableOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import UserLayout from '@/layout/UserLayout'
import BaseLayout from '@/layout/BaseLayout'

/** 初始路由 */
export const initRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404/index.vue')
  }
]

/**
 * 动态路由：vue3.x中，动态卸载路由需要提供name作为参数，因此建议为每个动态路由都添加name属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/info',
    meta: {
      roles: [],
      menu: true,
      keepAlive: true,
      title: 'menu.index',
      icon: <HomeOutlined />
    },
    component: BaseLayout,
    children: [
      {
        path: 'info',
        name: 'Info',
        meta: {
          roles: [],
          keepAlive: true,
          title: 'menu.index.info',
          icon: <UserOutlined />
        },
        component: () =>
          import(/* webpackChunkName: "info" */ '@/views/info/index.vue')
      }
    ]
  },
  {
    path: '/data',
    name: 'Data',
    redirect: '/data/table',
    meta: {
      roles: [],
      keepAlive: true,
      title: 'menu.data',
      icon: <DesktopOutlined />
    },
    component: BaseLayout,
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: {
          roles: [],
          keepAlive: true,
          title: 'menu.data.table',
          icon: <TableOutlined />
        },
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/table/index.vue')
      },
      {
        path: 'form',
        name: 'Form',
        redirect: '/data/form/form1',
        meta: {
          roles: ['editor', 'viewer'],
          keepAlive: true,
          title: 'menu.data.form',
          icon: <FormOutlined />
        },
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
        children: [
          {
            path: 'form1',
            name: 'Form1',
            meta: {
              roles: ['editor'],
              keepAlive: true,
              title: 'menu.data.form.form1'
            },
            component: () =>
              import(
                /* webpackChunkName: "form1" */ '@/views/form/form1/index.vue'
              )
          },
          {
            path: 'form2',
            name: 'Form2',
            meta: {
              roles: [],
              keepAlive: true,
              title: 'menu.data.form.form2'
            },
            component: () =>
              import(
                /* webpackChunkName: "form2" */ '@/views/form/form2/index.vue'
              )
          }
        ]
      }
    ]
  },
  {
    // 404重定向
    // vue3.x重定向*路由引入方式变化：https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
    path: '/:catchAll(.*)',
    name: 'Redirect',
    // vue3.x重定向*建议使用name而非path进行跳转
    redirect: { name: '404' }
  }
]
