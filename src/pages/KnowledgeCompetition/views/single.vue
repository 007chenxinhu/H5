<template>
  <div class="content">
    <div class="startPopup" v-if="showStartPopup">
      <div @click="startAnswer" class="start-btn">开始答题</div>
    </div>
    <div class="go_back" @click="goBack">
      <img class="go_back_img" src="../assets/images/star_btn_home.png" />
      <!-- <van-icon name="wap-home" size="3vw" /> -->
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <!-- <progress-bar
        :stage="questionList.length"
        :is-single="true"
        :current-stage="currentQuestionIndex + 1"
      ></progress-bar> -->
      <div class="progress-bar-single">
        <div
          v-for="i in questionList.length"
          :key="i"
          :style="{ width: `calc(100% / ${questionList.length})` }"
          :class="`stage-${i} ${getStageStatus(i)}`"
        ></div>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="question">
      <div class="countDown" v-if="TimeLimit === 'true'">
        {{ totalTime }}
      </div>
      <div class="title">{{ currentQuestion.t_content }}</div>
      <div class="options">
        <div class="option" @click="selectOption(0)">
          {{ currentQuestion.t_Answer_A }}
        </div>
        <div class="option" @click="selectOption(1)">
          {{ currentQuestion.t_Answer_B }}
        </div>
        <div class="option" @click="selectOption(2)">
          {{ currentQuestion.t_Answer_C }}
        </div>
        <div class="option" @click="selectOption(3)">
          {{ currentQuestion.t_Answer_D }}
        </div>
        <!-- <div
          class="option"
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :class="
            showResult
              ? selectedOption === index
                ? currentQuestion.selected === currentQuestion.answer
                  ? 'success'
                  : 'error'
                : ''
              : selectedOption === index
              ? 'active'
              : ''
          "
          @click="selectOption(index)"
        >
          {{ option }}
        </div> -->
      </div>
      <!-- <div class="submit"> -->
      <!-- <button @click="checkAnswer">检查答案</button> -->
      <!-- <button @click="nextQuestion">
          {{
            currentQuestionIndex + 1 === questionList.length ? '提交' : '下一题'
          }}
        </button> -->
      <!-- </div> -->
      <!-- <div class="result" v-if="showResult">
        {{
          isAnswerCorrect
            ? '回答正确！'
            : '回答错误！正确答案是：' +
              currentQuestion.options[currentQuestion.answer]
        }}
      </div> -->
    </div>
    <!-- 结果弹窗 -->
    <div :class="showResultPopupClass" v-if="showResultPopup">
      <div class="content-popup">
        <!-- <div class="closeWrapper" @click="closePopup">
          <van-icon name="cross" />
        </div> -->
        <div class="result-score">
          <div class="result-score-button">Score: {{ score ? score : 0 }}</div>
          <div class="result-score-button">Accuracy: {{ accuracy }}%</div>
          <div class="result-score-button">Time: {{ times }}s</div>
          <!-- <div class="more-btn" @click="oneMore()">再来一次</div> -->
        </div>
        <div
          class="topic-list"
          v-for="(question, index) in questionList"
          :key="index"
        >
          <div class="result-title">{{ question.t_content }}</div>
          <div class="result-options">
            <div
              :class="
                question.answer === 0
                  ? 'success'
                  : question.selected === 0
                  ? 'error'
                  : 'result-option'
              "
            >
              {{ question.t_Answer_A }}
            </div>
            <div
              :class="
                question.answer === 1
                  ? 'success'
                  : question.selected === 1
                  ? 'error'
                  : 'result-option'
              "
            >
              {{ question.t_Answer_B }}
            </div>
            <div
              :class="
                question.answer === 2
                  ? 'success'
                  : question.selected === 2
                  ? 'error'
                  : 'result-option'
              "
            >
              {{ question.t_Answer_C }}
            </div>
            <div
              :class="
                question.answer === 3
                  ? 'success'
                  : question.selected === 3
                  ? 'error'
                  : 'result-option'
              "
            >
              {{ question.t_Answer_D }}
            </div>
            <div
              v-if="questionList[index].selected === questionList[index].answer"
              class="result-answer-s"
            >
              恭喜你选对了,{{ questionList[index].t_Explain }}
            </div>
            <div
              v-if="questionList[index].selected !== questionList[index].answer"
              class="result-answer-e"
            >
              你选错了,{{ questionList[index].t_Explain }}
            </div>
          </div>
        </div>
        <div class="result-score">
          <div class="result-score-button margin-bottom" @click="closePopup">
            Close
          </div>
          <div class="result-score-button margin-bottom" @click="oneMore">
            Again
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListThetopictable } from '../api/index'

