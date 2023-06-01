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
      <div class="countDown">
        {{ totalTime }}
      </div>
      <div class="title">{{ currentQuestion.title }}</div>
      <div class="options">
        <div
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
        </div>
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
    <div :class="showResultPopupClass" v-show="showResultPopup">
      <div class="content-popup">
        <!-- <div class="closeWrapper" @click="closePopup">
          <van-icon name="cross" />
        </div> -->
        <div class="result-score">
          <div class="result-score-button">Score: {{ score }}</div>
          <div class="result-score-button">Accuracy: {{ accuracy }}%</div>
          <div class="result-score-button">Time: {{ times }}s</div>
          <!-- <div class="more-btn" @click="oneMore()">再来一次</div> -->
        </div>
        <div
          class="topic-list"
          v-for="(question, index) in questionList"
          :key="index"
        >
          <div class="result-title">{{ question.title }}</div>
          <div class="result-options">
            <div
              v-for="(option, i) in question.options"
              :key="i"
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
                questionList[index].selected === questionList[index].answer
              "
              class="result-answer-s"
            >
              恭喜你选对了,正确答案是{{
                questionList[index].options[questionList[index].answer]
              }}
            </div>
            <div
              v-show="
                questionList[index].selected !== questionList[index].answer
              "
              class="result-answer-e"
            >
              你选错了,正确答案是{{
                questionList[index].options[questionList[index].answer]
              }}
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
// import ProgressBar from '../components/ProgressBar.vue'
export default {
  name: 'SingleCategory',
  // components: {
  //   ProgressBar,
  // },
  computed: {
    currentQuestion() {
      return this.questionList[this.currentQuestionIndex]
    },
    isAnswerCorrect() {
      return this.selectedOption === this.currentQuestion.answer
    },
  },
  data() {
    return {
      questionList: [
        {
          title: '1. 世界上最长的河流是哪个？',
          options: ['A. 尼罗河', 'B. 亚马逊河', 'C. 长江', 'D. 密西西比河'],
          selected: null, //已选选项
          answer: 0, // 答案为选项A
        },
        {
          title: '2. 世界上最大的洲是哪个？',
          options: ['A. 亚洲', 'B. 非洲', 'C. 欧洲', 'D. 北美洲'],
          selected: null,
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
          selected: null,
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
          selected: null,
          answer: 0,
        },
        {
          title: '5. 世界上最长的海岸线在哪个国家？',
          options: ['A. 美国', 'B. 澳大利亚', 'C. 加拿大', 'D. 中国'],
          selected: null,
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
          selected: null,
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
          selected: null,
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
          selected: null,
          answer: 3,
        },
        {
          title: '9. 世界上最大的城市是哪个？',
          options: ['A. 上海', 'B. 东京', 'C. 伦敦', 'D. 墨西哥城'],
          selected: null,
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
          selected: null,
          answer: 0,
        },
      ],
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
      times: null,
      totalTime: 180,
      isCountTimer: false,
      interval: 1000,
      timerId: null,
      alertInterval: 30,
      isAlerted: false,
      showStartPopup: true,
    }
  },

  mounted() {},
  methods: {
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
          this.times = 180 - this.totalTime
          this.showResultPopup = true
        } else {
          this.currentQuestionIndex++
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
