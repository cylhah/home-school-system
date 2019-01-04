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
  methods: {
    getInfo () {
      let userId = this.userInfo.userId
      this.$store.dispatch('mature/getMatureByTime', { userId }).then((res) => {
        console.log(res)
        this.list = res.data.data
        this.loaded = true
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
