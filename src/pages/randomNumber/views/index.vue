<template>
  <div :class="isPlayVideo ? 'content' : 'content content-background'">
    <video
      class="video-box"
      v-if="isPlayVideo"
      data-end="1"
      muted
      play-duration="10s"
      poster="http://www.imagic-resource.com/public/poster.jpg"
      preload="auto"
      autoplay
      src="http://www.imagic-resource.com/public/poster.mp4"
    ></video>
    <div v-if="!isPlayVideo">
      <!-- 底部云 -->
      <div class="buttom-bg">
        <img class="buttom-box" src="../assets/bg_cloud.png" />
      </div>
      <!-- 火箭 -->
      <div class="rocket">
        <img class="rocket-box" src="../assets/galaxy_plane.png" />
      </div>
      <!-- 星球 -->
      <div class="celestial-body1">
        <img class="celestial-body-box1" src="../assets/galaxy_blue.png" />
      </div>
      <!-- 星球 -->
      <div class="celestial-body2">
        <img class="celestial-body-box2" src="../assets/galaxy_green.png" />
      </div>
      <!-- 星球 -->
      <div class="celestial-body3">
        <img class="celestial-body-box3" src="../assets/galaxy_red.png" />
      </div>
      <!-- 星星 -->
      <div>
        <div class="star1">
          <img class="star-box1" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star2">
          <img class="star-box2" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star3">
          <img class="star-box3" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star4">
          <img class="star-box4" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star5">
          <img class="star-box5" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star6">
          <img class="star-box6" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star7">
          <img class="star-box7" src="../assets/galaxy_star_normal.png" />
        </div>
        <div class="star8">
          <img class="star-box8" src="../assets/galaxy_star_normal.png" />
        </div>
      </div>
      <!-- <div class="goGroup-btn">分组</div> -->
      <Random :lang="lang"></Random>
      <audio id="audio" ref="audio" src="../assets/audio/btn.mp3" preload>
        对不起，您的浏览器不支持HTML5音频播放。
      </audio>
    </div>
  </div>
</template>

<script>
import Random from './random.vue'
import { getParameter } from '../utils/indexExtends'
export default {
  name: 'Index',
  props: [],
  components: {
    Random,
  },
  data() {
    return {
      isPlayVideo: true,
      lang: 'en',
      timer: null,
    }
  },
  created() {
    this.lang = getParameter('language') || 'en'
  },
  mounted: function () {
    let self = this
    var videoTime = document.getElementsByClassName('video-box')
    this.timer = setInterval(() => {
      if (videoTime[0].duration <= videoTime[0].currentTime) {
        self.isPlayVideo = false
        clearInterval(self.timer)
      } //获取视频当前播放时间
    }, 100)
  },
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
@import './index.scss';
</style>
