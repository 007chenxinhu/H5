<template>
  <div class="connect" ref="connect" @touchmove.prevent>
    <div class="answer">
      <div class="answer-box">
        <div
          class="answer-box-item"
          v-for="(item, index) in leftArr"
          :key="item.label"
          ref="left"
          @touchstart="e => touchstart(e, item, index)"
          @touchend="e => touchend(e, item, index)"
          @touchmove="e => touchmove(e, item, index)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="answer-box">
        <div
          class="answer-box-item"
          v-for="item in rightArr"
          :key="item.label"
          ref="right"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <canvas
      class="connect-canvasA"
      :width="clientWidth"
      :height="clientHeight"
      ref="canvasA"
    ></canvas>
    <canvas
      class="connect-canvasB"
      :width="clientWidth"
      :height="clientHeight"
      ref="canvasB"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirst: true,
      leftArr: [],
      rightArr: [],
      location: [],
      canvasA: null,
      canvasB: null,
      leftDom: [],
      rightDom: [],
      clientWidth: 0,
      clientHeight: 0,
      scrollTop: 0,
      debounce: false,
      itemList: {
        left: [
          {
            label: '我是一个题目1',
            line: [],
            value: [],
          },
          {
            label: '我是一个题目2',
            line: [],
            value: [],
          },
          {
            label: '我是一个题目3',
            line: [],
            value: [],
          },
          {
            label: '我是一个题目4',
            line: [],
            value: [],
          },
          {
            label: '我是一个题目5',
            line: [],
            value: [],
          },
        ],
        right: [
          {
            label: '我是答案1',
            line: [],
            value: [],
          },
          {
            label: '我是答案2',
            line: [],
            value: [],
          },
          {
            label: '我是答案3',
            line: [],
            value: [],
          },
          {
            label: '我是答案4',
            line: [],
            value: [],
          },
          {
            label: '我是答案5',
            line: [],
            value: [],
          },
        ],
      },
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          left: [],
          right: [],
        }
      },
    },
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        if (val.left && val.left.length) {
          this.init()
        }
      },
    },
  },
  async mounted() {
    await this.init()
    // 添加滚动事件 监听 解决因为滚动引起的拖动线不对的问题
    await window.addEventListener(
      'scroll',
      e => {
        // 加个防抖
        if (this.debounce) clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
          this.debounce = false
          this.scrollTop = e.target.scrollTop
        }, 500)
      },
      true,
    )
    let connect = this.$refs.connect
    this.clientWidth = connect.clientWidth
    this.clientHeight = connect.clientHeight
    this.canvasA = this.$refs.canvasA.getContext('2d')
    this.canvasB = this.$refs.canvasB.getContext('2d')
    this.$nextTick(() => {
      this.drawing()
    })
  },
  methods: {
    init() {
      this.leftArr = this.itemList.left.map(r => {
        return {
          label: r.label,
          line: [],
          value: [],
        }
      })
      this.rightArr = this.itemList.right.map(r => {
        return {
          label: r.label,
        }
      })
      // 等dom 渲染完成
      this.$nextTick(() => {
        this.leftDom = this.$refs.left.map((r, i) => {
          return {
            bom: r,
            index: i,
          }
        })
        this.rightDom = this.$refs.right.map((r, i) => {
          return {
            bom: r,
            index: i,
          }
        })
        this.value.map(r => {
          this.leftArr[r.left].line = this.attachment(r.left, r.right)
          this.leftArr[r.left].value = [r.right]
        })
        this.drawing()
      })
    },
    // 触摸结束
    touchend(e, item, index) {
      let event = e.changedTouches[0]
      // document.elementFromPoint 重点，根据x,y坐标 取当前元素 所有能运行的逻辑 都依托于这里。
      let dom = document.elementFromPoint(event.pageX, event.pageY)
      // 右边的dom是哪个
      let right = this.rightDom.find(r => r.bom === dom)
      // 不管是哪个都清除掉 底部的线
      this.canvasB.clearRect(0, 0, this.clientWidth, this.clientHeight)
      // 如果不是右边的dom 直接把 线 干掉 -- 证明不是 没有拖到右边上
      if (!right) {
        item.line = []
        return
      }

      // 如果已有的不是我自己 直接替换掉上一个的
      if (item.value[0] !== right.index) {
        let model = this.leftArr.find(r => r.value[0] === right.index)
        if (model) {
          model.value = []
          model.line = []
        }
        item.value = [right.index]
      }
      // 重新赋值 线的 x y 轴
      item.line = this.attachment(index, right.index)
      this.drawing()
      let model = this.leftArr
        .map((r, i) => {
          return {
            left: i,
            right: r.value[0],
          }
        })
        .filter(r => r.right !== undefined)
      this.$emit('input', model)
    },
    // 触摸开始
    touchstart(e, item) {
      let event = e.targetTouches[0]
      item.line = [
        event.pageX,
        event.pageY - this.$refs.connect.offsetTop + this.scrollTop,
      ]
    },
    // 触摸中
    touchmove(e, item) {
      let event = e.targetTouches[0]
      item.line[2] = event.pageX
      item.line[3] = event.pageY - this.$refs.connect.offsetTop + this.scrollTop
      this.backstrockline(item.line)
    },
    // 拖动的时候画线
    backstrockline(val) {
      let canvasB = this.canvasB

      canvasB.clearRect(0, 0, this.clientWidth, this.clientHeight)
      canvasB.save()
      canvasB.beginPath()
      canvasB.lineWidth = 2
      canvasB.moveTo(val[0], val[1])
      canvasB.lineTo(val[2], val[3])
      canvasB.strokeStyle = '#0C6'
      canvasB.stroke()
      canvasB.restore()
    },
    // 渲染出拖动之后的线
    drawing() {
      let canvasA = this.canvasA

      this.canvasA.clearRect(0, 0, this.clientWidth, this.clientHeight)
      canvasA.beginPath()
      canvasA.lineWidth = 2
      for (let i = 0; i < this.leftArr.length; i++) {
        const line = this.leftArr[i].line
        if (line.length) {
          canvasA.moveTo(line[0], line[1])
          canvasA.lineTo(line[2], line[3])
        }
      }
      canvasA.strokeStyle = '#0C6'
      canvasA.stroke()
    },
    // 根据 左边 和右边的 index,换算出 左右的X,Y轴坐标
    attachment(index, rightIndex) {
      let leftEvent = this.leftDom[index].bom
      let rightEvent = this.rightDom[rightIndex].bom
      // 为了让线都在中间 x轴不用改 最简单
      let leftX = leftEvent.clientWidth + leftEvent.offsetLeft
      let rightX = rightEvent.offsetLeft
      let leftY = leftEvent.offsetTop + leftEvent.clientHeight / 2
      let rightY = rightEvent.offsetTop + rightEvent.clientHeight / 2
      return [leftX, leftY, rightX, rightY]
    },
  },
}
</script>

<style lang="scss" scoped>
.connect {
  position: relative;
  padding: 10px;
  &-canvasA {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
  &-canvasB {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 0;
  }
}
.answer {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    &-item {
      z-index: 2;
      display: inline-flex;
      padding: 10px;
      background-color: rgb(140, 240, 215);
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
    }
    &-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
