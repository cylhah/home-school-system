<template>
  <div class="home">
    <app-header :title="'成长线'" url="/#/index2/personal"/>
    <div class="main">
      <time-axis v-if="loaded" :itemList="list"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import timeAxis from './components/time-axis'
import appHeader from '../../components/public/header/header-index'
export default {
  data () {
    return {
      list: [],
      loaded: false
    }
  },
  components: {
    timeAxis, appHeader
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  mounted () {
    // this.list = [{
    //   time: 1545627860000,
    //   content: '我在22年',
    //   imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    // }, {
    //   time: 1545627860000,
    //   content: '我在22年',
    //   imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    // }, {
    //   time: 1515627860000,
    //   content: '我在22年',
    //   imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    // }, {
    //   time: 1505627860000,
    //   content: '我在22年',
    //   imgList: ['18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg', '18_1543476287863.jpg']
    // }]
    this.loaded = true
  },
  methods: {
    getInfo () {
      let userId = this.userInfo.userId
      this.$store.dispatch('mature/getMatureByTime', { userId }).then((res) => {
        console.log(res)
        this.list = res.data.data
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
