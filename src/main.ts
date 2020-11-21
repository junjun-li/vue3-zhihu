import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from '@/router'
import store from '@/store'

import 'ant-design-vue/dist/antd.css'
import { Button } from 'ant-design-vue'
// @ts-ignore
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Button)
app.mount('#app')
