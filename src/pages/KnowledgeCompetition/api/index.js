// 统一请求路径前缀在commmon/axios.js中修改
// import { getRequest, postRequest } from '../utils/http-request.js'
import BaseRequest from '../utils/http'
const api = new BaseRequest('http://47.113.88.149:9060/game/')

// 查询科目列表
export const listSubject = params => api.get(`/listSubject?parameter=${params}`)

// 查询科目下题目标题列表
export const getListTitle = params => api.get(`/listTitle?parameter=${params}`)

// 查询科目下题库列表
export const getListThetopictable = parameter =>
  api.get(`/listThetopictable?parameter=${parameter}`)

//题库模板下载
export const download = () =>
  api.get('/download/题目导入模板.xlsx', { responseType: 'blob' })

//导入题库
export const upload = params => api.post('/upload', params)

//新增
export const NewInterface = params => api.post('/NewInterface', params)

//单个删除
export const DeleteThetopictable = params =>
  api.get(`/DeleteThetopictable?id=${params}`)

//根据密码查询题库
export const personalQuery = params =>
  api.get(`/personalQuery?password=${params}`)
