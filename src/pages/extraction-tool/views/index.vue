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
                left: ball.x * 0.02 + 'rem',
                top: ball.y * 0.02 + 'rem',
              }"
              v-if="!ball.isMoveball"
              @redirect="redirect(key)"
            >
              {{ key + value[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 飞船吸球 -->
    <div class="main-img" id="serve-img-area">
      <div class="point-area">
        <p
          class="point-name"
          style="position: absolute; top: 0.3rem; left: 0.5rem"
        >
          <!-- 华东 -->
        </p>
        <a class="point point-dot"></a>
        <div class="point point-10"></div>
        <div class="point point-40"></div>
        <div class="point point-shadow point-80"></div>
      </div>
    </div>
    <!-- 飞船吸球过程 -->
    <div class="draw-move-line">
      <div class="draw-move-ball">
        <div v-for="(ball, key) in arrResult" :key="key">
          <div
            class="move-ball"
            v-if="number[key]"
            :style="{
              'background-color': ball.color,
              width: ball.width,
              height: ball.height,
              'border-radius': ball.borderRadius,
              position: 'absolute',
              left: ball.x * 0.02 + 'rem',
              top: ball.y * 0.02 + 'rem',
            }"
          >
            {{ number[key] }}
          </div>
        </div>
      </div>
    </div>

    <!-- 抽奖完弹跳的球 -->
    <!-- <div v-for="item in Number(changeQuantity)" :key="item">
      <div class="draw-ball" v-show="isShowBall">{{ number }}</div>
    </div> -->

    <div class="set-btn" @click="setParam">设置</div>
    <div class="btn" @click="getResult">抽取</div>
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
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      first: true,
      number: [],
      bollNumber: 20,
      ballitems: [],
      coordinate: [],
      //定义随机颜色
      color: '0123456789abcdef',
      circle: document.querySelector('#circle'),
      ballItem: document.getElementsByClassName('ball'),
      timer: null,
      getResultTimer: null,
      isShowBall: false,
      showPopup: false,
      value: [1, 20],
      showPopupClass: 'solid-limit bounceInDown animated',
      showValue: '当前值取值区间：【1-20】',
      quantityArr: ['01', '02', '05', '10'],
      changeQuantity: '01',
      arrResult: [],
      showDrawMove: false, //初始化是否全部显示，除了选中的球
    }
  },
  created: function () {
    let self = this

    setTimeout(function () {
      self.showPopup = true
    }, 500)
    // this.createBall()
    // 每隔30ms，调用move方法，给球动起来
    // this.move()
  },
  methods: {
    //createball创造页面内的球
    createBall() {
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
    },
    liveQuantity(e) {
      this.changeQuantity = e
    },
    closePopup() {
      let self = this
      this.showPopupClass = 'solid-limit hinge animated'
      setTimeout(() => {
        self.showPopupClass = 'solid-limit bounceInDown animated'
        self.showPopup = false
      }, 2000)
    },
    onChange(value) {
      this.showValue =
        '当前值取值区间：【' + this.value[0] + ' - ' + this.value[1] + '】'
    },
    setParam() {
      this.showPopup = true
    },
    submit() {
      this.first = false
      let self = this
      this.showPopupClass = 'solid-limit hinge animated'
      this.ballNumber = this.value[1] - this.value[0]
      this.createBall()
      this.move()
      this.isShowBall = false
      this.number = []
      setTimeout(() => {
        self.showPopup = false
        self.showPopupClass = 'solid-limit bounceInDown animated'
      }, 2000)
    },
    randomFrom(lowerValue, upperValue) {
      return Math.floor(
        Math.random() * (upperValue - lowerValue + 1) + lowerValue,
      )
    },
    getResult() {
      if (this.first) {
        this.$toast('请先设置大小...')
        return
      }
      this.number = []
      self.arrResult = []
      clearInterval(this.timer)
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
    },
    chooseMoveBall(e) {
      let self = this
      let num = Number(e)
      let chooseBall
      if (num === 1) {
        this.number.push(Number(this.randomFrom(this.value[0], this.value[1])))
        chooseBall = this.ballitems[this.number - 1]
        this.arrResult.push(chooseBall)
        this.getResultTimer = setInterval(() => {
          self.arrResult.forEach((ball, i) => {
            ball.isMoveball = true
            ball.x > 475 ? ball.x-- : ball.x
            ball.x < 475 ? ball.x++ : ball.x > 475 ? ball.x : ball.x++
            ball.y > -128 ? ball.y-- : ball.y
            ball.y < -128 ? ball.y++ : ball.y > -128 ? ball.y : ball.y++
          }, 1)
          setTimeout(function () {
            clearInterval(self.getResultTimer)
            self.isShowBall = true
          }, 3000)
        })
      } else {
        console.log(this.number.length, num, '执行')
        while (this.number.length < num) {
          this.number.push(
            Number(this.randomFrom(this.value[0], this.value[1])),
          )
          chooseBall = this.ballitems[this.number[this.number.length - 1]]
          this.arrResult.push(chooseBall)
          if (this.arrResult.length === num) {
            this.getResultTimer = setInterval(() => {
              self.arrResult.forEach((ball, i) => {
                ball.isMoveball = true
                console.log(ball)
                ball.x > 475 ? ball.x-- : ball.x
                ball.x < 475 ? ball.x++ : ball.x > 475 ? ball.x : ball.x++
                ball.y > -128 ? ball.y-- : ball.y
                ball.y < -128 ? ball.y++ : ball.y > -128 ? ball.y : ball.y++
              })
              setTimeout(function () {
                clearInterval(self.getResultTimer)
                self.isShowBall = true
              }, 3000)
            }, 1)
          }
        }
      }
      this.ballitems.forEach((ball, i) => {
        this.number.forEach((item, index) => {
          if (i + 1 === item) {
            ball.isMoveball = true
          }
        })
      })
    },
    //随机生成圆内的坐标
    isCir() {
      while (true) {
        const x = Math.random() * (2 * 160) - 160
        const y = Math.random() * (2 * 160) - 160
        if (x * x + y * y <= 160 * 160) {
          return [160 + x, 160 + y]
        }
      }
    },
    // 给每个球添加位置变化，让球动起来
    move() {
      let self = this
      this.timer = setInterval(function () {
        self.ballitems.forEach((ball, i) => {
          ball.x += ball.direct.x * ball.speedX
          ball.y += ball.direct.y * ball.speedY

          if (!self.pointInsideCircle(ball.x, ball.y)) {
            ball.direct.x *= -Math.random()
            ball.direct.y *= -Math.random()
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
          }

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
        })
      }, 50)
    },
    // 跳转，当球碰到边界时调用的方法，令其方向转变
    redirect(key) {
      // let ball = this.ballitems[key]
      this.ballitems[key].direct.x *= -1
      this.ballitems[key].direct.y *= -1
    },
    /**
     *  判断一个点是否在圆的内部
     *  @param point  测试点坐标
     *  @param circle 圆心坐标
     *  @param r 圆半径
     *  返回true为真，false为假
     *  */
    pointInsideCircle(x, y) {
      var dx = 160 - x
      var dy = 160 - y
      return dx * dx + dy * dy <= 160 * 160
    },
    createCircle() {
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
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin wh($width, $height) {
  width: $width;
  height: $height;
}
@mixin bg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.buttom-bg {
  width: 100%;
  position: absolute;
  bottom: 0;
  .buttom-box {
    width: 100%;
  }
}
.rocket {
  @include wh(3.28rem, 2.44rem);
  position: absolute;
  top: 2rem;
  left: 2rem;
  .rocket-box {
    width: 100%;
    animation: rocket 17s cubic-bezier(0.1, 0.25, 0.75, 0.25) infinite;
  }
}
.content {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  // align-items: center;
  @include bg('../assets/bg.png');
  // background-color: gainsboro;
}

.draw {
  position: relative;
  @include wh(13.68rem, 13.68rem);
  @include bg('../assets/bg_light.png');
  animation: fadenum 10s infinite;
  -webkit-animation: fadenum 10s infinite; /* Safari 和 Chrome */
  .draw-box {
    position: relative;
    top: 2.7rem;
    left: 2.7rem;
    @include wh(8.08rem, 8.08rem);
    @include bg('../assets/bg_earth.png');
  }
}
@keyframes fadenum {
  100% {
    transform: rotate(360deg);
  }
}
#circle {
  position: relative;
  width: 7rem;
  height: 7rem;
  // background-color: lightblue;
  border-radius: 50%;
  margin-top: 0.1rem;
  top: 0.5rem;
  left: 3.75rem;
  transform: translate(-45%, 0);
}

.ball {
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.34rem;
  font-weight: 500;
}

.set-btn {
  position: absolute;
  font-size: 0.3rem;
  top: 50%;
  left: 0%;
  transform: translate(50%, -50%);
  padding: 0.4rem 0.9rem;
  background: rgb(9, 193, 150);
  border-radius: 15%;
}

.btn {
  position: absolute;
  font-size: 0.3rem;
  top: 50%;
  right: 0%;
  transform: translate(-50%, -50%);
  padding: 0.4rem 0.9rem;
  background: rgb(9, 193, 150);
  border-radius: 15%;
}

.draw-ball {
  position: absolute;
  // width: 0;
  top: 45.5%;
  right: 48%;
  text-align: center;
  margin: auto;
  padding: 0.26rem;
  font-size: 0.34rem;
  border-radius: 50%;
  background: #b4a078 radial-gradient(at 30% 30%, #f7f5f1, #b4a078);
  /* 当动画完成后，保持最后一帧 */
  animation: bounce 2s cubic-bezier(0.1, 0.25, 1, 0.25) forwards;
}

.solid-limit {
  width: 70%;
  padding: 1.5rem 0.8rem;
  position: absolute;
  top: 25%;
  text-align: center;
  background-color: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  z-index: 1;
}

.value {
  font-size: 0.5rem;
  // margin-left: 0.5rem;
  margin-bottom: 0.5rem;
}

.submit {
  font-size: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
}

.main-img {
  position: absolute;
  top: 2%;
  right: 20.5%;
}

.change-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  padding: 0.5rem 0;

  .quantity {
    border: 0.01rem solid #555151;
    padding: 0.1rem;
    font-size: 0.5rem;
    margin: 0 0.2rem;
    cursor: pointer;
  }
  .live {
    background-color: #1e80ff;
  }
}
.draw-move-ball {
  position: absolute;
  width: 7rem;
  height: 7rem;
  // background-color: lightblue;
  border-radius: 50%;
  margin-top: 0.1rem;
  top: 3.25rem;
  left: 50%;
  transform: translate(-50%, 0);
  .move-ball {
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.34rem;
    font-weight: 500;
  }
}
.closeWrapper {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 0.44rem;
  right: 0.64rem;
}

