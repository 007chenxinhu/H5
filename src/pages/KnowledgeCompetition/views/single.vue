<template>
  <div class="content" :style="backgroundDiv">
    <!-- 进度条 -->
    <div>
      <div
        class="progress"
        v-for="(item, index) in questionList.length"
        :key="index"
      ></div>
    </div>
    <div class="question">
      <div class="title">{{ currentQuestion.title }}</div>
      <div class="options">
        <div
          class="option"
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :class="{
            active: selectedOption === index,
          }"
          @click="selectOption(index)"
        >
          {{ option }}
        </div>
      </div>
      <div class="submit">
        <button @click="checkAnswer">检查答案</button>
        <button @click="nextQuestion">下一题</button>
      </div>
      <div class="result" v-if="showResult">
        {{
          isAnswerCorrect
            ? '回答正确！'
            : '回答错误！正确答案是：' +
              currentQuestion.options[currentQuestion.answer]
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [
        {
          title: '1. 世界上最长的河流是哪个？',
          options: ['A. 尼罗河', 'B. 亚马逊河', 'C. 长江', 'D. 密西西比河'],
          answer: 0, // 答案为选项A
        },
        {
          title: '2. 世界上最大的洲是哪个？',
          options: ['A. 亚洲', 'B. 非洲', 'C. 欧洲', 'D. 北美洲'],
          answer: 0,
        },
        {
          title: '3. 世界上最高的山峰是哪座？',
          options: [
            'A. 珠穆朗玛峰',
            'B. 乔戈里峰',
            'C. 马卡鲁峰',
            'D. 喜马拉雅山',
          ],
          answer: 0,
        },
        {
          title: '4. 世界上最大的沙漠是哪个？',
          options: [
            'A. 撒哈拉沙漠',
            'B. 贝壳沙漠',
            'C. 莫哈维沙漠',
            'D. 亚特莱斯沙漠',
          ],
          answer: 0,
        },
        {
          title: '5. 世界上最长的海岸线在哪个国家？',
          options: ['A. 美国', 'B. 澳大利亚', 'C. 加拿大', 'D. 中国'],
          answer: 1,
        },
        {
          title: '6. 世界上最大的岛屿是哪个？',
          options: [
            'A. 格陵兰岛',
            'B. 澳大利亚',
            'C. 马达加斯加岛',
            'D. 纽芬兰岛',
          ],
          answer: 0,
        },
        {
          title: '7. 世界上最深的海沟是哪个？',
          options: [
            'A. 马里亚纳海沟',
            'B. 科斯特罗海沟',
            'C. 环太平洋海沟',
            'D. 日本海沟',
          ],
          answer: 0,
        },
        {
          title: '8. 世界上最大的瀑布是哪个？',
          options: [
            'A. 奥古斯托斯瀑布',
            'B. 黄石瀑布',
            'C. 布拉西瓦瀑布',
            'D. 伊瓜苏瀑布',
          ],
          answer: 3,
        },
        {
          title: '9. 世界上最大的城市是哪个？',
          options: ['A. 上海', 'B. 东京', 'C. 伦敦', 'D. 墨西哥城'],
          answer: 1,
        },
        {
          title: '10. 世界上最长的跨海大桥是哪个？',
          options: [
            'A. 香港—珠海—澳门大桥',
            'B. 克里米亚大桥',
            'C. 阿克海格桥',
            'D. 长江大桥',
          ],
          answer: 0,
        },
      ],
      currentQuestionIndex: 0, // 当前问题的索引
      selectedOption: null, // 用户选择的选项，初始为null
      showResult: false, // 是否显示结果
      backgroundDiv: {
        backgroundImage:
          'url(' +
          require(`../assets/bg${parseInt(Math.random() * 13 + 1)}.png`),
      },
    }
  },
  computed: {
    currentQuestion() {
      return this.questionList[this.currentQuestionIndex]
    },
    isAnswerCorrect() {
      return this.selectedOption === this.currentQuestion.answer
    },
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index
    },
    checkAnswer() {
      if (this.selectedOption === null) {
        alert('请选择一个选项')
        return
      }
      this.showResult = true
    },
    nextQuestion() {
      this.currentQuestionIndex++
      this.selectedOption = null
      this.showResult = false
    },
  },
}
</script>
<style scoped lang="scss">
@import './single.scss';
</style>
