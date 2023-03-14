<template>
  <div class="get-group">
    <!-- <div class="bodyyyy">随机分组</div> -->
    <div class="set-btn" @click="setParam"></div>
    <!-- 火箭 -->
    <div class="rocket">
      <img class="rocket-box" src="../assets/galaxy_plane.png" />
    </div>
    <div :class="showPopupClass" v-show="showPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <van-slider v-model="value" range @change="onChange" />
      <div class="change-quantity">
        抽几个号码?:
        <div
          :class="changeQuantity === item ? 'quantity live' : 'quantity'"
          v-for="(item, index) in quantityArr"
          :key="index"
          @click="liveQuantity(item)"
        >
          {{ item }}
        </div>
      </div>
      <button @click="submit" class="submit">确定</button>
    </div>
    <audio id="audio" ref="audio" src="../assets/audio/btn.mp3" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'Index',
  props: [],
  components: {},
  data() {
    return {
      isPlayVideo: true,
      showPopupClass: 'solid-limit bounceInDown animated',
      showPopup: false,
      isShowResultPopup: false,
      isSubmit: false,
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
    setParam: debounce(function () {
      try {
        if (this.isShowResultPopup) {
          return
        }
        if (this.isSubmit) this.isSubmit = false
        this.showPopup = true
        this.playAudioBtn()
      } catch (error) {
        console.log(error)
      }
    }, 500),
    closePopup() {
      try {
        let self = this
        this.showPopupClass = 'solid-limit bounceOutRight animated'
        this.playAudioBtn()
        setTimeout(() => {
          self.showPopupClass = 'solid-limit bounceInDown animated'
          self.showPopup = false
        }, 999)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './get-group.scss';
</style>
