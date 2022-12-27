<template>
  <div class="home">
    <div class="header">
      <img src="../../assets/extract.png" class="icon" alt="" />
      <h1>抽签帮手</h1>
    </div>
    <div class="contain">
      <van-tabs v-model="activity" swipeable>
        <van-tab title="分组">
          <div class="tab-card">
            <div>输入总人数及分配方式，系统随机给各个小伙伴随机分配小组</div>
            <div class="tab-card">
              <div class="title">随机分配小组</div>
              <div>
                <van-form @submit="onSubmit">
                  <van-field
                    v-model="number"
                    name="总人数"
                    label="总人数"
                    placeholder="请输入总人数"
                  />
                  <!-- <van-cell-group>
                  <van-switch-cell
                    v-model="checked"
                    @change="change"
                    title="是否所有人参与"
                  />
                </van-cell-group> -->
                  <!-- <van-field
                  v-model="numberPar"
                  :class="checked && 'number-Participants'"
                  :disabled="checked"
                  name="参与人数"
                  label="参与人数"
                  placeholder="请输入参与人数"
                /> -->
                  <van-radio-group v-model="radio">
                    <van-cell-group>
                      <van-cell
                        title="按组数分"
                        clickable
                        @click="changeRadio('1')"
                      >
                        <template #right-icon>
                          <van-radio name="1" />
                        </template>
                      </van-cell>
                      <van-cell
                        title="按人数分"
                        clickable
                        @click="changeRadio('2')"
                      >
                        <template #right-icon>
                          <van-radio name="2" />
                        </template>
                      </van-cell>
                    </van-cell-group>
                  </van-radio-group>
                  <van-field
                    v-model="groupNumber"
                    :class="radio === '1' && 'number-Participants'"
                    name="每组人数"
                    label="每组人数"
                    placeholder="请输入每组人数"
                    :disabled="radio === '1'"
                  />
                  <van-field
                    v-model="groups"
                    :class="radio === '2' && 'number-Participants'"
                    name="分组数量"
                    label="分组数量"
                    placeholder="请输入分组数量"
                    :disabled="radio === '2'"
                  />
                  <div class="group-box" v-if="groupArray.length">
                    <div
                      class="group-box_item"
                      v-for="(item, index) in groupArray"
                      :key="index"
                    >
                      小组{{ index + 1 + ':&nbsp;&nbsp;' + item }}
                    </div>
                  </div>
                  <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit">
                      {{ btnText }}
                    </van-button>
                  </div>
                </van-form>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="分工">
          <div class="tab-card">
            <div>
              输入主题、各项任务及人数，如：打扫卫生；系统随机分配给各个小伙伴任务
            </div>
            <div class="tab-card">
              <div class="title">随机派发任务</div>
              <div>
                <van-form @submit="onSubmitTask">
                  <van-field
                    v-model="taskNumber"
                    name="参与人数/组数"
                    label="参与人数/组数"
                    placeholder="请输入人数/组数"
                  />
                  <van-cell-group>
                    <van-switch-cell
                      v-model="taskChecked"
                      @change="change"
                      title="是否重复派发任务"
                    />
                  </van-cell-group>
                  <van-field
                    v-model="taskName"
                    name="添加任务名"
                    label="添加任务名"
                    placeholder="请输入任务名"
                  />
                  <div class="add-box">
                    <div class="add-task" @click="addTask">添加</div>
                  </div>
                  <div class="group-box" v-if="taskNameLists.length">
                    <div
                      class="group-box_item"
                      v-for="(item, index) in taskNameLists"
                      :key="index"
                    >
                      任务{{ index + 1 + ':&nbsp;&nbsp;&nbsp;' + item }}
                    </div>
                  </div>
                  <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit">
                      提交
                    </van-button>
                  </div>
                </van-form>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="随机抽取汇报回答表演人选">
          <div class="tab-card">内容随机分配汇报回答表演人选</div>
        </van-tab>
        <van-tab title="自定义抽取">
          <div class="tab-card">内容自定义抽取</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      btnText: '提交',
      groupArray: [],
      activity: null,
      number: null,
      groups: null,
      checked: true,
      radio: '1',
      numberPar: null,
      groupNumber: null,
      taskNumber: null,
      taskChecked: false,
      taskName: null,
      taskNameLists: [],
      listTags: [
        '随机分配小组',
        '随机分配任务',
        '随机分配汇报回答表演人选',
        '自定义抽取',
      ],
    }
  },
  mounted() {},
  methods: {
    change() {
      console.log(this.checked)
    },
    //提交生成随机小组
    onSubmit() {
      if (!this.number) {
        this.$toast('请输入总人数...')
        return
      }
      //随机数组
      let totalNumber = []
      totalNumber = this.randomArray(this.number)
      //按组数分组
      if (this.radio === '1') {
        if (!this.groups) {
          this.$toast('请输入分组数量...')
          return
        }
        let num = null
        let arr = []
        num = Math.floor(this.number / this.groups)
        arr = this.splitGroup(totalNumber, num)
        this.groupArray = arr
        if (this.number % this.groups !== 0) {
          arr[this.groups].forEach((r, i) => {
            // r.push(arr[num][i])
            this.groupArray[i].push(r)
            this.groupArray.length = this.groups
          })
        }
        //按人数分组
      } else if (this.radio === '2') {
        if (!this.groupNumber) {
          this.$toast('请输入每组人数...')
          return
        }
        this.groupArray = this.splitGroup(totalNumber, this.groupNumber)
      }
    },
    //切换分组模式
    changeRadio(e) {
      this.radio = e
      if (this.radio === '1') {
        this.groupNumber = null
      } else if (this.radio === '2') {
        this.groups = null
      }
    },
    //随机生成乱序数组
    randomArray(length) {
      let i = 0
      let index = 0
      let temp = null
      let arr = [length]
      length = typeof length === 'undefined' ? 9 : length
      for (i = 1; i <= length; i++) {
        arr[i - 1] = i
      }
      for (i = 1; i <= length; i++) {
        index = window.parseInt(Math.random() * (length - i)) + i
        if (index != i) {
          temp = arr[i - 1]
          arr[i - 1] = arr[index - 1]
          arr[index - 1] = temp
        }
      }
      return arr
    },
    //切割数组
    splitGroup(array, size) {
      let result = []
      let group = arr => {
        let list = arr.slice(0, size)
        let rest = arr.slice(size, arr.length)
        result.push(list)
        if (arr.length <= size) {
          return result
        } else {
          return group(rest)
        }
      }
      return group(array)
      // let newArray = []
      // for (let i = 0; i < Math.ceil(array.length / size); i++) {
      //   let start = i * size
      //   let end = start + size
      //   newArray.push(array.slice(start, end))
      // }
      // return newArray
    },
    //随机派发任务
    onSubmitTask() {
      console.log(this.taskName)
    },
    addTask() {
      if (!this.taskName) {
        this.$toast('请输入任务名...')
        return
      }
      this.taskNameLists.push(this.taskName)
    },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
