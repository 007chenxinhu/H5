<template>
  <div class="number-select">
    <div class="numbers">
      <div
        v-for="number in numbers"
        :key="number"
        :class="{ selected: number === selectedNumber }"
        @click="selectNumber(number)"
      >
        {{ number }}s
      </div>
    </div>
    <div class="selected-number">Selected Number: {{ selectedNumber }}s</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
      selectedNumber: 180,
    }
  },
  methods: {
    selectNumber(number) {
      this.selectedNumber = number
    },
  },
}
</script>

<style scoped lang="scss">
.number-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.numbers {
  display: flex;
  margin-top: 1vw;
  border: 0.1vh solid #ccc;

  //   width: 10vw;
  //   overflow-x: scroll;

  /* flex-wrap: wrap;
  justify-content: center; */

  &::-webkit-scrollbar {
    width: 0.5vw;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(20, 20, 20, 0.2);
    border-radius: 0.5vw;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.numbers > div {
  padding: 0.25vw;
  margin: 0.25vw;
  cursor: pointer;
}

.numbers > div.selected {
  background-color: #ccc;
}

.selected-number {
  margin-top: 1vw;
}
</style>
