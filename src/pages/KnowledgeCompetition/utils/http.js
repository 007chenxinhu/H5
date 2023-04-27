import axios from 'axios'

const service = axios.create({
  baseURL: '', //服务器地址,一般会按照生产,开发环境进行不同的配置
  timeout: 5000, //请求超时前的毫秒数; 如超过规定的毫秒数请求会被终止
})

// 设置请求拦截器 :

service.interceptors.request.use(
  config => {
    // 一般会在这里对请求头进行一些设置 ; 可以根据自己项目的需求进行设置

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 设置 响应拦截器 :
service.interceptors.response.use(
  // 响应成功
  response => {
    // 请求响应成功设置
  },
  // 响应失败
  error => {
    // 请求响应失败的设置
    return Promise.reject(error)
  },
)

export default axios
