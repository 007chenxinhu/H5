import request from '@/utils/request.js'

/**
 *  写法一 : 比较具体
 */
export const loginAPI = data => {
  return request({
    url: '接口地址',
    method: '请求方式',
    data,
  })
}

/**
 *  写法二 : 复用性高一些
 */
export const getAPI = (url, data) => {
  return request({
    url: url,
    method: 'get',
    params: data,
  })
}

export const putAPI = (url, data) => {
  return request({
    url: url,
    method: 'put',
    data: data,
  })
}

export const postAPI = (url, data) => {
  return request({
    url: url,
    method: 'post',
    data: data,
  })
}
