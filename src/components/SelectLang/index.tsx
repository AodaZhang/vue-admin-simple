/**
 * @description 国际化菜单
 * @author aodazhang 2021.04.09
 */
import { defineComponent, reactive } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
  name: 'SelectLang',

  setup() {
    const { keyRef, setLocaleKey } = useLocale()
    const state = reactive({
      'zh-cn': 'cn 简体中文',
      en: 'us English'
    })
    return () => {
      const key = keyRef.value
      const langMenu = (
        <Menu style="min-width:120px;" selectedKeys={[key]}>
          {Object.entries(state).map(([key, value]) => (
            <Menu.Item key={key} onClick={({ key }) => setLocaleKey(key)}>
              {value}
            </Menu.Item>
          ))}
        </Menu>
      )
      return (
        <div>
          <Dropdown trigger={['click', 'hover']} overlay={langMenu}>
            <div style="padding:0 23px;">
              <GlobalOutlined />
            </div>
          </Dropdown>
        </div>
      )
    }
  }
})
