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
          <div class="progress-bar-double1">
            <div
              v-for="i in questionList1.length"
              :key="i"
              :style="{ width: `calc(100% / ${questionList1.length})` }"
              :class="
                i < currentQuestionIndex1 + 1
                  ? 'done'
                  : i === currentQuestionIndex1 + 1
                  ? 'doing'
                  : ''
              "
            ></div>
          </div>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestion.t_content }}</div>
          <!-- <img src="../assets/cartoon/water.png" alt="" /> -->
          <div class="options">
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 0 ? 'active' : '') : ''"
              @touchstart="selectOption1(true, 0)"
            >
              {{ currentQuestion.t_Answer_A }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 1 ? 'active' : '') : ''"
              @touchstart="selectOption1(true, 1)"
            >
              {{ currentQuestion.t_Answer_B }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 2 ? 'active' : '') : ''"
              @touchstart="selectOption1(true, 2)"
            >
              {{ currentQuestion.t_Answer_C }}
            </div>
            <div
              class="option-l"
              :class="showResult ? (selectedOption1 === 3 ? 'active' : '') : ''"
              @touchstart="selectOption1(true, 3)"
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
          <div class="progress-bar-double2">
            <div
              v-for="i in questionList2.length"
              :key="i"
              :style="{ width: `calc(100% / ${questionList2.length})` }"
              :class="
                i < currentQuestionIndex2 + 1
                  ? 'done'
                  : i === currentQuestionIndex2 + 1
                  ? 'doing'
                  : ''
              "
            ></div>
          </div>
        </div>
        <!-- 倒计时 -->
        <div class="question">
          <div class="title">{{ currentQuestionss.t_content }}</div>
          <div class="options">
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 0 ? 'active' : '') : ''"
              @touchstart="selectOption2(false, 0)"
            >
              {{ currentQuestionss.t_Answer_A }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 1 ? 'active' : '') : ''"
              @touchstart="selectOption2(false, 1)"
            >
              {{ currentQuestionss.t_Answer_B }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 2 ? 'active' : '') : ''"
              @touchstart="selectOption2(false, 2)"
            >
              {{ currentQuestionss.t_Answer_C }}
            </div>
            <div
              class="option-r"
              :class="showResult ? (selectedOption2 === 3 ? 'active' : '') : ''"
              @touchstart="selectOption2(false, 3)"
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
            <div class="result-score-button">
              {{ $t('text.score') }}: {{ score1 ? score1 : 0 }}
            </div>
            <div class="circle1"></div>
          </div>
          <div class="double-score">
            <div class="result-score-button">
              {{ $t('text.score') }}: {{ score2 ? score2 : 0 }}
            </div>
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
            {{ $t('text.correctAnswer')
            }}{{
              questionList1[index].t_Answer + questionList1[index].t_Explain
            }}
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
// import ProgressBar from '../components/ProgressBar.vue'
import { getListThetopictable } from '../api/index'
import { getParameter } from '../utils/indexExtends'

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
      url: '',
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
      totalTime: null,
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
      loading: 'Loading...',
      showStartBtn: false,
      leftOver: false,
      rightOver: false,
    }
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
    this.$el.addEventListener('contextmenu', this.handleContextMenu)

    let _this = this
    setTimeout(() => {
      _this.loading = 'Loaded'
      _this.showStartBtn = true
    }, 2000)
  },
  destroyed() {
    this.$el.removeEventListener('contextmenu', this.handleContextMenu)
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
    handleContextMenu(event) {
      event.preventDefault()
    },
    //获取选中当前题库下的题目列表
    async _getListTheopictable(id) {
      try {
        const answerMap = ['A', 'B', 'C', 'D']
        const res = await getListThetopictable(id)
        res.forEach((obj, i) => {
          obj.selected = null
          obj.index = i
          answerMap.forEach((item, index) => {
            if (obj.t_Answer === item) {
              obj.answer = index
            }
          })
        })
        this.questionList1 = res
        let myArray = res
        this.currentQuestion = this.questionList1[this.currentQuestionIndex1]
        //222222
        // 使用sort方法将myArray随机排序
        let shuffledArray = [...myArray].sort(() => Math.random() - 0.5)
        // 使用slice方法将shuffledArray的副本赋值给newArray
        this.questionList2 = shuffledArray.slice()
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
      this.playAudioBtn()
      this.showStartPopup = false
      if (this.TimeLimit === 'true') {
        this.startCountdown()
      }
    },
    oneMore() {
      console.log(this.leftOver, '123123', this.rightOver)
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
      this.currentQuestionss = []
      this.currentQuestionIndex1 = 0
      this.currentQuestionIndex2 = 0
      this.leftOver = false
      this.rightOver = false
      this.oneDone1 = false
      this.oneDone2 = false

      this.selected = Object.assign({}, { left: [], right: [] })

      this.selectedOption1 = null
      this.selectedOption2 = null

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

      this.score1 = 0
      this.accuracy1 = 0
      this.times1 = 0
      this.score2 = 0
      this.accuracy2 = 0
      this.times2 = 0

      // let _this = this
      // setTimeout(() => {
      //   _this.$router.go(0)
      // }, 100)

      // location.reload(true)
      // let limitTime = getParameter('limitTime')
      // let time = getParameter('time')
      // let id = getParameter('id')
      // this.$router
      //   .push({
      //     path: '/doubleCategory',
      //     query: {
      //       limitTime: limitTime,
      //       time: time,
      //       id: id,
      //     },
      //   })
      //   .catch(error => {
      //     if (error.name !== 'NavigationDuplicated') {
      //       throw error
      //     }
      //   })
    },
    goBack() {
      this.playAudioBtn()
      let _this = this
      setTimeout(() => {
        _this.$router.push(`${this.url}`)
      }, 100)
    },
    startCountdown() {
      let _this = this
      this.timerId = setInterval(() => {
        _this.totalTime -= _this.interval / 1000
        // 每30秒进行提醒
        if (_this.totalTime % _this.alertInterval === 0 && !_this.isAlerted) {
          _this.$toast(
            `${_this.$t('text.TheTime')} ${_this.getTime - _this.totalTime} s`,
          )
          _this.isAlerted = true
          let count = 0
          const interval = setInterval(() => {
            // 播放声音的代码
            _this.playAudioBtn2()
            count++
            if (count === 3) {
              clearInterval(interval)
            }
          }, 1000)
        } else if (_this.totalTime % _this.alertInterval !== 0) {
          _this.isAlerted = false
        }

        if (_this.totalTime < 0) {
          clearInterval(_this.timerId)
          _this.totalTime = 0
          _this.$toast(this.$t('text.TimeOut'))
          // if (!_this.leftOver) {
          //   _this.questionList1.forEach((item, index) => {
          //     if (item.selected === item.answer) {
          //       _this.score1 = _this.score1 + 50
          //     }
          //   })
          // }
          // if (!_this.rightOver) {
          //   _this.questionList2.forEach((item, index) => {
          //     if (item.selected === item.answer) {
          //       _this.score2 = _this.score2 + 50
          //     }
          //   })
          // }
          _this.showResultPopup = true
        }
      }, this.interval)
    },
    //左选择
    async selectOption1(type, index) {
      if (this.leftOver || this.showResultPopup) {
        return
      }
      this.playAudioBtn1()
      if (this.showResult === true) return
      this.selectedOption1 = index
      await this.nextQuestion(type)
    },
    //右选择
    async selectOption2(type, index) {
      if (this.rightOver || this.showResultPopup) {
        return
      }
      this.playAudioBtn1()
      if (this.showResult === true) return
      this.selectedOption2 = index
      await this.nextQuestion(type)
    },
    nextQuestion(flag) {
      try {
        console.log(this.leftOver, '00000000', this.rightOver)

        let self = this
        if (flag) {
          //左边

          if (this.selectedOption1 === null) {
            this.showToast1 = true
            setTimeout(() => {
              self.showToast1 = false
            }, 599)
            return
          }
          this.questionList1[this.currentQuestionIndex1].selected =
            this.selectedOption1
          //左边加分
          if (
            this.questionList1[this.currentQuestionIndex1].selected ===
            this.questionList1[this.currentQuestionIndex1].answer
          ) {
            this.score1 = this.score1 + 50
          }
          this.selected.left.push(this.selectedOption1)
          // this.questionList1.forEach((item, index) => {
          //   if (item.selected === item.answer) {
          //     this.score1 = this.score1 + 50
          //   }
          // })
          //答完
          if (this.currentQuestionIndex1 + 1 === this.questionList1.length) {
            this.leftOver = true

            // this.accuracy1 = (
            //   (this.score1 / (this.questionList1.length * 50)) *
            //   100
            // ).toFixed(2)
            this.times2 && clearInterval(this.timerId)
            // this.times1 = this.getTime - this.totalTime
            if (this.oneDone2) {
              this.showResultPopup = true
            } else {
              this.oneDone1 = true
            }
          } else {
            //答题中

            this.currentQuestionIndex1++
            this.currentQuestion =
              this.questionList1[this.currentQuestionIndex1]

            this.selectedOption1 = null
            this.showResult = false
          }
        } else {
          //右边

          if (this.selectedOption2 === null) {
            this.showToast2 = true
            setTimeout(() => {
              self.showToast2 = false
            }, 599)
            return
          }
          this.questionList2[this.currentQuestionIndex2].selected =
            this.selectedOption2

          //右边加分
          if (
            this.questionList2[this.currentQuestionIndex2].selected ===
            this.questionList2[this.currentQuestionIndex2].answer
          ) {
            this.score2 = this.score2 + 50
          }
          // this.selected.right.push(this.selectedOption2)
          this.selected.right[
            this.questionList2[this.currentQuestionIndex2].index
          ] = this.selectedOption2
          //答完
          if (this.currentQuestionIndex2 + 1 === this.questionList2.length) {
            this.rightOver = true

            // this.questionList2.forEach((item, index) => {
            //   if (item.selected === item.answer) {
            //     this.score2 = this.score2 + 50
            //   }
            // })
            // this.accuracy2 = (
            //   (this.score2 / (this.questionList2.length * 50)) *
            //   100
            // ).toFixed(2)
            this.times1 && clearInterval(this.timerId)
            // this.times2 = this.getTime - this.totalTime
            if (this.oneDone1) {
              this.showResultPopup = true
            } else {
              this.oneDone2 = true
            }
          } else {
            //答题中

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

    //数组乱序1
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    // 数组乱序方法
    shuffleArray1(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    // 数组复原方法
    restoreArray(arr, originalArr) {
      for (let i = 0; i < arr.length; i++) {
        Object.assign(arr[i], originalArr[i])
      }
      return arr
    },
    // 数组顺序改回初始顺序的方法
    restoreArrayOrder(arr, originalArr) {
      const restoredArr = []
      for (let i = 0; i < originalArr.length; i++) {
        const originalObj = originalArr[i]
        const index = arr.findIndex(obj => obj === originalObj)
        restoredArr[i] = arr[index]
        arr.splice(index, 1)
      }
      return restoredArr
    },
  },
}
</script>

<style scoped lang="scss">
@import './double.scss';
</style>
