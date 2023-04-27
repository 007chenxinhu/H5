import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { hasToken } from '@/utils/auth.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
      if (hasToken()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 设置响应拦截器
service.interceptors.response.use(
  // 响应成功
  response => {
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({
        showClose: true,
        message: message,
        type: 'error',
      })
    }
  },
  // 响应失败
  error => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default service
