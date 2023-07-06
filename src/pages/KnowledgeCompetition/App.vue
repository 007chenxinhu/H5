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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
@font-face {
  font-family: Coco;
  src: url('./assets/font/Coco.otf') /* Safari, Android, iOS */;
  font-weight: normal;
  font-style: normal;
}
/*alert 成功弹出框样式*/
.el-message--success {
  font-size: 1rem;
}

.el-message .el-icon-success {
  font-size: 1rem;
}

.el-message--success .el-message__content {
  font-size: 1rem;
}
.el-message .el-icon-error {
  font-size: 1rem;
}

.el-message--error .el-message__content {
  font-size: 1rem;
}
.el-message-box {
  min-width: 50vw;
  min-height: 10vh;
  border-radius: 30px;
}
.el-message-box__content {
  margin: 20px 0;
}
.el-checkbox__inner {
  width: 1.187rem !important;
  height: 1.187rem !important;
}

.el-message-box__message {
  font-size: 1rem;
  margin-left: 1rem;
}
.el-message-box__btns {
  margin-top: 62px;
}
.el-message-box__title {
  font-size: 1rem !important;
}
.el-button--small .el-button--small.is-round {
  font-size: 1rem !important;
}
button {
  font-size: 1rem !important;
}
.el-message-box__status {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
