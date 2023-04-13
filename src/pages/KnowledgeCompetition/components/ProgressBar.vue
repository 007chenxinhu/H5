<template>
  <div class="progress-bar">
    <template v-if="isSingle">
      <div class="progress-bar-single">
        <div
          v-for="i in stage"
          :key="i"
          :style="{ width: `calc(100% / ${stage})` }"
          :class="`stage-${i} ${getStageStatus(i)}`"
        ></div>
      </div>
    </template>
    <template v-else>
      <div class="progress-bar-double">
        <div
          v-for="i in stage"
          :key="i"
          :style="{ width: `calc(100% / ${stage})` }"
          :class="`stage-${i} ${getStageStatus(i)}`"
        ></div>
      </div>
    </template>
  </div>
  <!-- 在上面的代码中，我们定义了一个ProgressBar组件，
    它接受两个属性：stage和currentStage，分别表示总共
    的阶段数和当前所处的阶段数。然后，在模板中，我们使用
    v-for循环生成十个div，每个div代表一个阶段，然后根据
    currentStage属性的值，设置不同阶段的颜色。
    在样式中，通过计算宽度，将进度条划分为若干个格子，
    然后根据状态使用不同的背景色展示不同阶段。
    最后，在父组件中使用ProgressBar组件，传递相应的属性即可。 -->
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    stage: {
      type: Number,
      required: true,
    },
    currentStage: {
      type: Number,
      default: 0,
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(this.stage, this.currentStage)
  },
  methods: {
    getStageStatus(i) {
      if (i < this.currentStage) {
        return 'done'
      } else if (i === this.currentStage) {
        return 'doing'
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
.progress-bar-single {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 1vh;
  background-color: #eee;
}

.progress-bar-double {
  display: flex;
  justify-content: space-around;
  width: 50vw;
  height: 1vh;
  background-color: #eee;
}

// .progress-bar div {
//   background-color: rgb(255, 196, 0);
// }

.stage-2,
.stage-4,
.stage-6,
.stage-8,
.stage-10 {
  // background-color: blue;
}

.doing {
  background-color: orange;
}

.done {
  background-color: green;
}
</style>
