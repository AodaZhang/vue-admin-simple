/**
 * @description 网站Logo
 * @author aodazhang 2021.04.10
 */
import { defineComponent, PropType, Transition } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '@/assets/image/logo.png'

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
          <div class="flex-center" style="height:64px;">
            <img style="width:24px; height:24px;" src={logo} />
            <Transition name="fade">
              {!collapsed && (
                <h1
                  class="font-nowrap"
                  style="margin-left:8px; font-size:22px; color:#fff;"
                >
                  Vue3 Admin
                </h1>
              )}
            </Transition>
          </div>
        </RouterLink>
      )
    }
  }
})
