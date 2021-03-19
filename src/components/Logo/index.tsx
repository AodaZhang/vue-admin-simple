/**
 * @description 网站Logo
 * @author zhangxinyu 2021.03.17
 */
import { Image } from 'ant-design-vue'
import { defineComponent, PropType, Transition } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '@/assets/image/logo.png'
import './style.less'

export default defineComponent({
  name: 'Logo',

  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup(props) {
    return () => {
      const { collapsed } = props
      return (
        <RouterLink to="/">
          <div class="logo">
            <Image src={logo} preview={false} placeholder />
            <Transition name="fade">
              {!collapsed && <p class="logo__title">Vue Admin</p>}
            </Transition>
          </div>
        </RouterLink>
      )
    }
  }
})
