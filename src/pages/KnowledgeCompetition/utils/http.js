import axios from 'axios'
import qs from 'qs'
// import { API_BASE_URL } from '@/utils/DOMAIN'
// import { Message, MessageBox } from 'element-ui'
import { Message, MessageBox } from 'element-ui'

// const setLoading = (config, loading) => {
//   if (config.loadingKey) {
//     vm.$store.dispatch('setLoading', {
//       loadingKey: config.loadingKey,
//       loading: loading
//     })
//   }
// }
export default class BaseRequest {
  constructor(baseURL = '') {
    this.http = axios.create({
      baseURL,
    })
    const API_BASE_URL = 'http://47.113.88.149:9060/'
    // 全局默认配置
    this.http.defaults.headers.Authorization =
      localStorage.getItem('ADMIN-TOKEN') || ''
    // 请求拦截器
    this.http.interceptors.request.use(
      config => {
        config.headers.Authorization = localStorage.getItem('ADMIN-TOKEN') || ''
        if (baseURL !== API_BASE_URL) {
          config.headers.Desensitization =
            localStorage.getItem('DESENSITIZATION') || ''
        }
        if (baseURL === API_BASE_URL && config.requireUserToken) {
          // 行情接口取userToken
          config.headers.Authorization =
            localStorage.getItem('USER-TOKEN') || ''
        }
        config.headers['X-Request-Id'] = config.requestId
        // if (config.showLoading) {
        //   YX.showLoading()
        // }
        // setLoading(config, true)
        return config
      },
      error => {
        // YX.hideLoading()
        // const config = error.confit || {}
        // setLoading(config, false)
        return Promise.reject(error)
      },
    )
    // 响应拦截器
    this.http.interceptors.response.use(
      res => {
        const config = res.config || {}
        let data = res.data || ''
        // if (config.showLoading) {
        //   YX.hideLoading()
        // }
        // setLoading(config, false)
        if (res.status !== 200) {
          Message.error('网络不可用，请检查网络后重试')
          return Promise.reject(res)
        }
        // 先改成application/vnd,改这里要谨慎
        if (res.headers['content-type'].includes('application/vnd')) {
          return Promise.resolve(res)
        }
        // "100006", "员工账号{0}未录入,请联系管理员添加"
        // "110002", "登录失效,请重新登录"
        // "110003", "无权限"
        // "110005", "鉴权参数数量有误"
        // "110006",登录用户被禁用,请联系管理员解禁
        // "110007", "token不能为空"
        // "110008", "服务不可用"
        // 文件类型直接返回
        // if (res.config.isFile) {
        //     return Promise.resolve(res)
        // }
        if (typeof data === 'string') {
          // IE兼容性问题
          data = JSON.parse(data)
        }
        if (data) {
          if ([110006, 110002, 100006, 110007].includes(data.code)) {
            MessageBox.alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: () => {
                // YX.goLogin()
              },
            })

            return Promise.reject(data)
          } else if (data.statusCode !== 0) {
            if (data.error && data.msg !== data.error) {
              data.msg = data.msg + ' ' + data.error
              data.error = ''
            }

            // 非正常请求弹窗提示
            // 增加hideMessage字段来控制是否隐藏默认提示
            if (!config.hideMessage) {
              // code不是0而且反回类型是blob(流) blob类型有属性size
              if ('size' in data) {
                const reader = new FileReader()
                // reader.onload = e => {
                //   Message({
                //     message:
                //         JSON.parse(e.target.result).msg ||
                //         '未知错误',
                //     type: 'error'
                //   })
                // }

                reader.readAsText(data)
              }

              Message({
                message: data.msg || '未知错误',
                type: 'error',
              })
            }
            return Promise.reject(data)
          } else {
            return Promise.resolve(data.data)
          }
        } else {
          return Promise.reject(res)
        }
      },
      error => {
        // const config = error.config || {}
        // config.showLoading && YX.hideLoading()
        // setLoading(config, false)
        return Promise.reject(error)
      },
    )
  }

  post(url, params = {}, config = {}) {
    return this.http.post(url, params, config)
  }

  get(url, params = {}, config = {}) {
    let _config = {
      ...config,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params,
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
          encode: true,
        })
      },
      data: {},
    }
    _config = Object.assign(_config, config) || {}
    return this.http.get(url, _config)
  }

  getForm(url, params = {}, config = {}) {
    return this.http({
      params,
      url,
      ...config,
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {},
    })
  }

  del(url, params = {}) {
    return this.http.delete(url, params)
  }

  put(url, params = {}) {
    return this.http.put(url, params)
  }

  postForm(url, params = {}, config) {
    return this.http({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...config,
      data: qs.stringify(params),
    })
  }

  postMul(url, params, config) {
    const formData = new FormData()
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        // 如果是数组，转成JSON串的格式
        formData.append(key, JSON.stringify(params[key]))
      } else {
        // 为null时 formData会自动转为字符串'null'，所以中间做这层处理
        formData.append(key, params[key] === null ? '' : params[key])
      }
      // if (Array.isArray(params[key])) {
      //     params[key].forEach((item, index) => {
      //         Object.keys(item).forEach(itemKey => {
      //             formData.append(`${key}[${index}].${itemKey}`, item[itemKey])
      //         })
      //     })
      // } else {
      //     formData.append(key, params[key] === null ? '' : params[key])
      // }
    })
    return this.http({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      ...config,
    })
  }
}
