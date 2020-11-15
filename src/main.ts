import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from '@/router'
import store from '@/store'
// @ts-ignore
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
