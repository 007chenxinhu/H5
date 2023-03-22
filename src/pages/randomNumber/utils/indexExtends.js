// 获取hash中或者search中携带参数
export function getParameter(name) {
  let RegExpObject = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')
  if ((name = RegExpObject.exec(window.location.href)))
    return decodeURIComponent(name[1])
}
