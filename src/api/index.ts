import axios from '@/utils/request'

export const getColumns = () => axios.get('/columns', {
  params: {
    currentPage: 1,
    pageSize: 5
  }
})

export const getColumnsById = (cid: string) => axios.get(`/columns/${ cid }`)

export const getPostsById = (cid: string) => axios.get(`/columns/${ cid }/posts`)
