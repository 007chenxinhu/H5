<template>
  <div class="content">
    <div class="startPopup" v-if="showStartPopup">
      <div @click="startAnswer" class="start-btn">开始答题</div>

      <!-- <div class="start-animation">
        <div class="start-animation-left animated">
          <img class="start-animation-l-box" src="../assets/ab.png" />
        </div>
        <div class="start-animation-right animated">
          <img class="start-animation-r-box" src="../assets/a.png" />
        </div>
      </div>
      <div class="start-action">
        <div class="start-action-vs zoomIn animated">
          <img class="start-action-vs-box" src="../assets/ba.png" />
        </div>
        <div @click="startAnswer" class="start-btn">Start</div>
      </div> -->
    </div>
    <div class="go_back" @click="goBack">
      <img class="go_back_img" src="../assets/images/star_btn_home.png" />
      <!-- <van-icon name="wap-home" size="3vw" /> -->
    </div>
    <div v-if="TimeLimit === 'true'" class="countDown">
      {{ totalTime }}
    </div>
    <div v-if="!showStartPopup" class="double-category">
      <div>
        <div class="toast1" v-show="showToast1">请先做答！</div>
        <!-- 进度条 -->
        <div class="progress1">
          <!-- <progress-bar
            is-single="false"
            :stage="questionList1.length"
            :current-stage="currentQuestionIndex1 + 1"
          ></progress-bar> -->
          <div
            v-for="i in questionList1.length"
            :key="i"
            :style="{ width: `calc(100% / ${questionList1.length})` }"
            :class="`stage-${i} ${getStageStatus1(i)}`"
          ></div>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestion.t_content }}</div>
          <!-- <img src="../assets/cartoon/water.png" alt="" /> -->
          <div class="options">
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 0 ? 'active' : '') : ''"
              @click="selectOption(true, 0)"
            >
              {{ currentQuestion.t_Answer_A }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 1 ? 'active' : '') : ''"
              @click="selectOption(true, 1)"
            >
              {{ currentQuestion.t_Answer_B }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 2 ? 'active' : '') : ''"
              @click="selectOption(true, 2)"
            >
              {{ currentQuestion.t_Answer_C }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 3 ? 'active' : '') : ''"
              @click="selectOption(true, 3)"
            >
              {{ currentQuestion.t_Answer_D }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="toast2" v-show="showToast2">请先做答！</div>
        <!-- 进度条 -->
        <div class="progress2">
          <!-- <progress-bar
            is-single="false"
            :stage="questionList2.length"
            :current-stage="currentQuestionIndex2 + 1"
          ></progress-bar> -->
          <div
            v-for="i in questionList2.length"
            :key="i"
            :style="{ width: `calc(100% / ${questionList2.length})` }"
            :class="`stage-${i} ${getStageStatus2(i)}`"
          ></div>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestionss.t_content }}</div>
          <div class="options">
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 0 ? 'active' : '') : ''"
              @click="selectOption(false, 0)"
            >
              {{ currentQuestionss.t_Answer_A }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 1 ? 'active' : '') : ''"
              @click="selectOption(false, 1)"
            >
              {{ currentQuestionss.t_Answer_B }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 2 ? 'active' : '') : ''"
              @click="selectOption(false, 2)"
            >
              {{ currentQuestionss.t_Answer_C }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 3 ? 'active' : '') : ''"
              @click="selectOption(false, 3)"
            >
              {{ currentQuestionss.t_Answer_D }}
            </div>
          </div>
          <!-- <div class="submit submit-r">
            <button @click="checkAnswer">检查答案</button>
            <button @click="nextQuestion(false)">
              {{
                currentQuestionIndex2 + 1 === questionList2.length
                  ? '提交'
                  : '下一题'
              }}
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <div :class="showResultPopupClass" v-if="showResultPopup">
      <div class="content-popup">
        <!-- <div class="closeWrapper" @click="closePopup">
          <van-icon name="cross" />
        </div> -->
        <div class="result-score">
          <div class="double-score">
            <div class="result-score-button">Score: {{ score1 }}</div>
            <div class="circle1"></div>
          </div>
          <div class="double-score">
            <div class="result-score-button">Score: {{ score2 }}</div>
            <div class="circle2"></div>
          </div>
          <!-- <div class="result-score-button">Accuracy: {{ accuracy1 }}%</div>
          <div class="result-score-button">Time: {{ times1 }}s</div> -->
          <!-- <div class="more-btn" @click="oneMore()">再来一次</div> -->
        </div>
        <div
          class="topic-list"
          v-for="(question, index) in questionList1"
          :key="index"
        >
          <div class="result-title">{{ question.t_content }}</div>
          <div class="result-options">
            <div
              :class="
                selected.left[index] === selected.right[index] &&
                selected.right[index] === 0
                  ? 'success'
                  : selected.left[index] === 0
                  ? 'left'
                  : selected.right[index] === 0
                  ? 'right'
                  : ''
              "
            >
              {{ question.t_Answer_A }}
            </div>
          </div>

          <div class="result-options">
            <div
              :class="
                selected.left[index] === selected.right[index] &&
                selected.right[index] === 1
                  ? 'success'
                  : selected.left[index] === 1
                  ? 'left'
                  : selected.right[index] === 1
                  ? 'right'
                  : ''
              "
            >
              {{ question.t_Answer_B }}
            </div>
          </div>

          <div class="result-options">
            <div
              :class="
                selected.left[index] === selected.right[index] &&
                selected.right[index] === 2
                  ? 'success'
                  : selected.left[index] === 2
                  ? 'left'
                  : selected.right[index] === 2
                  ? 'right'
                  : ''
              "
            >
              {{ question.t_Answer_C }}
            </div>
          </div>
          <div class="result-options">
            <div
              :class="
                selected.left[index] === selected.right[index] &&
                selected.right[index] === 3
                  ? 'success'
                  : selected.left[index] === 3
                  ? 'left'
                  : selected.right[index] === 3
                  ? 'right'
                  : ''
              "
            >
              {{ question.t_Answer_D }}
            </div>
          </div>
          <div class="result-answer-s">
            正确答案是{{
              questionList1[index].t_Answer + questionList1[index].t_Explain
            }}
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

      <!-- <div class="more-btn" @click="oneMore()">再来一次</div> -->
      <!-- <div class="result-left">
        <div class="result-score">
          <div>
            本次答题你的得分是{{ score1 }},正确率是{{ accuracy1 }}%,思考时长{{
              times1
            }}s
          </div>
        </div>
        <div
          class="answer-question"
          v-for="(question, index) in questionList1"
          :key="index + question"
        >
          <div class="result-title">{{ question.title }}</div>
          <div class="result-options">
            <div
              v-for="(option, i) in question.options"
              :key="i + option"
              :class="
                question.selected === question.answer && i === question.selected
                  ? 'success'
                  : i === question.selected
                  ? 'error'
                  : i === question.answer
                  ? 'success'
                  : 'result-option'
              "
            >
              {{ option }}
            </div>
            <div
              v-if="
                questionList1[index].selected === questionList1[index].answer
              "
              class="result-answer-s"
            >
              恭喜你选对了,正确答案是{{
                questionList1[index].options[questionList1[index].answer]
              }}
            </div>
            <div v-else class="result-answer-e">
              你选错了,正确答案是{{
                questionList1[index].options[questionList1[index].answer]
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="result-right">
        <div class="result-score">
          <div>
            本次答题你的得分是{{ score2 }},正确率是{{ accuracy2 }}%,思考时长{{
              times2
            }}s
          </div>
        </div>
        <div
          class="answer-question-r"
          v-for="(question, index) in questionList2"
          :key="index + question"
        >
          <div class="result-title">{{ question.title }}</div>
          <div class="result-options">
            <div
              v-for="(option, i) in question.options"
              :key="i + option"
              :class="
                question.selected === question.answer && i === question.selected
                  ? 'success'
                  : i === question.selected
                  ? 'error'
                  : i === question.answer
                  ? 'success'
                  : 'result-option'
              "
            >
              {{ option }}
            </div>
            <div
              v-show="
                questionList2[index].selected === questionList2[index].answer
              "
              class="result-answer-s"
            >
              恭喜你选对了,正确答案是{{
                questionList2[index].options[questionList2[index].answer]
              }}
            </div>
            <div
              v-show="
                questionList2[index].selected !== questionList2[index].answer
              "
              class="result-answer-e"
            >
              你选错了,正确答案是{{
                questionList2[index].options[questionList2[index].answer]
              }}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import ProgressBar from '../components/ProgressBar.vue'
import { getListThetopictable } from '../api/index'

export default {
  name: 'DoubleCategory',
  // components: {
  //   ProgressBar,
  // },
  computed: {
    // currentQuestion() {
    //   return this.questionList1[this.currentQuestionIndex1]
    // },
    // currentQuestionss() {
    //   return this.questionList2[this.currentQuestionIndex2]
    // },
    // isAnswerCorrect1() {
    //   return this.selectedOption1 === this.currentQuestion.answer
    // },
    // isAnswerCorrect2() {
    //   return this.selectedOption2 === this.currentQuestionss.answer
    // },
  },
  data() {
    return {
      currentQuestion: null,
      currentQuestionss: null,
      selectedOptions: [],
      showResultPopup: false,
      showResultPopupClass: 'result-popup bounceInDown animated',
      questionList1: [],
      questionList2: [],
      currentQuestionIndex1: 0, // 当前问题的索引
      currentQuestionIndex2: 0, // 当前问题的索引
      interval: 1000,
      timerId: null,
      alertInterval: 30,
      isAlerted: false,
      score1: null,
      accuracy1: null,
      times1: null,
      score2: null,
      accuracy2: null,
      times2: null,
      totalTime: 180,
      getTime: null,
      showResult: false, // 是否显示结果
      selectedOption1: null, // 用户选择的选项，初始为null
      selectedOption2: null, // 用户选择的选项，初始为null
      selected: { left: [], right: [] },
      showStartPopup: true,
      TimeLimit: null,
      showToast1: false,
      showToast2: false,
      oneDone1: false,
      oneDone2: false,
      time: null,
      titleId: null,
      tableData: null,
    }
  },
  created() {
    this.TimeLimit = this.$route.query.limitTime
      ? this.$route.query.limitTime
      : false
    this.getTime = this.$route.query.time
      ? this.$route.query.limitTime.time
      : 360
    this.titleId = this.$route.query.id
    this._getListTheopictable(this.titleId)
  },
  methods: {
    //获取选中当前题库下的题目列表
    async _getListTheopictable(id) {
      try {
        const answerMap = ['A', 'B', 'C', 'D']
        const res = await getListThetopictable(id)
        this.questionList1 = res
        this.questionList1.forEach((obj, i) => {
          obj.selected = null

          answerMap.forEach((item, index) => {
            if (obj.t_Answer === item) {
              obj.answer = index
            }
          })
        })
        this.currentQuestion = this.questionList1[this.currentQuestionIndex1]
        this.questionList2 = this.shuffleArray(res)
        this.questionList2.forEach((obj, i) => {
          obj.selected = null

          answerMap.forEach((item, index) => {
            if (obj.t_Answer === item) {
              obj.answer = index
            }
          })
        })
        this.currentQuestionss = this.questionList2[this.currentQuestionIndex2]
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    getStageStatus1(i) {
      if (i < this.currentQuestionIndex1 + 1) {
        return 'done'
      } else if (i === this.currentQuestionIndex1 + 1) {
        return 'doing'
      } else {
        return ''
      }
    },
    getStageStatus2(i) {
      if (i < this.currentQuestionIndex2 + 1) {
        return 'done'
      } else if (i === this.currentQuestionIndex2 + 1) {
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
      this.$router.push('/index?type=double')
    },
    goBack() {
      this.$router.push('/index')
    },
    startCountdown() {
      this.timerId = setInterval(() => {
        this.totalTime -= this.interval / 1000
        // 每30秒进行提醒
        if (this.totalTime % this.alertInterval === 0 && !this.isAlerted) {
          this.$toast(`已经过去 ${180 - this.totalTime} 秒`)
          this.isAlerted = true
        } else if (this.totalTime % this.alertInterval !== 0) {
          this.isAlerted = false
        }

        if (this.totalTime < 0) {
          clearInterval(this.timerId)
          this.totalTime = 0
          this.$toast('时间到！')
        }
      }, this.interval)
    },
    nextQuestion(flag) {
      try {
        let self = this
        if (flag) {
          if (this.selectedOption1 === null) {
            this.showToast1 = true
            setTimeout(() => {
              self.showToast1 = false
            }, 599)
            return
          }
          this.questionList1[this.currentQuestionIndex1].selected =
            this.selectedOption1
          this.selected.left.push(this.selectedOption1)
          if (this.currentQuestionIndex1 + 1 === this.questionList1.length) {
            this.questionList1.forEach((item, index) => {
              if (item.selected === item.answer) {
                this.score1 = this.score1 + 50
              }
            })
            this.accuracy1 = (
              (this.score1 / (this.questionList1.length * 50)) *
              100
            ).toFixed(2)
            this.times2 && clearInterval(this.timerId)
            this.times1 = this.getTime - this.totalTime
            if (this.oneDone2) {
              this.showResultPopup = true
            } else {
              this.oneDone1 = true
            }
          } else {
            this.currentQuestionIndex1++
            this.currentQuestion =
              this.questionList1[this.currentQuestionIndex1]

            this.selectedOption1 = null
            this.showResult = false
          }
        } else {
          if (this.selectedOption2 === null) {
            this.showToast2 = true
            setTimeout(() => {
              self.showToast2 = false
            }, 599)
            return
          }
          this.questionList2[this.currentQuestionIndex2].selected =
            this.selectedOption2
          this.selected.right.push(this.selectedOption2)
          if (this.currentQuestionIndex2 + 1 === this.questionList2.length) {
            this.questionList2.forEach((item, index) => {
              if (item.selected === item.answer) {
                this.score2 = this.score2 + 50
              }
            })
            this.accuracy2 = (
              (this.score2 / (this.questionList2.length * 50)) *
              100
            ).toFixed(2)
            this.times1 && clearInterval(this.timerId)
            this.times2 = this.getTime - this.totalTime
            if (this.oneDone1) {
              this.showResultPopup = true
            } else {
              this.oneDone2 = true
            }
          } else {
            this.currentQuestionIndex2++
            this.currentQuestionss =
              this.questionList2[this.currentQuestionIndex2]

            this.selectedOption2 = null
            this.showResult = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    closePopup() {
      try {
        let self = this
        this.showResultPopupClass = 'result-popup bounceOutRight animated'
        setTimeout(() => {
          self.showResultPopupClass = 'result-popup bounceInDown animated'
          self.showResultPopup = false
        }, 599)
      } catch (error) {
        console.log(error)
      }
    },
    selectOption(type, index) {
      if (type) {
        if (this.showResult === true) return
        this.selectedOption1 = index
        this.nextQuestion(type)
      } else {
        if (this.showResult === true) return
        this.selectedOption2 = index
        this.nextQuestion(type)
      }
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
  },
}
</script>

<style scoped lang="scss">
@import './double.scss';
</style>
