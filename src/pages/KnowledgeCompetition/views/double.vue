<template>
  <div class="content" :style="backgroundDiv">
    <div class="startPopup" v-if="showStartPopup">
      <div @click="startAnswer" class="start-btn">开始作答</div>
    </div>
    <div class="goBack" @click="goBack">
      <van-icon name="wap-home" size="3vw" />
    </div>
    <div class="countDown">
      {{ totalTime }}
    </div>
    <div class="double-category">
      <div>
        <div class="toast1" v-show="showToast1">请先做答！</div>
        <!-- 进度条 -->
        <div class="progress1">
          <progress-bar
            :stage="questionList1.length"
            :current-stage="currentQuestionIndex1 + 1"
          ></progress-bar>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestion.title }}</div>
          <div class="options">
            <div
              class="option"
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
              {{ option }}
            </div>
          </div>
          <div class="submit">
            <!-- <button @click="checkAnswer">检查答案</button> -->
            <button @click="nextQuestion(true)">
              {{
                currentQuestionIndex1 + 1 === questionList1.length
                  ? '提交'
                  : '下一题'
              }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="toast2" v-show="showToast2">请先做答！</div>
        <!-- 进度条 -->
        <div class="progress2">
          <progress-bar
            :stage="questionList2.length"
            :current-stage="currentQuestionIndex2 + 1"
          ></progress-bar>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestionss.title }}</div>
          <div class="options">
            <div
              class="option"
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
              {{ option }}
            </div>
          </div>
          <div class="submit">
            <!-- <button @click="checkAnswer">检查答案</button> -->
            <button @click="nextQuestion(false)">
              {{
                currentQuestionIndex2 + 1 === questionList2.length
                  ? '提交'
                  : '下一题'
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <div :class="showResultPopupClass" v-show="showResultPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="result-score">
        <div>
          本次答题你的得分是{{ score }},正确率是{{ accuracy }}%,思考时长{{
            times
          }}s
        </div>
        <div class="more-btn" @click="oneMore()">再来一次</div>
      </div>
      <div v-for="(question, index) in questionList" :key="index">
        <div class="result-title">{{ question.title }}</div>
        <div class="result-options">
          <div
            v-for="(option, index) in question.options"
            :key="index"
            :class="
              question.selected === question.answer &&
              index === question.selected
                ? 'success'
                : index === question.selected
                ? 'error'
                : index === question.answer
                ? 'success'
                : 'result-option'
            "
          >
            {{ option }}
          </div>
          <div
            v-show="questionList[index].selected === questionList[index].answer"
            class="result-answer-s"
          >
            恭喜你选对了,正确答案是{{
              questionList[index].options[questionList[index].answer]
            }}
          </div>
          <div
            v-show="questionList[index].selected !== questionList[index].answer"
            class="result-answer-e"
          >
            你选错了,正确答案是{{
              questionList[index].options[questionList[index].answer]
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'

export default {
  name: 'DoubleCategory',
  components: {
    ProgressBar,
  },
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
      score: null,
      accuracy: null,
      times: null,
      totalTime: 180,
      showResult: false, // 是否显示结果
      selectedOption1: null, // 用户选择的选项，初始为null
      selectedOption2: null, // 用户选择的选项，初始为null
      showStartPopup: true,
      showToast1: false,
      showToast2: false,
    }
  },
  mounted() {},
  methods: {
    singleCategory() {},
    doubleCategory() {},
    gerPersonalTopic() {},
    startAnswer() {
      this.showStartPopup = false
      this.startCountdown()
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
    submit() {
      // 处理提交逻辑
      console.log(this.selectedOptions)
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
                this.score = this.score + 50
              }
            })
            this.accuracy = (
              (this.score / (this.questionList1.length * 50)) *
              100
            ).toFixed(2)
            clearInterval(this.timerId)
            this.times = 180 - this.totalTime
            this.showResultPopup = true
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
                this.score = this.score + 50
              }
            })
            this.accuracy = (
              (this.score / (this.questionList.length * 50)) *
              100
            ).toFixed(2)
            clearInterval(this.timerId)
            this.times = 180 - this.totalTime
            this.showResultPopup = true
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
    Setting() {
      try {
        this.showSettingPopup = true

        // let self = this
        // this.showHintPopupClass = 'hint-popup bounceOutRight animated'
        // setTimeout(() => {
        //   self.showHintPopupClass = 'hint-popup bounceInDown animated'
        //   self.showSettingPopup = false
        // }, 599)
      } catch (error) {
        console.log(error)
      }
    },
    ViewInstructions() {
      this.showHintPopup = true
    },
    closePopup() {
      try {
        let self = this
        this.showHintPopupClass = 'hint-popup bounceOutRight animated'
        this.showSettingPopupClass = 'hint-popup bounceOutRight animated'
        setTimeout(() => {
          self.showHintPopupClass = 'hint-popup bounceInDown animated'
          self.showSettingPopupClass = 'hint-popup bounceInDown animated'
          self.showHintPopup = false
          self.showSettingPopup = false
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
