/**
 * @description 页面入口
 * @author aodazhang 2021.04.09
 */
import { createApp } from 'vue'
import setupPlugins from '@/plugins'
import App from './App.vue'
import '@/style/index.less'

const app = createApp(App)
setupPlugins(app)
app.mount('#app')
