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
    <div v-for="item in search(keywords)" :key="item.name" v-if="item.guanzhu != '关注'">
      <span class="touxiang"></span>
      <span class="xinxi">
      <div class="username">{{item.name}}</div>
      <div class="time">{{item.jianjie}}..</div>
      </span>
            <span class="star1"><i :class="item.starguanzhu == 0 ? 'inconStar iconfont icon-xihuan':'inconStar iconfont icon-xihuan1'" @click="item.starguanzhu == 0 ? stargz1(item):stargz(item)"></i></span>
      <button class="guanzhu">
      <div :class="item.guanzhu == '关注' ? 'guanzhu1':'guanzhu2'"  @click="item.guanzhu == '已关注' ? gaibian1(item):gaibian(item)">
        <span :class="item.guanzhu == '关注' ? 'mui-icon mui-icon-plusempty':'mui-icon mui-icon-checkmarkempty'"></span>{{item.guanzhu}}</div>
      </button>
      <hr style="filter:alpha(Opacity=50); opacity: 0;">
    </div>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keywords: '',
      people: [
        {
          id: 1,
          name: '张三',
          jianjie: 'sass',
          guanzhu: '关注',
          starguanzhu: 1
        },
        {
          id: 2,
          name: '李四',
          jianjie: 'sass2',
          guanzhu: '已关注',
          starguanzhu: 1
        },
        {
          id: 3,
          name: '王五',
          jianjie: '我叫王五',
          guanzhu: '特别关注',
          starguanzhu: 0
        }
      ]
    }
  },
  methods: {
    gaibian (item) {
      this.$notify({
        title: '关注',
        message: '以成功关注该用户',
        type: 'success'
      })
      item.guanzhu = '已关注'
      item.starguanzhu = 1
    },
    gaibian1 (item) {
      this.$notify({
        title: '取消关注',
        message: '以成功取消关注',
        type: 'success'
      })
      item.guanzhu = '关注'
    },
    search (keywords) {
      var newList = []
      this.people.forEach(item => {
        if (item.name.indexOf(keywords) !== -1) {
          newList.push(item)
        }
      })
      return newList
    },
    stargz1 (item) {
      this.$notify({
        title: '取消特别关注',
        message: '以成功取消特别关注',
        type: 'success'
      })
      item.starguanzhu = 1
      item.guanzhu = '已关注'
    },
    stargz (item) {
      this.$notify({
        title: '特别关注关注',
        message: '以成功设置为特别关注关注',
        type: 'success'
      })
      item.starguanzhu = 0
      item.guanzhu = '特别关注'
    }
  }
}
</script>

<style scoped>
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
</style>
