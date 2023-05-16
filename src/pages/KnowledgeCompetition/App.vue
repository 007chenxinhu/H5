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
.el-message-box {
  min-width: 50vw;
  min-height: 10vh;
  border-radius: 30px;
}
.el-message-box__content {
  margin: 20px 0;
}

.el-message-box__message {
  margin-left: 25px;
}
.el-message-box__btns {
  margin-top: 62px;
}
</style>
