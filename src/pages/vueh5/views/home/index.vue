<template>
  <div class="home">
    <canvas id="canvas" width="300" height="426"></canvas>
  </div>
</template>

<script>
// import CommonLoginSDK from '@i61/common-login'
// import AppH5JSSDK from '@i61/app-h5-jssdk'
// import indexExtends from '@/utils/loginExtends'

export default {
  name: 'Home',
  // extends: indexExtends,
  data() {
    return {
      points: [
        101, 340, 58, 356, 16, 292, 61, 10, 46, 294, 106, 179, 196, 140, 224,
        120, 275, 146, 287, 184,
      ],
      cv: null,
      ctx: null,
      connectOver: false,
      curIndex: 0,
      limit: 10,
    }
  },
  mounted() {
    // this.initLogin(res => {
    //   console.log('【登录成功】')
    // })
    this.cv = document.getElementById('canvas')
    this.ctx = this.cv.getContext('2d')
    this.draw()
    window.addEventListener('mousedown', this.onDocumentMouseDown, false)
    window.addEventListener('touchstart', this.onDocumentTouchStart, false)
    window.addEventListener('touchmove', this.onDocumentTouchMove, false)
    window.addEventListener('touchend', this.onDocumentTouchEnd, false)
  },
  methods: {
    draw() {
      this.ctx.clearRect(0, 0, this.cv.width, this.cv.height)
      for (let index = 0; index < this.points.length; index += 2) {
        const x = this.points[index]
        const y = this.points[index + 1]
        if (index > 0 && index <= 2 * this.curIndex) {
          this.drawLine(
            this.ctx,
            this.points[index - 2],
            this.points[index - 1],
            x,
            y,
          )
        }
        this.drawPoint(this.ctx, x, y)
      }
    },

    drawLine(ctx, sx, sy, ex, ey) {
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(ex, ey)
      ctx.lineWidth = 4
      ctx.strokeStyle = '#000'
      ctx.stroke()
    },

    drawPoint(ctx, cx, cy) {
      let R = 4
      ctx.save()
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    },

    onDocumentMouseDown(event) {
      event.preventDefault()
      window.addEventListener('mousemove', this.onDocumentMouseMove, false)
      window.addEventListener('mouseup', this.onDocumentMouseUp, false)
    },

    onDocumentMouseMove(event) {
      var x = event.clientX
      var y = event.clientY
      moveEvent(x, y)
    },

    onDocumentMouseUp() {
      upEvent()
      window.removeEventListener('mousemove', this.onDocumentMouseMove)
      window.removeEventListener('mouseup', this.onDocumentMouseUp)
    },

    onDocumentTouchStart() {},

    onDocumentTouchMove(event) {
      let x = event.changedTouches[0].clientX
      let y = event.changedTouches[0].clientY
      this.moveEvent(x, y)
    },

    onDocumentTouchEnd(event) {
      this.upEvent()
    },

    moveEvent(x, y) {
      if (this.connectOver) {
        return
      }
      this.draw()
      this.drawLine(
        this.ctx,
        this.points[2 * this.curIndex],
        this.points[2 * this.curIndex + 1],
        x,
        y,
      )

      let tx = this.points[2 * (this.curIndex + 1)]
      let ty = this.points[2 * (this.curIndex + 1) + 1]
      if (Math.abs(x - tx) < this.limit && Math.abs(y - ty) < this.limit) {
        this.curIndex += 1
        this.draw()
      }
      if (this.curIndex == this.points.length / 2 - 1) {
        this.connectOver = true
        alert('连完了')
      }
    },

    upEvent() {
      if (this.connectOver) {
        return
      }
      this.draw()
    },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
