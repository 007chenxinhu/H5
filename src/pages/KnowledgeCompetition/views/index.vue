<template>
  <div class="home">
    <!-- <div class="title">知识答题竞赛</div> -->
    <div class="container">
      <p class="a">The world's best</p>
      <p class="b">Knowledge</p>
      <p class="a">Contest</p>
    </div>
    <!-- 模式 -->
    <div class="category">
      <div class="b category-single">单人模式</div>
      <div class="a category-double">双人模式</div>
    </div>
    <!-- 旁边栏目 -->
    <div class="sidebar">
      <div class="sidebar-hint"></div>
      <div class="sidebar-star"></div>
      <div class="sidebar-ranking"></div>
      <div class="sidebar-setting"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
