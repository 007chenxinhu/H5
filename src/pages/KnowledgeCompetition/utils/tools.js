// 二进制文件下载
export function handelBlobData(res) {
  const reg = res.headers['content-disposition'].match(/filename=(.*)/)
  const fileName = reg ? decodeURIComponent(reg[1]) : ''
  const blob = res.data
  const downloadLink = window.document.createElement('a')
  downloadLink.href = window.URL.createObjectURL(
    new Blob([blob], { type: blob.type }),
  )
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

//获取#后面的参数
export function getHashSearchParam(key) {
  const url = location.href
  // 获取 hash 值，不包含 '#' 号
  const hash = url.substring(url.indexOf('#') + 1)
  // 查找 '?' 号所在的索引
  const searchIndex = hash.indexOf('?')
  // '?' 号后面接的是索引参数，如果找到则+1，去除'?' 号
  const search = searchIndex !== -1 ? hash.substring(searchIndex + 1) : ''
  // 把搜索参数字符串提过URLSearchParams转成对象形式
  const usp = new URLSearchParams(search)
  // 通过URLSearchParams自带的get方法，查询键所对应的值
  return usp.get(key)
}
