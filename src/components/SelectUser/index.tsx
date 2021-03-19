/**
 * @description 国际化语言选择
 * @author zhangxinyu 2021.03.11
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
import './style.less'

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
        <Menu style={{ minWidth: '120px' }}>
          <Menu.Item onClick={userInfo}>
            <UserOutlined />
            {lang['selectUser.user']}
          </Menu.Item>
          <Menu.Item onClick={logout}>
            <LogoutOutlined />
            {lang['selectUser.logout']}
          </Menu.Item>
        </Menu>
      )
      return (
        <Dropdown
          class="select-user"
          trigger={['click', 'hover']}
          overlay={userMenu}
        >
          <div>
            <Avatar size="small" src={avatar} />
            <span class="select-user__name">{name}</span>
          </div>
        </Dropdown>
      )
    }
  }
})
