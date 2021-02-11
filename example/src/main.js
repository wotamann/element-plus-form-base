import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale/lang/de'
// import 'dayjs/locale/de'

createApp(App).use(ElementPlus).use(router).mount('#app')
