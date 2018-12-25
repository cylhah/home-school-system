<template>
  <div class="app-container">
<el-card class="box-card" fixed>
  <div slot="header" class="clearfix">
    <span class="biao">
      <span class="touxiang">
      <span class="message-head">
            <img :src="getHeadUrl()">
          </span></span>
      <span class="xinxi">
      <div class="username">{{ name }}</div>
      <div class="time">职业：{{ person.work }}</div>
      </span>
    </span>
  </div>
<el-menu mode="horizontal" >
      <router-link to="/personal1">
  <el-menu-item index="1" class="daohang">我的主页</el-menu-item>
  </router-link>
  <router-link to="/getNewByUserId">
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
    },
    getHeadUrl () {
      let user = this.userInfo
      if (user.class) {
        return `/class.jpg`
      } else {
        return `/${user.userHeadUrl}`
      }
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.app-container{
// padding-top: 33%;
    padding-top: 27.5%;
padding-bottom: 0%;
width: 100%;
}
.wei{
  padding-top: 0%;
padding-bottom: 0%;
width: 100%;
}
.el-menu {
    border-right: solid 1px  #ddd;
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
    background-color:  #ddd;
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
  color: rgb(255, 255, 255);
  padding-top: 14px;
  box-shadow: #ddd;
}
.time{
    padding-left: 24%;
    font-size: 15%;
    width: 208%;
    color:  #ddd;
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
    position :fixed;
    z-index: 999;
    left: 0%;
    top: 0%;
    width: 100%;
    background: url('../../assets/img/bj2.jpg') no-repeat;
    background-size: cover;
  }
  .message-head {
        margin-right: 10px;
        flex-shrink: 0;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

</style>
