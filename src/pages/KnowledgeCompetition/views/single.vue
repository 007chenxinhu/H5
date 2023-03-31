<template>
  <div class="question">
    <div class="title">{{ currentQuestion.title }}</div>
    <div class="options">
      <div
        class="option"
        v-for="(option, index) in currentQuestion.options"
        :key="index"
        :class="{ active: selectedOption === index }"
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
</template>

<script>
export default {
  data() {
    return {
      questionList: [
        {
          title: '问题1：以下哪个选项是正确的？',
          options: ['选项A', '选项B', '选项C', '选项D'],
          answer: 0, // 答案为选项A
        },
        {
          title: '问题2：以下哪个选项是正确的？',
          options: ['选项A', '选项B', '选项C', '选项D'],
          answer: 1, // 答案为选项B
        },
        // ...
      ],
      currentQuestionIndex: 0, // 当前问题的索引
      selectedOption: null, // 用户选择的选项，初始为null
      showResult: false, // 是否显示结果
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
