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
    <div v-if="!showStartPopup" class="countDown">
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
          <div class="title">{{ currentQuestion.title }}</div>
          <!-- <img src="../assets/cartoon/water.png" alt="" /> -->
          <div class="options">
            <div
              class="option-l"
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              :class="
                showResult
                  ? selectedOption1 === index
                    ? currentQuestion.selected === currentQuestion.answer
                      ? 'success'
                      : 'error'
                    : ''
                  : selectedOption1 === index
                  ? 'active'
                  : ''
              "
              @click="selectOption(true, index)"
            >
              <!-- <div :class="'cartoon' + (index + 1)"></div> -->
              <!-- <div class="clickIcon"></div> -->
              {{ option }}
            </div>
          </div>
          <!-- <div class="submit submit-l">
            <button @click="checkAnswer">检查答案</button>
            <button @click="nextQuestion(true)">
              {{
                currentQuestionIndex1 + 1 === questionList1.length
                  ? '提交'
                  : '下一题'
              }}
            </button>
          </div> -->
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
          <div class="title">{{ currentQuestionss.title }}</div>
          <div class="options">
            <div
              class="option-r"
              v-for="(option, index) in currentQuestionss.options"
              :key="index"
              :class="
                showResult
                  ? selectedOption2 === index
                    ? currentQuestionss.selected === currentQuestionss.answer
                      ? 'success'
                      : 'error'
                    : ''
                  : selectedOption2 === index
                  ? 'active'
                  : ''
              "
              @click="selectOption(false, index)"
            >
              <!-- <div :class="'cartoon' + (index + 1)"></div> -->

              {{ option }}
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
    <div :class="showResultPopupClass" v-show="showResultPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <!-- <div class="more-btn" @click="oneMore()">再来一次</div> -->
      <div class="result-left">
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
      <div class="online"></div>
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
      </div>
    </div>
  </div>
</template>

<script>
// import ProgressBar from '../components/ProgressBar.vue'

