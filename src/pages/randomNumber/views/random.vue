<template>
  <div class="random">
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
    <div class="goGroup-btn">分组</div>
    <div :class="showPopupClass" v-show="showPopup">
      <div class="random-title">随机数</div>
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="value">{{ value }}</div>
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
    <!-- 结果展示款 -->
    <div :class="showResultPopupClass" v-show="isShowResultPopup">
      <div class="closeWrapper" @click="closeResultPopup">
        <van-icon name="cross" />
      </div>
      <div
        v-for="(item, index) in numberArr"
        :key="index"
        :class="`result-ball result-bg${index > 4 ? index - 4 : index + 1}`"
      >
        {{ item }}
      </div>
    </div>
    <audio id="audio" ref="audio" src="../assets/audio/btn.mp3" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
    <audio id="audio1" ref="audio1" src="../assets/audio/ju.wav" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'Random',
  props: [],
  data() {
    return {
      numberArr: [],
      ballitems: [],
      coordinate: [],
      ballNumber: 20,
      isSubmit: false,
      //定义随机颜色
      color: '3456789abcdef',
      ballItem: document.getElementsByClassName('ball'),
      timer: null,
      getResultTimer: null,
      showPopup: false,
      value: [1, 20],
      showPopupClass: 'solid-limit bounceInDown animated',
      showResultPopupClass: 'result-popup zoomIn animated',
      showValue: '【1-20】',
      quantityArr: ['01', '02', '03', '04', '05', '10'],
      changeQuantity: '01',
      arrResult: [],
      showDrawMove: false, //初始化是否全部显示，除了选中的球
      isShowUFO: false,
      isShowResultPopup: false,
      randomColor: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`,
    }
  },
  created: function () {
    let self = this
    setTimeout(function () {
      self.showPopup = true
    }, 500)
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
        for (let i = 0; i < this.ballNumber; i++) {
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
    onChange() {
      try {
        this.showValue = '【' + this.value[0] + ' - ' + this.value[1] + '】'
      } catch (error) {
        console.log(error)
      }
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
    submit: debounce(function () {
      try {
        if (!this.isSubmit) {
          this.isSubmit = true
          let self = this

          this.isShowUFO = false
          this.showPopupClass = 'solid-limit bounceOutRight animated' //修改弹窗出现显示动画
          this.playAudioBtn() //播放按钮声音
          this.ballNumber = this.value[1] - this.value[0] + 1 //生成球的数量
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
          }, 1000)
          setTimeout(() => {
            //获取结果
            self.chooseMoveBall(this.changeQuantity)
          }, 3000)
        }
      } catch (error) {
        console.log(error)
      }
    }, 1000),
    chooseMoveBall(e) {
      try {
        this.numberArr = []
        this.arrResult = []
        let self = this
        let num = Number(e) //一次抽取几个球
        let min = this.value[0]
        let max = this.value[1]
        let chooseBall //选中的球
        let randomNumber //随机得到的数
        //选出球数量等于限制区间的数量
        if (num === this.ballNumber) {
          while (this.numberArr.length < num) {
            this.numberArr.push(min)
            min = min + 1
          }
          self.arrResult = self.ballitems
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
            // if (self.timer) {
            //   clearInterval(self.timer) //终止圆内球一直滚动
            // }
            clearInterval(self.getResultTimer)
          }, 3000)
          //选出球数量大于限制区间的数量
        } else if (num > this.ballNumber) {
          while (this.numberArr.length < num) {
            if (min < max) {
              this.numberArr.push(min)
            } else {
              this.numberArr.push(
                Number(this.randomFrom(this.value[0], this.value[1])),
              )
            }
            min = min + 1
          }
          self.arrResult = self.ballitems
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
          //选出球数量小于限制区间的数量
        } else {
          let long = 0
          while (this.numberArr.length < num) {
            randomNumber = Number(this.randomFrom(this.value[0], this.value[1]))
            while (this.numberArr.indexOf(randomNumber) != -1) {
              randomNumber = Number(
                this.randomFrom(this.value[0], this.value[1]),
              )
            }
            this.numberArr.push(randomNumber)
          }
          while (this.arrResult.length < num) {
            chooseBall = this.ballitems[this.numberArr[long] - this.value[0]]
            this.arrResult.push(chooseBall)
            long = long + 1
          }
          if (this.arrResult.length === num) {
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
          }
        }
        console.log(this.numberArr, this.arrResult, '出错了!!====')
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
    //获取区间随机数
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
@import './random.scss';
</style>
