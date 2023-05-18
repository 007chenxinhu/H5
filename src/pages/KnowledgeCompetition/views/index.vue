<template>
  <div class="home" :style="backgroundDiv">
    <!-- <div class="title">知识答题竞赛</div> -->
    <div class="content">
      <div class="container">
        <p class="a">The world's best</p>
        <p class="b">Knowledge</p>
        <p class="a">Contest</p>
      </div>
      <!-- 模式 -->
      <div class="category">
        <div class="b category-single" @click="singleCategory">单人模式</div>
        <div class="a category-double" @click="doubleCategory">双人模式</div>
      </div>
    </div>
    <div class="btn-back" v-if="isPreview" @click="GoManagement">
      返回题库管理系统
    </div>
    <!-- 旁边栏目 -->
    <div class="sidebar">
      <!-- 提示说明 -->
      <div class="sidebar-hint" @click="ViewInstructions"></div>
      <!-- star支持 -->
      <div class="sidebar-star"></div>
      <!-- 历史排行 -->
      <div class="sidebar-ranking"></div>
      <!-- 设置 -->
      <div class="sidebar-setting" @click="Setting"></div>
    </div>
    <!-- 提示说明 -->
    <div :class="showHintPopupClass" v-show="showHintPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="hint-text">答题模式：单人答题模式和双人竞赛答题模式。</div>
      <div class="hint-text">
        概述：世界之最知识选项答题是一款考验学生知识广度和深度的游戏。游戏分为单人答题模式和双人答题模式，学生需要在规定的时间内回答尽可能多的问题，获得尽可能高的得分。
      </div>
      <div class="hint-text">
        时间提示：在单人答题模式下，游戏开始后，每隔30秒会有一个时间提示。在双人答题模式下，每轮回合开始前会有一个时间提示，每个回合时长为1分钟。
      </div>
      <div class="hint-text">
        题目类型：涵盖世界各个领域的知识，包括但不限于科学、历史、文化、地理等。
      </div>
      <div class="hint-text">
        游戏细节： 游戏中，学生无法修改已提交的答案。
        在双人答题模式下，学生需要尊重对手，不能使用不公平或不正当的手段干扰对手。
        游戏结束后，系统将公布学生的得分排名，单人模式可记录历史最高得分。
        未开始答题时可手动刷新题库，限制3次。
      </div>
    </div>
    <!-- 设置 -->
    <div :class="showSettingPopupClass" v-show="showSettingPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="setting-title">设置</div>
      <div class="setting-intro">
        设置题目类型、范围，做题时间限制，是否开启时间提醒
      </div>
      <div class="setting-TopicType">
        <h2 class="setting-TopicType-title">题目类型:</h2>
        <div class="options">
          <label v-for="(option, index) in options" :key="index" class="option">
            <input
              type="checkbox"
              :id="`option-${index}`"
              :value="option"
              v-model="selectedOptions"
              class="checkbox"
            />
            <span class="checkmark"></span>
            <span class="option-label">{{ option }}</span>
          </label>
        </div>
        <div class="teeth">
          <Teeth></Teeth>
        </div>
        <button class="ger-personal-topic" @click="gerPersonalTopic">
          获取自定义题库
        </button>
        <div v-show="showInputPassward">
          <input type="text" placeholder="输入你的个人id" />
          <button>获取</button>
        </div>
        <button @click="submit" class="submit-button">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Teeth from '../components/teeth.vue'
import { getHashSearchParam } from '../utils/tools'

export default {
  name: 'Home',
  components: {
    Teeth,
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
      options: ['综合', '历史', '地理', '数学', '物理', '化学'],
      selectedOptions: [],
      showHintPopup: false,
      showHintPopupClass: 'hint-popup bounceInDown animated',
      showSettingPopup: false,
      showSettingPopupClass: 'hint-popup bounceInDown animated',
      showInputPassward: false,
      isPreview: false,
    }
  },
  mounted() {
    if (this.$route.query.type === 'single') {
      this.showSettingPopup = true
    }
    console.log(getHashSearchParam('Preview'))
    this.isPreview = getHashSearchParam('Preview') || false
  },
  methods: {
    GoManagement() {
      this.$router.push('/management')
    },
    singleCategory() {
      this.$router.push('/singleCategory')
    },
    doubleCategory() {
      this.$router.push('/doubleCategory')
    },
    gerPersonalTopic() {
      this.showInputPassward = true
    },
    submit() {
      // 处理提交逻辑
      console.log(this.selectedOptions)
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
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
