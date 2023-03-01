<template>
  <div class="content">
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
    <!-- 球载体 -->
    <div class="draw">
      <div class="draw-box">
        <div id="circle">
          <div v-for="(ball, key) in ballitems" :key="key">
            <div
              class="ball"
              :style="{
                'background-color': ball.color,
                width: ball.width,
                height: ball.height,
                'border-radius': ball.borderRadius,
                position: 'absolute',
                left: ball.x * 0.01 + 'rem',
                top: ball.y * 0.01 + 'rem',
                border: '0.03rem solid #ccc',
              }"
              v-if="!ball.isMoveball"
              @redirect="redirect(key)"
            >
              <!-- {{ key + value[0] }}  -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 飞船吸球 -->
    <div class="main-img" id="serve-img-area" v-show="isShowUFO">
      <!-- <div class="point-area">
        <p
          class="point-name"
          style="position: absolute; top: 0.3rem; left: 0.5rem"
        ></p>
        <a class="point point-dot"></a>
        <div class="point point-10"></div>
        <div class="point point-40"></div>
        <div class="point point-shadow point-80"></div>
      </div> -->
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
              'background-color': ball.color,
              width: ball.width,
              height: ball.height,
              'border-radius': ball.borderRadius,
              position: 'absolute',
              left: ball.x * 0.01 + 'rem',
              top: ball.y * 0.01 + 'rem',
              border: '0.03rem solid #ccc',
            }"
          ></div>
        </div>
      </div>
    </div>
    <!-- 抽奖完弹跳的球 -->
    <!-- <div v-for="item in Number(changeQuantity)" :key="item">
      <div class="draw-ball" v-show="isShowBall">{{ number }}</div>
    </div> -->
    <div class="set-btn" @click="setParam">设置</div>
    <!-- <div class="btn" @click="getResult">抽取</div> -->
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
        v-for="item in numberArr"
        :key="item"
        :style="{
          'background-color': randomColor,
        }"
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
export default {
  props: [],
  data() {
    return {
      first: true,
      numberArr: [],
      ballitems: [],
      coordinate: [],
      //定义随机颜色
      color: '0123456789abcdef',
      ballItem: document.getElementsByClassName('ball'),
      timer: null,
      getResultTimer: null,
      isShowBall: false,
      showPopup: false,
      value: [1, 20],
      showPopupClass: 'solid-limit bounceInDown animated',
      showResultPopupClass: 'result-popup zoomIn animated',
      showValue: '【1-20】',
      quantityArr: ['01', '02', '05', '10'],
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
            width: '0.6rem',
            height: '0.6rem',
            borderRadius: '50%',
            x: x,
            y: y,
            //随机生成x和y轴移动速度
            speedX: parseInt(Math.random() * 20 + 5), //5-15,
            speedY: parseInt(Math.random() * 30 + 10), //5-15,
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
        }, 2000)
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
    setParam() {
      try {
        this.showPopup = true
        this.playAudioBtn()
      } catch (error) {
        console.log(error)
      }
    },
    submit() {
      try {
        this.first = false
        let self = this
        this.showPopupClass = 'solid-limit bounceOutRight animated'
        this.playAudioBtn()
        this.ballNumber = this.value[1] - this.value[0]
        this.createBall()
        this.move()
        this.isShowBall = false
        this.numberArr = []
        this.isShowUFO = true
        this.playAudioUFO()
        setTimeout(() => {
          self.showPopup = false
          self.showPopupClass = 'solid-limit bounceInDown animated'
        }, 2000)
        setTimeout(() => {
          this.getResult()
        }, 3000)
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
    getResult() {
      try {
        if (this.first) {
          this.$toast('请先设置大小...')
          return
        }
        this.numberArr = []
        this.arrResult = []

        // if (this.number) return
        // this.number = Number(this.randomFrom(this.value[0], this.value[1]))
        // this.arrResult.push(this.ballitems[this.number])
        this.chooseMoveBall(this.changeQuantity)
        // this.getResultTimer = setInterval(() => {
        //   this.ballitems.forEach((ball, i) => {
        //     if (Number(this.number) === i) {
        //       ball.x > 475 ? ball.x-- : ball.x
        //       ball.x < 475 ? ball.x++ : ball.x > 475 ? ball.x : ball.x++
        //       ball.y > -128 ? ball.y-- : ball.y
        //       ball.y < -128 ? ball.y++ : ball.y > -128 ? ball.y : ball.y++
        //     }
        //   })
        // }, 1)
        // this.number = this.number < 10 ? '0' + this.number : this.number
        // setTimeout(function () {
        //   clearInterval(self.getResultTimer)
        //   self.isShowBall = true
        // }, 3000)
      } catch (error) {
        console.log(error)
      }
    },
    chooseMoveBall(e) {
      try {
        let self = this
        let num = Number(e)
        let chooseBall

        if (num === 1) {
          this.numberArr.push(
            Number(this.randomFrom(this.value[0], this.value[1])),
          )
          chooseBall = this.ballitems[this.numberArr.length - 1]
          this.arrResult.push(chooseBall)
          this.getResultTimer = setInterval(() => {
            self.arrResult.forEach((ball, i) => {
              ball.isMoveball = true
              ball.x > 740 ? ball.x-- : ball.x
              ball.x < 740 ? ball.x++ : ball.x > 740 ? ball.x : ball.x++
              ball.y > 160 ? ball.y-- : ball.y
              ball.y < 160 ? ball.y++ : ball.y > 160 ? ball.y : ball.y++
            }, 1)
            setTimeout(function () {
              clearInterval(self.timer)
              self.isShowResultPopup = true
            }, 1000)
          })
          setTimeout(function () {
            clearInterval(self.getResultTimer)
          }, 3000)
        } else {
          while (this.numberArr.length < num) {
            this.numberArr.push(
              Number(this.randomFrom(this.value[0], this.value[1])),
            )
            chooseBall =
              this.ballitems[this.numberArr[this.numberArr.length - 1]]
            this.arrResult.push(chooseBall)
            if (this.arrResult.length === num) {
              this.getResultTimer = setInterval(() => {
                self.arrResult.forEach((ball, i) => {
                  ball.isMoveball = true
                  ball.x > 740 ? ball.x-- : ball.x
                  ball.x < 740 ? ball.x++ : ball.x > 740 ? ball.x : ball.x++
                  ball.y > 160 ? ball.y-- : ball.y
                  ball.y < 160 ? ball.y++ : ball.y > 160 ? ball.y : ball.y++
                })
                setTimeout(function () {
                  clearInterval(self.timer)
                  self.isShowResultPopup = true
                }, 1000)
              }, 1)
              setTimeout(function () {
                clearInterval(self.getResultTimer)
              }, 3000)
            }
          }
        }
        // clearInterval(self.timer) //终止圆内球一直滚动

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
    //随机生成圆内的坐标
    isCir() {
      try {
        while (true) {
          const x = Math.random() * (2 * 320) - 320
          const y = Math.random() * (2 * 320) - 320
          if (x * x + y * y <= 320 * 320) {
            return [320 + x, 320 + y]
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

      // if (!this.pointInsideCircle(ball.x, ball.y)) {
      //   if (
      //     left + this.ballItem[i].offsetWidth >= circle.offsetWidth ||
      //     left <= 0
      //   ) {
      //     ball.direct.x *= -1
      //     ball.direct.y *= -1
      //   }
      //   // 垂直状态
      //   if (
      //     top + this.ballItem[i].offsetHeight >= circle.offsetHeight ||
      //     top <= 0
      //   ) {
      //     ball.direct.x *= -1
      //     ball.direct.y *= -1
      //   }
      // }

      // 如果球碰到边界，令direct * -1
      // if (ball.x >= 400 || ball.x <= 0) {
      //   ball.direct.x *= -1
      // }
      // if (ball.y >= 400 || ball.y <= 0) {
      //   ball.direct.y *= -1
      // }

      // 水平状态
      // 判断当前小球所在的位置是否达到围栏限制的位置
      // let left = this.ballItem[i].offsetLeft
      // let top = this.ballItem[i].offsetTop
      // if (!this.pointInsideCircle(ball.x, ball.y)) {
      //   if (
      //     left + this.ballItem[i].offsetWidth >= circle.offsetWidth ||
      //     left <= 0
      //   ) {
      //     this.ballitems[i].speedX *= -1
      //   }
      //   // 垂直状态
      //   if (
      //     top + this.ballItem[i].offsetHeight >= circle.offsetHeight ||
      //     top <= 0
      //   ) {
      //     this.ballitems[i].speedY *= -1
      //   }
      // }
      // let left = this.ballItem[i].offsetLeft
      // let top = this.ballItem[i].offsetTop
      // if (this.pointInsideCircle(ball.x, ball.y)) {
      //   this.coordinate[i].x1 = ball.x
      //   this.coordinate[i].y1 = ball.y
      // } else {
      // this.ballitems[i].speedX = -Math.cos(
      //   (Math.atan2(
      //     ball.y - this.coordinate[i].y1,
      //     ball.x - this.coordinate[i].x1,
      //   ) *
      //     180) /
      //     Math.PI,
      // )
      // ball.y *= -1
      // this.ballitems[i].speedY = -Math.sin(
      //   (Math.atan2(
      //     ball.y - this.coordinate[i].y1,
      //     ball.x - this.coordinate[i].x1,
      //   ) *
      //     180) /
      //     Math.PI,
      // )
      // if (ball.x >= 400 || ball.x <= 0) {
      //   ball.direct.x *= -1
      // }
      // if (ball.y >= 400 || ball.y <= 0) {
      //   ball.direct.y *= -1
      // }
      // }
      // 修改小球水平运动速度方向
      // left = left + this.ballitems[i].speedX
      // top = top + this.ballitems[i].speedY
      // //防止小球超出边界
      // if (left < 0) {
      //   left = 0
      // } else if (left > circle.offsetWidth - this.ballItem[i].offsetWidth) {
      //   left = circle.offsetWidth - this.ballItem[i].offsetWidth
      // }
      // if (top < 0) {
      //   top = 0
      // } else if (top > circle.offsetHeight - this.ballItem[i].offsetHeight) {
      //   top = circle.offsetHeight - this.ballItem[i].offsetHeight
      // }
      // ball.x = left
      // ball.y = top
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
        var dx = 320 - x
        var dy = 320 - y
        return dx * dx + dy * dy <= 320 * 320
      } catch (error) {
        console.log(error)
      }
    },
    createCircle() {
      try {
        //随机生成圆点宽高
        cirWidth = parseInt(Math.random() * 40 + 10) //产生10到50的数

        //随机生成颜色
        var co = ''
        for (var i = 0; i < 6; i++) {
          co = co + color[parseInt(Math.random() * color.length)]
        }
        var colors = '#' + co
        var boll = document.createElement('div')

        boll.style.width = cirWidth * 0.01 + 'rem'
        boll.style.height = cirWidth * 0.01 + 'rem'
        //定义生成的坐标
        cirX = parseInt(Math.random() * (wrap.offsetWidth - cirWidth))
        cirY = parseInt(Math.random() * (wrap.offsetHeight - cirWidth))
        //生成div标签
        boll.style.left = cirX * 0.01 + 'rem'
        boll.style.top = cirY * 0.01 + 'rem'
        boll.style.background = colors
        wrap.appendChild(boll)

        //随机生成x和y轴移动速度
        var speedX = parseInt(Math.random() * 10 + 5) //5-15
        var speedY = parseInt(Math.random() * 10 + 10) //10-20
        //定义圆点移动函数
        setInterval(function () {
          // 判断当前小球所在的位置是否达到围栏限制的位置
          // 水平状态
          var left = boll.offsetLeft
          var top = boll.offsetTop
          if (left + boll.offsetWidth >= wrap.offsetWidth || left <= 0) {
            speedX *= -1
          }
          // 垂直状态
          if (top + boll.offsetHeight >= wrap.offsetHeight || top <= 0) {
            speedY *= -1
          }
          // 修改小球水平运动速度方向
          left = left + speedX
          top = top + speedY
          //防止小球超出边界
          if (left < 0) {
            left = 0
          } else if (left > wrap.offsetWidth - boll.offsetWidth) {
            left = wrap.offsetWidth - boll.offsetWidth
          }
          if (top < 0) {
            top = 0
          } else if (top > wrap.offsetHeight - boll.offsetHeight) {
            top = wrap.offsetHeight - boll.offsetHeight
          }
          boll.style.left = left * 0.01 + 'rem'
          boll.style.top = top * 0.01 + 'rem'
        }, 15)
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
