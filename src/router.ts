import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostDetail from '@/views/PostDetail.vue'
import { getUserInfo } from '@/api'
import axios from 'axios'

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
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   // 没登录, 取登录页
//   if (to.meta.requiredLogin && !store.state.user.isLogin) {
//     next('/login')
//   } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
//     // 登录了, 重定向到首页
//     next('/')
//   } else {
//     next()
//     if (token) {
//       getUserInfo().then(res => {
//         store.commit('setUser', {
//           ...res.data,
//           isLogin: true
//         })
//         next()
//       }).catch(err => {
//         next('/login')
//         // store.commit('setUser', {
//         //   isLogin: false
//         // })
//         console.log(err)
//       })
//     } else {
//       next('/login')
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  const { user } = store.state
  const token = localStorage.getItem('token')
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${ token }`
      getUserInfo().then(res => {
        store.commit('setUser', {
          ...res.data,
          isLogin: true
        })
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        localStorage.removeItem('token')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
