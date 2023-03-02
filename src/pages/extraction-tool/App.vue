<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(244, 249, 243);
} */
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  font-size: calc(100vw / 6);
  /* 600 350 */
}
/* html {
  filter: grayscale(1);
} */
div,
span,
p,
h1,
h2 {
  font-size: 0.16rem;
}
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: '阿里妈妈数黑体 Bold';
  font-weight: 700;
  src: url('./style/iconfont/Alimama_ShuHeiTi_Bold.woff');
}
</style>
