<template>
  <div class="home">
    <time-axis v-if="loaded" :itemList="list"/>
  </div>
</template>

<script>
import timeAxis from './components/time-axis'
export default {
  data () {
    return {
      list: [],
      loaded: false
    }
  },
  components: {
    timeAxis
  },
  mounted () {
    this.list = [{
      time: 1545627860000,
      content: '我在22年',
      imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    }, {
      time: 1545627860000,
      content: '我在22年',
      imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    }]
    this.loaded = true
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-left: 10px;
}
</style>
