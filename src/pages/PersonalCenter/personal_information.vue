<template>
  <div class="app-container">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="biao">
      <span class="touxiang"></span>
      <span class="xinxi">
      <div class="username">{{ name }}</div>
      <div class="time">职业：{{ person.work }}</div>
      </span>
    </span>
  </div>
<el-menu mode="horizontal">
      <router-link to="/personal1">
  <el-menu-item index="1" class="daohang">我的主页</el-menu-item>
  </router-link>
  <router-link to="/dongtai1">
  <el-menu-item index="2" class="daohang">我的动态</el-menu-item>
  </router-link>
</el-menu>
</el-card>
<router-view></router-view>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      keywords: '',
      name: '',
      person: {}
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    personalInfo: state => state.personal.personalInfo
  }),
  methods: {
    getInfo () {
      let userId = this.userInfo.userId
      this.name = this.userInfo.userNickname
      this.$store.dispatch('personal/sendPersonalInform', { userId }).then((res) => {
        this.person = res.data.data
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style scoped>
.app-container{
padding-top: 0%;
padding-bottom: 0%;
width: 100%;
}
.wei{
  padding-top: 0%;
padding-bottom: 0%;
width: 100%;
}
.el-menu {
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: -20px;
    padding-left: 0px;
}
.daohang{
      margin-left: 18%;
    display: inline-block;
}
.biao{
  margin-left: 35%;
    width: 35%;
    display: inline-block;
}
.touxiang{
  margin-left: 31px;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 25px;
    background-clip: padding-box;
}
.xinxi{
    margin: 1%;
    width: 35%;
}
.username{
  padding-left: 33px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
  padding-top: 14px;
}
.time{
  padding: 25px;
  font-size: 10px;
  width: 107%;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
.item1 {
    margin-bottom: 0px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
  }

</style>
