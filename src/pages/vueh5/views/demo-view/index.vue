<template>
  <div class="box">
    <canvas id="canvas" width="300" height="300" @click="handleClick"></canvas>
    <button @click="clearCanvas()">清除</button>
  </div>
</template>

<script>
export default {
  name: 'DemoView',
  data() {
    return {
      ctx: null,
      line: null,
      config: {
        width: 400, // 宽度
        height: 200, // 高度
        lineWidth: 5, // 线宽
        strokeStyle: 'red', // 线条颜色
        lineCap: 'round', // 设置线条两端圆角
        lineJoin: 'round', // 线条交汇处圆角
      },
      boxX: null, //点击矩阵x坐标
      boxY: null, //点击矩阵y坐标
      //已经清除的模块点
      eliminated: [],
      //记录要消除两个点击的模块
      handleList: {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        fristStrXY: '',
        lastStrXY: '',
      },
      //正要清除的两个模块
      lineBox: [],
    }
  },
  mounted() {
    let ctx = document.getElementById('canvas')

    let context = ctx.getContext('2d')
    this.ctx = context
    this.ctx.font = '60px Arial'
    // this.ctx.strokeStyle = 'hotpink'
    // this.ctx.strokeText('雷猴', 40, 100)
    // this.ctx.fillRect(0, 0, 100, 100)
    this.drawRect(context, 15, 15, 78, 78, 'red')
    this.drawRect(context, 108, 15, 78, 78, 'yellow')
    this.drawRect(context, 201, 15, 78, 78, 'red')
    this.drawRect(context, 15, 108, 78, 78, 'yellow')
    this.drawRect(context, 108, 108, 78, 78, 'green')
    this.drawRect(context, 201, 108, 78, 78, 'yellow')
    this.drawRect(context, 15, 201, 78, 78, 'red')
    this.drawRect(context, 108, 201, 78, 78, 'yellow')
    this.drawRect(context, 201, 201, 78, 78, 'red')
    console.log(this.lineBox, 'this.lineBox')
  },
  methods: {
    //绘制图形1
    drawRect1(cxt, x, y, width, height, fillColor, borderWidth, borderColor) {
      cxt.beginPath() //绘制互不影响的线
      cxt.moveTo(x, y)
      cxt.lineTo(x + width, y)
      cxt.lineTo(x + width, y + height)
      cxt.lineTo(x, y + height)
      cxt.lineTo(x, y)
      cxt.closePath()

      cxt.lineWidth = borderWidth
      cxt.strokeStyle = borderColor
      cxt.fillStyle = fillColor

      cxt.fill()
      cxt.stroke()
    },
    //绘制图形2使用rect()方法绘制矩形
    drawRect(cxt, x, y, width, height, fillColor, borderWidth, borderColor) {
      cxt.beginPath()
      // cxt.lineWidth = 'none'
      cxt.rect(x, y, width, height)
      //cxt.closePath();    可以不用closePath()

      // cxt.lineWidth = borderWidth
      // cxt.strokeStyle = borderColor
      cxt.fillStyle = fillColor

      cxt.fill()
      cxt.stroke()
    },
    //清除画布
    clearCanvas() {
      let y = 15
      let timer = setInterval(() => {
        this.ctx.clearRect(14, 14, 280, y)
        y++
        if (y > 280) {
          clearTimeout(timer)
          y = null
          timer = null
        }
      }, 1)
    },
    // 渲染线
    drawing() {
      // let cxt = this.ctx
      // // this.canvas.clearRect(0, 0, this.clientWidth, this.clientHeight)
      // cxt.beginPath()
      // cxt.lineWidth = 1
      // cxt.moveTo(this.handleList.x1, this.handleList.y1)
      // cxt.lineTo(this.handleList.x2, this.handleList.y2)
      // cxt.closePath()
      // cxt.strokeStyle = '#0C6'
      // cxt.stroke()
      // setTimeout(() => {
      //   // cxt.clearRect(cxt.x1, cxt.y1, cxt.x2, cxt.y2)
      //   cxt.clearRect(0, 0, 300, 300)
      // }, 500)
    },
    //点击彩色模块 记录两个模块的坐标
    async handleClick(e) {
      this.boxX = null
      this.boxY = null
      let myCanvas = document.getElementById('canvas')
      let x,
        y = null
      let arr = [15, 108, 201]
      x = e.clientX - myCanvas.getBoundingClientRect().left
      y = e.clientY - myCanvas.getBoundingClientRect().top
      // if (this.handleList.x2) this.drawing()
      // await this.ctx.moveTo(x, y)
      // await this.ctx.lineTo(x + 1, y + 1)
      // await this.ctx.stroke()
      x && (await this.getBoxIndex(x, true))
      y && (await this.getBoxIndex(y, false))
      //处理点击空白区域
      !this.boxX && (this.boxY = null)
      !this.boxY && (this.boxX = null)
      //判断是否消除过的模块或者点击相同的模块
      if (this.boxX && this.boxY) {
        //是否消除过的位置
        if (this.eliminated.indexOf(this.boxX + '' + this.boxY) === -1) {
          if (this.handleList.fristStrXY) {
            //记录矩阵坐标
            if (this.handleList.fristStrXY !== this.boxX + '' + this.boxY) {
              this.handleList.lastStrXY = this.boxX + '' + this.boxY
              this.handleList.x2 = x
              this.handleList.y2 = y
            }
          } else {
            this.handleList.fristStrXY = this.boxX + '' + this.boxY
            this.handleList.x1 = x
            this.handleList.y1 = y
          }
        } else {
          return
        }

        this.lineBox.push(this.boxX, this.boxY)
      } else {
        return
      }

      //清除模块并记录
      this.clearLineBOX(arr)
    },
    //清除模块并记录
    async clearLineBOX(arr) {
      if (this.lineBox.length === 4) {
        this.eliminated.push(this.lineBox[0] + this.lineBox[1] + '')
        this.eliminated.push(this.lineBox[2] + this.lineBox[3] + '')
        await this.ctx.clearRect(
          arr[this.lineBox[0] - 1],
          arr[this.lineBox[1] - 1],
          78,
          78,
        )
        await this.ctx.clearRect(
          arr[this.lineBox[2] - 1],
          arr[this.lineBox[3] - 1],
          78,
          78,
        )
        // await this.ctx.clearRect(arr[this.boxX - 1], arr[this.boxY - 1], 78, 78)
        // await this.ctx.clearRect(arr[this.boxX - 1], arr[this.boxY - 1], 78, 78)
        // this.clearLineBOX(this.boxX, this.boxY)
        this.lineBox = []
      }
    },
    //获取点击的矩阵位置
    getBoxIndex(e, typeXy) {
      if (15 < e && e < 88) {
        typeXy ? (this.boxX = 1) : (this.boxY = 1)
      }
      if (108 < e && e < 191) {
        typeXy ? (this.boxX = 2) : (this.boxY = 2)
      }
      if (221 < e && e < 294) {
        typeXy ? (this.boxX = 3) : (this.boxY = 3)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
