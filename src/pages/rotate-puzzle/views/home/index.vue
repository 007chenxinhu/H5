<template>
  <div class="content">
    <div class="eg">
      <img class="egImg" src="@/assets/images/1.jpg" />
    </div>
    <div class="contain">
      <div class="box" @click="cubeCraze(e)">
        <img class="block" src="@/assets/images/c.jpg" alt="起点" />
        <img class="block" src="@/assets/images/b.jpg" alt="方块1" />
        <img class="block" src="@/assets/images/a.jpg" alt="方块1" />
      </div>
      <div class="box" @click="cubeCraze(e)">
        <img class="block" src="@/assets/images/a.jpg" alt="方块1" />
        <img class="block" src="@/assets/images/b.jpg" alt="方块1" />
        <img class="block" src="@/assets/images/a.jpg" alt="方块1" />
      </div>
      <div class="box" @click="cubeCraze(e)">
        <img class="block" src="@/assets/images/a.jpg" alt="方块1" />
        <img class="block" src="@/assets/images/b.jpg" alt="方块1" />
        <img class="block" src="@/assets/images/c.jpg" alt="终点" />
      </div>
    </div>
    <button>开始游戏</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
@mixin wh($width, $height) {
  width: $width;
  height: $height;
}
@mixin font($size, $weight, $color) {
  font-size: $size;
  color: $color;
  font-weight: $weight;
}
@mixin bg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content {
  text-align: center;
  padding-top: 100px;
  .eg {
    .egImg {
      @include wh(200px, 200px);
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    .box {
      @include wh(300px, 100px);

      .block {
        @include wh(100px, 100px);
      }
    }
  }
}
</style>