export default {
  name: 'SingleCategory',
  computed: {
    // currentQuestion() {
    //   return this.questionList[this.currentQuestionIndex]
    // },
    // isAnswerCorrect() {
    //   return this.selectedOption === this.currentQuestion.t_Answer
    // },
  },
  created() {
    this.TimeLimit = this.$route.query.limitTime
      ? this.$route.query.limitTime
      : false
    this.getTime = this.$route.query.time
    this.totalTime = this.$route.query.time
    this.titleId = this.$route.query.id
    this._getListTheopictable(this.titleId)
  },
  data() {
    return {
      questionList: [
        // {
        //   title: '1. 世界上最长的河流是哪个？',
        //   options: ['A. 尼罗河', 'B. 亚马逊河', 'C. 长江', 'D. 密西西比河'],
        //   selected: null, //已选选项
        //   answer: 0, // 答案为选项A
        // },
        // {
        //   title: '2. 世界上最大的洲是哪个？',
        //   options: ['A. 亚洲', 'B. 非洲', 'C. 欧洲', 'D. 北美洲'],
        //   selected: null,
        //   answer: 0,
        // },
      ],
      currentQuestion: [],
      showResultPopup: false,
      showResultPopupClass: 'result-popup bounceInDown animated',
      currentQuestionIndex: 0, // 当前问题的索引
      selectedOption: null, // 用户选择的选项，初始为null
      showResult: false, // 是否显示结果
      // backgroundDiv: {
      //   backgroundImage:
      //     'url(' +
      //     require(`../assets/bg${parseInt(Math.random() * 13 + 1)}.png`),
      // },
      score: null,
      accuracy: null,
      getTime: null,
      times: null,
      totalTime: null,
      isCountTimer: false,
      interval: 1000,
      timerId: null,
      alertInterval: 30,
      isAlerted: false,
      showStartPopup: true,
      TimeLimit: null,
      titleId: null,
      tableData: null,
    }
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  },
  methods: {
    //获取选中当前题库下的题目列表
    async _getListTheopictable(id) {
      try {
        const answerMap = ['A', 'B', 'C', 'D']
        const res = await getListThetopictable(id)
        this.questionList = res
        this.questionList.forEach((obj, i) => {
          obj.selected = null
          answerMap.forEach((item, index) => {
            if (obj.t_Answer === item) {
              obj.answer = index
            }
          })
        })
        this.currentQuestion = this.questionList[this.currentQuestionIndex]
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    getStageStatus(i) {
      if (i < this.currentQuestionIndex + 1) {
        return 'done'
      } else if (i === this.currentQuestionIndex + 1) {
        return 'doing'
      } else {
        return ''
      }
    },
    startAnswer() {
      this.showStartPopup = false
      if (this.TimeLimit === 'true') {
        this.startCountdown()
      }
    },
    oneMore() {
      this.$router.push('/index?type=single')
    },
    goBack() {
      this.$router.push('/index')
    },
    startCountdown() {
      this.timerId = setInterval(() => {
        this.totalTime -= this.interval / 1000
        // 每30秒进行提醒
        if (this.totalTime % this.alertInterval === 0 && !this.isAlerted) {
          this.$toast(`已经过去 ${this.getTime - this.totalTime} 秒`)
          this.isAlerted = true
        } else if (this.totalTime % this.alertInterval !== 0) {
          this.isAlerted = false
        }

        if (this.totalTime < 0) {
          clearInterval(this.timerId)
          this.totalTime = 0
          this.$toast('时间到！')
          this.showResultPopup = true
        }
      }, this.interval)
    },
    closePopup() {
      try {
        let self = this
        this.showResultPopupClass = 'result-popup bounceOutRight animated'
        setTimeout(() => {
          self.showResultPopupClass = 'result-popup bounceInDown animated'
          self.showResultPopup = false
        }, 599)
        clearInterval(this.timerId)
        this.goBack()
      } catch (error) {
        console.log(error)
      }
    },
    selectOption(index) {
      if (this.showResult === true) return
      this.selectedOption = index
      this.nextQuestion()
    },
    checkAnswer() {
      if (this.selectedOption === null) {
        this.$toast('请选择一个选项...')
        return
      }
      this.questionList[this.currentQuestionIndex].selected =
        this.selectedOption
      this.showResult = true
    },
    nextQuestion() {
      try {
        if (this.selectedOption === null) {
          this.$toast('请先作答！')
          return
        }
        this.questionList[this.currentQuestionIndex].selected =
          this.selectedOption

        if (this.currentQuestionIndex + 1 === this.questionList.length) {
          this.questionList.forEach((item, index) => {
            if (item.selected === item.answer) {
              this.score = this.score + 50
            }
          })
          this.accuracy = (
            (this.score / (this.questionList.length * 50)) *
            100
          ).toFixed(2)
          clearInterval(this.timerId)
          this.times = this.getTime - this.totalTime
          this.showResultPopup = true
        } else {
          this.currentQuestionIndex++
          this.currentQuestion = this.questionList[this.currentQuestionIndex]
          this.selectedOption = null
          this.showResult = false
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import './single.scss';
</style>
