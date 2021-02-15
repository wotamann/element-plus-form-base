import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale/lang/de'
// import 'dayjs/locale/de'

let app = createApp(App)

// global component registration for use as custom component in schema
// schema: { custom1: { type: 'custom-basic' }, custom2: { type: 'custom-object' } }

import custombasic from './components/custom/customcomponent-basic.vue'
app.component('custombasic', custombasic )

import customcolor from './components/custom/customcomponent-color.vue'
app.component('customcolor',customcolor )

// app.component('custom-object', () => import('./components/custom/customcomponent-object.vue') )
// app.component('custom-extern', () => import('./components/custom/customcomponent-extern.vue') )

app.use(ElementPlus).use(router)

app.mount('#app')
