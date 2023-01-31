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
            <div class="title-hint">
              输入总人数及分配方式，系统随机给各个小伙伴随机分配小组
            </div>
            <div class="tab-card">
              <div class="title">随机分配小组</div>
              <div>
                <van-form>
                  <van-field
                    v-model="number"
                    name="总人数"
                    label="总人数"
                    placeholder="请输入总人数"
                  />
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
                  <van-popup close-on-click-overlay="false" v-model="showPopup">
                    <div class="group-box">
                      <div
                        class="group-box_item"
                        v-for="(item, index) in groupArray"
                        :key="index"
                      >
                        小组{{ index + 1 + ':&nbsp;&nbsp;' + item }}
                      </div>
                    </div>
                  </van-popup>
                  <!-- <div class="group-box" v-if="groupArray.length">
                    <div
                      class="group-box_item"
                      v-for="(item, index) in groupArray"
                      :key="index"
                    >
                      小组{{ index + 1 + ':&nbsp;&nbsp;' + item }}
                    </div>
                  </div> -->
                  <div style="margin: 16px">
                    <van-button round block type="info" @click="onSubmit">
                      {{ btnText }}
                    </van-button>
                    <van-button
                      style="margin-top: 0.2rem"
                      round
                      block
                      type="warning"
                      @click="reSet(1)"
                    >
                      重制
                    </van-button>
                  </div>
                </van-form>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="分工">
          <div class="tab-card">
            <div class="title-hint">
              输入主题、各项任务及人数，如：打扫卫生、擦黑板；系统随机分配给各个小伙伴任务
            </div>
            <div class="tab-card">
              <div class="title">随机派发任务</div>
              <div>
                <van-form>
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
                  <div class="group-box" v-if="taskNameLists.length > 0">
                    <div
                      class="group-box_item"
                      v-for="(item, index) in taskNameLists"
                      :key="index"
                    >
                      任务{{ index + 1 + ':&nbsp;&nbsp;&nbsp;' + item }}
                    </div>
                    <div>
                      <div
                        class="group-box_item"
                        v-for="(item, index) in targetTaskList"
                        :key="index"
                      >
                        成员/小组{{
                          index +
                          1 +
                          '&nbsp;&nbsp;=>&nbsp;&nbsp;' +
                          (item ? item : '')
                        }}
                      </div>
                    </div>
                  </div>
                  <div style="margin: 16px">
                    <van-button round block type="info" @click="onSubmitTask">
                      提交
                    </van-button>
                    <van-button
                      style="margin-top: 0.2rem"
                      round
                      block
                      type="warning"
                      @click="reSet(2)"
                    >
                      重制
                    </van-button>
                  </div>
                </van-form>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="选号">
          <div class="tab-card">
            <div class="title-hint">
              输入最小号码和最大号码，随机抽取一个号码
            </div>
            <div class="tab-card">
              <div class="title">随机抽取汇报回答表演人选</div>
              <div class="showNumber-box">
                <template v-if="!showNumber">
                  <span
                    class="showNumber"
                    v-for="item in textNumber"
                    :key="item"
                  >
                    {{ item }}
                  </span>
                </template>
                <template v-if="showNumber">
                  <span class="showNumber"> 请点击开始 </span>
                </template>
              </div>
              <div class="change-quantity">
                选择抽取号码数量
                <div
                  :class="
                    changeQuantity === item ? 'quantity live' : 'quantity'
                  "
                  v-for="item in quantityArr"
                  :key="item"
                  @click="liveQuantity(item)"
                >
                  {{ item }}
                </div>
              </div>
              <van-field
                v-model="min"
                name="最小值"
                label="最小值"
                placeholder="请输入最小值"
              />
              <van-field
                v-model="max"
                name="最大值"
                label="最大值"
                placeholder="请输入最大值"
              />
              <van-button round block type="info" @click="getLimitNumber">
                {{ beginBtn }}
              </van-button>
            </div>
          </div>
        </van-tab>
        <!-- <van-tab title="自定义抽取">
          <div class="tab-card">自定义抽签</div>
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      showPopup: false,
      quantity: '01',
      quantityArr: ['01', '02', '05', '10'],
      textNumber: [null],
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
      targetTaskList: [],
      listTags: [
        '随机分配小组',
        '随机分配任务',
        '随机分配汇报回答表演人选',
        '自定义抽取',
      ],
      min: 1,
      max: 100,
      beginBtn: '点击开始',
      flag: true,
      timer: null,
      changeQuantity: '01',
      length: 1,
      showNumber: true,
    }
  },
  mounted() {},
  methods: {
    liveQuantity(e) {
      clearInterval(this.timer)
      switch (e) {
        case '01':
          this.textNumber = [null]
          break
        case '02':
          this.textNumber = [null, null]
          break
        case '05':
          this.textNumber = [null, null, null, null, null]
          break
        case '10':
          this.textNumber = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]
          break
        default:
          break
      }
      this.changeQuantity = e
      this.showNumber = true
    },
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
      this.showPopup = true
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
    // 输入长度
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
    //输入数组，随机生成乱序数组
    ranSort(arr) {
      let newArr = []
      while (arr.length > 0) {
        let ranIndex = Math.floor(Math.random() * arr.length)
        newArr.push(arr[ranIndex])
        arr.splice(ranIndex, 1)
      }
      return newArr
    },

    //随机派发任务
    onSubmitTask() {
      if (!this.taskNumber) {
        this.$toast('请输入参与人数/组数...')
        return
      }
      if (!this.taskNameLists.length) {
        this.$toast('请输入任务...')
        return
      }
      if (this.targetTaskList.length > 0) {
        this.targetTaskList = []
      }
      //目标数组的长度就是参与人数的长度
      // this.targetTaskList.length = this.taskNumber
      // 先打乱任务顺序
      let arr = JSON.parse(JSON.stringify(this.taskNameLists))
      arr = this.ranSort(arr)

      //重复派发任务
      if (this.taskChecked) {
        for (let i = 0; i < this.taskNumber; i++) {
          let index = Math.floor(Math.random() * this.taskNameLists.length)
          this.targetTaskList.push(this.taskNameLists[index])
        }
      } else {
        for (let i = 0; i < this.taskNumber; i++) {
          this.targetTaskList.push(arr[i])
        }
      }
    },
    addTask() {
      if (!this.taskName) {
        this.$toast('请输入任务名...')
        return
      }
      this.taskNameLists.push(this.taskName)
      this.$toast('添加成功')
      this.taskName = null
    },
    reSet(e) {
      switch (e) {
        case 1:
          this.number = null
          this.groupNumber = null
          this.groups = null
          this.groupArray = []
          break
        case 2:
          this.taskName = null
          this.taskNumber = null
          this.taskNameLists = []
          this.targetTaskList = []
          break
        default:
          break
      }
    },
    getLimitNumber() {
      if (!this.min) {
        this.$toast('请输入最小值...')
        return
      }
      if (!this.max) {
        this.$toast('请输入最大值...')
        return
      }
      const _this = this
      this.flag = !this.flag
      this.showNumber = false
      if (this.flag == false) {
        _this.timer = setInterval(function () {
          for (let i = 0; i < _this.textNumber.length; i++) {
            _this.$set(
              _this.textNumber,
              i,
              _this.randomFrom(_this.min, _this.max),
            )
          }
        }, 50)
        _this.beginBtn = '暂停' //给按钮从新赋值
      } else {
        clearInterval(this.timer)
        this.beginBtn = '点击开始' //给按钮从新赋值
        for (let i = 0; i < _this.textNumber.length; i++) {
          _this.textNumber[i] = _this.randomFrom(_this.min, _this.max)
        }
      }
    },
    randomFrom(lowerValue, upperValue) {
      return Math.floor(
        Math.random() * (upperValue - lowerValue + 1) + lowerValue,
      )
    },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
