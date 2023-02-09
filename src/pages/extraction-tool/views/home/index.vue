<template>
  <div class="home">
    <div class="header">
      <img src="../../assets/extract.png" class="icon" alt="" />
      <h1>抽签帮手</h1>
    </div>
    <div class="contain">
      <div class="contain-buttonGroup" @click="goGrouping">
        {{ $t('text.randomGrouping') }}
      </div>
      <div class="contain-buttonRandomNumber" @click="goRandomNumber">
        {{ $t('text.randomNumber') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {
    //设置语言
    // this.$i18n.locale = 'zh-CN'
    console.log(this.$t, this.$i18n, 111)
  },
  methods: {
    goGrouping() {
      this.$router.push('/grouping')
    },
    goRandomNumber() {
      this.$router.push('/random-number')
    },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
