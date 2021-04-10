/**
 * @description 用户菜单
 * @author aodazhang 2021.04.09
 */
import { computed, createVNode, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Avatar, Dropdown, Menu, message, Modal } from 'ant-design-vue'
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
  name: 'SelectUser',

  setup() {
    const router = useRouter()
    const store = useStore<Vuex.RootState>()
    const { langRef } = useLocale()
    const info = computed(() => store.state.user.info)

    const userInfo = () => router.push({ name: 'Info' })

    const logout = () => {
      const lang = langRef.value
      Modal.confirm({
        centered: true,
        icon: createVNode(ExclamationCircleOutlined),
        title: lang['selectUser.model.title'],
        content: lang['selectUser.model.content'],
        onOk: () =>
          new Promise(resolve => {
            store
              .dispatch('user/logout')
              .then(() => {
                resolve('')
                message.success(lang['selectUser.message.success'])
                router.replace({ name: 'Login' })
              })
              .catch(() => {
                resolve('')
                message.error(lang['selectUser.message.failure'])
              })
          })
      })
    }

    return () => {
      const lang = langRef.value
      const { avatar, name } = info.value
      const userMenu = (
        <Menu style="min-width:120px;">
          <Menu.Item onClick={userInfo}>
            <UserOutlined style="color:#1890ff;" />
            {lang['selectUser.user']}
          </Menu.Item>
          <Menu.Item onClick={logout}>
            <LogoutOutlined style="color:#f5222d;" />
            {lang['selectUser.logout']}
          </Menu.Item>
        </Menu>
      )
      return (
        <Dropdown trigger={['click', 'hover']} overlay={userMenu}>
          <div style="padding:0 10px;">
            <Avatar size="small" src={avatar} />
            <span style="min-width:20px;margin-left:8px;">{name}</span>
          </div>
        </Dropdown>
      )
    }
  }
})
