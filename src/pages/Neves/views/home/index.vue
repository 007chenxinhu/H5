<template>
  <div class="home">
    <h1>七巧板游戏</h1>
    <div style="height: 100%; width: 100%">
      <canvas
        id="canvas"
        @mousedown="canvasClick($event)"
        @mouseup="stopdrag($event)"
        @mouseout="stopdrag($event)"
        @mousemove="drag($event)"
        @dblclick="dblik($event)"
      >
        <p>you brower is not support canvas</p>
      </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      mWidth: window.screen.width / 2,
      canvas: null,
      context: null,
      angles: [],
      select: -1,
      //把7个点的位置坐标和颜色存入一个数组
      points: [
        {
          p: [
            { x: 0, y: 0 },
            { x: 200, y: 0 },
            { x: 100, y: 100 },
          ],
          color: '#caff67',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 200 },
          ],
          color: '#67becf',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 200, y: 0 },
            { x: 200, y: 100 },
            { x: 150, y: 150 },
            { x: 150, y: 50 },
          ],
          color: '#ef3d61',
          click: false,
          drag: false,
          types: 4,
        },
        {
          p: [
            { x: 150, y: 50 },
            { x: 150, y: 150 },
            { x: 100, y: 100 },
          ],
          color: '#f9f51a',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 100, y: 100 },
            { x: 150, y: 150 },
            { x: 100, y: 200 },
            { x: 50, y: 150 },
          ],
          color: '#a594c0',
          click: false,
          drag: false,
          types: 4,
        },
        {
          p: [
            { x: 50, y: 150 },
            { x: 100, y: 200 },
            { x: 0, y: 200 },
          ],
          color: '#fa8ecc',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 200, y: 100 },
            { x: 200, y: 200 },
            { x: 100, y: 200 },
          ],
          color: '#f6ca29',
          click: false,
          drag: false,
          types: 3,
        },
      ],
      points2: [
        {
          p: [
            { x: 0, y: 0 },
            { x: 200, y: 0 },
            { x: 100, y: 100 },
          ],
          color: '#caff67',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 200 },
          ],
          color: '#67becf',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 200, y: 0 },
            { x: 200, y: 100 },
            { x: 150, y: 150 },
            { x: 150, y: 50 },
          ],
          color: '#ef3d61',
          click: false,
          drag: false,
          types: 4,
        },
        {
          p: [
            { x: 150, y: 50 },
            { x: 150, y: 150 },
            { x: 100, y: 100 },
          ],
          color: '#f9f51a',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 100, y: 100 },
            { x: 150, y: 150 },
            { x: 100, y: 200 },
            { x: 50, y: 150 },
          ],
          color: '#a594c0',
          click: false,
          drag: false,
          types: 4,
        },
        {
          p: [
            { x: 50, y: 150 },
            { x: 100, y: 200 },
            { x: 0, y: 200 },
          ],
          color: '#fa8ecc',
          click: false,
          drag: false,
          types: 3,
        },
        {
          p: [
            { x: 200, y: 100 },
            { x: 200, y: 200 },
            { x: 100, y: 200 },
          ],
          color: '#f6ca29',
          click: false,
          drag: false,
          types: 3,
        },
      ],
      isDragging: false,
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    if (this.canvas.getContext) {
      console.log('支持canvas')
    } else {
      console.log('不支持canvas')
    }
    this.canvas.width = 2000
    this.canvas.height = 2000
    this.draw()
  },
  methods: {
    draw() {
      // 清除画布，准备绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      //遍历数组，以每个点为起点画图
      for (var i = 0; i < this.points.length; i++) {
        this.context.beginPath()
        this.context.moveTo(this.points[i].p[0].x, this.points[i].p[0].y)
        for (var j = 0; j < this.points[i].p.length; j++) {
          this.context.lineTo(this.points[i].p[j].x, this.points[i].p[j].y)
        }
        this.context.lineTo(this.points[i].p[0].x, this.points[i].p[0].y)
        this.context.strokeStyle = 'black'
        this.context.lineWidth = '3'
        this.context.fillStyle = this.points[i].color
        this.context.stroke()
        this.context.fill()
        this.context.closePath()
      }
      this.context.strokeRect(this.mWidth - 101, 300, 202, 202)
    },
    canvasClick(e) {
      // 取得画布上被单击的点
      var clickX = e.pageX - this.canvas.offsetLeft
      var clickY = e.pageY - this.canvas.offsetTop

      for (var i = 0; i < this.points.length; i++) {
        var flag = false
        if (this.points[i].types == 3) {
          flag = this.anglecompult(this.points[i].p, clickX, clickY)
        } else if (this.points[i].types == 4) {
          flag = this.reactcompult(this.points[i].p, clickX, clickY)
        }
        if (flag == true) {
          this.isDragging = true
          this.points[i].click = true
          this.points[i].drag = true
          this.select = i
        } else {
          this.points[i].click = false
          this.points[i].drag = false
        }
      }
    },

    dblik(e) {
      //双击一块转动45度角
      // 判断圆圈是否开始拖拽
      //if (isDragging == true) {
      // 判断拖拽对象是否存在

      // 取得鼠标位置
      var x = e.pageX - this.canvas.offsetLeft
      var y = e.pageY - this.canvas.offsetTop

      // 将圆圈移动到鼠标位置
      var changdu = this.points[this.select].p.length

      var yuanX = this.points[this.select].p[0].x
      var yuanY = this.points[this.select].p[0].y

      var yuanX2 = this.points2[this.select].p[0].x
      var yuanY2 = this.points2[this.select].p[0].y
      var xianx
      var xianx2
      var xiany
      var xiany2
      var xiebian
      for (var j = 1; j < changdu; j++) {
        xianx =
          (this.points[this.select].p[j].x - yuanX) *
            Math.cos(((2 * Math.PI) / 360) * 45) -
          (this.points[this.select].p[j].y - yuanY) *
            Math.sin(((2 * Math.PI) / 360) * 45) +
          yuanX
        xiany =
          (this.points[this.select].p[j].x - yuanX) *
            Math.sin(((2 * Math.PI) / 360) * 45) +
          (this.points[this.select].p[j].y - yuanY) *
            Math.cos(((2 * Math.PI) / 360) * 45) +
          yuanY
        this.points[this.select].p[j].x = xianx
        this.points[this.select].p[j].y = xiany

        xianx2 =
          (this.points2[this.select].p[j].x - yuanX2) *
            Math.cos(((2 * Math.PI) / 360) * 45) -
          (this.points2[this.select].p[j].y - yuanY2) *
            Math.sin(((2 * Math.PI) / 360) * 45) +
          yuanX2
        xiany2 =
          (this.points2[this.select].p[j].x - yuanX2) *
            Math.sin(((2 * Math.PI) / 360) * 45) +
          (this.points2[this.select].p[j].y - yuanY2) *
            Math.cos(((2 * Math.PI) / 360) * 45) +
          yuanY2
        this.points2[this.select].p[j].x = xianx2
        this.points2[this.select].p[j].y = xiany2
      }
      console.log(this.points[this.select].p)
      // 更新画布
      this.draw()

      //}
    },

    drag(e) {
      // 判断圆圈是否开始拖拽
      if (this.isDragging == true) {
        // 判断拖拽对象是否存在

        // 取得鼠标位置
        var x = e.pageX - this.canvas.offsetLeft
        var y = e.pageY - this.canvas.offsetTop

        var changdu = this.points[this.select].p.length

        var xx = x - this.points2[this.select].p[0].x
        var yy = y - this.points2[this.select].p[0].y
        for (var j = 0; j < changdu; j++) {
          //将图形拖动到鼠标相应位置
          this.points[this.select].p[j].x =
            this.points2[this.select].p[j].x + xx
          this.points[this.select].p[j].y =
            this.points2[this.select].p[j].y + yy
        }
        // 更新画布
        this.draw()
      }
    },

    stopdrag() {
      this.isDragging = false
    },

    anglecompult(anglepostions, x, y) {
      //判断三角形内
      var first = anglepostions[0]
      var second = anglepostions[1]
      var third = anglepostions[2]

      var firstR =
        ((second.y - third.y) * (x - third.x) +
          (third.x - second.x) * (y - third.y)) /
        ((second.y - third.y) * (first.x - third.x) +
          (third.x - second.x) * (first.y - third.y))

      var secondR =
        ((third.y - first.y) * (x - third.x) +
          (first.x - third.x) * (y - third.y)) /
        ((second.y - third.y) * (first.x - third.x) +
          (third.x - second.x) * (first.y - third.y))

      var thirsR = 1 - firstR - secondR

      if (
        firstR > 0 &&
        firstR < 1 &&
        secondR > 0 &&
        secondR < 1 &&
        thirsR > 0 &&
        thirsR < 1
      ) {
        return true
      } else {
        return false
      }
    },

    reactcompult(reactpostions, x, y) {
      //判断鼠标是否在矩形区域内
      var xmin, xmax, ymin, ymax
      xmin = xmax = reactpostions[0].x
      ymin = ymax = reactpostions[0].y
      for (var i = 0; i < reactpostions.length; i++) {
        if (reactpostions[i].x < xmin) {
          xmin = reactpostions[i].x
        }
        if (reactpostions[i].x > xmax) {
          xmax = reactpostions[i].x
        }
        if (reactpostions[i].y < ymin) {
          ymin = reactpostions[i].y
        }
        if (reactpostions[i].y > ymax) {
          ymax = reactpostions[i].y
        }
      }

      if (xmin < x && xmax > x && ymin < y && ymax > y) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>
