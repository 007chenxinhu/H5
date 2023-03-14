<template>
  <div class="get-group">
    <!-- <div class="bodyyyy">随机分组</div> -->
    <audio id="audio" ref="audio" src="../assets/audio/btn.mp3" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: [],
  components: {},
  data() {
    return {
      isPlayVideo: true,
    }
  },
  mounted: function () {},
  methods: {
    playAudioBtn() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/btn.mp3') //通过require引入音频
      this.$refs.audio.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio.play() //play()为播放函数
    },
  },
}
</script>

<style lang="scss" scoped>
@import './get-group.scss';
</style>
