import axios from 'axios'

const instance = axios.create({
  // curl -X GET "/columns?currentPage=1&pageSize=5
  baseURL: 'http://apis.imooc.com/api/'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.params = {
    ...config.params,
    icode: 'C2DE5B1DAC48EF5B'
  }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', 'C2DE5B1DAC48EF5B')
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: 'C2DE5B1DAC48EF5B' }
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
