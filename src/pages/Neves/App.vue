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
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  font-size: calc(100vw / 19.2);
}
div,
span,
p,
h1,
h2 {
  font-size: 0.16rem;
}
</style>
