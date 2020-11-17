import axios from '@/utils/request'

export const getColumns = () => axios({
  url: '/columns',
  params: {
    currentPage: 1,
    pageSize: 5
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