.close {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border: 0.01rem solid;
  border-radius: 50%;
}

.close::before,
.close::after {
  position: absolute;
  content: '';
  background-color: #cccccc;
  width: 0px;
  height: 0.33rem;
  border: 0.01rem solid;
  left: 50%;
  top: 20%;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}

// 火箭
@keyframes rocket {
  25% {
    transform: translateY(-0.8rem);
    animation-timing-function: ease-in;
    transform: rotate(5deg);
  }

  50% {
    transform: translate(1rem, -0.2rem);
  }

  70% {
    transform: translateX(0.6rem);
    transform: rotate(-10deg);
  }

  90% {
    transform: translateY(1rem);
  }
}
@-webkit-keyframes rocket /* Safari 与 Chrome */ {
  25% {
    transform: translateY(-0.8rem);
    animation-timing-function: ease-in;
    transform: rotate(5deg);
  }

  50% {
    transform: translate(0.5rem, -0.2rem);
  }

  70% {
    transform: translateX(0.6rem);
    transform: rotate(-10deg);
  }

  90% {
    transform: translateY(0.5rem);
  }
}

// 结果弹跳求
@keyframes bounce {
  40%,
  60%,
  80%,
  to {
    transform: translateY(3.8rem);
    animation-timing-function: ease-in;
  }

  50% {
    transform: translateY(2.6rem);
  }

  70% {
    transform: translateY(3rem);
  }

  90% {
    transform: translateY(3.6rem);
  }
}

