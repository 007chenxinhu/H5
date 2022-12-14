<template>
  <div>
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
      config: {
        width: 400, // 宽度
        height: 200, // 高度
        lineWidth: 5, // 线宽
        strokeStyle: 'red', // 线条颜色
        lineCap: 'round', // 设置线条两端圆角
        lineJoin: 'round', // 线条交汇处圆角
        boxX: null,
        boxY: null,
        //记录两个点击的模块
        lineBox: [],
      },
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
      console.log(111)
      cxt.beginPath()
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
        this.ctx.clearRect(15, 15, 280, y)
        y++
        if (y > 280) {
          clearTimeout(timer)
          y = null
          timer = null
        }
      }, 1)
    },
    async handleClick(e) {
      this.boxX = null
      this.boxY = null
      let myCanvas = document.getElementById('canvas')
      let x,
        y = null
      let arr = [15, 108, 201]
      x = e.clientX - myCanvas.getBoundingClientRect().left
      y = e.clientY - myCanvas.getBoundingClientRect().top
      await this.ctx.moveTo(x, y)
      await this.ctx.lineTo(x, y)
      await this.ctx.stroke()
      x && (await this.getBoxIndex(x, true))
      y && (await this.getBoxIndex(y, false))

      console.log(this.boxX, this.boxY)
      //处理点击空白区域
      !this.boxX && (this.boxY = null)
      !this.boxY && (this.boxX = null)
      this.lineBox.push([this.boxX - 1, this.boxY - 1])
      if (lineBox.length === 2) {
        await this.ctx.clearRect(arr[this.boxX - 1], arr[this.boxY - 1], 78, 78)
        await this.ctx.clearRect(arr[this.boxX - 1], arr[this.boxY - 1], 78, 78)
        this.lineBox = []
        // this.clearLineBOX(this.boxX, this.boxY)
      }
    },
    //连连看清除
    clearLineBOX(x, y) {
      console.log(x, y)
      // this.ctx.clearRect(this.boxArr[x[y]][1], this.boxArr[x[y]][2], 73, 73)
    },
    //获取点击的是那个图形
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
