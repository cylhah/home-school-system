<template>
  <div class="app-container">
  <div>
    <el-card class="box-card">
  <div class="sousuo">
    <el-input
    placeholder="请输入内容" v-model="keywords">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  </div>
</el-card>
  </div>
 <div class="app-container1">
<div class="kua">
    <div v-for="item in search(keywords)" :key="item.user1.userNickname">
      <span class="message-head">
            <img :src="getHeadUrl(item)">
          </span>
      <span class="xinxi">
      <div class="username">{{item.user1.userNickname}}</div>
      <div class="time">{{item.user1.userName}}..</div>
      </span>
      <button class="guanzhu">
      <div :class="item.starConcern == 0 ? 'guanzhu1':'guanzhu2'"  @click="item.starConcern == 0 ? sendConcern(item.user1.userId , item):deleteConcern(item.user1.userId , item)">
        <span class="mui-icon mui-icon-checkmarkempty"></span>{{word[item.starConcern]}}</div>
      </button>
      <hr style="filter:alpha(Opacity=50); opacity: 0;">
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      keywords: '',
      word: ['关注', '已关注', '特别关注'],
      people: []
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo,
    personalInfo: state => state.personal.personalInfo
  }),
  methods: {
    search (keywords) {
      var newList = []
      this.people.forEach(item => {
        if (item.user1.userNickname.indexOf(keywords) !== -1) {
          newList.push(item)
        }
      })
      return newList
    },
    removeConcernsStar (data, item) {
      {
        const h = this.$createElement
        this.$msgbox({
          message: h('p', null, [
            h('span', null, '取消特别关注？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              var userId = 18
              var value = data
              item.starConcern = 1
              console.log(item)
              // this.itme.starConcern = 0
              this.$store.dispatch('concern/removeConcernsStar', { userId, value }).then((res) => {
                if (res.data.code === 0) {
                  console.log(res)
                }
              })
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 100)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '操作成功'
          })
        })
      }
    },
    sendConcernStar (data, item) {
      {
        const h = this.$createElement
        this.$msgbox({
          message: h('p', null, [
            h('span', null, '特别关注？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              var userId = 18
              var value = data
              item.starConcern = 2
              console.log(item)
              this.$store.dispatch('concern/sendConcernStar', { userId, value }).then((res) => {
                if (res.data.code === 0) {
                  console.log(res)
                }
              })
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '操作成功'
          })
        })
      }
    },
    deleteConcern (data, item) {
      {
        const h = this.$createElement
        this.$msgbox({
          message: h('p', null, [
            h('span', null, '取消关注？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              var userId = 18
              var value = data
              item.starConcern = 0
              console.log(item)
              this.$store.dispatch('concern/deleteConcern', { userId, value }).then((res) => {
                if (res.data.code === 0) {
                  console.log(res)
                }
              })
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '操作成功'
          })
        })
      }
    },
    sendConcern (data, item) {
      {
        const h = this.$createElement
        this.$msgbox({
          message: h('p', null, [
            h('span', null, '关注？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              var userId = 18
              var value = data
              item.starConcern = 1
              console.log(item)
              this.$store.dispatch('concern/sendConcern', { userId, value }).then((res) => {
                if (res.data.code === 0) {
                  console.log(res)
                }
              })
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '操作成功'
          })
        })
      }
    },
    getHeadUrl (item) {
      let prefix = 'api/img/userHead'
      if (item.user1.class) {
        return `${prefix}/class.jpg`
      } else {
        return `${prefix}/${item.user1.userHeadUrl}`
      }
    },
    getInfo () {
      // let userId = this.userInfo.userId
      let userId = 18
      this.$store.dispatch('concern/getAlluser', { userId }).then((res) => {
        console.log(res)
        this.people = res.data.data
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.app-container{
padding-top: 0%;
width: 100%;
}
.dongtao{
   padding: 1%;
}
.sousuo{
  margin: -16px;
  margin-bottom: -14px;
}
.item1 {
  background-color: rgb(255, 255, 255);
    margin: 0px;
  margin-bottom: 6px;
  }
.icon-xihuan{
  font-size: 35px;
  color: red;
}
.mui-icon-extra-peoples{
   font-size: 35px;
  color: rgb(255, 174, 0);
}
.mui-icon-pulldown{
   font-size: 35px;
  color: rgb(0, 240, 20);
}
.word{
  font-size: 14px;
}
.td, th {
    padding: 15px;
}
.app-container1{
padding-top: 0%;
width: 100%;
background-color: rgb(255, 255, 255);
    border: 1px solid #ccc!important;
    padding: 5px;
    border-radius: 5px!important;
}
.kua{
  margin: 10px;
  margin-bottom: -16px;
}
.touxiang{
  margin: -2px;
    width: 58px;
    height: 58px;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 29px;
    background-clip: padding-box;
}
.xinxi{
    margin: 1%;
    width: 35%;
    display: inline-block;
}
.guanzhu{
    float: right;
    padding: 0px 0px;
    margin: 4%;
    width: 27%;
    border: 1px solid rgb(255, 255, 255)!important;
    background-color: rgb(255, 255, 255);
    border-radius: 5px!important;
}
.guanzhu1{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(250, 117, 7);
   border: 1px solid rgb(250, 117, 7)!important;
   border-radius: 5px!important;
}
.guanzhu2{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid rgb(130, 136, 130)!important;
  color: rgb(130, 136, 130);
  border-radius: 5px!important;
}
.username{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
.time{
  font-size: 5px;
}
.inconStar{
  font-size: 150%;
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
