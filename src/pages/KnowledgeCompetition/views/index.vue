<template>
  <div class="home" :style="backgroundDiv">
    <!-- <div class="title">知识答题竞赛</div> -->
    <div class="container">
      <p class="a">The world's best</p>
      <p class="b">Knowledge</p>
      <p class="a">Contest</p>
    </div>
    <!-- 模式 -->
    <div class="category">
      <div class="b category-single">单人模式</div>
      <div class="a category-double">双人模式</div>
    </div>
    <!-- 旁边栏目 -->
    <div class="sidebar">
      <div class="sidebar-hint" @click="ViewInstructions"></div>
      <div class="sidebar-star"></div>
      <div class="sidebar-ranking"></div>
      <div class="sidebar-setting"></div>
    </div>
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
  </div>
</template>

<script>
export default {
  name: 'Home',
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

      showHintPopup: false,
      showHintPopupClass: 'hint-popup bounceInDown animated',
    }
  },
  mounted() {},
  methods: {
    ViewInstructions() {
      this.showHintPopup = true
    },
    closePopup() {
      try {
        let self = this
        this.showHintPopupClass = 'hint-popup bounceOutRight animated'
        setTimeout(() => {
          self.showHintPopupClass = 'hint-popup bounceInDown animated'
          self.showHintPopup = false
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