export default {
  name: 'DoubleCategory',
  // components: {
  //   ProgressBar,
  // },
  computed: {
    currentQuestion() {
      return this.questionList1[this.currentQuestionIndex1]
    },
    currentQuestionss() {
      return this.questionList2[this.currentQuestionIndex2]
    },
    isAnswerCorrect1() {
      return this.selectedOption1 === this.currentQuestion.answer
    },
    isAnswerCorrect2() {
      return this.selectedOption2 === this.currentQuestionss.answer
    },
  },
  data() {
    return {
      randomNumberBg: require('../assets/bg' +
        parseInt(Math.random() * 13 + 1) +
        '.png'),
      backgroundDiv: {
        backgroundImage:
          'url(' +
          require(`../assets/bg${parseInt(Math.random() * 13 + 1)}.png`),
      },
      selectedOptions: [],
      showResultPopup: false,
      showResultPopupClass: 'result-popup bounceInDown animated',
      questionList1: [
        {
          title: '1. 世界上最大的洲是什么？',
          options: ['A. 亚洲', 'B. 非洲', 'C. 欧洲', 'D. 北美洲'],
          selected: null,
          answer: 0,
        },
        {
          title: '2. 世界上最高的山峰是什么？',
          options: [
            'A. 珠穆朗玛峰',
            'B. 干城章嘉峰',
            'C. 洛子峰',
            'D. 马卡鲁峰',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '3. 世界上最深的海洋是什么？',
          options: ['A. 太平洋', 'B. 大西洋', 'C. 印度洋', 'D. 北冰洋'],
          selected: null,
          answer: 0,
        },
        {
          title: '4. 世界上最大的沙漠是什么？',
          options: [
            'A. 撒哈拉沙漠',
            'B. 阿拉伯沙漠',
            'C. 澳大利亚沙漠',
            'D. 巴西利亚沙漠',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '5. 世界上最大的洋是什么？',
          options: ['A. 太平洋', 'B. 大西洋', 'C. 印度洋', 'D. 北冰洋'],
          selected: null,
          answer: 0,
        },
        {
          title: '6. 世界上最大的湖泊是什么？',
          options: ['A. 里海', 'B. 苏必利尔湖', 'C. 咸海', 'D. 死海'],
          selected: null,
          answer: 0,
        },
        {
          title: '7. 世界上最大的岛屿是什么？',
          options: [
            'A. 格陵兰岛',
            'B. 夏威夷岛',
            'C. 马达加斯加岛',
            'D. 加里曼丹岛',
          ],
          selected: null,
          answer: 2,
        },
        {
          title: '8. 世界上最大的河流是什么？',
          options: ['A. 长江', 'B. 尼罗河', 'C. 亚马逊河', 'D. 密西西比河'],
          selected: null,
          answer: 2,
        },
        {
          title: '9. 世界上最长的河流是什么？',
          options: ['A. 尼罗河', 'B. 亚马逊河', 'C. 密西西比河', 'D. 长江'],
          selected: null,
          answer: 0,
        },
        {
          title: '10. 世界上最大的珊瑚礁群是什么？',
          options: [
            'A. 大堡礁',
            'B. 马尔代夫珊瑚礁',
            'C. 菲律宾珊瑚礁',
            'D. 澳大利亚珊瑚礁',
          ],
          selected: null,
          answer: 0,
        },
      ],
      questionList2: [
        {
          title: '1.世界上最长的山脉是什么？',
          options: [
            'A. 安第斯山脉',
            'B. 喜马拉雅山脉',
            'C. 阿尔卑斯山脉',
            'D. 昆仑山脉',
          ],
          selected: null,
          answer: 1,
        },
        {
          title: '2.世界上最大的洋流是什么？',
          options: [
            'A. 北太平洋暖流',
            'B. 墨西哥湾暖流',
            'C. 加勒比海流',
            'D. 加利福尼亚洋流',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '3.世界上最大的海洋生态系统是什么？',
          options: ['A. 珊瑚礁', 'B. 深海海底', 'C. 热带雨林', 'D. 海洋草原'],
          selected: null,
          answer: 0,
        },
        {
          title: '4.世界上最大的岛屿是什么？',
          options: [
            'A. 格陵兰岛',
            'B. 夏威夷岛',
            'C. 马达加斯加岛',
            'D. 加里曼丹岛',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '5.世界上最大的河流是什么？',
          options: ['A. 尼罗河', 'B. 亚马逊河', 'C. 密西西比河', 'D. 长江'],
          selected: null,
          answer: 1,
        },
        {
          title: '6.世界上最大的半岛是什么？',
          options: [
            'A. 阿拉伯半岛',
            'B. 印度半岛',
            'C. 中南半岛',
            'D. 巴尔干半岛',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '7.世界上最大的国家是什么？',
          options: ['A. 俄罗斯', 'B. 中国', 'C. 美国', 'D. 巴西'],
          selected: null,
          answer: 0,
        },
        {
          title: '8.世界上最大的湖泊是什么？',
          options: ['A. 里海', 'B. 苏必利尔湖', 'C. 咸海', 'D. 死海'],
          selected: null,
          answer: 0,
        },
        {
          title: '9.世界上最高的山峰是什么？',
          options: [
            'A. 珠穆朗玛峰',
            'B. 干城章嘉峰',
            'C. 洛子峰',
            'D. 马卡鲁峰',
          ],
          selected: null,
          answer: 0,
        },
        {
          title: '10.世界上最大的珊瑚礁群是什么？',
          options: [
            'A. 大堡礁',
            'B. 马尔代夫珊瑚礁',
            'C. 菲律宾珊瑚礁',
            'D. 澳大利亚珊瑚礁',
          ],
          selected: null,
          answer: 0,
        },
      ],
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
      showResult: false, // 是否显示结果
      selectedOption1: null, // 用户选择的选项，初始为null
      selectedOption2: null, // 用户选择的选项，初始为null
      showStartPopup: true,
      showToast1: false,
      showToast2: false,
      oneDone1: false,
      oneDone2: false,
    }
  },
  mounted() {},
  methods: {
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
      this.startCountdown()
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
            this.times1 = 180 - this.totalTime
            if (this.oneDone2) {
              this.showResultPopup = true
            } else {
              this.oneDone1 = true
            }
          } else {
            this.currentQuestionIndex1++
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
            this.times2 = 180 - this.totalTime
            if (this.oneDone1) {
              this.showResultPopup = true
            } else {
              this.oneDone2 = true
            }
          } else {
            this.currentQuestionIndex2++
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
      } else {
        if (this.showResult === true) return
        this.selectedOption2 = index
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import './double.scss';
</style>
