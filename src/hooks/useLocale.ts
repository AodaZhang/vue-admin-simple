/**
 * @description 国际化
 * @author aodazhang 2021.04.10
 */
import { inject, toRefs } from 'vue'
import { I18N, I18NSetLocaleKey } from '@/plugins/i18n'

/** 使用国际化 */
export default function useLocale() {
  const locale = inject<I18N>('locale')
  /** 切换语言key */
  const setLocaleKey = inject<I18NSetLocaleKey>('setLocaleKey')
  return { ...toRefs(locale), setLocaleKey }
}
