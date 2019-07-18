// 配置axios
import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({

  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hehe')).token
  //   }
})
// 请求拦截
instance.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('hehe')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.rejece(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    location.hash = '/login'
  }
  return Promise.reject(error)
})

export default instance
