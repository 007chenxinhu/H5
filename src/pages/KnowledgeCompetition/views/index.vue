<template>
  <div class="home">
    <div class="home_square">
      <img src="../assets/images/home_square.png" class="home_square_img" />
    </div>
    <div class="content">
      <div class="container">
        <!-- <p class="a">The world's best</p>
        <p class="b">Knowledge</p>
        <p class="a">Contest</p> -->
        <img src="../assets/images/home_title.png" class="home_title" />
      </div>
      <!-- 模式 -->
      <div class="category">
        <div class="category-single pulse animated" @click="singleCategory">
          {{ $t('text.singleTitle') }}
        </div>
        <div class="category-double pulse animated" @click="doubleCategory">
          {{ $t('text.doubleTitle') }}
        </div>
      </div>
    </div>
    <div class="btn-back" v-if="isPreview" @click="GoManagement">
      {{ $t('text.backToManagementSystem') }}
    </div>
    <!-- 旁边栏目 -->
    <div class="sidebar">
      <!-- 提示说明 -->
      <div class="sidebar-hint" @click="ViewInstructions"></div>
      <!-- star支持 -->
      <!-- <div class="sidebar-star"></div> -->
      <!-- 历史排行 -->
      <!-- <div class="sidebar-ranking"></div> -->
      <!-- 设置 -->
      <div class="sidebar-setting" @click="Setting"></div>
    </div>
    <!-- 提示说明 -->
    <div :class="showHintPopupClass" v-show="showHintPopup">
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="hint-title">
        {{ $t('text.hintText') }}
      </div>
      <div class="hint-text">答题模式：单人答题模式和双人竞赛答题模式。</div>
      <div class="hint-text">
        概述：世界之最知识选项答题是一款考验学生知识广度和深度的游戏。游戏分为单人答题模式和双人答题模式，
        学生需要在规定的时间内回答尽可能多的问题，获得尽可能高的得分。
      </div>
      <div class="hint-text">
        时间提示：在单人答题模式下，游戏开始后，每隔30秒会有一个时间提示。在双人答题模式下，
        每轮回合开始前会有一个时间提示，每个回合时长为1分钟。
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
    <div
      :class="showSettingPopupClass"
      @click="clickPop"
      v-show="showSettingPopup"
    >
      <div class="closeWrapper" @click="closePopup">
        <van-icon name="cross" />
      </div>
      <div class="hint-title">
        {{ $t('text.setting') }}
      </div>
      <!-- <div class="setting-intro">
        设置题目类型、范围，做题时间限制，是否开启时间提醒
      </div> -->
      <div class="setting-TopicType">
        <h2 class="setting-TopicType-title">{{ $t('text.chooseSubject') }}:</h2>
        <div class="options">
          <div class="choose-subject">
            <ul>
              <li
                :class="showTitleList === i ? 'li-item-choose' : 'li-item'"
                v-for="(subject, i) in subjectList"
                :key="subject.val"
                @click="chooseSubject(subject.val, i)"
              >
                {{ subject.label }}
              </li>
            </ul>
          </div>
          <div class="choose-title">
            <ul>
              <li
                :class="
                  showChooseTitle === index ? 'li-item-choose' : 'li-item'
                "
                v-for="(title, index) in titleList"
                :key="title.val"
                @click="clickTitle(title.val, index)"
              >
                {{ title.label }}
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="teeth">
          <Teeth></Teeth>
        </div> -->
        <div class="limit_time_title">{{ $t('text.timingSetting') }}</div>
        <div class="limit_time">
          <div class="limit_time_enable">
            <div class="limit_time_choose_img" @click="handleLimitTime(true)">
              <img
                class="limit_time_img"
                :src="
                  limitTime
                    ? require('../assets/images/setting_btn_selected.png')
                    : require('../assets/images/setting_btn_normal.png')
                "
              />
            </div>
            <div class="limit_time_text">{{ $t('text.openTimer') }}</div>
            <div class="limit_time_choose">
              <div class="limit_time_time">{{ time }}s</div>
              <div class="limit_time_icon"></div>
              <div class="choose_box" v-show="showChooseBox">
                <div class="limit_time_choose_box">
                  <div
                    class="limit_time_choose_list"
                    v-for="(item, index) in selectTime"
                    :key="index"
                    @click="chooseLimitTime(index)"
                  >
                    {{ item }}s
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="limit_time_enable">
            <div class="limit_time_choose_img" @click="handleLimitTime(false)">
              <img
                class="limit_time_img"
                :src="
                  limitTime
                    ? require('../assets/images/setting_btn_normal.png')
                    : require('../assets/images/setting_btn_selected.png')
                "
                alt=""
              />
            </div>
            <div class="limit_time_text">{{ $t('text.disableTiming') }}</div>
          </div>
        </div>
      </div>
      <div class="get-personal">
        <input
          type="password"
          class="get-personal-topic"
          max="6"
          v-model="paw"
          :placeholder="$t('text.personalPassword')"
        />
        <div class="search_icon" @click="gerPersonalTopic">
          <img
            class="setting_btn_magnifier"
            src="../assets/images/setting_btn_magnifier.png"
          />
        </div>
      </div>
      <button @click="submit" class="submit-button">
        {{ $t('text.submitButton') }}
      </button>
    </div>
  </div>
</template>

<script>
// import Teeth from '../components/teeth.vue'
import { getParameter } from '../utils/indexExtends'

import { listSubject, getListTitle, personalQuery } from '../api/index'