@-webkit-keyframes ripple {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.1, 0.1);
  }

  5% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -webkit-transform: scale(1);
  }
}

@-moz-keyframes ripple {
  0% {
    opacity: 0;
    -moz-transform: scale(0.1, 0.1);
  }

  5% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -moz-transform: scale(1);
  }
}

@-o-keyframes ripple {
  0% {
    opacity: 0;
    -o-transform: scale(0.1, 0.1);
  }

  5% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -o-transform: scale(1);
  }
}

@keyframes ripple {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    transform: scale(0.1, 0.1);
  }

  5% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}

// UFO光圈
#serve-img-area.paused .point-area .point-10:after,
#serve-img-area.paused .point-area .point-20:after,
#serve-img-area.paused .point-area .point-80:after {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
  /* Safari 和 Chrome */
}

/* 定义范围*/
#serve-img-area .point-area {
  text-align: center;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  -webkit-transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  -o-transition: opacity 0.5s ease-out;
  transition: opacity 0.5s ease-out;
}

/* 定义圆点*/
#serve-img-area .point-area .point {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 0.2rem;
  height: 0.2rem;
  -webkit-border-radius: 50%;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 50%;
  -moz-background-clip: padding;
  border-radius: 50%;
  background-clip: padding-box;
  background: transparent;
}

