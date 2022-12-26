<template>
  <div class="home">
    <div class="header">
      <img src="../../assets/extract.png" class="icon" alt="" />
      <h1>抽签帮手</h1>
    </div>
    <div class="contain">
      <van-tabs v-model="activity" swipeable>
        <van-tab title="随机分配小组">
          <div class="tab-card">
            <div>
              <van-form @submit="onSubmit">
                <van-field
                  v-model="number"
                  name="总人数"
                  label="总人数"
                  placeholder="请输入总人数"
                />
                <!-- <van-cell center title="是否所有人参与">
                  <template #right-icon>
                    <van-switch v-model="checked" size="24" />
                  </template>
                </van-cell> -->
                <van-cell-group>
                  <van-switch-cell
                    v-model="checked"
                    @change="change"
                    title="是否所有人参与"
                  />
                </van-cell-group>
                <van-field
                  v-model="number"
                  :class="checked && 'number-Participants'"
                  :disabled="checked"
                  name="参与人数"
                  label="参与人数"
                  placeholder="请输入参与人数"
                />
                <!-- <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">按组数分</van-radio>
                  <van-radio name="2">按人数分</van-radio>
                </van-radio-group> -->
                <van-radio-group v-model="radio">
                  <van-cell-group>
                    <van-cell title="按组数分" clickable @click="radio = '1'">
                      <template #right-icon>
                        <van-radio name="1" />
                      </template>
                    </van-cell>
                    <van-cell title="按人数分" clickable @click="radio = '2'">
                      <template #right-icon>
                        <van-radio name="2" />
                      </template>
                    </van-cell>
                  </van-cell-group>
                </van-radio-group>
                <van-field
                  v-model="group"
                  name="每组人数"
                  label="每组人数"
                  placeholder="请输入每组人数"
                />
                <van-field
                  v-model="group"
                  name="分组数量"
                  label="分组数量"
                  placeholder="请输入分组数量"
                />
                <div style="margin: 16px">
                  <van-button round block type="info" native-type="submit">
                    提交
                  </van-button>
                </div>
                <!-- </van-cell-group> -->
                <!-- </van-cell-group> -->
              </van-form>
            </div>
          </div>
        </van-tab>
        <van-tab title="随机分配任务">
          <div class="tab-card">内容随机分配任务</div>
        </van-tab>
        <van-tab title="随机分配汇报回答表演人选">
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
      activity: null,
      number: null,
      group: null,
      checked: true,
      radio: '1',
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
    onSubmit() {
      console.log(this.number, this.group)
    },
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
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