export default {
  name: 'Home',
  data() {
    return {
      // randomNumberBg: require('../assets/bg' +
      //   parseInt(Math.random() * 13 + 1) +
      //   '.png'),
      // backgroundDiv: {
      //   backgroundImage:
      //     'url(' +
      //     require(`../assets/bg${parseInt(Math.random() * 13 + 1)}.png`),
      // },
      time: 360,
      selectTime: [
        40, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190,
        200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330,
        340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
        480, 490, 500, 510, 520, 530, 540,
      ],
      selectedOptions: [],
      showHintPopup: false,
      showHintPopupClass: 'hint-popup bounceInDown animated',
      showSettingPopup: false,
      showSettingPopupClass: 'hint-popup bounceInDown animated',
      showInputPassword: false,
      isPreview: false,
      showChooseBox: false,
      subjectList: null,
      firstSub: null,
      titleList: null,
      chooseTitle: null,
      showTitleList: 0,
      titleId: null,
      showChooseTitle: 0,
      activeTollId: '',
      limitTime: true,
      personalTitleList: [],
      paw: '',
      preUrl: '',
      lang: 'en',
    }
  },
  async mounted() {
    if (this.$route.query.type === 'single') {
      this.showSettingPopup = true
    }
    this.isPreview = getParameter('Preview') || false

    await this._listSubject()
    await this._getNewsList()
    const langTypeMap = {
      zh: 'zh-CN',
      en: 'en-US',
    }
    this.lang = getParameter('language') || 'en'
    // if (this.$i18n) {
    //   this.$i18n.locale = langTypeMap[this.lang]
    // }
    window.localStorage.setItem('langType', langTypeMap[this.lang])
    window.localStorage.setItem('hash', window.location.hash)
  },
  methods: {
    //获取个人题库
    async gerPersonalTopic() {
      try {
        if (!this.paw) {
          this.$message('请先输入密码！')
          return
        }
        if (this.paw.length !== 6) {
          this.$message('请输入6位密码！')
          return
        }
        let subject = {
          label: '',
          val: '',
        }
        const res = await personalQuery(this.paw)
        subject = res.map(item => {
          return {
            label: item.t_title,
            val: item.t_FatherlevelID,
          }
        })
        //个人题库
        subject.map(item => {
          this.personalTitleList.push(item)
        })
        this.subjectList.push({
          label: '个人题库',
          val: 'fff',
        })
        this.$message({
          message: '获取成功！',
          type: 'success',
        })
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    handleLimitTime(e) {
      this.limitTime = e
    },
    chooseLimitTime(e) {
      this.time = this.selectTime[e]
      this.showChooseBox = false
    },
    clickPop(e) {
      if (this.showChooseBox) {
        if (e.target.className !== 'limit_time_choose_list') {
          this.showChooseBox = false
        }
      } else {
        if (
          e.target.className === 'limit_time_choose' ||
          e.target.className === 'limit_time_time' ||
          e.target.className === 'limit_time_icon'
        ) {
          this.showChooseBox = true
        }
      }
    },
    // handleChooseBox() {
    //   this.showChooseBox = true
    //   console.log(1, this.showChooseBox)
    // },
    //点击科目
    chooseSubject(id, index) {
      try {
        if (id === 'fff') {
          this.titleList = []
          this.personalTitleList.map(item => {
            this.titleList.push(item)
          })
          this.titleId = this.titleList[0].val
          this.showTitleList = index
          // this._getListTheopictable(this.titleId)
        } else {
          this._getNewsList(id, index)
        }
      } catch (error) {
        this.$message(`${error}` || '发生错误')
      }
    },
    //点击科目下的题库
    clickTitle(id, index) {
      this.showChooseTitle = index
      this.titleId = id
      // this._getListTheopictable(id)
    },
    // 查询科目列表
    async _listSubject() {
      try {
        let subject = {
          label: '',
          val: '',
        }
        let arr = null
        const res = await listSubject()
        subject = res.map(item => {
          return {
            label: item.name,
            val: item.id,
          }
        })
        subject.map((item, index) => {
          if (item.val === 5) {
            arr = {
              label: '世界之最',
              val: item.val,
            }
            subject.splice(index, 1)
          }
        })
        subject.unshift(arr)
        this.subjectList = subject
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    // 查询科目下题目标题列表
    async _getNewsList(id, index) {
      try {
        let title = {
          label: '',
          val: '',
        }
        let params = id ? id : this.subjectList[0].val
        this.chooseSub = params
        const res = await getListTitle(params)
        if (res.length !== 0) {
          this.showTitleList = index ? index : 0
          title = res.map(item => {
            return {
              label: item.t_title,
              val: item.t_FatherlevelID,
            }
          })
          this.titleId = title[0].val
          this.titleList = title
        } else {
          this.titleList = []
        }
      } catch (e) {
        this.$message(`${e}` || '发生错误')
      }
    },
    GoManagement() {
      let url = ''
      url = window.localStorage.getItem('myManagement')
      url = url.substring(1)
      this.$router.push(`${url}`)
      window.localStorage.removeItem('myManagement')
    },
    singleCategory() {
      this.$router.push({
        path: '/singleCategory',
        query: {
          limitTime: this.limitTime,
          time: this.time,
          id: this.titleId,
        },
      })
    },
    doubleCategory() {
      this.$router.push({
        path: '/doubleCategory',
        query: {
          limitTime: this.limitTime,
          time: this.time,
          id: this.titleId,
        },
      })
    },
    // gerPersonalTopic() {
    //   this.showInputPassword = true
    // },
    submit() {
      // 处理提交逻辑
      this.closePopup()
    },
    Setting() {
      try {
        if (this.showHintPopup) {
          this.showHintPopup = false
        }
        this._listSubject()

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
      if (this.showSettingPopup) {
        this.showSettingPopup = false
      }
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
