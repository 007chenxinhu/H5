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
