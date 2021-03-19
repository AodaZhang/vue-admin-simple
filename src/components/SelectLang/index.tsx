/**
 * @description 国际化语言选择
 * @author zhangxinyu 2021.03.11
 */
import { defineComponent, reactive, PropType } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import useLocale from '@/hooks/useLocale'
import './style.less'

export default defineComponent({
  name: 'SelectLang',

  props: {
    color: {
      type: String as PropType<string>,
      required: false,
      default: () => '#ffffff'
    }
  },

  setup(props) {
    const { keyRef, setLocaleKey } = useLocale()
    const state = reactive({
      'zh-cn': 'cn 简体中文',
      en: 'us English'
    })
    return () => {
      const { color } = props
      const key = keyRef.value
      const langMenu = (
        <Menu style={{ minWidth: '120px' }} selectedKeys={[key]}>
          {Object.entries(state).map(([key, value]) => (
            <Menu.Item key={key} onClick={({ key }) => setLocaleKey(key)}>
              {value}
            </Menu.Item>
          ))}
        </Menu>
      )
      return (
        <Dropdown
          class="select-lang"
          trigger={['click', 'hover']}
          overlay={langMenu}
        >
          <GlobalOutlined style={{ fontSize: '18px', color }} />
        </Dropdown>
      )
    }
  }
})
