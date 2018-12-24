<template>
  <div class="home">
    <time-axis :itemList="list"/>
  </div>
</template>

<script>
import timeAxis from './components/time-axis'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    timeAxis
  },
  mounted () {
    this.list = [{
      time: 1545627860000,
      content: '我在22年',
      imgList: ['18_1543476287863.jpg']
    }]
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-left: 10px;
}
</style>
