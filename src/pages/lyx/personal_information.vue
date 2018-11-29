<template>
  <div class="app-container">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="biao">
      <span class="touxiang"></span>
      <span class="xinxi">
      <div class="username">{{ name }}</div>
      <div class="time">介绍：{{ jianjie }}</div>
      </span>
    </span>
  </div>
    <el-menu mode="horizontal">
      <router-link to="/personal">
  <el-menu-item index="1" class="daohang">我的主页</el-menu-item>
  </router-link>
  <router-link to="/dongtai">
  <el-menu-item index="2" class="daohang">我的动态</el-menu-item>
  </router-link>
</el-menu>
</el-card>
<div class="wei">
  <router-view></router-view>
</div>
</div>
</template>

<script>
import personal from '@/pages/lyx/personal'
export default {
  components: {
    personal
  },
  data () {
    return {
      keywords: '',
      id: 1,
      name: '张三',
      jianjie: '我叫张三，我是张三三的家长',
      school: '希望中学',
      stuclass: '高二三班',
      sex: '女',
      number: '15954262483',
      addr: '学院路154号'
    }
  },
  routes: [
    {path: '/personal', component: personal}
  ]
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
  padding-left: 41px;
  font-size: 16px;
  font-weight: bold;
  color: maroon;
}
.time{
  padding: 12px;
  font-size: 10px;
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