/* 定义圆扩散的阴影*/
#serve-img-area .point-area .point-shadow:after {
  -webkit-box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
  -moz-box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
  box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
}

// #serve-img-area .point-area .point-dot {
//   z-index: 1;
//   background-color: #6ad7e9;
//   border: 1px solid rgba(0, 205, 236, 0.37);
// }
#serve-img-area .point-area .point-10 {
  width: 100%;
  height: 100%;
}

#serve-img-area .point-area .point-10:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 0.09rem solid #00cdec;
  opacity: 0;
  -webkit-animation: ripple 4500ms ease-out 225ms infinite;
  -moz-animation: ripple 4500ms ease-out 225ms infinite;
  -o-animation: ripple 4500ms ease-out 225ms infinite;
  animation: ripple 4500ms ease-out 225ms infinite;
}

#serve-img-area .point-area .point-40 {
  width: 100%;
  height: 100%;
}

#serve-img-area .point-area .point-40:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 0.1rem solid #00cdec;
  opacity: 0;
  -webkit-animation: ripple 4500ms ease-out 900ms infinite;
  -moz-animation: ripple 4500ms ease-out 900ms infinite;
  -o-animation: ripple 4500ms ease-out 900ms infinite;
  animation: ripple 4500ms ease-out 900ms infinite;
}

#serve-img-area .point-area .point-80 {
  width: 100%;
  height: 100%;
}

#serve-img-area .point-area .point-80:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 0.12rem solid #00cdec;
  opacity: 0;
  -webkit-animation: ripple 4500ms ease-out 1800ms infinite;
  -moz-animation: ripple 4500ms ease-out 1800ms infinite;
  -o-animation: ripple 4500ms ease-out 1800ms infinite;
  animation: ripple 4500ms ease-out 1800ms infinite;
}

// 设置弹窗动画
// 进场
/*base code*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

/*the animation definition*/
@-webkit-keyframes bounceInDown {
  0%,
  100%,
  60%,
  75%,
  90% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  100% {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes bounceInDown {
  0%,
  100%,
  60%,
  75%,
  90% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    -ms-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    -ms-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    -ms-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    -ms-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  100% {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}

.bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown;
}

//离场
/*base code*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

/*the animation definition*/
@-webkit-keyframes hinge {
  0% {
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    -webkit-transform: rotate3d(0, 0, 1, 80deg);
    transform: rotate3d(0, 0, 1, 80deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    -webkit-transform: rotate3d(0, 0, 1, 60deg);
    transform: rotate3d(0, 0, 1, 60deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

  100% {
    -webkit-transform: translate3d(0, 700px, 0);
    transform: translate3d(0, 700px, 0);
    opacity: 0;
  }
}

@keyframes hinge {
  0% {
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    -webkit-transform: rotate3d(0, 0, 1, 80deg);
    -ms-transform: rotate3d(0, 0, 1, 80deg);
    transform: rotate3d(0, 0, 1, 80deg);
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    -webkit-transform: rotate3d(0, 0, 1, 60deg);
    -ms-transform: rotate3d(0, 0, 1, 60deg);
    transform: rotate3d(0, 0, 1, 60deg);
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, 700px, 0);
    -ms-transform: translate3d(0, 700px, 0);
    transform: translate3d(0, 700px, 0);
    opacity: 0;
  }
}

.hinge {
  -webkit-animation-name: hinge;
  animation-name: hinge;
}
</style>
