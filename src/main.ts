import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnList from '@/components/ColumnList.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      component: ColumnDetail
    }
  ]
})

// @ts-ignore
const app = createApp(App)
app.use(router)
app.mount('#app')
