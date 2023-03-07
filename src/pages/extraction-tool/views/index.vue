<template>
  <div class="content">
    <video
      class="video-box"
      v-if="isPlayVideo"
      data-end="1"
      muted
      play-duration="10s"
      poster="../assets/poster.jpg"
      preload="auto"
      autoplay
      src="../assets/video/poster.mp4?t=1678161213890"
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

      <!-- 球载体 -->
      <div class="draw">
        <div class="draw-box">
          <div id="circle">
            <div v-for="(ball, key) in ballitems" :key="key">
              <div
                class="ball"
                :style="{
                  width: '2.5vw',
                  height: '2.5vw',
                  'border-radius': '50%',
                  position: 'absolute',
                  'background-color': ball.color,
                  left: ball.x / 6 + 'vw',
                  top: ball.y / 6 + 'vw',
                }"
                v-if="!ball.isMoveball"
                @redirect="redirect(key)"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 飞船吸球 -->
      <div class="main-img" id="serve-img-area" v-if="isShowUFO">
        <div class="ufo fadeInLeftBig animated">
          <img class="ufo-box" src="../assets/ufo.png" />
          <img class="ufo-light-box" src="../assets/light.png" />
        </div>
      </div>
      <!-- 飞船吸球过程 -->
      <div class="draw-move-line">
        <div class="draw-move-ball">
          <div v-for="(ball, key) in arrResult" :key="key">
            <div
              class="move-ball"
              v-if="numberArr[key]"
              :style="{
                width: '2.5vw',
                height: '2.5vw',
                'border-radius': '50%',
                'background-color': randomColor,
                position: 'absolute',
                left: ball.x / 6 + 'vw',
                top: ball.y / 6 + 'vw',
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="set-btn" @click="setParam"></div>
      <div :class="showPopupClass" v-show="showPopup">
        <div class="closeWrapper" @click="closePopup">
          <div class="close"></div>
        </div>
        <div class="value">{{ showValue }}</div>
        <van-slider v-model="value" range @change="onChange" />
        <div class="change-quantity">
          选择抽取号码数量:
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
      <!-- 结果展示款 -->
      <div :class="showResultPopupClass" v-show="isShowResultPopup">
        <div class="closeWrapper" @click="closeResultPopup">
          <div class="close"></div>
        </div>
        <div
          class="result-ball"
          v-for="(item, index) in arrResult"
          :key="index"
          :style="{
            'background-color': item.color,
          }"
        >
          {{ numberArr[index] }}
        </div>
      </div>
      <audio id="audio" ref="audio" src="../assets/audio/btn.mp3" preload>
        对不起，您的浏览器不支持HTML5音频播放。
      </audio>
      <audio id="audio1" ref="audio1" src="../assets/audio/ju.wav" preload>
        对不起，您的浏览器不支持HTML5音频播放。
      </audio>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: [],
  data() {
    return {
      numberArr: [],
      ballitems: [],
      coordinate: [],
      //定义随机颜色
      color: '0123456789abcdef',
      ballItem: document.getElementsByClassName('ball'),
      timer: null,
      getResultTimer: null,
      showPopup: false,
      value: [1, 20],
      showPopupClass: 'solid-limit bounceInDown animated',
      showResultPopupClass: 'result-popup zoomIn animated',
      showValue: '【1-20】',
      quantityArr: ['01', '02', '03', '05'],
      changeQuantity: '01',
      arrResult: [],
      showDrawMove: false, //初始化是否全部显示，除了选中的球
      isShowUFO: false,
      isShowResultPopup: false,
      isPlayVideo: true,
      randomColor: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`,
    }
  },
  created: function () {
    let self = this
    setTimeout(function () {
      self.showPopup = true
    }, 500)
  },
  mounted: function () {
    let self = this
    setTimeout(() => {
      self.isPlayVideo = false
    }, 7000)
  },
  methods: {
    playAudioBtn() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/btn.mp3') //通过require引入音频
      this.$refs.audio.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio.play() //play()为播放函数
    },
    playAudioUFO() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/ju.wav') //通过require引入音频
      this.$refs.audio1.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio1.play() //play()为播放函数
    },
    //createball创造页面内的球
    createBall() {
      try {
        this.ballitems = []
        // 生成20个球，给球安排初始位置
        for (let i = 0; i < this.ballNumber + 1; i++) {
          let xy = this.isCir()
          let x = xy[0]
          let y = xy[1]
          //随机生成颜色
          let co = ''
          for (let i = 0; i < 6; i++) {
            co = co + this.color[parseInt(Math.random() * this.color.length)]
          }
          // let cirWidth = parseInt(Math.random() * 20 + 20) //产生20到40的数
          this.ballitems.push({
            color: '#' + co,
            x: x,
            y: y,
            //随机生成x和y轴移动速度
            speedX: parseInt(Math.random() * 5 + 2.5), //5-15,
            speedY: parseInt(Math.random() * 10 + 5), //5-15,
            direct: {
              x: Math.random() > 0.5 ? Math.random() : -Math.random(),
              y: Math.random() > 0.5 ? Math.random() : -Math.random(),
            },
            isMoveball: false,
          })
          this.coordinate.push({
            x1: x,
            y1: y,
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    liveQuantity(e) {
      try {
        this.changeQuantity = e
      } catch (error) {
        console.log(error)
      }
    },
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
    closeResultPopup() {
      try {
        let self = this
        this.showResultPopupClass = 'result-popup bounceOutRight animated'
        this.playAudioBtn()
        setTimeout(() => {
          self.showResultPopupClass = 'result-popup zoomIn animated'
          self.isShowResultPopup = false
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    },
    onChange(value) {
      try {
        this.showValue = '【' + this.value[0] + ' - ' + this.value[1] + '】'
      } catch (error) {
        console.log(error)
      }
    },
    setParam: debounce(function () {
      try {
        this.showPopup = true
        this.playAudioBtn()
      } catch (error) {
        console.log(error)
      }
    }, 1000),
    submit: debounce(function () {
      try {
        let self = this

        this.isShowUFO = false
        this.showPopupClass = 'solid-limit bounceOutRight animated' //修改弹窗出现显示动画
        this.playAudioBtn() //播放按钮声音
        this.ballNumber = this.value[1] - this.value[0] //生成球的数量
        this.createBall() //创造球
        this.move() //移动球
        this.numberArr = []
        setTimeout(() => {
          this.isShowUFO = true //重置ufo消失
        }, 0)
        setTimeout(() => {
          self.playAudioUFO() //播放飞船声音
        }, 1000)
        setTimeout(() => {
          self.showPopup = false
          self.showPopupClass = 'solid-limit bounceInDown animated' //重置弹窗出现显示动画
        }, 2000)
        setTimeout(() => {
          self.getResult()
        }, 3000)
      } catch (error) {
        console.log(error)
      }
    }, 500),

    getResult() {
      try {
        this.numberArr = []
        this.arrResult = []
        this.chooseMoveBall(this.changeQuantity)
      } catch (error) {
        console.log(error)
      }
    },
    chooseMoveBall(e) {
      try {
        let self = this
        let num = Number(e)
        let chooseBall
        let randomNumber
        if (num === 1) {
          this.numberArr.push(
            Number(this.randomFrom(this.value[0], this.value[1])),
          )
          chooseBall = this.ballitems[this.numberArr.length - 1]
          this.arrResult.push(chooseBall)
          this.getResultTimer = setInterval(() => {
            self.arrResult.forEach((ball, i) => {
              ball.isMoveball = true
              ball.x > 185 ? ball.x-- : ball.x
              ball.x < 185 ? ball.x++ : ball.x > 185 ? ball.x : ball.x++
              ball.y > 38 ? ball.y-- : ball.y
              ball.y < 38 ? ball.y++ : ball.y > 38 ? ball.y : ball.y++
            }, 1)
            setTimeout(function () {
              clearInterval(self.timer) //终止圆内球一直滚动
              self.isShowResultPopup = true
            }, 800)
          })
          setTimeout(function () {
            clearInterval(self.getResultTimer)
          }, 3000)
        } else {
          while (this.numberArr.length < num) {
            randomNumber = Number(this.randomFrom(this.value[0], this.value[1]))
            if (this.numberArr.indexOf(randomNumber) == -1) {
              this.numberArr.push(randomNumber)
            } else {
              this.numberArr.push(
                Number(this.randomFrom(this.value[0], this.value[1])),
              )
            }

            chooseBall =
              this.ballitems[this.numberArr[this.numberArr.length - 1]]
            this.arrResult.push(chooseBall)
            if (this.arrResult.length === num) {
              this.getResultTimer = setInterval(() => {
                self.arrResult.forEach((ball, i) => {
                  ball.isMoveball = true
                  ball.x > 185 ? ball.x-- : ball.x
                  ball.x < 185 ? ball.x++ : ball.x > 185 ? ball.x : ball.x++
                  ball.y > 38 ? ball.y-- : ball.y
                  ball.y < 38 ? ball.y++ : ball.y > 38 ? ball.y : ball.y++
                })
                setTimeout(function () {
                  clearInterval(self.timer) //终止圆内球一直滚动
                  self.isShowResultPopup = true
                }, 800)
              }, 10)
              setTimeout(function () {
                clearInterval(self.getResultTimer)
              }, 3000)
            }
          }
        }
        this.ballitems.forEach((ball, i) => {
          this.numberArr.forEach((item, index) => {
            if (i + 1 === item) {
              ball.isMoveball = true
            }
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    randomFrom(lowerValue, upperValue) {
      try {
        return Math.floor(
          Math.random() * (upperValue - lowerValue + 1) + lowerValue,
        )
      } catch (error) {
        console.log(error)
      }
    },
    //随机生成圆内的坐标
    isCir() {
      try {
        while (true) {
          const x = Math.random() * (2 * 73) - 73
          const y = Math.random() * (2 * 73) - 73
          if (x * x + y * y <= 73 * 73) {
            return [73 + x, 73 + y]
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 给每个球添加位置变化，让球动起来
    move() {
      try {
        let self = this
        this.timer = setInterval(function () {
          self.ballitems.forEach((ball, i) => {
            ball.x += ball.direct.x * ball.speedX
            ball.y += ball.direct.y * ball.speedY

            if (!self.pointInsideCircle(ball.x, ball.y)) {
              ball.direct.x *= -1
              ball.direct.y *= -1
            }
          })
        }, 50)
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转，当球碰到边界时调用的方法，令其方向转变
    redirect(key) {
      try {
        // let ball = this.ballitems[key]
        this.ballitems[key].direct.x *= -1
        this.ballitems[key].direct.y *= -1
      } catch (error) {
        console.log(error)
      }
    },
    /**
     *  判断一个点是否在圆的内部
     *  @param point  测试点坐标
     *  @param circle 圆心坐标
     *  @param r 圆半径
     *  返回true为真，false为假
     *  */
    pointInsideCircle(x, y) {
      try {
        var dx = 73 - x
        var dy = 73 - y
        return dx * dx + dy * dy <= 73 * 73
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
