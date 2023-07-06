<template>
  <div class="content">
    <div class="startPopup" v-if="showStartPopup">
      <div class="loading">
        <div class="loading_text">{{ loading }}</div>
        <div class="g-container">
          <div class="g-first"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
          <div class="g-ball"></div>
        </div>
      </div>
      <div @click="startAnswer" class="start-btn" v-show="showStartBtn">
        {{ $t('text.startAnswering') }}
      </div>
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
          <div class="result-score-button">
            {{ $t('text.score') }}: {{ score ? score : 0 }}
          </div>
          <div class="result-score-button">
            {{ $t('text.accuracy') }}: {{ accuracy }}%
          </div>
          <div class="result-score-button">
            {{ $t('text.times') }}: {{ times }}s
          </div>
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
              {{ $t('text.CongratulationsYouChoice')
              }}{{ questionList[index].t_Explain }}
            </div>
            <div
              v-if="questionList[index].selected !== questionList[index].answer"
              class="result-answer-e"
            >
              {{ $t('text.YouChoseTheWrongOne')
              }}{{ questionList[index].t_Explain }}
            </div>
          </div>
        </div>
        <div class="result-score">
          <div class="result-score-button margin-bottom" @click="closePopup">
            {{ $t('text.close') }}
          </div>
          <div class="result-score-button margin-bottom" @click="oneMore">
            {{ $t('text.oneMore') }}
          </div>
        </div>
      </div>
    </div>
    <audio id="audio" ref="audio" src="../assets/audio/index_btn.mp3" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
    <audio
      id="audio1"
      ref="audio1"
      src="../assets/audio/choose_btn.mp3"
      preload
    >
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
    <audio id="audio2" ref="audio2" src="../assets/audio/warning.mp3" preload>
      对不起，您的浏览器不支持HTML5音频播放。
    </audio>
  </div>
</template>

<script>
import { getListThetopictable } from '../api/index'
import { getParameter } from '../utils/indexExtends'

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
  mounted() {
    this.url = window.localStorage.getItem('hash')
    this.url = this.url.substring(1)
    this.$i18n.locale = window.localStorage.getItem('langType')
    let _this = this
    setTimeout(() => {
      _this.loading = 'Loaded'
      _this.showStartBtn = true
    }, 2000)
  },
  data() {
    return {
      url: '',
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
      loading: 'Loading...',
      showStartBtn: false,
    }
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  },
  methods: {
    playAudioBtn() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/index_btn.mp3') //通过require引入音频
      this.$refs.audio.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio.play() //play()为播放函数
    },
    playAudioBtn1() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/choose_btn.mp3') //通过require引入音频
      this.$refs.audio1.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio1.play() //play()为播放函数
    },
    playAudioBtn2() {
      let music1 = new Audio() //建立一个music1对象
      music1 = require('../assets/audio/warning.mp3') //通过require引入音频
      this.$refs.audio2.src = music1 //此处的audio为代码ref="audio"中的audio
      this.$refs.audio2.play() //play()为播放函数
    },
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
        this.$message(`${e}` || this.$t('text.error'))
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
      this.playAudioBtn()
      this.showStartPopup = false
      if (this.TimeLimit === 'true') {
        this.startCountdown()
      }
    },
    oneMore() {
      this.playAudioBtn()
      this.showStartPopup = true
      this.loading = 'Loading...'

      let self = this
      this.showResultPopupClass = 'result-popup bounceOutRight animated'
      setTimeout(() => {
        self.showResultPopupClass = 'result-popup bounceInDown animated'
        self.showResultPopup = false
      }, 599)
      clearInterval(this.timerId)
      this.currentQuestion = []
      this.currentQuestionIndex = 0
      this.selectedOption = null
      this.showResult = false
      setTimeout(() => {
        self.loading = 'Loaded'
        self.showStartBtn = true
      }, 2000)
      this.TimeLimit = this.$route.query.limitTime
        ? this.$route.query.limitTime
        : false
      this.getTime = this.$route.query.time
      this.totalTime = this.$route.query.time
      this.titleId = this.$route.query.id
      this._getListTheopictable(this.titleId)

      this.score = 0
      this.accuracy = 0
      this.times = 0
      // let _this = this
      // setTimeout(() => {
      //   _this.$router.go(0)
      // }, 100)
      // location.reload(true)
      // setTimeout(() => {
      //   let limitTime = getParameter('limitTime')
      //   let time = getParameter('time')
      //   let id = getParameter('id')
      //   this.$router.push({
      //     path: this.url,
      //     query: {
      //       limitTime: limitTime,
      //       time: time,
      //       id: id,
      //     },
      //   })
      // }, 100)

      // .catch(error => {
      //   if (error.name !== 'NavigationDuplicated') {
      //     throw error
      // }
      // })
    },
    goBack() {
      this.playAudioBtn()
      let _this = this
      setTimeout(() => {
        _this.$router.push(`${this.url}`)
      }, 100)
    },
    startCountdown() {
      this.timerId = setInterval(() => {
        this.totalTime -= this.interval / 1000
        // 每30秒进行提醒
        if (this.totalTime % this.alertInterval === 0 && !this.isAlerted) {
          this.$toast(
            `${_this.$t('text.TheTime')} ${this.getTime - this.totalTime} s`,
          )
          this.isAlerted = true

          let count = 0
          let _this = this

          const interval = setInterval(() => {
            // 播放声音的代码
            _this.playAudioBtn2()
            count++
            if (count === 3) {
              clearInterval(interval)
            }
          }, 1000)
        } else if (this.totalTime % this.alertInterval !== 0) {
          this.isAlerted = false
        }

        if (this.totalTime < 0) {
          clearInterval(this.timerId)
          this.totalTime = 0
          this.$toast(this.$t('text.TimeOut'))
          this.accuracy = (
            (this.score / (this.questionList.length * 50)) *
            100
          ).toFixed(2)
          this.times = this.getTime
          this.showResultPopup = true
        }
      }, this.interval)
    },
    closePopup() {
      try {
        this.playAudioBtn()
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
      if (this.showResultPopup === true) return
      this.selectedOption = index
      this.playAudioBtn1()
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
        if (
          this.questionList[this.currentQuestionIndex].selected ===
          this.questionList[this.currentQuestionIndex].answer
        ) {
          this.score = this.score + 50
        }
        if (this.currentQuestionIndex + 1 === this.questionList.length) {
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
