// 配置axios
import axios from 'axios'

const instance = axios.create({

  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hehe')).token
  //   }
})
// 请求拦截
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('hehe')

  if (user) {
    config.headers = {

      Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hehe')).token
    }
  }
  return config
}, error => {
  return Promise.rejece(error)
})
// 相应拦截
instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    location.hash = '/login'
  }
  return Promise.reject(error)
})

export default instance
