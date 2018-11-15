<template>
  <div class="app-container1">
    <el-card class="box-card">
  <div class="sousuo">
    <el-input
    placeholder="请输入内容" v-model="keywords">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  </div>
</el-card>
<div class="kua">
    <div v-for="item in search(keywords)" :key="item.name">
      <span class="touxiang"></span>
      <span class="xinxi">
      <div class="username">{{item.name}}</div>
      <div class="time">{{item.jianjie}}..</div>
      </span>
      <button class="guanzhu">
      <div class="guanzhu1" :class="item.guanzhu == '已关注' ? 'guanzhu2':''">
        <span class="mui-icon mui-icon-plusempty" @click="item.guanzhu == '已关注' ? gaibian1(item):gaibian(item)"></span>{{item.guanzhu}}</div>
      </button>
      <hr>
    </div>
  </div>
  </div>
</template>

<script>
import header1 from '@/components/public/header/header-share'
export default {
  components: {
    header1
  },
  data () {
    return {
      keywords: '',
      people: [
        {
          id: 1,
          name: '张三',
          jianjie: 'sass',
          guanzhu: '关注'
        },
        {
          id: 2,
          name: '李四',
          jianjie: 'sass2',
          guanzhu: '已关注'
        }
      ]
    }
  },
  methods: {
    gaibian (item) {
      this.$notify({
        title: '关注',
        message: '以成功关注该用户',
        type: 'success',
        this: item.guanzhu = '已关注'
      })
    },
    gaibian1 (item) {
      this.$notify({
        title: '取消关注',
        message: '以成功取消关注',
        type: 'success',
        this: item.guanzhu = '关注'
      })
    },
    search (keywords) {
      var newList = []
      this.people.forEach(item => {
        if (item.name.indexOf(keywords) !== -1) {
          newList.push(item)
        }
      })
      return newList
    }

  }
}
</script>

<style scoped>
.app-container1{
padding-top: 0%;
width: 100%;
background-color: rgb(255, 255, 255);
    border: 1px solid #ccc!important;
    padding: 5px;
    border-radius: 5px!important;
}
.sousuo{
  margin: -16px;
  margin-bottom: -30px;
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
    width: 22%;
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
}
.username{
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
</style>
