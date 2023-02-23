字 ```html
<template>
  <div class="container">
    <div class="box" ref="box">
      <div
        class="number"
        v-for="(item, index) in numbers"
        :key="index"
        :style="{ background: item.background }"
      >
        {{ item.number }}
      </div>
    </div>
    <button @click="randomNumber">随机抽取</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [],
      timer: null,
    }
  },
  mounted() {
    // 初始化100个数字
    for (let i = 0; i < 100; i++) {
      this.numbers.push({
        number: i + 1,
        background: '#ccc',
      })
    }
  },
  methods: {
    randomNumber() {
      // 清除定时器
      clearInterval(this.timer)
      // 随机数
      // 定时器
      let count = 0
      this.timer = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 100)
        // 改变背景
        this.numbers.forEach((item, index) => {
          if (index === randomNumber) {
            item.background = '#f00'
          } else {
            item.background = '#ccc'
          }
        })
        // 计数
        count = count + 0.1
        console.log(count, '=======')
        // 3秒后停止
        if (count > 3) {
          clearInterval(this.timer)
          // 弹窗展示
          alert(`抽取的数字是：${randomNumber + 1}`)
        }
      }, 100)
    },
  },
}
</script>

<style>
.container {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  position: relative;
}
.box {
  width: 540px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.number {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  margin: 5px;
  font-size: 20px;
  color: #fff;
}
</style>

```
