import axios from '@/utils/request'
import { PostProps } from '@/store'

export const getColumns = () => axios({
  url: '/columns',
  params: {
    currentPage: 1,
    pageSize: 20
  }
})

export const getColumnsById = (cid: string) => axios({
  url: `/columns/${ cid }`,
  method: 'GET'
})

export const getPostsById = (cid: string) => axios({
  url: `/columns/${ cid }/posts`,
  method: 'GET'
})

export const login = (data: any) => axios({
  url: '/user/login',
  method: 'POST',
  data: {
    email: data.email,
    password: data.password
  }
})

export const getUserInfo = () => axios({
  url: '/user/current',
  method: 'GET'
})

export const posts = (data: PostProps) => axios({
  url: '/posts',
  method: 'POST',
  data
})

export const uploadFile = (data: FormData) => axios({
  url: '/upload',
  method: 'POST',
  headers: {
    'Content-type': 'multipart/form-data'
  },
  data
})

export const getPostById = (id: string) => axios({
  url: `/posts/${id}`,
  method: 'GET'
})
