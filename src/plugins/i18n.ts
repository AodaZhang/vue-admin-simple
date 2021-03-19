/**
 * @description i18n国际化插件
 * @author aodazhang 2021.03.16
 */
import { App, reactive } from 'vue'
import { Locale } from 'ant-design-vue/lib/locale-provider'
import AntdvZhCN from 'ant-design-vue/es/locale/zh_CN'
import AntdvEn from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import storage from '@/utils/storage'
import zhCN from '@/locale/zh-cn'
import en from '@/locale/en'

/** 国际化响应式数据 */
export interface I18N {
  /** 语言key */
  keyRef: string
  /** 全局语言包 */
  langRef: { [key: string]: string }
  /** antdv语言包 */
  langAntdRef: Locale
}

/** 设置当前语言 */
export type I18NSetLocaleKey = (key: 'zh-cn' | 'en') => void

// 国际化配置
const localeConfigMap = new Map([
  ['zh-cn', { lang: zhCN, langAntdv: AntdvZhCN }],
  ['en', { lang: en, langAntdv: AntdvEn }]
])

// i18n国际化插件
const i18n = {
  install: (app: App) => {
    // 读取缓存语言包key
    const cacheLocaleKey = storage.getItem<string>('locale')
    // 初始化语言包key
    const initLocaleKey = localeConfigMap.has(cacheLocaleKey)
      ? cacheLocaleKey
      : 'zh-cn'
    // 初始化dayjs语言包
    dayjs.locale(initLocaleKey)

    // 1.国际化数据
    const locale = reactive<I18N>({
      keyRef: initLocaleKey,
      langRef: localeConfigMap.get(initLocaleKey).lang,
      langAntdRef: localeConfigMap.get(initLocaleKey).langAntdv
    })

    // 2.设置当前语言
    const setLocaleKey: I18NSetLocaleKey = (key: 'zh-cn' | 'en') => {
      if (!localeConfigMap.has(key)) {
        return
      }
      locale.keyRef = key
      locale.langRef = localeConfigMap.get(key).lang
      locale.langAntdRef = localeConfigMap.get(key).langAntdv
      dayjs.locale(key) // 修改dayjs语言包
      storage.setItem('locale', key) // 写入缓存语言key
    }

    // 3.全局provide响应式数据
    app.provide('locale', locale)
    app.provide('setLocaleKey', setLocaleKey)
  }
}

/** vue实例注册自定义插件 */
export default function setupI18N(app: App): void {
  app.use(i18n)
}
