// 统一请求路径前缀在commmon/axios.js中修改
// import { getRequest, postRequest } from '../utils/http-request.js'
import BaseRequest from '../utils/http'
const api = new BaseRequest('http://47.113.88.149:9060/')

// 查询科目列表
export const getListTitle = title => api.get(`/listTitle?title=${title}`)

// 查询科目下题库列表
export const getListThetopictable = t_FatherlevelID =>
  api.get(`/listThetopictable?title=${t_FatherlevelID}`)

//题库模板下载
export const download = () =>
  api.get('/download/题目导入模板.xlsx', { responseType: 'blob' })

//导入题库
export const upload = params => api.post('/upload', params)

//新增
export const NewInterface = params => api.post('/NewInterface', params)

//删除
export const deleteThetopictabledeleteThetopi = params =>
  api.post('/deleteThetopictabledeleteThetopi', params)

//获取科目列表
export const listSubject = () => api.get('/listSubject')
